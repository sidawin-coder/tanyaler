import { createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

function verifyBillplzSignature(params: Record<string, string>, xSignature: string, secret: string): boolean {
  const keys = Object.keys(params).sort();
  const signString = keys.map((k) => `${k}${params[k]}`).join('|');
  const hmac = createHmac('sha256', secret).update(signString).digest('hex');
  return hmac === xSignature;
}

async function syncCreditsToBackend(userId: string, planType: string, transactionId: string): Promise<{ success: boolean; error?: string }> {
  const backendUrl = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
  const token = process.env.BACKEND_INTERNAL_API_TOKEN;
  if (!token) {
    console.error('[CRITICAL] BACKEND_INTERNAL_API_TOKEN not configured');
    return { success: false, error: 'Token not configured' };
  }
  try {
    const res = await fetch(`${backendUrl}/api/internal/credit/topup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ user_id: userId, plan_type: planType, transaction_id: transactionId }),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`[CRITICAL] Backend sync FAILED [${res.status}] for ${userId}/${planType}/${transactionId}: ${errorBody}`);
      return { success: false, error: errorBody };
    }
    console.log(`Backend sync OK: ${userId} → ${planType} (tx: ${transactionId})`);
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[CRITICAL] Backend sync EXCEPTION for ${userId}: ${msg}`);
    return { success: false, error: msg };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));

    const xSignature = req.headers.get('x-signature') || params['x_signature'] || '';
    const xSignatureSecret = process.env.BILLPLZ_X_SIGNATURE!;

    if (!verifyBillplzSignature(params, xSignature, xSignatureSecret)) {
      console.error('BillPlz webhook: Invalid X-Signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const paid = params['paid'] === 'true';
    const billId = params['id'];
    const reference1 = params['reference_1'];
    const reference2 = params['reference_2'];
    const paidAt = params['paid_at'];

    const service = await createServiceClient();

    if (!paid) {
      await service.from('transactions').update({ status: 'failed' }).eq('id', reference1);
      return NextResponse.json({ received: true, status: 'payment_not_paid' });
    }

    // Atomic claim (status: pending → paid)
    const { data: claimed } = await service
      .from('transactions')
      .update({ status: 'paid', bill_id: billId, paid_at: paidAt || new Date().toISOString() })
      .eq('id', reference1)
      .eq('status', 'pending')
      .select()
      .single();

    if (!claimed) {
      console.log(`Webhook: tx ${reference1} already processed`);
      return NextResponse.json({ received: true, status: 'already_processed' });
    }

    const userId = reference2 || claimed.user_id;
    const planType = claimed.plan;
    const creditsToAdd = claimed.credits;

    // Sync to backend (Local PG = source of truth)
    const syncResult = await syncCreditsToBackend(userId, planType, reference1);

    if (!syncResult.success) {
      console.error(`⚠️ CRITICAL: Supabase paid but backend NOT synced for ${userId}/${reference1}`);
    }

    return NextResponse.json({
      received: true,
      status: syncResult.success ? 'success' : 'partial_sync_failure',
      credits_added: creditsToAdd,
      plan: planType,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Webhook error:', message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'BillPlz webhook endpoint active' });
}
