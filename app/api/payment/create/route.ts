import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// Plan definitions
const PLANS: Record<string, { name: string; amount: number; credits: number; type: string }> = {
  basic: {
    name: 'Topup Basic — 50 Kredit',
    amount: 1000, // dalam sen (RM10.00)
    credits: 50,
    type: 'topup',
  },
  value: {
    name: 'Topup Value — 200 Kredit',
    amount: 3000, // RM30.00
    credits: 200,
    type: 'topup',
  },
  pro: {
    name: 'Pro Plan — 600 Kredit/Bulan',
    amount: 5900, // RM59.00
    credits: 600,
    type: 'pro',
  },
};

const BILLPLZ_API_URL =
  process.env.BILLPLZ_MODE === 'production'
    ? 'https://www.billplz.com/api/v3'
    : 'https://www.billplz-sandbox.com/api/v3';

export async function POST(req: Request) {
  try {
    // 1. Semak auth
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Dapatkan plan dari request
    const { plan } = await req.json();
    const selectedPlan = PLANS[plan];

    if (!selectedPlan) {
      return NextResponse.json({ error: 'Plan tidak sah' }, { status: 400 });
    }

    // 3. Dapatkan profil user
    const service = await createServiceClient();
    const { data: profile } = await service
      .from('profiles')
      .select('email, full_name')
      .eq('id', user.id)
      .single();

    const userEmail = profile?.email || user.email || '';
    const userName = profile?.full_name || 'Pengguna TanyaLer';

    // 4. Buat transaction record dalam Supabase (pending)
    const { data: transaction, error: txError } = await service
      .from('transactions')
      .insert({
        user_id: user.id,
        amount: selectedPlan.amount / 100, // convert sen ke RM
        credits_purchased: selectedPlan.credits,
        status: 'pending',
        plan: selectedPlan.type,
      })
      .select()
      .single();

    if (txError || !transaction) {
      console.error('Transaction create error:', txError);
      return NextResponse.json({ error: 'Gagal buat transaksi' }, { status: 500 });
    }

    // 5. Buat BillPlz bill
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tanyaler.vercel.app';

    const billplzPayload = new URLSearchParams({
      collection_id: process.env.BILLPLZ_COLLECTION_ID!,
      email: userEmail,
      name: userName,
      amount: selectedPlan.amount.toString(),
      description: selectedPlan.name,
      callback_url: `${siteUrl}/api/payment/webhook`,
      redirect_url: `${siteUrl}/payment/success?tx=${transaction.id}`,
      reference_1_label: 'Transaction ID',
      reference_1: transaction.id,
      reference_2_label: 'User ID',
      reference_2: user.id,
    });

    const apiKey = process.env.BILLPLZ_API_KEY!;
    const credentials = Buffer.from(`${apiKey}:`).toString('base64');

    const billResponse = await fetch(`${BILLPLZ_API_URL}/bills`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: billplzPayload.toString(),
    });

    const billData = await billResponse.json();

    if (!billResponse.ok || !billData.url) {
      console.error('BillPlz error:', billData);
      // Rollback transaction
      await service.from('transactions').delete().eq('id', transaction.id);
      return NextResponse.json({ error: 'Gagal buat bil BillPlz' }, { status: 500 });
    }

    // 6. Update transaction dengan BillPlz bill ID
    await service
      .from('transactions')
      .update({ payment_id: billData.id })
      .eq('id', transaction.id);

    // 7. Return payment URL
    return NextResponse.json({
      success: true,
      paymentUrl: billData.url,
      billId: billData.id,
      transactionId: transaction.id,
    });

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Payment create error:', message);
    return NextResponse.json({ error: 'Ralat sistem' }, { status: 500 });
  }
}
