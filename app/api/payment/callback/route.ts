import { createServiceClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();
  const params = new URLSearchParams(body);

  const billId = params.get('id') || '';
  const paid = params.get('paid') === 'true';
  const xSignature = params.get('x_signature') || '';

  // Verify X-Signature (keselamatan — pastikan callback adalah dari BillPlz)
  const signatureKey = process.env.BILLPLZ_X_SIGNATURE!;
  const signatureString = `${billId}${paid}`;
  const expectedSignature = crypto
    .createHmac('sha256', signatureKey)
    .update(signatureString)
    .digest('hex');

  if (xSignature !== expectedSignature) {
    console.warn('Invalid BillPlz signature');
    return new Response('Invalid signature', { status: 400 });
  }

  if (!paid) {
    // Payment failed or cancelled
    await createServiceClient()
      .from('transactions')
      .update({ status: 'failed' })
      .eq('billplz_bill_id', billId);
    return new Response('OK', { status: 200 });
  }

  const serviceClient = createServiceClient();

  // Dapatkan transaksi
  const { data: transaction } = await serviceClient
    .from('transactions')
    .select('*')
    .eq('billplz_bill_id', billId)
    .single();

  if (!transaction || transaction.status === 'paid') {
    // Sudah diproses atau tidak wujud
    return new Response('OK', { status: 200 });
  }

  // Kemaskini status transaksi
  await serviceClient
    .from('transactions')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('billplz_bill_id', billId);

  // Tambah kredit kepada pengguna
  const { data: currentCredits } = await serviceClient
    .from('credits')
    .select('balance')
    .eq('user_id', transaction.user_id)
    .single();

  const newBalance = (currentCredits?.balance || 0) + transaction.credits_purchased;

  await serviceClient
    .from('credits')
    .update({ balance: newBalance })
    .eq('user_id', transaction.user_id);

  console.log(`✅ Credits added: ${transaction.credits_purchased} for user ${transaction.user_id}`);
  return new Response('OK', { status: 200 });
}
