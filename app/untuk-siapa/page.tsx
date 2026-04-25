import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Siapa Yang Perlu TanyaLer? — Panduan ePerolehan Malaysia',
  description:
    'TanyaLer direka untuk pembekal SSM, kontraktor, usahawan dan staf syarikat yang berurusan dengan ePerolehan Malaysia. Ketahui sama ada anda memerlukan TanyaLer.',
  keywords: ['pembekal ePerolehan', 'kontraktor kerajaan Malaysia', 'cara guna ePerolehan', 'panduan tender kerajaan'],
};

const audiences = [
  {
    emoji: '🏪',
    title: 'Pembekal Baru SSM',
    subtitle: 'Baru daftar, belum tahu mulakan dari mana',
    pain: 'Anda baru sahaja mendaftar SSM dan dengar pasal ePerolehan, tapi tak tahu nak mulakan dari mana. Manual rasmi tebal, helpdesk sukar dihubungi, dan kursus mahal pula.',
    benefits: [
      'Panduan pendaftaran ePerolehan langkah demi langkah',
      'Penjelasan sijil MOF — apa, kenapa, dan macam mana',
      'Jawapan dalam bahasa mudah tanpa jargon teknikal',
    ],
    urgency: 'Setiap hari tanpa ePerolehan = peluang kontrak yang lepas.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 border-blue-200',
  },
  {
    emoji: '🏗️',
    title: 'Kontraktor Binaan & Kejuruteraan',
    subtitle: 'Dah bertender tapi selalu kalah atau ditolak',
    pain: 'Anda ada pengalaman dalam bidang pembinaan, tapi tender kerajaan sering ditolak tanpa sebab yang jelas. Dokumen salah, format tidak kena, atau harga tak kompetitif — anda tak pasti yang mana.',
    benefits: [
      'Analisis sebab tender ditolak',
      'Panduan menyediakan dokumen tender yang lengkap',
      'Tips membuat tawaran harga yang kompetitif',
    ],
    urgency: 'Satu tender yang menang boleh bernilai ratusan ribu ringgit.',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 border-amber-200',
  },
  {
    emoji: '💻',
    title: 'Syarikat IT & Teknologi',
    subtitle: 'Mahir teknologi tapi keliru dengan proses kerajaan',
    pain: 'Syarikat anda ada produk dan perkhidmatan berkualiti, tapi proses sebut harga IT kerajaan penuh dengan prosedur yang mengelirukan. Anda tidak mahu hilang kontrak hanya kerana salah prosedur.',
    benefits: [
      'Panduan kategori perkhidmatan IT dalam ePerolehan',
      'Cara bina katalog produk/perkhidmatan IT yang lulus',
      'Proses sebut harga IT dari mula hingga pemenuhan',
    ],
    urgency: 'Pasaran IT kerajaan Malaysia bernilai berbilion ringgit setahun.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 border-purple-200',
  },
  {
    emoji: '📦',
    title: 'Pembekal Peralatan & Kelengkapan',
    subtitle: 'Nak jual produk ke kerajaan tapi tak tahu caranya',
    pain: 'Anda ada produk berkualiti — perabot, peralatan pejabat, uniform, bahan makanan — dan tahu kerajaan adalah pelanggan terbesar. Tapi katalog ePerolehan anda ditolak berkali-kali.',
    benefits: [
      'Cara bina katalog produk yang akan diluluskan',
      'Spesifikasi yang diperlukan untuk setiap kategori produk',
      'Cara kemaskini harga dan stok dalam ePerolehan',
    ],
    urgency: 'Katalog yang diluluskan = jualan automatik tanpa perlu tender.',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
  },
  {
    emoji: '👩‍💼',
    title: 'Usahawan Wanita & Bumiputera',
    subtitle: 'Ada kelayakan Bumiputera tapi tak tahu cara maksimakan',
    pain: 'Anda layak menikmati program khas kerajaan untuk Bumiputera dan usahawan wanita, termasuk sebut harga khas dan panel yang terpilih. Tapi anda tidak tahu bagaimana untuk mendaftar dan memanfaatkan peluang ini.',
    benefits: [
      'Panduan program khas Bumiputera dalam ePerolehan',
      'Cara mendaftar sebagai pembekal panel khas',
      'Peluang sebut harga yang terbuka kepada kumpulan ini',
    ],
    urgency: 'Program ini ada kuota terhad — jangan lambat.',
    color: 'from-rose-500 to-rose-600',
    bg: 'bg-rose-50 border-rose-200',
  },
  {
    emoji: '🏢',
    title: 'Firma Perunding & Profesional',
    subtitle: 'Mahir dalam bidang tapi keliru cara tawar khidmat ke kerajaan',
    pain: 'Anda adalah perunding akauntan, jurutera, arkitek, atau doktor — profesional yang layak memberi khidmat kepada kerajaan. Tapi proses sebut harga perkhidmatan profesional dalam ePerolehan tidak jelas.',
    benefits: [
      'Panduan sebut harga perkhidmatan profesional',
      'Cara mendaftar dalam panel perkhidmatan profesional kerajaan',
      'Keperluan dokumen untuk setiap jenis perkhidmatan',
    ],
    urgency: 'Perkhidmatan profesional adalah salah satu kategori dengan permintaan tertinggi.',
    color: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50 border-teal-200',
  },
  {
    emoji: '👨‍💼',
    title: 'Pengurus & Staf Syarikat',
    subtitle: 'Terpaksa urus ePerolehan tapi tiada latihan formal',
    pain: 'Anda ditugaskan untuk urus semua hal berkaitan tender dan sebut harga syarikat, tapi tiada sesiapa yang ajar anda cara betul. Anda takut buat silap yang mempengaruhi syarikat.',
    benefits: [
      'Asas ePerolehan yang anda perlu tahu dalam masa singkat',
      'Checklist untuk setiap proses — pastikan tiada yang tertinggal',
      'Rujukan pantas untuk masalah yang dihadapi',
    ],
    urgency: 'Satu kesilapan prosedur boleh membatalkan sebut harga seluruh syarikat.',
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50 border-indigo-200',
  },
  {
    emoji: '🌱',
    title: 'Usahawan Muda & Graduan',
    subtitle: 'Baru dalam dunia perniagaan, nak cepat faham sistem',
    pain: 'Anda baru sahaja memulakan perniagaan atau mungkin graduan yang baru mula berniaga. Anda tahu ePerolehan adalah peluang besar, tapi tidak tahu dari mana hendak bermula dan tidak mampu bayar kursus mahal.',
    benefits: [
      'Pembelajaran ePerolehan yang berstruktur dan mudah difahami',
      'Mulakan dari asas hingga mahir dalam masa singkat',
      'Jimat berbanding kursus yang bernilai ratusan ringgit',
    ],
    urgency: 'Masa muda adalah aset terbesar — mulakan sekarang, bukan esok.',
    color: 'from-lime-500 to-lime-600',
    bg: 'bg-lime-50 border-lime-200',
  },
];

