'use client';

import Link from 'next/link';
import { useState } from 'react';
import PayButton from '@/components/PayButton';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'Apa beza pelan Explorer dan pelan berbayar?', a: 'Pelan Explorer memberikan 5 soalan percuma sehari tanpa rujukan fail rasmi. Pelan berbayar menyertakan rujukan fail spesifik untuk setiap jawapan — sangat penting untuk vendor yang perlu bukti dokumen dalam tender.' },
    { q: 'Apa itu Rollover Kredit?', a: 'Rollover bermakna kredit yang tidak digunakan akan dibawa ke hadapan apabila anda membeli semula. Hanya pelan Strategis dan Prestij mempunyai ciri ini. Pelan Rintis — kredit yang tidak digunakan akan HANGUS apabila tamat tempoh 45 hari.' },
    { q: 'Berapa lama kredit sah digunakan?', a: 'Explorer: Reset setiap hari | Rintis: 45 hari | Strategis: 120 hari | Prestij: 250 hari. Kredit mula dikira dari tarikh pembelian.' },
    { q: 'Boleh saya dapatkan bayaran balik?', a: 'Ya. Kredit yang belum digunakan boleh dikembalikan dalam tempoh 7 hari bekerja dari tarikh pembelian. Hantar permohonan ke support@tanyaler.my dengan subjek "Permohonan Refund" beserta bukti pembelian.' },
    { q: 'Apakah kaedah pembayaran yang diterima?', a: 'TanyaLer menerima FPX (internet banking semua bank utama Malaysia). Pembayaran diproses selamat oleh BillPlz. Kredit ditambah dalam masa 1-2 minit selepas bayaran berjaya.' },
    { q: 'Kenapa pelan Strategis paling popular?', a: 'Strategis menawarkan nilai terbaik: kos hanya RM0.45/soalan (jimat 42% vs Rintis), sah 120 hari, ada rollover kredit, dan cukup untuk menguruskan 3-5 tender dalam satu tempoh.' },
    { q: 'Adakah sistem ini guna dokumen rasmi terkini?', a: 'Ya. Sistem TanyaLer merujuk kepada 7,375 muka surat dari 56 dokumen rasmi ePerolehan termasuk PK 5.1 (Kuatkuasa pindaan 30 Jun 2025).' },
    { q: 'Boleh saya upgrade dari Explorer ke pelan berbayar?', a: 'Ya, anda boleh upgrade pada bila-bila masa dari halaman Harga. Kredit baru akan ditambah serta-merta selepas pembayaran berjaya.' },
  ];

  return (
    <div className="min-h-screen bg-white">

      <div className="py-16 px-6 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Harga Telus</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Pilihan yang sesuai untuk setiap keperluan.
          </h1>
          <p className="text-slate-500 text-lg">
            Mulakan dengan <strong className="text-slate-900">PERCUMA</strong> dengan pelan Explorer.
            Upgrade bila anda bersedia. Tiada kontrak jangka panjang.
          </p>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">

            <div className="relative rounded-3xl border-2 border-slate-200 bg-white flex flex-col">
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Explorer</span>
                <span className="text-4xl font-black text-slate-900 mb-1">RM0</span>
                <p className="text-slate-400 text-xs mb-4">Percuma selamanya</p>
                <div className="rounded-xl p-3 mb-4 text-sm bg-slate-50">
                  <div className="font-bold text-slate-900">5 kredit / hari</div>
                  <div className="text-slate-500 text-xs mt-1">Reset setiap tengah malam</div>
                  <div className="text-xs font-bold mt-1 text-slate-500">Percuma</div>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">5 soalan percuma setiap hari</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Jawapan asas ePerolehan</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Akses dokumen rujukan asas</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-slate-300 font-bold mt-0.5">✕</span><span className="text-slate-300">Rujukan Fail Rasmi</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-slate-300 font-bold mt-0.5">✕</span><span className="text-slate-300">Rollover Kredit</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-slate-300 font-bold mt-0.5">✕</span><span className="text-slate-300">Sokongan Keutamaan</span></li>
                </ul>
                <p className="text-xs text-slate-400 italic mb-4">Untuk merisik kualiti jawapan Tanyaler.</p>
                <Link href="/chat" className="block text-center py-3 px-4 rounded-2xl font-bold text-sm bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-700 transition-all">
                  Cuba Percuma
                </Link>
              </div>
            </div>

            <div className="relative rounded-3xl border-2 border-slate-200 bg-white flex flex-col">
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Rintis</span>
                <span className="text-4xl font-black text-slate-900 mb-1">RM39</span>
                <p className="text-slate-400 text-xs mb-4">Bayar sekali</p>
                <div className="rounded-xl p-3 mb-4 text-sm bg-slate-50">
                  <div className="font-bold text-slate-900">50 kredit</div>
                  <div className="text-slate-500 text-xs mt-1">Sah 45 hari</div>
                  <div className="text-xs font-bold mt-1 text-slate-500">RM0.78 / soalan</div>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">50 kredit soalan</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Sah 45 hari dari pembelian</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Rujukan Fail Rasmi</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-red-500 font-bold mt-0.5">✕</span><span className="text-red-400 line-through">Rollover Kredit</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-slate-300 font-bold mt-0.5">✕</span><span className="text-slate-300">Sokongan Keutamaan</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-slate-300 font-bold mt-0.5">✕</span><span className="text-slate-300">Jimat berbanding Explorer</span></li>
                </ul>
                <p className="text-xs text-slate-400 italic mb-4">Sesuai untuk selesaikan 1 tender segera.</p>
                <PayButton planId="rintis" label="Pilih Rintis" className="w-full py-3 px-4 rounded-2xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all" />
              </div>
            </div>

            <div className="relative rounded-3xl border-2 border-emerald-500 shadow-2xl shadow-emerald-100 scale-105 bg-white flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg">
                  PALING POPULAR
                </span>
              </div>
              <div className="p-6 pt-8 flex flex-col flex-1">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-4">Strategis</span>
                <span className="text-4xl font-black text-emerald-600 mb-1">RM89</span>
                <p className="text-slate-400 text-xs mb-1">Bayar sekali</p>
                <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">Jimat 42%</span>
                <div className="rounded-xl p-3 mb-4 text-sm bg-emerald-50">
                  <div className="font-bold text-slate-900">200 kredit</div>
                  <div className="text-slate-500 text-xs mt-1">Sah 120 hari</div>
                  <div className="text-xs font-bold mt-1 text-emerald-600">RM0.45 / soalan</div>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">200 kredit soalan</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Sah 120 hari dari pembelian</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Rujukan Fail Rasmi</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Rollover Kredit (Bawa ke depan)</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Sokongan Keutamaan</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Jimat 42% vs Rintis</span></li>
                </ul>
                <p className="text-xs text-slate-400 italic mb-4">Pilihan Utama Vendor yang mahu menang tender.</p>
                <PayButton planId="strategis" label="Pilih Strategis Sekarang" className="w-full py-3 px-4 rounded-2xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 transition-all" />
              </div>
            </div>

            <div className="relative rounded-3xl border-2 border-slate-200 bg-white flex flex-col">
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Prestij</span>
                <span className="text-4xl font-black text-slate-900 mb-1">RM199</span>
                <p className="text-slate-400 text-xs mb-1">Bayar sekali</p>
                <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">Jimat 49%</span>
                <div className="rounded-xl p-3 mb-4 text-sm bg-slate-50">
                  <div className="font-bold text-slate-900">500 kredit</div>
                  <div className="text-slate-500 text-xs mt-1">Sah 250 hari</div>
                  <div className="text-xs font-bold mt-1 text-slate-500">RM0.40 / soalan</div>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">500 kredit soalan</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Sah 250 hari dari pembelian</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Rujukan Fail Rasmi</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Rollover Kredit (Bawa ke depan)</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Sokongan Keutamaan Tertinggi</span></li>
                  <li className="flex items-start gap-2 text-sm"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span className="text-slate-700">Jimat 49% vs Rintis</span></li>
                </ul>
                <p className="text-xs text-slate-400 italic mb-4">Untuk Pembekal dan Konsultan Profesional.</p>
                <PayButton planId="prestij" label="Pilih Prestij" className="w-full py-3 px-4 rounded-2xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all" />
              </div>
            </div>

          </div>

          <p className="text-center text-slate-400 text-sm mt-8">
            Pembayaran selamat melalui FPX · SSL Dilindungi · PDPA 2010 Compliant
          </p>
        </div>
      </div>

      <div className="bg-slate-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-10">Kenapa vendor berjaya guna TanyaLer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-bold text-slate-900 mb-2">Sumber 100% Sah dan Rasmi</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Setiap jawapan merujuk terus kepada fail manual, pekeliling, dan dokumen rasmi ePerolehan. Bukan sekadar teori.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="text-3xl mb-3">📂</div>
              <h3 className="font-bold text-slate-900 mb-2">Bukti Rujukan Disediakan</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Setiap jawapan disertakan rujukan spesifik fail sumber agar anda boleh semak sendiri dengan penuh yakin.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-slate-900 mb-2">Pantas dan Menjimatkan Masa</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Lupakan semak ribuan muka surat manual. Dapatkan jawapan tepat dalam masa beberapa saat sahaja.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold text-slate-900 mb-2">Pelaburan vs Risiko</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Kos kegagalan tender boleh cecah puluhan ribu ringgit. TanyaLer adalah insurans termurah untuk pastikan setiap langkah tepat.</p>
            </div>
          </div>
        </div>
      </div>

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
                  <span className={openFaq === i ? 'text-slate-400 ml-4 flex-shrink-0 rotate-180' : 'text-slate-400 ml-4 flex-shrink-0'}>▾</span>
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

      <div className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Mulakan percuma hari ini.</h2>
          <p className="text-slate-400 mb-8">5 soalan percuma menunggu anda. Tiada kad kredit diperlukan.</p>
          <Link href="/chat" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-xl">
            Cuba TanyaLer Percuma
          </Link>
          <p className="text-slate-500 text-sm mt-4">5 soalan percuma setiap hari · Tiada komitmen · Upgrade bila bersedia</p>
        </div>
      </div>

    </div>
  );
}
