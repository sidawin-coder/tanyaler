import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const PLANS = {
  rintis:    { credits: 50,  validity_days: 45,  rollover: false },
  strategis: { credits: 200, validity_days: 120, rollover: true  },
  prestij:   { credits: 500, validity_days: 250, rollover: true  },
} as const;

function verifySignature(data: Record<string, string>, receivedSig: string): boolean {
  const secret = process.env.BILLPLZ_X_SIGNATURE!;

  const payload = Object.keys(data)
    .filter(k => k !== 'x_signature')
    .sort()
    .map(k => `${k}${data[k]}`)
    .join('|');

  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(receivedSig, 'hex')
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((val, key) => { data[key] = val.toString(); });

    const xSig = data['x_signature'];
    if (!xSig || !verifySignature(data, xSig)) {
      console.error('[Callback] Signature tidak sah');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (data['paid'] !== 'true') {
      return NextResponse.json({ status: 'unpaid' });
    }

    const billId = data['id'];
    const userId = data['reference_1'];
    const planId = data['reference_2'];
    const plan   = PLANS[planId as keyof typeof PLANS];

    if (!plan || !userId || !billId) {
      return NextResponse.json({ error: 'Data tidak sah' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: existing } = await supabase
      .from('transactions')
      .select('status')
      .eq('bill_id', billId)
      .single();

    if (existing?.status === 'paid') {
      return NextResponse.json({ status: 'already processed' });
    }

    let finalCredits = plan.credits;
    const expiresAt  = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.validity_days);

    if (plan.rollover) {
      const { data: current } = await supabase
        .from('user_credits')
        .select('credits, expires_at')
        .eq('user_id', userId)
        .single();

      if (current && current.credits > 0) {
        finalCredits = current.credits + plan.credits;
        const currentExpiry = new Date(current.expires_at);
        if (currentExpiry > expiresAt) expiresAt.setTime(currentExpiry.getTime());
      }
    }

    await supabase
      .from('user_credits')
      .upsert(
        {
          user_id:    userId,
          credits:    finalCredits,
          plan:       planId,
          rollover:   plan.rollover,
          expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    await supabase
      .from('transactions')
      .upsert(
        {
          user_id: userId,
          bill_id: billId,
          plan:    planId,
          amount:  parseInt(data['paid_amount'] || '0'),
          credits: plan.credits,
          status:  'paid',
          paid_at: new Date().toISOString(),
        },
        { onConflict: 'bill_id' }
      );

    console.log(`✅ PAID | User: ${userId} | Plan: ${planId} | Kredit: ${finalCredits}`);
    return NextResponse.json({ status: 'ok' });

  } catch (err) {
    console.error('[Callback] Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}