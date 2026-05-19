'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Plan = {
  id: string;
  name: string;
  price: string;
  credits: string;
  duration: string;
  description: string;
  features: string[];
  cta: string;
  href: string | null;
  planKey: string | null;
  rollover: boolean;
  popular: boolean;
  perUnit?: string;
  valueProp?: string;
};

const plans: Plan[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    price: 'RM0',
    credits: '20 kredit',
    duration: 'Percubaan 10 hari',
    description: 'Cuba penuh sebelum komit',
    features: [
      '20 kredit soalan',
      'Akses 10 hari dari log masuk pertama',
      'Akses penuh — sama macam plan paid',
      'Tiada kad kredit diperlukan',
      '❌ Tiada Rollover',
    ],
    cta: 'Mulakan Percubaan Percuma',
    href: '/dashboard',
    planKey: null,
    rollover: false,
    popular: false,
  },
  {
    id: 'rintis',
    name: 'Rintis',
    price: 'RM39',
    credits: '50 kredit',
    duration: 'Sah 45 hari',
    description: 'Untuk keperluan sesekali',
    features: [
      '50 kredit soalan',
      'Sah selama 45 hari',
      'Akses semua panduan rasmi',
      'Bayar sekali, tiada langganan',
      '❌ Tiada Rollover',
    ],
    cta: 'Pilih Rintis',
    href: null,
    planKey: 'rintis',
    rollover: false,
    popular: false,
  },
  {
    id: 'strategis',
    name: 'Strategis',
    price: 'RM89',
    credits: '200 kredit',
    duration: 'Sah 120 hari',
    description: 'Nilai terbaik untuk vendor aktif',
    features: [
      '200 kredit soalan',
      'Sah selama 120 hari',
      'Rollover — Baki kredit dibawa ke hadapan',
      'Akses semua panduan rasmi',
      'Bayar sekali, tiada langganan',
    ],
    cta: 'Pilih Strategis',
    href: null,
    planKey: 'strategis',
    rollover: true,
    popular: true,
    perUnit: 'RM0.45 / soalan',
    valueProp: '4× kredit vs Rintis',
  },
  {
    id: 'prestij',
    name: 'Prestij',
    price: 'RM199',
    credits: '500 kredit',
    duration: 'Sah 250 hari',
    description: 'Untuk penggunaan intensif',
    features: [
      '500 kredit soalan',
      'Sah selama 250 hari',
      'Rollover — Baki kredit dibawa ke hadapan',
      'Akses semua panduan rasmi',
      'Bayar sekali, tiada langganan',
    ],
    cta: 'Pilih Prestij',
    href: null,
    planKey: 'prestij',
    rollover: true,
    popular: false,
  },
];

const faqs = [
  {
    q: 'Berapa lama kredit sah digunakan?',
    a: 'Tempoh sah bergantung pada plan: Explorer (percubaan 10 hari), Rintis (45 hari), Strategis (120 hari), Prestij (250 hari). Percubaan Explorer adalah sekali sahaja per akaun — tidak boleh diperbaharui.',
  },
  {
    q: 'Apa itu ciri Rollover?',
    a: 'Rollover bermaksud baki kredit yang tidak digunakan akan dibawa ke hadapan apabila anda renew plan sebelum tempoh tamat. Ciri eksklusif ini ada pada plan Strategis dan Prestij. Penting: rollover hanya berfungsi jika anda renew sebelum tempoh tamat — jika dibiarkan tamat, baki akan hilang.',
  },
  {
    q: 'Bolehkah saya mendapatkan bayaran balik?',
    a: 'Kredit yang belum digunakan boleh dikembalikan dalam tempoh 7 hari bekerja dari tarikh pembelian. Sila hubungi support@tanyaler.my untuk proses bayaran balik.',
  },
  {
    q: 'Apakah yang berlaku selepas percubaan Explorer tamat?',
    a: 'Selepas 20 kredit habis ATAU percubaan 10 hari tamat (mana-mana dulu), anda perlu langgan plan berbayar untuk teruskan menggunakan TanyaLer. Percubaan adalah sekali sahaja per akaun.',
  },
  {
    q: 'Apakah kaedah pembayaran yang diterima?',
    a: 'TanyaLer menerima pembayaran melalui FPX (internet banking semua bank utama Malaysia). Pembayaran diproses dengan selamat melalui BillPlz.',
  },
  {
    q: 'Berapa lama kredit ditambah selepas bayar?',
    a: 'Kredit ditambah secara automatik dalam masa 1–2 minit selepas pembayaran berjaya disahkan.',
  },
];

function PayButton({
  planKey,
  cta,
  loadingPlan,
  onPay,
  variant = 'dark',
}: {
  planKey: string;
  cta: string;
  loadingPlan: string | null;
  onPay: (key: string) => void;
  variant?: 'dark' | 'emerald';
}) {
  const isLoading = loadingPlan === planKey;
  const base =
    'inline-flex items-center justify-center gap-2 w-full rounded-full text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]';
  const styles =
    variant === 'emerald'
      ? `${base} py-3.5 font-bold bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/30`
      : `${base} py-3 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white`;
  return (
    <button onClick={() => onPay(planKey)} disabled={loadingPlan !== null} className={styles}>
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Memproses...
        </>
      ) : (
        <>
          {cta}
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 8h14M9 2l6 6-6 6" />
          </svg>
        </>
      )}
    </button>
  );
}

