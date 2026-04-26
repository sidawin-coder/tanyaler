import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const PLANS: Record<string, { name: string; amount: number; credits: number; type: string }> = {
  basic: { name: 'Topup Basic — 50 Kredit', amount: 1000, credits: 50, type: 'topup' },
  value: { name: 'Topup Value — 200 Kredit', amount: 3000, credits: 200, type: 'topup' },
  pro: { name: 'Pro Plan — 600 Kredit/Bulan', amount: 5900, credits: 600, type: 'pro' },
};

export async function POST(req: Request) {
  try {
    // 1. Semak auth
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Semak env vars
    const apiKey = process.env.BILLPLZ_API_KEY;
    const collectionId = process.env.BILLPLZ_COLLECTION_ID;
    const mode = process.env.BILLPLZ_MODE || 'sandbox';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tanyaler.vercel.app';

    if (!apiKey || !collectionId) {
      console.error('Missing env vars:', { apiKey: !!apiKey, collectionId: !!collectionId });
      return NextResponse.json({
        error: 'Konfigurasi sistem tidak lengkap. Hubungi support@tanyaler.com'
      }, { status: 500 });
    }

    // 3. Semak plan
    const { plan } = await req.json();
    const selectedPlan = PLANS[plan];
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Plan tidak sah' }, { status: 400 });
    }

    // 4. Dapatkan profil
    const service = await createServiceClient();
    const { data: profile } = await service
      .from('profiles')
      .select('email, full_name')
      .eq('id', user.id)
      .single();

    const userEmail = profile?.email || user.email || '';
    const userName = profile?.full_name || 'Pengguna TanyaLer';

    // 5. Buat transaction record
    const { data: transaction, error: txError } = await service
      .from('transactions')
      .insert({
        user_id: user.id,
        amount: selectedPlan.amount / 100,
        credits_purchased: selectedPlan.credits,
        status: 'pending',
        plan: selectedPlan.type,
      })
      .select()
      .single();

    if (txError || !transaction) {
      console.error('Transaction insert error:', txError);
      return NextResponse.json({
        error: 'Gagal simpan transaksi: ' + (txError?.message || 'Unknown')
      }, { status: 500 });
    }

    // 6. Call BillPlz API
    const billplzUrl = mode === 'production'
      ? 'https://www.billplz.com/api/v3/bills'
      : 'https://www.billplz-sandbox.com/api/v3/bills';

    const credentials = Buffer.from(`${apiKey}:`).toString('base64');

    const payload = new URLSearchParams({
      collection_id: collectionId,
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

    console.log('Calling BillPlz:', { url: billplzUrl, mode, collectionId });

    const billResponse = await fetch(billplzUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const billData = await billResponse.json();
    console.log('BillPlz response:', { status: billResponse.status, data: billData });

    if (!billResponse.ok || !billData.url) {
      // Rollback transaction
      await service.from('transactions').delete().eq('id', transaction.id);
      return NextResponse.json({
        error: `BillPlz error: ${JSON.stringify(billData)}`
      }, { status: 500 });
    }

    // 7. Update transaction dengan bill ID
    await service
      .from('transactions')
      .update({ payment_id: billData.id })
      .eq('id', transaction.id);

    return NextResponse.json({
      success: true,
      paymentUrl: billData.url,
      billId: billData.id,
      transactionId: transaction.id,
    });

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Payment create catch error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
