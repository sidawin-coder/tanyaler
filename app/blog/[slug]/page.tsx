import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { articles, getArticleBySlug, getRelatedArticles } from '@/lib/blog-data';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Artikel Tidak Dijumpai' };

  return {
    title: `${article.title} | Blog TanyaLer`,
    description: article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://tanyaler.com/blog/${slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
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

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Render markdown-like content as HTML
function renderContent(content: string): string {
  return content
    .trim()
    // H2 headers
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">$1</h2>')
    // H3 headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-3">$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
    // Internal links to TanyaLer
    .replace(/\[TanyaLer\]\(https:\/\/tanyaler\.vercel\.app\)/g, '<a href="/chat" class="text-emerald-700 hover:text-emerald-800 font-semibold underline decoration-emerald-200">TanyaLer</a>')
    // CTA links
    .replace(/\[Cuba TanyaLer Percuma →\]\(https:\/\/tanyaler\.vercel\.app\/chat\)/g, '<a href="/chat" class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm">Cuba TanyaLer Percuma →</a>')
    // Table rows
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim()).map(c => c.trim());
      if (cells.every(c => c.startsWith('---'))) return '';
      return `<tr class="border-b border-slate-100">${cells.map(c => `<td class="px-4 py-3 text-sm text-slate-700">${c}</td>`).join('')}</tr>`;
    })
    // Numbered list items
    .replace(/^(\d+)\. (.+)$/gm, '<li class="flex gap-3 text-[15px] text-slate-700"><span class="font-bold text-slate-900 flex-shrink-0">$1.</span><span>$2</span></li>')
    // Bullet list items
    .replace(/^- (.+)$/gm, '<li class="flex gap-2.5 text-[15px] text-slate-700"><span class="text-emerald-500 font-bold flex-shrink-0">•</span><span>$1</span></li>')
    // Paragraphs (two newlines)
    .replace(/\n\n/g, '</p><p class="text-[15px] md:text-base text-slate-700 leading-relaxed">')
    .replace(/^/, '<p class="text-[15px] md:text-base text-slate-700 leading-relaxed">')
    .replace(/$/, '</p>');
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);
  const rendered = renderContent(article.content);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-1">
        {/* Article header */}
        <section className="pt-16 md:pt-24 pb-10 px-5 md:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
              <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
              <span>→</span>
              <span className="text-slate-700">{article.category}</span>
            </div>

            {/* Category & meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <span className="text-sm text-slate-500">{article.readTime} bacaan</span>
              <span className="text-sm text-slate-400">·</span>
              <span className="text-sm text-slate-500">{formatDate(article.publishedAt)}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight text-balance">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed border-l-4 border-emerald-500 pl-5">
              {article.excerpt}
            </p>
          </div>
        </section>

        {/* Article content */}
        <section className="pb-16 px-5 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: rendered }}
            />
          </div>
        </section>

        {/* Inline CTA */}
        <section className="py-12 px-5 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 text-center">
              <h3 className="text-2xl font-bold mb-3">Masih ada soalan?</h3>
              <p className="text-slate-300 mb-6">
                TanyaLer boleh menjawab soalan spesifik anda tentang ePerolehan
                dalam masa beberapa saat — percuma.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-full hover:bg-emerald-400 transition-colors"
              >
                Cuba TanyaLer Percuma
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 8h14M9 2l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="pb-20 md:pb-28 px-5 md:px-8 border-t border-slate-200/60 pt-14">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Artikel Berkaitan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group bg-white border border-slate-200/60 hover:border-slate-300 rounded-3xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(rel.category)} inline-block mb-3`}>
                      {rel.category}
                    </span>
                    <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-emerald-700 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-slate-500">{rel.readTime} bacaan</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