export default function PricingPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handlePayment = async (planKey: string) => {
    setLoadingPlan(planKey);
    setError('');
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (res.status === 401) {
        router.push('/login?redirect=/pricing');
        return;
      }
      if (!res.ok || !data.paymentUrl) {
        setError(data.error || 'Gagal mencipta bil. Sila cuba semula.');
        return;
      }
      window.location.href = data.paymentUrl;
    } catch {
      setError('Ralat rangkaian. Sila cuba semula.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex flex-col bg-[#FDFDFD]">

      {/* Hero */}
      <section className="pt-14 sm:pt-20 md:pt-28 pb-10 sm:pb-14 md:pb-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs sm:text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3 sm:mb-4">
            Harga Telus
          </div>
          <h1 className="text-[2.25rem] leading-[1.1] sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6 text-balance">
            Pilihan yang sesuai
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            untuk setiap keperluan.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Mulakan dengan percubaan percuma. Upgrade bila anda bersedia.
            Tiada kontrak jangka panjang.
          </p>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="px-5 md:px-8 pb-4">
          <div className="max-w-2xl mx-auto bg-rose-50 border border-rose-200 text-rose-700 text-sm px-5 py-3 rounded-xl text-center">
            {error}
          </div>
        </div>
      )}

      {/* Plans */}
      <section className="pb-16 sm:pb-20 md:pb-28 lg:pb-36 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-center">
            {plans.map((plan) => {
              if (plan.popular) {
                return (
                  <div
                    key={plan.id}
                    className="relative bg-slate-900 rounded-3xl p-7 sm:p-8 lg:p-9 flex flex-col border border-emerald-500/60 shadow-2xl shadow-emerald-950/50 z-10 lg:-my-8 ring-1 ring-emerald-500/20"
                  >
                    {/* Subtle glow overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.14),transparent_65%)] pointer-events-none" />

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-5 sm:mb-6 relative">
                      <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                        ⭐ Paling Popular
                      </span>
                      <span className="bg-white/10 text-white/75 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        Nilai Terbaik
                      </span>
                    </div>

                    <div className="mb-4 relative">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{plan.name}</h3>
                      <p className="text-sm text-slate-400">{plan.description}</p>
                    </div>

                    <div className="mb-4 relative">
                      <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight">{plan.price}</span>
                      <p className="text-base font-semibold text-emerald-400 mt-2">{plan.credits}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{plan.duration}</p>
                    </div>

                    {/* Value chips */}
                    <div className="flex flex-wrap gap-2 mb-5 sm:mb-6 relative">
                      {plan.perUnit && (
                        <span className="bg-emerald-500/15 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/25">
                          {plan.perUnit}
                        </span>
                      )}
                      {plan.valueProp && (
                        <span className="bg-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full">
                          {plan.valueProp}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-7 sm:mb-8 flex-1 relative">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex gap-2.5 text-sm">
                          <svg
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${feature.includes('Rollover') ? 'text-emerald-400' : 'text-emerald-500/80'}`}
                            viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          >
                            <polyline points="4 10 8 14 16 6" />
                          </svg>
                          <span className={`leading-relaxed ${feature.includes('Rollover') ? 'text-emerald-300 font-semibold' : 'text-slate-300'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative">
                      <PayButton
                        planKey={plan.planKey!}
                        cta={plan.cta}
                        loadingPlan={loadingPlan}
                        onPay={handlePayment}
                        variant="emerald"
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={plan.id}
                  className="relative bg-white rounded-3xl p-6 sm:p-7 flex flex-col border border-slate-200/60 hover:border-slate-300 hover:shadow-md transition-all"
                >
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                    <p className="text-sm text-slate-500">{plan.description}</p>
                  </div>

                  <div className="mb-5 sm:mb-6">
                    <span className="text-4xl font-bold text-slate-900 tracking-tight">{plan.price}</span>
                    <p className="text-sm font-semibold text-emerald-700 mt-2">{plan.credits}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{plan.duration}</p>
                  </div>

                  <ul className="space-y-3 mb-7 sm:mb-8 flex-1">
                    {plan.features.map((feature, i) => {
                      const isNegative = feature.startsWith('❌ ');
                      const displayText = isNegative ? feature.slice(2).trim() : feature;
                      const isRollover = feature.includes('Rollover') && !isNegative;
                      return (
                        <li key={i} className={`flex gap-2.5 text-sm ${isNegative ? 'text-slate-400' : 'text-slate-700'}`}>
                          {isNegative ? (
                            <svg className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="5" x2="15" y2="15" />
                              <line x1="15" y1="5" x2="5" y2="15" />
                            </svg>
                          ) : (
                            <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isRollover ? 'text-emerald-500' : 'text-emerald-600'}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="4 10 8 14 16 6" />
                            </svg>
                          )}
                          <span className={`leading-relaxed ${isRollover ? 'font-semibold text-emerald-700' : ''}`}>{displayText}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {plan.planKey ? (
                    <PayButton
                      planKey={plan.planKey}
                      cta={plan.cta}
                      loadingPlan={loadingPlan}
                      onPay={handlePayment}
                    />
                  ) : (
                    <Link
                      href={plan.href!}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 min-h-[48px] rounded-full text-sm font-semibold bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white transition-all"
                    >
                      {plan.cta}
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 8h14M9 2l6 6-6 6" />
                      </svg>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <div className="mt-12 sm:mt-14 md:mt-16 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs sm:text-sm text-slate-600">
            <div className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Pembayaran selamat SSL
            </div>
            <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
            <div className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              Diproses oleh BillPlz (FPX)
            </div>
            <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
            <span>Tiada bayaran tersembunyi</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
            <span>Refund dalam 7 hari bekerja</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 md:py-28 px-5 md:px-8 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Soalan Lazim
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 cursor-pointer list-none min-h-[56px]">
                  <span className="font-semibold text-slate-900 text-[14px] sm:text-[15px]">{faq.q}</span>
                  <svg className="w-5 h-5 text-slate-500 flex-shrink-0 transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div className="px-5 sm:px-6 pb-5 text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
