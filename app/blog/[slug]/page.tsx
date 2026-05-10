import { notFound } from 'next/navigation';
import ArticleTCC from '@/components/blog/ArticleTCC';
import ArticleTender from '@/components/blog/ArticleTender';
import ArticleGagal from '@/components/blog/ArticleGagal';
import ArticleSemak from '@/components/blog/ArticleSemak';
import ArticlePekeliling from '@/components/blog/ArticlePekeliling';
import ArticleStrategi from '@/components/blog/ArticleStrategi';

const articleMap: Record<string, React.ComponentType> = {
  'apa-itu-tcc-sijil-pematuhan-cukai-eperolehan': ArticleTCC,
  'beza-tender-sebutharga-pembelian-terus-eperolehan': ArticleTender,
  'sebab-vendor-gagal-eperolehan-bukan-sebab-harga': ArticleGagal,
  'cara-semak-status-permohonan-eperolehan': ArticleSemak,
  'pekeliling-perbendaharaan-pk-vendor-perlu-tahu': ArticlePekeliling,
  'strategi-harga-tender-kerajaan-malaysia': ArticleStrategi,
};

export function generateStaticParams() {
  return Object.keys(articleMap).map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const Article = articleMap[slug];
  if (!Article) notFound();
  return <Article />;
}
