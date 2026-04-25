import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET — ambil baki kredit user semasa
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const service = await createServiceClient();
  const today = new Date().toISOString().split('T')[0];

  const { data: credits } = await service
    .from('credits')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!credits) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  // Reset daily free kalau hari baru
  if (credits.last_reset < today) {
    await service
      .from('credits')
      .update({ daily_free_used: 0, last_reset: today })
      .eq('user_id', user.id);
    credits.daily_free_used = 0;
  }

  const freeRemaining = Math.max(0, credits.daily_free_limit - credits.daily_free_used);

  return NextResponse.json({
    balance: credits.balance,
    freeRemaining,
    dailyFreeLimit: credits.daily_free_limit,
    totalUsed: credits.total_used,
    plan: credits.plan,
    planExpiresAt: credits.plan_expires_at,
    canChat: freeRemaining > 0 || credits.balance > 0,
  });
}

// POST — tolak satu kredit (dipanggil selepas soalan dijawab)
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const service = await createServiceClient();
  const today = new Date().toISOString().split('T')[0];

  const { data: credits } = await service
    .from('credits')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!credits) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  // Reset daily kalau hari baru
  if (credits.last_reset < today) {
    await service
      .from('credits')
      .update({ daily_free_used: 0, last_reset: today })
      .eq('user_id', user.id);
    credits.daily_free_used = 0;
  }

  const hasFree = credits.daily_free_used < credits.daily_free_limit;
  const hasPaid = credits.balance > 0;

  if (!hasFree && !hasPaid) {
    return NextResponse.json({ error: 'insufficient_credits' }, { status: 402 });
  }

  // Tolak kredit
  if (hasFree) {
    await service
      .from('credits')
      .update({
        daily_free_used: credits.daily_free_used + 1,
        total_used: credits.total_used + 1,
      })
      .eq('user_id', user.id);
  } else {
    await service
      .from('credits')
      .update({
        balance: credits.balance - 1,
        total_used: credits.total_used + 1,
      })
      .eq('user_id', user.id);
  }

  return NextResponse.json({ success: true, creditType: hasFree ? 'free' : 'paid' });
}
