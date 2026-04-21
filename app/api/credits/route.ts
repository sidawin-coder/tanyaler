import { createClient, createServiceClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const serviceClient = createServiceClient();
  const today = new Date().toISOString().split('T')[0];

  const { data: credits } = await serviceClient
    .from('credits')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!credits) {
    return Response.json({ error: 'not_found' }, { status: 404 });
  }

  // Reset daily jika hari baru
  if (credits.last_reset < today) {
    await serviceClient
      .from('credits')
      .update({ daily_free_used: 0, last_reset: today })
      .eq('user_id', user.id);
    credits.daily_free_used = 0;
  }

  const freeRemaining = Math.max(0, credits.daily_free_limit - credits.daily_free_used);

  return Response.json({
    balance: credits.balance,
    freeRemaining,
    dailyFreeLimit: credits.daily_free_limit,
    totalUsed: credits.total_used,
    plan: credits.plan,
    planExpiresAt: credits.plan_expires_at,
  });
}
