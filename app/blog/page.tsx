import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { articles } from '@/lib/blog-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog ePerolehan Malaysia — Panduan, Tips & Strategi | TanyaLer',
  description:
    'Artikel terkini tentang ePerolehan Malaysia — cara daftar, sijil MOF, tips menang tender, panduan sebut harga, dan lebih banyak lagi. Panduan percuma untuk pembekal kerajaan.',
  keywords: [
    'blog eperolehan malaysia',
    'panduan tender kerajaan',
    'tips pembekal kerajaan',
    'cara guna eperolehan',
    'artikel eperolehan',
  ],
};

const categories = ['Semua', 'Pendaftaran', 'Sijil MOF', 'Asas ePerolehan', 'Sebut Harga', 'Tender', 'Katalog', 'Pemenuhan', 'Tips & Strategi', 'FAQ', 'Berita & Kemas Kini', 'Profil Syarikat'];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    'Pendaftaran': 'bg-blue-100 text-blue-700',
    'Sijil MOF': 'bg-amber-100 text-amber-700',
    'Asas ePerolehan': 'bg-slate-100 text-slate-700',
    'Sebut Harga': 'bg-emerald-100 text-emerald-700',
    'Tender': 'bg-purple-100 text-purple-700',
    'Katalog': 'bg-teal-100 text-teal-700',
    'Pemenuhan': 'bg-rose-100 text-rose-700',
    'Tips & Strategi': 'bg-orange-100 text-orange-700',
    'FAQ': 'bg-indigo-100 text-indigo-700',
    'Berita & Kemas Kini': 'bg-lime-100 text-lime-700',
    'Profil Syarikat': 'bg-pink-100 text-pink-700',
  };
  return colors[category] || 'bg-slate-100 text-slate-700';
}

export default function BlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-14 px-5 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-4">
              Blog TanyaLer
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
              Panduan ePerolehan
              <br />
              Malaysia terlengkap.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Artikel percuma untuk membantu anda memahami, menyertai, dan
              berjaya dalam sistem perolehan kerajaan Malaysia.
            </p>
          </div>
        </section>

        {/* Featured article */}
        <section className="pb-14 px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-slate-900 text-white rounded-3xl p-8 md:p-12 hover:bg-slate-800 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(featured.category)}`}>
                      {featured.category}
                    </span>
                    <span className="text-slate-400 text-sm">{featured.readTime} bacaan</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-emerald-400 transition-colors text-balance">
                    {featured.title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-full group-hover:bg-emerald-400 transition-colors">
                    Baca artikel
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 8h14M9 2l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Stats bar */}
        <section className="pb-14 px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl px-8 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-2xl font-bold text-slate-900">{articles.length}</div>
                  <div className="text-sm text-slate-600">Artikel tersedia</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">Percuma</div>
                  <div className="text-sm text-slate-600">Semua artikel</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">Terkini</div>
                  <div className="text-sm text-slate-600">Dikemas kini 2025</div>
                </div>
              </div>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
              >
                Tanya AI Kami →
              </Link>
            </div>
          </div>
        </section>

        {/* Articles grid */}
        <section className="pb-20 md:pb-28 px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Semua Artikel</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group bg-white border border-slate-200/60 hover:border-slate-300 rounded-3xl p-7 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500">{article.readTime}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-emerald-700 transition-colors flex-1">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-400">
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 group-hover:gap-2 flex items-center gap-1.5 transition-all">
                      Baca
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 8h14M9 2l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 px-5 md:px-8 bg-slate-50/50 border-t border-slate-200/60">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 text-balance">
              Artikel tidak cukup? Tanya terus kepada AI kami.
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              TanyaLer boleh menjawab soalan spesifik anda tentang ePerolehan
              dalam masa beberapa saat.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Cuba TanyaLer Percuma →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
