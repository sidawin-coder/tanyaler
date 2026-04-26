'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const plans = [
  {
    id: 'free',
    name: 'Percubaan',
    price: 'RM0',
    unit: '',
    credits: '8 soalan percuma setiap hari',
    description: 'Untuk mencuba TanyaLer',
    features: [
      '8 soalan percuma setiap hari',
      'Kuota diperbaharui setiap hari',
      'Akses panduan asas',
      'Jawapan berdasarkan dokumen rasmi',
    ],
    cta: 'Mulakan Percuma',
    href: '/chat',
    popular: false,
    planKey: null,
  },
  {
    id: 'basic',
    name: 'Topup Basic',
    price: 'RM10',
    unit: '',
    credits: '50 kredit soalan',
    description: 'Pay-as-you-go',
    features: [
      '50 kredit soalan',
      'Digunakan sehingga habis',
      'Kredit sah selama 6 bulan',
      'Bayar sekali, tanpa langganan',
    ],
    cta: 'Beli Topup Basic',
    href: null,
    popular: false,
    planKey: 'basic',
  },
  {
    id: 'value',
    name: 'Topup Value',
    price: 'RM30',
    unit: '',
    credits: '200 kredit soalan',
    description: 'Lebih jimat per kredit',
    features: [
      '200 kredit soalan',
      'Lebih jimat berbanding Basic',
      'Kredit sah selama 6 bulan',
      'Bayar sekali, tanpa langganan',
    ],
    cta: 'Beli Topup Value',
    href: null,
    popular: false,
    planKey: 'value',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'RM59',
    unit: '/bulan',
    credits: '600 kredit soalan / bulan',
    description: 'Untuk pengguna aktif',
    features: [
      '600 kredit soalan sebulan',
      'Kuota diperbaharui setiap bulan',
      'Akses semua kategori panduan',
      'Sokongan keutamaan',
      'Boleh batal pada bila-bila masa',
    ],
    cta: 'Langgan Pro',
    href: null,
    popular: true,
    planKey: 'pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    credits: 'Sehingga 2,000 kredit / bulan',
    description: 'Untuk syarikat & pasukan',
    features: [
      'Sehingga 2,000 kredit soalan',
      'Akses berbilang pengguna',
      'Laporan penggunaan bulanan',
      'Sokongan keutamaan tinggi',
      'Latihan onboarding pasukan',
    ],
    cta: 'Hubungi Kami',
    href: 'mailto:support@tanyaler.com',
    popular: false,
    planKey: null,
  },
];

const faqs = [
  {
    q: 'Berapa lamakah kredit soalan sah digunakan?',
    a: 'Kredit soalan anda sah selama 6 bulan dari tarikh pembelian. Anda boleh menggunakannya mengikut kadar yang selesa dalam tempoh tersebut.',
  },
  {
    q: 'Bolehkah saya mendapatkan bayaran balik?',
    a: 'Kredit yang belum digunakan boleh dikembalikan dalam tempoh 7 hari bekerja dari tarikh pembelian. Sila hubungi support@tanyaler.com.',
  },
  {
    q: 'Apakah yang berlaku jika kuota percuma saya habis?',
    a: 'Kuota Percubaan akan diperbaharui secara automatik pada keesokan harinya. Anda juga boleh membeli topup untuk akses segera.',
  },
  {
    q: 'Adakah pelan Pro memperbaharui secara automatik?',
    a: 'Ya, pelan Pro diperbaharui setiap bulan. Anda boleh membatalkan langganan pada bila-bila masa.',
  },
  {
    q: 'Apakah kaedah pembayaran yang diterima?',
    a: 'TanyaLer menerima pembayaran melalui FPX (internet banking semua bank utama Malaysia). Pembayaran diproses dengan selamat oleh BillPlz.',
  },
  {
    q: 'Berapa lama kredit ditambah selepas bayar?',
    a: 'Kredit ditambah secara automatik dalam masa 1-2 minit selepas pembayaran berjaya.',
  },
];

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
        // Belum login
        router.push('/login?redirect=/pricing');
        return;
      }

      if (!res.ok || !data.paymentUrl) {
        setError(data.error || 'Gagal mencipta bil. Sila cuba semula.');
        return;
      }

      // Redirect ke BillPlz
      window.location.href = data.paymentUrl;

    } catch {
      setError('Ralat rangkaian. Sila cuba semula.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 md:pt-28 pb-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-4">
            Harga Telus
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
            Pilihan yang sesuai
            <br />
            untuk setiap keperluan.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Mulakan dengan percubaan percuma. Upgrade bila anda bersedia.
            Tiada kontrak jangka panjang.
          </p>
        </div>
      </section>

      {/* Error message */}
      {error && (
        <div className="px-5 md:px-8 pb-4">
          <div className="max-w-2xl mx-auto bg-rose-50 border border-rose-200 text-rose-700 text-sm px-5 py-3 rounded-xl text-center">
            {error}
          </div>
        </div>
      )}

      {/* Plans */}
      <section className="pb-20 md:pb-28 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-7 flex flex-col border transition-all ${
                  plan.popular
                    ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 lg:scale-105'
                    : 'border-slate-200/60 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    Paling Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-slate-900 tracking-tight">{plan.price}</span>
                    {plan.unit && <span className="text-sm text-slate-500">{plan.unit}</span>}
                  </div>
                  <p className="text-sm font-semibold text-emerald-700">{plan.credits}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 10 8 14 16 6" />
                      </svg>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {plan.planKey ? (
                  <button
                    onClick={() => handlePayment(plan.planKey!)}
                    disabled={loadingPlan !== null}
                    className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold transition-all ${
                      plan.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {loadingPlan === plan.planKey ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M1 8h14M9 2l6 6-6 6" />
                        </svg>
                      </>
                    )}
                  </button>
                ) : plan.href ? (
                  <Link
                    href={plan.href}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <Link
                    href="/chat"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all"
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Pembayaran selamat SSL
            </div>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <div className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              Diproses oleh BillPlz (FPX)
            </div>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Tiada bayaran tersembunyi</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Refund dalam 7 hari bekerja</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Soalan Lazim
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 text-[15px]">{faq.q}</span>
                  <svg className="w-5 h-5 text-slate-500 flex-shrink-0 transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-slate-600 text-[15px] leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