export default function UntukSiapaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-16 px-5 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-4">
              Untuk Siapa
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
              Adakah TanyaLer
              <br />
              untuk anda?
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              TanyaLer direka untuk mereka yang berurusan dengan sistem
              ePerolehan Malaysia. Kenalpasti diri anda dan lihat bagaimana
              TanyaLer boleh membantu.
            </p>
            {/* Quick check */}
            <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium px-5 py-3 rounded-2xl">
              <span className="text-lg">🤔</span>
              Pernah keliru dengan ePerolehan? TanyaLer adalah untuk anda.
            </div>
          </div>
        </section>

        {/* Audience cards */}
        <section className="pb-20 md:pb-28 px-5 md:px-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {audiences.map((audience, i) => (
              <div
                key={i}
                className={`border rounded-3xl p-8 md:p-10 ${audience.bg}`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{audience.emoji}</span>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                          {audience.title}
                        </h2>
                        <p className="text-sm text-slate-600 mt-0.5">
                          {audience.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-[15px] text-slate-700 leading-relaxed mb-5">
                      {audience.pain}
                    </p>

                    {/* Urgency */}
                    <div className="inline-flex items-center gap-2 bg-white/70 border border-slate-200/60 text-slate-800 text-sm font-semibold px-4 py-2 rounded-xl">
                      <span className="text-base">⚡</span>
                      {audience.urgency}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="bg-white/70 rounded-2xl p-6">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                      TanyaLer Membantu Anda:
                    </p>
                    <ul className="space-y-3">
                      {audience.benefits.map((benefit, j) => (
                        <li key={j} className="flex gap-3 text-[15px] text-slate-700">
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
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 px-5 md:px-8 bg-slate-900 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">
              Jom mula, percuma.
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 text-balance">
              Tanya soalan pertama anda hari ini.
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto">
              Tidak perlu kad kredit, tidak perlu komitmen. 8 soalan percuma
              setiap hari menunggu anda.
            </p>
            <Link
              href="/chat"
              className="group inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
            >
              Mulakan Sekarang — Percuma
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M1 8h14M9 2l6 6-6 6" />
              </svg>
            </Link>
            <p className="text-sm text-slate-400 mt-6">
              8 soalan percuma · Tiada kad kredit · Tiada komitmen
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
