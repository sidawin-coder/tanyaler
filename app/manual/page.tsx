import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manual Pengguna — TanyaLer',
  description:
    'Panduan lengkap penggunaan TanyaLer dari A hingga Z. Pelajari cara memaksimakan sistem panduan ePerolehan AI anda.',
};

const steps = [
  {
    num: '01',
    title: 'Daftar Akaun',
    icon: '👤',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'bg-blue-100',
    desc: 'Daftar menggunakan akaun Google anda dalam masa 30 saat. Tiada borang panjang, tiada kata laluan baru untuk diingat.',
    items: [
      'Klik butang "Mula Tanya" atau "Mulakan Percuma"',
      'Klik "Teruskan dengan Google"',
      'Pilih akaun Google anda',
      'Anda akan dibawa terus ke Dashboard',
      'Tiada langkah tambahan diperlukan',
    ],
    tip: 'Guna akaun Google utama anda supaya mudah log masuk pada masa hadapan.',
  },
  {
    num: '02',
    title: 'Faham Dashboard Anda',
    icon: '📊',
    color: 'bg-emerald-50 border-emerald-200',
    iconColor: 'bg-emerald-100',
    desc: 'Dashboard adalah pusat kawalan anda. Di sini anda dapat melihat semua maklumat penting sebelum mula bertanya.',
    items: [
      'Kad pertama: Soalan percuma berbaki hari ini (8 soalan)',
      'Kad kedua: Kredit berbayar yang anda ada',
      'Kad ketiga: Jumlah soalan yang pernah ditanya',
      'Butang besar: Tekan untuk mula bertanya',
      '6 topik cepat: Klik untuk terus ke topik berkaitan',
    ],
    tip: 'Kredit percuma akan diperbaharui secara automatik setiap hari pada tengah malam.',
  },
  {
    num: '03',
    title: 'Cara Bertanya yang Berkesan',
    icon: '💬',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'bg-purple-100',
    desc: 'Cara anda bertanya menentukan kualiti jawapan yang anda terima. Ikut panduan ini untuk hasil terbaik.',
    items: [
      'Tanya dalam Bahasa Malaysia — sistem dioptimumkan untuk BM',
      'Jadikan soalan spesifik: "Cara daftar ePerolehan buat kali pertama" lebih baik dari "cara daftar"',
      'Sertakan konteks: "Syarikat saya baru daftar SSM bulan lepas..."',
      'Boleh tanya soalan susulan dalam sesi yang sama',
      'Tekan Enter atau klik anak panah untuk hantar soalan',
    ],
    tip: 'Soalan yang spesifik = Jawapan yang lebih tepat dan berguna.',
  },
  {
    num: '04',
    title: 'Baca Jawapan dengan Bijak',
    icon: '📖',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'bg-amber-100',
    desc: 'Setiap jawapan TanyaLer mengandungi maklumat yang tersusun. Faham struktur jawapan untuk manfaat maksimum.',
    items: [
      'Langkah bernombor: Ikut tepat seperti yang tertera',
      '"Rujukan:" di akhir — menunjukkan sumber dokumen rasmi',
      'Teks tebal: Perkara penting yang perlu diberi perhatian',
      '"Penafian" di hujung: Peringatan untuk rujuk portal rasmi',
      'Boleh copy-paste jawapan untuk simpan dalam nota',
    ],
    tip: 'Jika ada langkah yang tidak jelas, tanya soalan susulan dalam sesi yang sama.',
  },
  {
    num: '05',
    title: 'Urus Kredit Anda',
    icon: '💳',
    color: 'bg-rose-50 border-rose-200',
    iconColor: 'bg-rose-100',
    desc: 'TanyaLer menggunakan sistem kredit yang telus dan adil. Anda sentiasa tahu berapa kredit yang berbaki.',
    items: [
      'Percuma: 8 soalan setiap hari — automatik, tiada perlu topup',
      'Kredit percuma diperbaharui setiap hari pada tengah malam',
      'Kredit berbayar tidak luput sehingga 6 bulan',
      'Lihat baki kredit di header chat atau di Dashboard',
      'Topup boleh dibuat pada bila-bila masa di halaman Harga',
    ],
    tip: 'Gunakan soalan percuma harian untuk soalan mudah. Simpan kredit berbayar untuk soalan kompleks.',
  },
  {
    num: '06',
    title: 'Topup & Pilih Pelan',
    icon: '⬆️',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'bg-teal-100',
    desc: 'Apabila soalan percuma habis atau anda memerlukan lebih akses, topup kredit adalah mudah dan selamat.',
    items: [
      'Pergi ke halaman Harga (/pricing)',
      'Pilih pelan yang sesuai (Basic RM10, Value RM30, atau Pro RM59/bulan)',
      'Klik butang pelan yang dipilih',
      'Bayar menggunakan FPX (internet banking Malaysia)',
      'Kredit ditambah automatik selepas bayaran disahkan',
    ],
    tip: 'Pelan Value (RM30 = 200 kredit) adalah pilihan paling berbaloi untuk pengguna sederhana.',
  },
  {
    num: '07',
    title: 'Topik yang Boleh Ditanya',
    icon: '🎯',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'bg-indigo-100',
    desc: 'TanyaLer direka khusus untuk ePerolehan Malaysia. Berikut adalah senarai topik yang boleh anda tanya.',
    items: [
      'Pendaftaran ePerolehan (akaun asas, akaun MOF)',
      'Sijil MOF — cara mohon, syarat, cara renew',
      'Sebut Harga — cara sertai, hantar, dan menang',
      'Tender Terbuka — proses, dokumen, dan tips',
      'Katalog ePerolehan — cara bina dan hantar untuk kelulusan',
      'Pemenuhan — cara submit selepas dapat projek',
      'Masalah teknikal sistem ePerolehan',
    ],
    tip: 'TanyaLer tidak dapat membantu untuk perkara di luar ePerolehan dan perolehan kerajaan.',
  },
  {
    num: '08',
    title: 'Tips Untuk Pengguna Pro',
    icon: '🏆',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'bg-orange-100',
    desc: 'Teknik lanjutan untuk mendapatkan manfaat maksimum daripada TanyaLer.',
    items: [
      'Buat sesi soalan berurutan — tanya A, kemudian B berdasarkan jawapan A',
      'Sertakan nombor rujukan tender atau sebut harga untuk jawapan lebih spesifik',
      'Minta checklist: "Beri saya checklist untuk hantar sebut harga"',
      'Minta perbandingan: "Apa beza Akaun Asas dan Akaun MOF?"',
      'Simpan jawapan penting — copy ke dokumen Word atau Notion anda',
    ],
    tip: 'Pengguna yang paling berjaya menggunakan TanyaLer sebagai "jurulatih peribadi" — bertanya secara konsisten.',
  },
];

