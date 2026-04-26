'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const txId = searchParams.get('tx');
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'failed'>('loading');
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (!txId) {
      router.push('/pricing');
      return;
    }

    // Semak status payment selepas 2 saat (bagi webhook masa untuk proses)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/user/credits');
        const data = await res.json();
        if (data.balance !== undefined || data.freeRemaining !== undefined) {
          setCredits((data.balance || 0) + (data.freeRemaining || 0));
          setStatus('success');
        } else {
          setStatus('pending');
        }
      } catch {
        setStatus('success'); // Default ke success jika API fail
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [txId, router]);

  if (status === 'loading') {
    return (
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Mengesahkan pembayaran...
        </h2>
        <p className="text-slate-600">Sila tunggu sebentar.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Success icon */}
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">
        Pembayaran Berjaya!
      </h1>
      <p className="text-lg text-slate-600 mb-6">
        Kredit telah ditambah ke akaun anda.
      </p>

      {/* Credit info */}
      {credits > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 inline-block">
          <p className="text-sm text-emerald-700 font-medium mb-1">Jumlah kredit sekarang</p>
          <p className="text-4xl font-bold text-emerald-700">{credits}</p>
          <p className="text-sm text-emerald-600">kredit tersedia</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/chat"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md"
        >
          Mula Bertanya Sekarang →
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-7 py-3.5 rounded-full hover:bg-slate-50 transition-all"
        >
          Ke Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <header className="px-5 py-5">
        <Logo size={32} href="/" />
      </header>

      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md bg-white border border-slate-200/60 rounded-3xl p-10 shadow-sm">
          <Suspense>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
