import { createClient } from '@supabase/supabase-js';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// Guna service role client terus — lebih reliable untuk update
const serviceSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Semak auth user
    const authClient = await createAuthClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { transactionId, billplzId, paid } = await req.json();

    if (!transactionId) {
      return NextResponse.json({ error: 'Missing transaction ID' }, { status: 400 });
    }

    // Semak transaction
    const { data: transaction } = await serviceSupabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .eq('user_id', user.id)
      .single();

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Kalau dah paid, return current credits
    if (transaction.status === 'paid') {
      const { data: credits } = await serviceSupabase
        .from('credits')
        .select('balance, daily_free_used, daily_free_limit')
        .eq('user_id', user.id)
        .single();

      const freeRemaining = Math.max(0, (credits?.daily_free_limit || 8) - (credits?.daily_free_used || 0));
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        creditsAdded: transaction.credits_purchased,
        totalCredits: (credits?.balance || 0) + freeRemaining,
      });
    }

    // Verify dengan BillPlz
    if (paid === 'true' && billplzId) {
      const apiKey = process.env.BILLPLZ_API_KEY!;
      const mode = process.env.BILLPLZ_MODE || 'production';
      const billplzUrl = mode === 'production'
        ? `https://www.billplz.com/api/v3/bills/${billplzId}`
        : `https://www.billplz-sandbox.com/api/v3/bills/${billplzId}`;

      const credentials = Buffer.from(`${apiKey}:`).toString('base64');

      const verifyRes = await fetch(billplzUrl, {
        headers: { 'Authorization': `Basic ${credentials}` },
      });

      const billData = await verifyRes.json();

      if (!verifyRes.ok || !billData.paid) {
        return NextResponse.json({ error: 'Payment not verified by BillPlz' }, { status: 400 });
      }

      const creditsToAdd = transaction.credits_purchased;
      const planType = transaction.plan;

      // Dapatkan balance semasa
      const { data: currentCredits } = await serviceSupabase
        .from('credits')
        .select('balance, daily_free_used, daily_free_limit')
        .eq('user_id', user.id)
        .single();

      const currentBalance = currentCredits?.balance || 0;

      if (planType === 'pro') {
        const proExpiry = new Date();
        proExpiry.setMonth(proExpiry.getMonth() + 1);

        await serviceSupabase
          .from('credits')
          .update({
            balance: creditsToAdd,
            plan: 'pro',
            plan_expires_at: proExpiry.toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);
      } else {
        const { error: updateError } = await serviceSupabase
          .from('credits')
          .update({
            balance: currentBalance + creditsToAdd,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Credits update error:', updateError);
          return NextResponse.json({ error: 'Gagal kemaskini kredit' }, { status: 500 });
        }
      }

      // Update transaction status
      await serviceSupabase
        .from('transactions')
        .update({
          status: 'paid',
          payment_id: billplzId,
          paid_at: new Date().toISOString(),
        })
        .eq('id', transactionId);

      // Baca balik kredit terkini
      const { data: updatedCredits } = await serviceSupabase
        .from('credits')
        .select('balance, daily_free_used, daily_free_limit')
        .eq('user_id', user.id)
        .single();

      const freeRemaining = Math.max(0, (updatedCredits?.daily_free_limit || 8) - (updatedCredits?.daily_free_used || 0));

      return NextResponse.json({
        success: true,
        creditsAdded: creditsToAdd,
        totalCredits: (updatedCredits?.balance || 0) + freeRemaining,
      });
    }

    return NextResponse.json({ error: 'Payment not confirmed' }, { status: 400 });

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error('Verify error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
