import { createClient as createSupabaseServiceClient } from '@supabase/supabase-js';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const serviceSupabase = createSupabaseServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function syncCreditsToBackend(userId: string, planType: string, transactionId: string): Promise<{ success: boolean; error?: string }> {
  const backendUrl = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
  const token = process.env.BACKEND_INTERNAL_API_TOKEN;
  if (!token) return { success: false, error: 'Token not configured' };
  try {
    const res = await fetch(`${backendUrl}/api/internal/credit/topup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ user_id: userId, plan_type: planType, transaction_id: transactionId }),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Backend sync failed [${res.status}]: ${errorBody}`);
      return { success: false, error: errorBody };
    }
    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function POST(req: Request) {
  try {
    const authClient = await createAuthClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { transactionId, billplzId, paid } = await req.json();
    if (!transactionId) return NextResponse.json({ error: 'Missing transaction ID' }, { status: 400 });

    const { data: transaction } = await serviceSupabase
      .from('transactions').select('*').eq('id', transactionId).eq('user_id', user.id).single();

    if (!transaction) return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });

    if (transaction.status === 'paid') {
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        creditsAdded: transaction.credits,
        plan: transaction.plan,
      });
    }

    if (paid === 'true' && billplzId) {
      const apiKey = process.env.BILLPLZ_API_KEY!;
      const mode = process.env.BILLPLZ_MODE || 'production';
      const billplzUrl = mode === 'production'
        ? `https://www.billplz.com/api/v3/bills/${billplzId}`
        : `https://www.billplz-sandbox.com/api/v3/bills/${billplzId}`;
      const credentials = Buffer.from(`${apiKey}:`).toString('base64');

      const verifyRes = await fetch(billplzUrl, { headers: { 'Authorization': `Basic ${credentials}` } });
      const billData = await verifyRes.json();
      if (!verifyRes.ok || !billData.paid) {
        return NextResponse.json({ error: 'Payment not verified by BillPlz' }, { status: 400 });
      }

      const { data: claimed } = await serviceSupabase
        .from('transactions')
        .update({ status: 'paid', bill_id: billplzId, paid_at: new Date().toISOString() })
        .eq('id', transactionId)
        .eq('status', 'pending')
        .select()
        .single();

      if (!claimed) {
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          creditsAdded: transaction.credits,
          plan: transaction.plan,
        });
      }

      const planType = claimed.plan;
      const creditsToAdd = claimed.credits;
      const syncResult = await syncCreditsToBackend(user.id, planType, transactionId);
      if (!syncResult.success) {
        console.error(`⚠️ Verify: Supabase paid but backend NOT synced for ${user.id}/${transactionId}`);
      }

      return NextResponse.json({
        success: true,
        creditsAdded: creditsToAdd,
        plan: planType,
        syncStatus: syncResult.success ? 'synced' : 'pending',
      });
    }

    return NextResponse.json({ error: 'Payment not confirmed' }, { status: 400 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Verify error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
