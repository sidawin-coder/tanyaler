import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { transactionId, billplzId, paid } = await req.json();

    if (!transactionId) {
      return NextResponse.json({ error: 'Missing transaction ID' }, { status: 400 });
    }

    const service = await createServiceClient();

    // Semak transaction
    const { data: transaction } = await service
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
      const { data: credits } = await service
        .from('credits')
        .select('balance, daily_free_used, daily_free_limit')
        .eq('user_id', user.id)
        .single();

      const freeRemaining = Math.max(0, (credits?.daily_free_limit || 8) - (credits?.daily_free_used || 0));
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        totalCredits: (credits?.balance || 0) + freeRemaining,
      });
    }

    // Verify dengan BillPlz API kalau paid = true dari redirect
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
        return NextResponse.json({ error: 'Payment not verified' }, { status: 400 });
      }

      // Tambah kredit
      const creditsToAdd = transaction.credits_purchased;
      const planType = transaction.plan;

      if (planType === 'pro') {
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
          .eq('user_id', user.id);
      } else {
        const { data: currentCredits } = await service
          .from('credits')
          .select('balance')
          .eq('user_id', user.id)
          .single();

        await service
          .from('credits')
          .update({
            balance: (currentCredits?.balance || 0) + creditsToAdd,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);
      }

      // Update transaction status
      await service
        .from('transactions')
        .update({
          status: 'paid',
          payment_id: billplzId,
          paid_at: new Date().toISOString(),
        })
        .eq('id', transactionId);

      // Return kredit terkini
      const { data: updatedCredits } = await service
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
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
