import { createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const PLANS: Record<string, { credits: number; type: string }> = {
  basic: { credits: 50, type: 'topup' },
  value: { credits: 200, type: 'topup' },
  pro: { credits: 600, type: 'pro' },
};

function verifyBillplzSignature(
  params: Record<string, string>,
  xSignature: string,
  secret: string
): boolean {
  // BillPlz X-Signature verification
  // Ikut dokumentasi BillPlz: sort alphabetically, join dengan |
  const keys = Object.keys(params).sort();
  const signString = keys.map((k) => `${k}${params[k]}`).join('|');
  const hmac = createHmac('sha256', secret).update(signString).digest('hex');
  return hmac === xSignature;
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));

    const xSignature = req.headers.get('x-signature') || params['x_signature'] || '';
    const xSignatureSecret = process.env.BILLPLZ_X_SIGNATURE!;

    // 1. Verify X-Signature
    const signatureValid = verifyBillplzSignature(params, xSignature, xSignatureSecret);

    if (!signatureValid) {
      console.error('BillPlz: Invalid X-Signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // 2. Check payment status
    const paid = params['paid'] === 'true';
    const billId = params['id'];
    const reference1 = params['reference_1']; // transaction ID
    const reference2 = params['reference_2']; // user ID
    const paidAt = params['paid_at'];

    if (!paid) {
      // Payment failed/cancelled — update status
      const service = await createServiceClient();
      await service
        .from('transactions')
        .update({ status: 'failed' })
        .eq('id', reference1);

      return NextResponse.json({ received: true, status: 'payment_not_paid' });
    }

    const service = await createServiceClient();

    // 3. Semak transaction — elak double credit
    const { data: transaction } = await service
      .from('transactions')
      .select('*')
      .eq('id', reference1)
      .single();

    if (!transaction) {
      console.error('Transaction not found:', reference1);
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    if (transaction.status === 'paid') {
      // Already processed — idempotent
      return NextResponse.json({ received: true, status: 'already_processed' });
    }

    // 4. Update transaction status
    await service
      .from('transactions')
      .update({
        status: 'paid',
        payment_id: billId,
        paid_at: paidAt || new Date().toISOString(),
      })
      .eq('id', reference1);

    // 5. Tambah kredit kepada user
    const userId = reference2 || transaction.user_id;
    const creditsToAdd = transaction.credits_purchased;
    const planType = transaction.plan;

    if (planType === 'pro') {
      // Pro plan — set balance dan update plan
      const proExpiry = new Date();
      proExpiry.setMonth(proExpiry.getMonth() + 1);

      await service
        .from('credits')
        .update({
          balance: creditsToAdd,
          plan: 'pro',
          plan_expires_at: proExpiry.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    } else {
      // Topup — tambah kepada balance sedia ada
      const { data: currentCredits } = await service
        .from('credits')
        .select('balance')
        .eq('user_id', userId)
        .single();

      const currentBalance = currentCredits?.balance || 0;

      await service
        .from('credits')
        .update({
          balance: currentBalance + creditsToAdd,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }

    console.log(`Credits added: ${creditsToAdd} for user ${userId}`);

    return NextResponse.json({
      received: true,
      status: 'success',
      credits_added: creditsToAdd,
    });

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Webhook error:', message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// BillPlz juga hantar GET request untuk verify endpoint
export async function GET() {
  return NextResponse.json({ status: 'BillPlz webhook endpoint active' });
}
