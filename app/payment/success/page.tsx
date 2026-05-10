'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const PLAN_INFO: Record<string, { name: string; credits: number; days: number }> = {
  rintis:    { name: 'Rintis',    credits: 50,  days: 45  },
  strategis: { name: 'Strategis', credits: 200, days: 120 },
  prestij:   { name: 'Prestij',   credits: 500, days: 250 },
};

function SuccessContent() {
  const params = useSearchParams();
  const planId = params.get('plan') ?? '';
  const plan   = PLAN_INFO[planId];
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Pembayaran Berjaya!</h1>
        {plan ? (
          <p className="text-slate-500 text-sm mb-8">
            Plan <span className="font-semibold text-slate-700">{plan.name}</span> telah aktif.{' '}
            <span className="font-bold text-emerald-600">{plan.credits} kredit</span> dikreditkan
            untuk tempoh <span className="font-semibold">{plan.days} hari</span>.
          </p>
        ) : (
          <p className="text-slate-500 text-sm mb-8">Kredit telah dikreditkan ke akaun anda.</p>
        )}
        <Link href="/apps" className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors mb-3">
          Mula Guna TanyaLer →
        </Link>
        <Link href="/" className="block text-sm text-slate-400 hover:text-slate-600 py-2 transition-colors">
          Kembali ke Laman Utama
        </Link>
        <p className="mt-6 text-xs text-slate-400">
          Sokongan:{' '}
          <a href="mailto:support@tanyaler.my" className="text-emerald-600 hover:underline">
            support@tanyaler.my
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}