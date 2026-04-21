import { createClient, createServiceClient } from '@/lib/supabase/server';

const PACKAGES = {
  topup_5: { amount: 500, credits: 50, label: 'Topup RM5 — 50 Soalan' },      // dalam sen
  topup_10: { amount: 1000, credits: 120, label: 'Topup RM10 — 120 Soalan' },
  pro: { amount: 4900, credits: 600, label: 'Plan Pro RM49/bulan — 600 Soalan' },
  enterprise: { amount: 9900, credits: 1500, label: 'Plan Enterprise RM99/bulan — 1500 Soalan' },
} as const;

type PackageKey = keyof typeof PACKAGES;

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { packageId } = await req.json() as { packageId: PackageKey };
  const pkg = PACKAGES[packageId];

  if (!pkg) {
    return Response.json({ error: 'invalid_package' }, { status: 400 });
  }

  const serviceClient = createServiceClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const isSandbox = process.env.BILLPLZ_MODE === 'sandbox';
  const billplzBase = isSandbox
    ? 'https://www.billplz-sandbox.com/api/v3'
    : 'https://www.billplz.com/api/v3';

  // Dapatkan email pengguna
  const { data: profile } = await supabase.auth.getUser();
  const userEmail = profile.user?.email || '';

  try {
    // Cipta bill dalam BillPlz
    const billplzRes = await fetch(`${billplzBase}/bills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(process.env.BILLPLZ_API_KEY + ':').toString('base64')}`,
      },
      body: new URLSearchParams({
        collection_id: process.env.BILLPLZ_COLLECTION_ID!,
        email: userEmail,
        mobile: '',
        name: `TanyaLer User ${user.id.substring(0, 8)}`,
        amount: pkg.amount.toString(),
        callback_url: `${appUrl}/api/payment/callback`,
        redirect_url: `${appUrl}/chat?payment=success`,
        description: pkg.label,
        'reference_1_label': 'User ID',
        'reference_1': user.id,
        'reference_2_label': 'Package',
        'reference_2': packageId,
      }),
    });

    const bill = await billplzRes.json();

    if (!bill.id) {
      throw new Error('BillPlz did not return a bill ID');
    }

    // Simpan transaksi dalam database
    await serviceClient.from('transactions').insert({
      user_id: user.id,
      amount: pkg.amount / 100,
      credits_purchased: pkg.credits,
      billplz_bill_id: bill.id,
      billplz_url: bill.url,
      status: 'pending',
      plan: packageId,
    });

    return Response.json({ billUrl: bill.url, billId: bill.id });

  } catch (error) {
    console.error('BillPlz error:', error);
    return Response.json({ error: 'payment_failed' }, { status: 500 });
  }
}
