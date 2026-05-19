import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const PLANS: Record<string, { name: string; amount: number; credits: number; days: number }> = {
  rintis:    { name: 'Rintis — 50 Kredit / 45 Hari',      amount: 3900,  credits: 50,  days: 45 },
  strategis: { name: 'Strategis — 200 Kredit / 120 Hari', amount: 8900,  credits: 200, days: 120 },
  prestij:   { name: 'Prestij — 500 Kredit / 250 Hari',   amount: 19900, credits: 500, days: 250 },
};

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.BILLPLZ_API_KEY;
    const collectionId = process.env.BILLPLZ_COLLECTION_ID;
    const mode = process.env.BILLPLZ_MODE || 'sandbox';
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tanyaler.my';

    if (!apiKey || !collectionId) {
      console.error('Missing BillPlz env vars');
      return NextResponse.json({ error: 'Konfigurasi sistem tidak lengkap. Hubungi support@tanyaler.my' }, { status: 500 });
    }

    const { plan } = await req.json();
    const selectedPlan = PLANS[plan];
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Plan tidak sah' }, { status: 400 });
    }

    // User info dari auth (no profiles table)
    const userEmail = user.email || '';
    const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Pengguna TanyaLer';

    // Create transaction (correct Supabase schema)
    const service = await createServiceClient();
    const { data: transaction, error: txError } = await service
      .from('transactions')
      .insert({
        user_id: user.id,
        amount: selectedPlan.amount / 100,
        credits: selectedPlan.credits,
        status: 'pending',
        plan: plan,
      })
      .select()
      .single();

    if (txError || !transaction) {
      console.error('Transaction insert error:', txError);
      return NextResponse.json({ error: 'Gagal simpan transaksi: ' + (txError?.message || 'Unknown') }, { status: 500 });
    }

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

    console.log('BillPlz request:', { url: billplzUrl, mode, plan, amount: selectedPlan.amount });

    const billResponse = await fetch(billplzUrl, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${credentials}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    });

    const billData = await billResponse.json();

    if (!billResponse.ok || !billData.url) {
      await service.from('transactions').delete().eq('id', transaction.id);
      return NextResponse.json({ error: `BillPlz error: ${JSON.stringify(billData)}` }, { status: 500 });
    }

    await service.from('transactions').update({ bill_id: billData.id }).eq('id', transaction.id);

    return NextResponse.json({
      success: true,
      paymentUrl: billData.url,
      billId: billData.id,
      transactionId: transaction.id,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Payment create error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
