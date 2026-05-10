import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const isSandbox = process.env.BILLPLZ_MODE === 'sandbox';

const BILLPLZ_BASE_URL = isSandbox
  ? 'https://www.billplz-sandbox.com/api/v3'
  : 'https://www.billplz.com/api/v3';

const PLANS = {
  rintis: {
    name: 'Rintis',
    amount: 3900,
    credits: 50,
    validity_days: 45,
    rollover: false,
    description: 'TanyaLer — Plan Rintis (50 Kredit / 45 hari)',
  },
  strategis: {
    name: 'Strategis',
    amount: 8900,
    credits: 200,
    validity_days: 120,
    rollover: true,
    description: 'TanyaLer — Plan Strategis (200 Kredit / 120 hari)',
  },
  prestij: {
    name: 'Prestij',
    amount: 19900,
    credits: 500,
    validity_days: 250,
    rollover: true,
    description: 'TanyaLer — Plan Prestij (500 Kredit / 250 hari)',
  },
} as const;

export async function POST(req: NextRequest) {
  try {
    const { plan_id, user_id, user_name, user_email } = await req.json();

    if (!plan_id || !user_id || !user_email) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const plan = PLANS[plan_id as keyof typeof PLANS];
    if (!plan) {
      return NextResponse.json({ error: 'Plan tidak wujud' }, { status: 400 });
    }

    const baseUrl = isSandbox
      ? 'http://localhost:3000'
      : (process.env.NEXT_PUBLIC_BASE_URL || 'https://tanyaler.my');

    const credentials = Buffer.from(`${process.env.BILLPLZ_API_KEY}:`).toString('base64');

    const params = new URLSearchParams({
      collection_id:     process.env.BILLPLZ_COLLECTION_ID!,
      name:              user_name || user_email,
      email:             user_email,
      amount:            plan.amount.toString(),
      description:       plan.description,
      redirect_url:      `${baseUrl}/payment/success?plan=${plan_id}`,
      callback_url:      `${baseUrl}/api/payment/callback`,
      reference_1_label: 'user_id',
      reference_1:       user_id,
      reference_2_label: 'plan_id',
      reference_2:       plan_id,
    });

    const billplzRes = await fetch(`${BILLPLZ_BASE_URL}/bills`, {
      method: 'POST',
      headers: {
        Authorization:  `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const bill = await billplzRes.json();

    if (!billplzRes.ok) {
      console.error('[BillPlz] Error:', JSON.stringify(bill));
      return NextResponse.json({ error: 'Gagal buat bil pembayaran', detail: bill }, { status: 500 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase.from('transactions').insert({
      user_id,
      bill_id: bill.id,
      plan:    plan_id,
      amount:  plan.amount,
      credits: plan.credits,
      status:  'pending',
    });

    console.log(`[BillPlz] Bil dicipta: ${bill.id} | ${isSandbox ? 'SANDBOX' : 'LIVE'}`);

    return NextResponse.json({
      bill_id:  bill.id,
      bill_url: bill.url,
    });

  } catch (err) {
    console.error('[Payment Create]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}