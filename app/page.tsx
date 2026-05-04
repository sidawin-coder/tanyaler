import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TanyaLer — Sistem Rujukan Pintar ePerolehan Malaysia Berasaskan Sumber Rasmi',
  description: 'Sistem Rujukan Pintar ePerolehan Malaysia. 7,375 muka surat dari 56 dokumen rasmi. Jawapan tepat dengan bukti rujukan untuk vendor, kontraktor, dan pembekal kerajaan Malaysia.',
  keywords: 'ePerolehan Malaysia, tender kerajaan, sijil MOF, sebut harga, vendor kerajaan, katalog ePerolehan, panduan ePerolehan',
};

const FEATURES = [
  {
    icon: '📂',
    title: 'Bukti Rujukan Setiap Jawapan',
    desc: 'Bukan andaian. Setiap jawapan disertakan nama fail rasmi dan fasal yang tepat — anda boleh semak sendiri.',
  },
  {
    icon: '⚡',
    title: 'Keputusan dalam Saat',
    desc: 'Lupakan mencari dalam 7,375 muka surat manual. Dapatkan jawapan tepat dalam masa beberapa saat.',
  },
  {
    icon: '🎯',
    title: 'Ketepatan Terukur',
    desc: 'Setiap jawapan ada skor ketepatan. Anda tahu bila perlu sahkan lebih lanjut — tiada kejutan.',
  },
  {
    icon: '🛡️',
    title: 'Sumber 100% Sah & Rasmi',
    desc: '56 dokumen rasmi ePerolehan termasuk PK 5.1 (pindaan Jun 2025) dan manual terkini MOF.',
  },
];

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Daftar Percuma',
    desc: 'Sign up dengan Google dalam 30 saat. Tiada kad kredit diperlukan.',
  },
  {
    num: '02',
    title: 'Tanya Soalan',
    desc: 'Taip soalan ePerolehan anda dalam Bahasa Malaysia, English, atau Mandarin.',
  },
  {
    num: '03',
    title: 'Dapat Jawapan + Rujukan',
    desc: 'Terima jawapan tepat dengan nama fail sumber untuk anda sahkan sendiri.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Saya baru daftar SSM dan terus tersadung dengan ePerolehan. Hadir kursus pun masih blur. TanyaLer jawab step-by-step, terus faham. Dalam masa seminggu saya berjaya sertai sebut harga pertama.',
    name: 'Ahmad Hakim',
    role: 'Pembekal Baru · Selangor',
    initials: 'AH',
  },
  {
    quote: 'Sijil MOF saya nak expire, panik. Call helpdesk susah nak dapat. Tanya TanyaLer, dapat checklist lengkap untuk renew. Settle dalam sehari. Save masa dan tenaga.',
    name: 'Siti Lina',
    role: 'Pengurus Operasi · KL',
    initials: 'SL',
  },
  {
    quote: 'Tender saya asyik reject dan saya tak tahu kenapa. TanyaLer breakdown semua punca tender tolak dan cara betulkan. Tender berikutnya terus lulus.',
    name: 'Razif Nordin',
    role: 'Kontraktor · Johor',
    initials: 'RN',
  },
  {
    quote: 'Katalog saya reject tiga kali. Setelah guna TanyaLer, saya faham format yang betul. Approve first try. Highly recommended untuk pembekal baru.',
    name: 'Kevin Chin',
    role: 'Pengarah Syarikat · Melaka',
    initials: 'KC',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 text-sm text-emerald-700 font-semibold mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/>
            7,375 muka surat dari 56 dokumen rasmi ePerolehan
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Sistem Rujukan Pintar<br/>
            <span className="text-emerald-600">ePerolehan Malaysia.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed">
            Bukan sekadar AI — ini adalah <strong className="text-slate-700">Decision Support System</strong> berasaskan dokumen rasmi.
            Setiap jawapan disertakan bukti rujukan fail untuk anda sahkan sendiri.
          </p>

          <p className="text-slate-400 text-base mb-10">
            Dipercayai vendor, kontraktor, dan pembekal kerajaan Malaysia.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/chat"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-lg">
              Mulakan Percuma →
            </Link>
            <Link href="/pricing"
              className="bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-700 font-bold px-10 py-4 rounded-2xl text-lg transition-all">
              Lihat Harga
            </Link>
          </div>

          <p className="text-slate-400 text-sm">
            5 soalan percuma setiap hari · Tiada kad kredit diperlukan
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-900 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['7,375', 'Muka Surat Dokumen Rasmi'],
            ['56', 'Dokumen ePerolehan Diindex'],
            ['98%', 'Pengguna Dapat Jawapan'],
            ['< 10s', 'Masa Jawapan Purata'],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-3xl font-black text-emerald-400 mb-1">{num}</div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY TANYALER ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Mengapa TanyaLer</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Bukan AI Chatbot Biasa.
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Tanyaler direka untuk memberi anda maklumat yang <strong>boleh diaudit</strong> —
              bukan sekadar jawapan, tetapi jawapan dengan bukti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Cara Ia Berfungsi</p>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Semudah 1, 2, 3.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Kata Pengguna</p>
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Dipercayai Pembekal Malaysia.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-5 py-2 text-sm text-emerald-700 font-bold">
              98% pengguna dapat jawapan pada percubaan pertama
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Harga Telus</p>
          <h2 className="text-3xl font-black text-slate-900 mb-4">
            Mulakan Percuma. Upgrade Bila Bersedia.
          </h2>
          <p className="text-slate-500 mb-8">
            Tiada kontrak jangka panjang. Topup bila perlu.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { name: 'Explorer', price: 'RM0', note: '5 kredit/hari', highlight: false },
              { name: 'Rintis', price: 'RM39', note: '50 kredit', highlight: false },
              { name: 'Strategis', price: 'RM89', note: '200 kredit 🔥', highlight: true },
              { name: 'Prestij', price: 'RM199', note: '500 kredit', highlight: false },
            ].map((p) => (
              <div key={p.name} className={`rounded-2xl p-4 border-2 ${
                p.highlight
                  ? 'border-emerald-500 bg-white shadow-lg shadow-emerald-100'
                  : 'border-slate-200 bg-white'
              }`}>
                <p className={`text-xs font-black uppercase tracking-widest mb-1 ${
                  p.highlight ? 'text-emerald-600' : 'text-slate-400'
                }`}>{p.name}</p>
                <p className={`text-2xl font-black ${p.highlight ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {p.price}
                </p>
                <p className="text-slate-500 text-xs mt-1">{p.note}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing"
            className="inline-block border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold px-8 py-3 rounded-2xl transition-all">
            Lihat Perbandingan Penuh →
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-4 tracking-tight">
            Jom mula, percuma.
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Tanya soalan pertama anda hari ini.<br/>
            Tidak perlu kad kredit, tidak perlu komitmen.
          </p>
          <Link href="/chat"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-12 py-5 rounded-2xl text-xl transition-all shadow-xl">
            Mulakan Sekarang →
          </Link>
          <p className="text-slate-500 text-sm mt-5">
            5 soalan percuma · Tiada kad kredit · Tiada komitmen
          </p>
        </div>
      </section>

    </div>
  );
}