export default function ManualPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-14 px-5 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-4">
              Manual Pengguna
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
              Kuasai Tanya<span className="text-emerald-600">Ler</span>{' '}
              dari A hingga Z.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Panduan lengkap untuk memaksimakan penggunaan sistem TanyaLer.
              Ikut langkah demi langkah — mudah, jelas, dan menenangkan.
            </p>
          </div>
        </section>

        {/* Quick nav */}
        <section className="pb-14 px-5 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Pergi terus ke bahagian
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {steps.map((step) => (
                  <a
                    key={step.num}
                    href={`#langkah-${step.num}`}
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-700 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-base">{step.icon}</span>
                    <span className="leading-tight">{step.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="pb-20 md:pb-28 px-5 md:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step) => (
              <div
                key={step.num}
                id={`langkah-${step.num}`}
                className={`bg-white border rounded-3xl p-8 md:p-10 scroll-mt-24 ${step.color}`}
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-14 h-14 ${step.iconColor} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Langkah {step.num}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p className="text-[15px] md:text-base text-slate-700 leading-relaxed mb-6">
                  {step.desc}
                </p>

                <ul className="space-y-3 mb-6">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[15px] text-slate-700">
                      <svg
                        className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <polyline points="4 10 8 14 16 6" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tip box */}
                <div className="bg-white/70 border border-slate-200/60 rounded-2xl p-4 flex gap-3">
                  <span className="text-lg leading-none mt-0.5">💡</span>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="font-semibold text-slate-900">Tips: </strong>
                    {step.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ quick */}
        <section className="py-16 md:py-20 px-5 md:px-8 bg-slate-50/50 border-t border-slate-200/60">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Soalan Lazim Pengguna Baru
            </h2>
            <div className="space-y-3">
              {[
                { q: 'Adakah saya perlu bayar untuk mendaftar?', a: 'Tidak. Pendaftaran adalah percuma dan anda mendapat 8 soalan percuma setiap hari tanpa perlu memasukkan maklumat kad kredit.' },
                { q: 'Kredit percuma saya tidak diperbaharui, kenapa?', a: 'Kredit percuma diperbaharui pada tengah malam setiap hari. Cuba log keluar dan log masuk semula jika masih tidak dikemas kini.' },
                { q: 'Bolehkah saya guna TanyaLer dalam bahasa lain?', a: 'Ya! Anda boleh bertanya dalam Bahasa Malaysia, English, atau Bahasa Cina. Sistem akan memahami dan menjawab dalam bahasa yang anda gunakan.' },
                { q: 'Adakah maklumat yang saya tanya disimpan?', a: 'Soalan anda diproses untuk menghasilkan jawapan tetapi tidak dikongsi kepada pihak lain. Sila baca Dasar Privasi kami untuk maklumat lanjut.' },
                { q: 'Jawapan TanyaLer 100% tepat ke?', a: 'TanyaLer dirujuk terus kepada dokumen rasmi ePerolehan, tetapi seperti semua sistem AI, ia boleh membuat kesilapan. Sila sahkan maklumat penting dengan portal rasmi ePerolehan.' },
              ].map((faq, i) => (
                <details key={i} className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none">
                    <span className="font-semibold text-slate-900 text-[15px]">{faq.q}</span>
                    <svg className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-slate-600 text-[15px] leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 px-5 md:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Sudah faham? Jom mula!
            </h2>
            <p className="text-slate-600 mb-8">
              8 soalan percuma menunggu anda. Tiada kad kredit diperlukan.
            </p>
            <a
              href="/chat"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Mula Bertanya Sekarang →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
