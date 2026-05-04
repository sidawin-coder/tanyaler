'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      id: 'explorer',
      name: 'Explorer',
      badge: null,
      price: 'RM0',
      priceNote: 'Percuma selamanya',
      credits: '5 kredit / hari',
      validity: 'Reset setiap tengah malam',
      perCredit: 'Percuma',
      savings: null,
      highlight: false,
      color: 'slate',
      features: [
        { text: '5 soalan percuma setiap hari', ok: true },
        { text: 'Jawapan asas ePerolehan', ok: true },
        { text: 'Akses dokumen rujukan asas', ok: true },
        { text: 'Rujukan Fail Rasmi', ok: false },
        { text: 'Rollover Kredit', ok: false },
        { text: 'Sokongan Keutamaan', ok: false },
      ],
      cta: 'Cuba Percuma',
      ctaHref: '/chat',
      desc: 'Untuk merisik kualiti jawapan Tanyaler.',
    },
    {
      id: 'rintis',
      name: 'Rintis',
      badge: null,
      price: 'RM39',
      priceNote: 'Bayar sekali',
      credits: '50 kredit',
      validity: 'Sah 45 hari',
      perCredit: 'RM0.78 / soalan',
      savings: null,
      highlight: false,
      color: 'blue',
      features: [
        { text: '50 kredit soalan', ok: true },
        { text: 'Sah 45 hari dari pembelian', ok: true },
        { text: 'Rujukan Fail Rasmi ✓', ok: true },
        { text: 'Rollover Kredit', ok: false, red: true },
        { text: 'Sokongan Keutamaan', ok: false },
        { text: 'Jimat berbanding Explorer', ok: false },
      ],
      cta: 'Pilih Rintis',
      ctaHref: '/login',
      desc: 'Sesuai untuk selesaikan 1 tender segera.',
    },
    {
      id: 'strategis',
      name: 'Strategis',
      badge: '🔥 PALING POPULAR — PILIHAN TERBAIK',
      price: 'RM89',
      priceNote: 'Bayar sekali',
      credits: '200 kredit',
      validity: 'Sah 120 hari',
      perCredit: 'RM0.45 / soalan',
      savings: 'Jimat 42%',
      highlight: true,
      color: 'emerald',
      features: [
        { text: '200 kredit soalan', ok: true },
        { text: 'Sah 120 hari dari pembelian', ok: true },
        { text: 'Rujukan Fail Rasmi ✓', ok: true },
        { text: 'Rollover Kredit ✓ (Bawa ke depan)', ok: true },
        { text: 'Sokongan Keutamaan', ok: true },
        { text: 'Jimat 42% vs Rintis', ok: true },
      ],
      cta: '🚀 Pilih Strategis Sekarang',
      ctaHref: '/login',
      desc: 'Pilihan Utama Vendor yang mahu menang tender.',
    },
    {
      id: 'prestij',
      name: 'Prestij',
      badge: null,
      price: 'RM199',
      priceNote: 'Bayar sekali',
      credits: '500 kredit',
      validity: 'Sah 250 hari',
      perCredit: 'RM0.40 / soalan',
      savings: 'Jimat 49%',
      highlight: false,
      color: 'purple',
      features: [
        { text: '500 kredit soalan', ok: true },
        { text: 'Sah 250 hari dari pembelian', ok: true },
        { text: 'Rujukan Fail Rasmi ✓', ok: true },
        { text: 'Rollover Kredit ✓ (Bawa ke depan)', ok: true },
        { text: 'Sokongan Keutamaan Tertinggi', ok: true },
        { text: 'Jimat 49% vs Rintis', ok: true },
      ],
      cta: 'Pilih Prestij',
      ctaHref: '/login',
      desc: 'Untuk Pembekal & Konsultan Profesional.',
    },
  ];

  const faqs = [
    {
      q: 'Apa beza pelan Explorer dan pelan berbayar?',
      a: 'Pelan Explorer memberikan 5 soalan percuma sehari tanpa rujukan fail rasmi. Pelan berbayar (Rintis, Strategis, Prestij) menyertakan rujukan fail spesifik untuk setiap jawapan — sangat penting untuk vendor yang perlu bukti dokumen dalam tender.',
    },
    {
      q: 'Apa itu Rollover Kredit?',
      a: 'Rollover bermakna kredit yang tidak digunakan akan dibawa ke hadapan apabila anda membeli semula. Hanya pelan Strategis dan Prestij mempunyai ciri ini. Pelan Rintis — kredit yang tidak digunakan akan HANGUS apabila tamat tempoh 45 hari.',
    },
    {
      q: 'Berapa lama kredit sah digunakan?',
      a: 'Explorer: Reset setiap hari | Rintis: 45 hari | Strategis: 120 hari | Prestij: 250 hari. Kredit mula dikira dari tarikh pembelian.',
    },
    {
      q: 'Boleh saya dapatkan bayaran balik?',
      a: 'Ya. Kredit yang belum digunakan boleh dikembalikan dalam tempoh 7 hari bekerja dari tarikh pembelian. Hantar permohonan ke support@tanyaler.my dengan subjek "Permohonan Refund" beserta bukti pembelian.',
    },
    {
      q: 'Apakah kaedah pembayaran yang diterima?',
      a: 'TanyaLer menerima FPX (internet banking semua bank utama Malaysia). Pembayaran diproses selamat oleh BillPlz. Kredit ditambah dalam masa 1-2 minit selepas bayaran berjaya.',
    },
    {
      q: 'Kenapa pelan Strategis paling popular?',
      a: 'Strategis menawarkan nilai terbaik: kos hanya RM0.45/soalan (jimat 42% vs Rintis), sah 120 hari, ada rollover kredit, dan cukup untuk menguruskan 3-5 tender dalam satu tempoh. Vendor aktif pilih Strategis kerana ia seimbang antara kos dan kegunaan.',
    },
    {
      q: 'Adakah sistem ini guna dokumen rasmi terkini?',
      a: 'Ya. Sistem TanyaLer merujuk kepada 7,375 muka surat dari 56 dokumen rasmi ePerolehan termasuk PK 5.1 (Kuatkuasa pindaan 30 Jun 2025) dan manual terkini. Kami sentiasa kemas kini apabila dokumen baru diterbitkan.',
    },
    {
      q: 'Boleh saya upgrade dari Explorer ke pelan berbayar?',
      a: 'Ya, anda boleh upgrade pada bila-bila masa dari halaman Harga. Kredit baru akan ditambah serta-merta selepas pembayaran berjaya. Tiada prosedur yang rumit — klik, bayar, guna.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-16 px-6 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Harga Telus</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Pilihan yang sesuai untuk<br className="hidden md:block"/> setiap keperluan.
          </h1>
          <p className="text-slate-500 text-lg">
            Mulakan dengan <strong className="text-slate-900">PERCUMA</strong> dengan pelan Explorer.
            Upgrade bila anda bersedia. Tiada kontrak jangka panjang.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative rounded-3xl border-2 flex flex-col ${
                plan.highlight
                  ? 'border-emerald-500 shadow-2xl shadow-emerald-100 scale-105 bg-white'
                  : 'border-slate-200 bg-white'
              }`}>
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className={`p-6 flex flex-col flex-1 ${plan.badge ? 'pt-8' : ''}`}>
                  {/* Plan name */}
                  <div className="mb-4">
                    <span className={`text-xs font-black uppercase tracking-widest ${
                      plan.highlight ? 'text-emerald-600' : 'text-slate-400'
                    }`}>{plan.name}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className={`text-4xl font-black ${plan.highlight ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mb-1">{plan.priceNote}</p>
                  {plan.savings && (
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {plan.savings}
                    </span>
                  )}

                  {/* Credits info */}
                  <div className={`rounded-xl p-3 mb-4 text-sm ${plan.highlight ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                    <div className="font-bold text-slate-900">💬 {plan.credits}</div>
                    <div className="text-slate-500 text-xs mt-1">⏳ {plan.validity}</div>
                    <div className={`text-xs font-bold mt-1 ${plan.highlight ? 'text-emerald-600' : 'text-slate-500'}`}>
                      💰 {plan.perCredit}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {f.ok ? (
                          <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                        ) : (
                          <span className={`font-bold mt-0.5 flex-shrink-0 ${(f as any).red ? 'text-red-500' : 'text-slate-300'}`}>
                            ✕
                          </span>
                        )}
                        <span className={`${f.ok ? 'text-slate-700' : (f as any).red ? 'text-red-400 line-through' : 'text-slate-300'}`}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-slate-400 italic mb-4">{plan.desc}</p>

                  {/* CTA Button */}
                  <Link href={plan.ctaHref} className={`block text-center py-3 px-4 rounded-2xl font-bold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200'
                      : plan.price === 'RM0'
                      ? 'bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-700'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}>
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison note */}
          <p className="text-center text-slate-400 text-sm mt-8">
            💳 Pembayaran selamat melalui FPX · SSL Dilindungi · PDPA 2010 Compliant
          </p>
        </div>
      </div>

      {/* Trust Boosters */}
      <div className="bg-slate-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-10">
            Kenapa vendor berjaya guna TanyaLer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '💎',
                title: 'Sumber 100% Sah & Rasmi',
                desc: 'Setiap jawapan bukan rekaan AI semata-mata. Sistem kami merujuk terus kepada fail manual, pekeliling, dan dokumen rasmi ePerolehan. Anda mendapat maklumat yang mempunyai autoriti, bukan sekadar teori.',
              },
              {
                icon: '📂',
                title: 'Bukti Rujukan Disediakan',
                desc: 'Kami faham ketepatan adalah segalanya dalam tender. Sebab itu, setiap jawapan disertakan dengan rujukan spesifik fail sumber agar anda boleh menyemak sendiri dan menggunakannya dengan penuh yakin.',
              },
              {
                icon: '⚡',
                title: 'Pantas & Menjimatkan Masa',
                desc: 'Lupakan aktiviti menyemak ribuan muka surat manual secara manual. Dapatkan instruksi yang mudah difahami dalam masa beberapa saat, membolehkan anda fokus kepada strategi harga tender, bukan teknikal sistem.',
              },
              {
                icon: '🛡️',
                title: 'Pelaburan vs Risiko',
                desc: 'Kos kegagalan tender akibat kesilapan teknikal yang kecil boleh mencecah puluhan ribu ringgit. Melanggan TanyaLer adalah "insurans" termurah untuk memastikan setiap langkah anda dalam ePerolehan adalah tepat.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-10">Soalan Lazim</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                  <span className={`text-slate-400 ml-4 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Mulakan percuma hari ini.</h2>
          <p className="text-slate-400 mb-8">
            8 soalan percuma menunggu anda. Tiada kad kredit diperlukan.
          </p>
          <Link href="/chat"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-xl">
            Cuba TanyaLer Percuma →
          </Link>
          <p className="text-slate-500 text-sm mt-4">
            5 soalan percuma setiap hari · Tiada komitmen · Upgrade bila bersedia
          </p>
        </div>
      </div>
    </div>
  );
}
