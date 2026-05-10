'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PlanId = 'rintis' | 'strategis' | 'prestij';

interface PayButtonProps {
  planId: PlanId;
  label?: string;
  className?: string;
}

export default function PayButton({ planId, label = 'Beli Sekarang', className = '' }: PayButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/login?redirect=/pricing');
      return;
    }

    const user = session.user;

    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id:    planId,
          user_id:    user.id,
          user_name:  user.user_metadata?.full_name || user.email,
          user_email: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.bill_url) {
        alert('Gagal proses pembayaran. Sila cuba lagi.');
        setLoading(false);
        return;
      }

      window.location.href = data.bill_url;

    } catch {
      alert('Ralat sambungan. Sila cuba lagi.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Memproses...
        </>
      ) : (
        label
      )}
    </button>
  );
}
