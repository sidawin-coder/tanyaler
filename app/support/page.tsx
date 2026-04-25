import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sokongan — TanyaLer',
  description: 'Pusat sokongan TanyaLer. Dapatkan bantuan, semak soalan lazim, dan hubungi pasukan kami.',
};

const faqs = [
  {
    category: 'Akaun & Log Masuk',
    items: [
      {
        q: 'Bagaimana cara mendaftar akaun TanyaLer?',
        a: 'Klik "Mula Tanya" di mana-mana halaman, kemudian pilih "Teruskan dengan Google". Akaun anda akan dibuat secara automatik dalam masa kurang dari 30 saat. Tiada borang, tiada kata laluan baru.',
      },
      {
        q: 'Bolehkah saya guna TanyaLer tanpa akaun Google?',
        a: 'Buat masa ini, TanyaLer hanya menyokong log masuk melalui Google. Ini memastikan keselamatan akaun anda tanpa perlu anda mengingati kata laluan baru. Kami merancang untuk menambah kaedah log masuk lain pada masa hadapan.',
      },
      {
        q: 'Bagaimana cara log keluar?',
        a: 'Klik gambar profil anda di sudut kanan atas, kemudian pilih "Log Keluar". Anda akan dibawa ke halaman utama.',
      },
      {
        q: 'Saya terlupa akaun Google mana yang digunakan, macam mana?',
        a: 'Cuba log masuk dengan semua akaun Google yang ada. Jika masih tidak berjaya, hubungi kami di support@tanyaler.com bersama alamat e-mel yang mungkin anda gunakan.',
      },
    ],
  },
  {
    category: 'Kredit & Bayaran',
    items: [
      {
        q: 'Berapa kredit percuma yang saya dapat setiap hari?',
        a: 'Setiap pengguna berdaftar mendapat 8 soalan percuma setiap hari. Kredit ini diperbaharui secara automatik setiap tengah malam.',
      },
      {
        q: 'Kredit percuma saya tidak dikemas kini, kenapa?',
        a: 'Kredit diperbaharui pada tepat tengah malam. Jika masih tidak dikemas kini selepas tengah malam, cuba log keluar dan log masuk semula. Jika masalah berterusan, hubungi kami.',
      },
      {
        q: 'Berapa lama kredit berbayar kekal sah?',
        a: 'Kredit Topup Basic (RM10/50 kredit) dan Topup Value (RM30/200 kredit) sah selama 6 bulan dari tarikh pembelian. Kredit Pro diperbaharui setiap bulan.',
      },
      {
        q: 'Adakah saya boleh mendapat bayaran balik?',
        a: 'Ya. Kredit yang belum digunakan boleh dikembalikan dalam tempoh 7 hari bekerja dari tarikh pembelian. Hubungi kami di support@tanyaler.com dengan subjek "Permohonan Refund" bersama bukti pembelian.',
      },
      {
        q: 'Apakah kaedah pembayaran yang diterima?',
        a: 'TanyaLer menerima pembayaran melalui FPX (internet banking semua bank utama Malaysia) dan kad kredit/debit. Pembayaran diproses dengan selamat oleh BillPlz.',
      },
      {
        q: 'Adakah maklumat kad saya disimpan?',
        a: 'Tidak. TanyaLer tidak menyimpan sebarang maklumat kad kredit atau perbankan. Semua transaksi diproses terus oleh BillPlz yang mematuhi standard keselamatan PCI-DSS.',
      },
    ],
  },
  {
    category: 'Penggunaan & Teknikal',
    items: [
      {
        q: 'Dalam bahasa apa saya boleh bertanya?',
        a: 'Anda boleh bertanya dalam Bahasa Malaysia, English, atau Bahasa Cina. Sistem dioptimumkan untuk Bahasa Malaysia tetapi boleh memahami dan menjawab dalam ketiga-tiga bahasa tersebut.',
      },
      {
        q: 'Mengapa jawapan kadang-kala berbeza untuk soalan yang sama?',
        a: 'Ini adalah ciri semula jadi sistem AI. Walaupun jawapan mungkin berbeza dari segi ayat, kandungan dan maklumat yang disampaikan adalah berdasarkan dokumen rasmi yang sama. Pastikan anda semak maklumat penting dengan portal rasmi ePerolehan.',
      },
      {
        q: 'Topik apa yang boleh saya tanya?',
        a: 'TanyaLer memfokuskan kepada ePerolehan Malaysia — pendaftaran, sijil MOF, sebut harga, tender, katalog, pemenuhan, dan masalah teknikal sistem. Untuk soalan luar topik ini, kami tidak dapat membantu.',
      },
      {
        q: 'Jawapan TanyaLer selamat untuk digunakan sebagai rujukan rasmi?',
        a: 'Jawapan TanyaLer adalah untuk tujuan panduan dan pembelajaran sahaja. Untuk keputusan perniagaan penting, sila sahkan dengan portal rasmi ePerolehan di www.eperolehan.gov.my atau hubungi ePerolehan Centre.',
      },
      {
        q: 'Saya dapat mesej "kredit habis", apa perlu saya buat?',
        a: 'Ini bermakna kredit percuma harian anda sudah habis. Anda boleh menunggu sehingga tengah malam untuk kredit diperbaharui, atau topup kredit berbayar di halaman Harga untuk akses segera.',
      },
    ],
  },
];

export default function SokonganPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-14 px-5 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-4">
              Sokongan
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
              Kami sedia membantu.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Ada soalan? Jumpa jawapan dalam senarai soalan lazim di bawah,
              atau hubungi pasukan kami terus.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="pb-16 px-5 md:px-8">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5">
            <div className="bg-slate-900 text-white rounded-3xl p-8">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">E-mel Sokongan</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                Hantar e-mel kepada pasukan kami. Kami akan balas dalam tempoh
                1-2 hari bekerja.
              </p>
              <a
                href="mailto:support@tanyaler.com"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                support@tanyaler.com
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 8h14M9 2l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/60 rounded-3xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Waktu Operasi</h3>
              <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                Sistem TanyaLer beroperasi 24/7. Sokongan e-mel aktif pada
                hari bekerja.
              </p>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Isnin — Jumaat</span>
                  <span className="font-semibold">9:00 pagi — 6:00 petang</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu — Ahad</span>
                  <span className="font-semibold text-slate-400">Tiada sokongan</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="pb-14 px-5 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200/60 rounded-2xl px-6 py-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Status Sistem TanyaLer</span>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Semua Sistem Berfungsi Normal
              </div>
            </div>
          </div>
        </section>

        {/* FAQ by category */}
        <section className="py-16 md:py-20 px-5 md:px-8 bg-slate-50/50 border-t border-slate-200/60">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Soalan Lazim
              </h2>
              <p className="text-lg text-slate-600">
                Jawapan kepada soalan yang paling kerap ditanya.
              </p>
            </div>

            <div className="space-y-10">
              {faqs.map((category) => (
                <div key={category.category}>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((faq, i) => (
                      <details
                        key={i}
                        className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden"
                      >
                        <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                          <span className="font-semibold text-slate-900 text-[15px]">
                            {faq.q}
                          </span>
                          <svg
                            className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-45"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </summary>
                        <div className="px-6 pb-5 text-slate-600 text-[15px] leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center bg-white border border-slate-200/60 rounded-3xl p-8">
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Tidak jumpa jawapan yang dicari?
              </h3>
              <p className="text-slate-600 mb-5">
                Hubungi pasukan sokongan kami terus melalui e-mel.
              </p>
              <a
                href="mailto:support@tanyaler.com"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Hubungi Kami
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 8h14M9 2l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
