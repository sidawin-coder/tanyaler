import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TanyaLer — Pembantu AI Sistem ePerolehan Malaysia',
    template: '%s | TanyaLer',
  },
  description:
    'Tak faham ePerolehan? TanyaLer! Dapatkan jawapan tepat dan pantas tentang sistem ePerolehan Malaysia — cara daftar, sebut harga, tender, pemenuhan, renew sijil dan lagi. Step-by-step. Bahasa mudah.',
  keywords: [
    'ePerolehan',
    'eperolehan malaysia',
    'cara guna eperolehan',
    'daftar eperolehan',
    'sebut harga eperolehan',
    'tender kerajaan malaysia',
    'sijil mof',
    'renew sijil mof',
    'pemenuhan eperolehan',
    'katalog eperolehan',
    'panduan eperolehan',
    'TanyaLer',
    'AI chatbot eperolehan',
    'pembekal kerajaan malaysia',
  ],
  authors: [{ name: 'TanyaLer' }],
  creator: 'TanyaLer',
  publisher: 'TanyaLer',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://tanyaler.com'),
  openGraph: {
    title: 'TanyaLer — Pembantu AI Sistem ePerolehan Malaysia',
    description: 'Tak faham ePerolehan? TanyaLer! Jawapan step-by-step dalam bahasa mudah.',
    url: 'https://tanyaler.com',
    siteName: 'TanyaLer',
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TanyaLer — Pembantu AI ePerolehan Malaysia',
    description: 'Tak faham ePerolehan? TanyaLer! Step-by-step. Bahasa mudah. Pantas.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tanyaler.com',
    languages: {
      'ms-MY': 'https://tanyaler.com',
      'en-MY': 'https://tanyaler.com?lang=en',
      'zh-MY': 'https://tanyaler.com?lang=zh',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0F2035" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Schema.org JSON-LD untuk SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'TanyaLer',
              applicationCategory: 'BusinessApplication',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'MYR' },
              description: 'Pembantu AI untuk sistem ePerolehan Malaysia',
              url: 'https://tanyaler.com',
              inLanguage: ['ms', 'en', 'zh'],
              operatingSystem: 'Web Browser',
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
