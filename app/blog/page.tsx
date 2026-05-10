'use client';

import Link from 'next/link';

const articles = [
  {
    slug: 'apa-itu-tcc-sijil-pematuhan-cukai-eperolehan',
    title: 'Apa Itu TCC? Sijil Pematuhan Cukai yang Wajib Ada Sebelum Menang Tender',
    excerpt: 'TCC atau Tax Compliance Certificate adalah dokumen wajib dalam proses ePerolehan Malaysia. Ramai vendor gagal tender bukan kerana harga — tapi sebab TCC tamat tempoh atau tidak sah.',
    category: 'Pematuhan & Sijil',
    readTime: '7 min baca',
    date: '2 Mei 2026',
  },
  {
    slug: 'beza-tender-sebutharga-pembelian-terus-eperolehan',
    title: 'Beza Tender, Sebutharga dan Pembelian Terus — Panduan Lengkap untuk Vendor',
    excerpt: 'Keliru antara tender, sebutharga dan pembelian terus? Anda bukan seorang diri. Artikel ini pecahkan perbezaan utama, had nilai, dan cara betul untuk menyertai setiap kaedah perolehan.',
    category: 'Asas ePerolehan',
    readTime: '9 min baca',
    date: '30 Apr 2026',
  },
  {
    slug: 'sebab-vendor-gagal-eperolehan-bukan-sebab-harga',
    title: '7 Sebab Vendor Gagal ePerolehan — Dan Kebanyakannya Bukan Sebab Harga',
    excerpt: 'Anda dah letak harga kompetitif, tapi masih kalah tender? Kajian menunjukkan 60% kegagalan vendor dalam ePerolehan berpunca dari kesilapan teknikal dan dokumen — bukan harga.',
    category: 'Strategi Tender',
    readTime: '8 min baca',
    date: '28 Apr 2026',
  },
  {
    slug: 'cara-semak-status-permohonan-eperolehan',
    title: 'Cara Semak Status Permohonan dan Dokumen dalam ePerolehan — Langkah demi Langkah',
    excerpt: 'Tidak tahu status permohonan anda dalam sistem ePerolehan? Artikel ini tunjukkan cara semak secara langsung, apa yang perlu dilakukan jika status tertangguh, dan soalan lazim vendor.',
    category: 'Panduan Praktikal',
    readTime: '6 min baca',
    date: '25 Apr 2026',
  },
  {
    slug: 'pekeliling-perbendaharaan-pk-vendor-perlu-tahu',
    title: 'Pekeliling Perbendaharaan yang Setiap Vendor ePerolehan Wajib Tahu pada 2026',
    excerpt: 'Peraturan ePerolehan berubah. PK 5.1 yang berkuatkuasa Jun 2025 membawa perubahan penting kepada had nilai, syarat vendor, dan proses semakan. Adakah anda terkini?',
    category: 'Peraturan & Pekeliling',
    readTime: '10 min baca',
    date: '22 Apr 2026',
  },
  {
    slug: 'strategi-harga-tender-kerajaan-malaysia',
    title: 'Strategi Harga Tender Kerajaan: Bagaimana Vendor Berjaya Menentukan Harga yang Menang',
    excerpt: 'Harga terlalu rendah — anda rugi. Harga terlalu tinggi — anda kalah. Artikel ini dedahkan pendekatan strategik dalam menentukan harga tender kerajaan berdasarkan jenis perolehan.',
    category: 'Strategi Tender',
    readTime: '11 min baca',
    date: '19 Apr 2026',
  },
];

const categoryColors: Record<string, string> = {
  'Pematuhan & Sijil': 'bg-blue-50 text-blue-700',
  'Asas ePerolehan': 'bg-emerald-50 text-emerald-700',
  'Strategi Tender': 'bg-orange-50 text-orange-700',
  'Panduan Praktikal': 'bg-purple-50 text-purple-700',
  'Peraturan & Pekeliling': 'bg-red-50 text-red-700',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="py-16 px-6 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Blog TanyaLer</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Ilmu ePerolehan.<br className="hidden md:block" /> Percuma untuk Anda.
          </h1>
          <p className="text-slate-500 text-lg">
            Panduan praktikal, pekeliling terkini, dan strategi tender untuk vendor Malaysia yang mahu menang lebih banyak projek kerajaan.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300">

                  {/* Category */}
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${categoryColors[article.category] || 'bg-slate-100 text-slate-600'}`}>
                    {article.category}
                  </span>

                  {/* Title */}
                  <h2 className="font-black text-slate-900 text-base leading-snug mb-3 group-hover:text-emerald-700 transition-colors">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-400">{article.date}</span>
                    <span className="text-xs text-slate-400">{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Baca artikel. Guna ilmu. Menang tender.</h2>
          <p className="text-slate-400 mb-8">Atau biarkan TanyaLer jawab soalan ePerolehan anda secara langsung dari 56 dokumen rasmi.</p>
          <Link href="/chat" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-xl">
            Cuba TanyaLer Percuma
          </Link>
        </div>
      </div>

    </div>
  );
}
