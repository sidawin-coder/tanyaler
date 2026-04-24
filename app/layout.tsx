import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TanyaLer — Panduan ePerolehan Malaysia yang Mudah Difahami',
    template: '%s | TanyaLer',
  },
  description:
    'TanyaLer membantu anda memahami sistem ePerolehan Malaysia dengan jelas dan tersusun. Direka untuk pembekal, usahawan dan pengguna baru.',
  keywords: [
    'panduan ePerolehan Malaysia',
    'cara guna ePerolehan',
    'bantuan ePerolehan',
    'sistem ePerolehan Malaysia',
    'tender kerajaan Malaysia',
    'sebut harga kerajaan',
    'daftar ePerolehan',
    'sijil MOF',
    'pemenuhan ePerolehan',
    'pembekal kerajaan Malaysia',
    'TanyaLer',
  ],
  authors: [{ name: 'TanyaLer' }],
  creator: 'TanyaLer',
  publisher: 'TanyaLer',
  metadataBase: new URL('https://tanyaler.com'),
  openGraph: {
    title: 'TanyaLer — Panduan ePerolehan Malaysia yang Mudah Difahami',
    description:
      'Pembantu AI yang membantu anda memahami sistem ePerolehan dengan jelas dan tersusun.',
    url: 'https://tanyaler.com',
    siteName: 'TanyaLer',
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TanyaLer — Panduan ePerolehan Malaysia',
    description: 'Pembantu AI untuk sistem ePerolehan. Jelas, tersusun, mudah difahami.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tanyaler.com',
    languages: {
      'ms-MY': 'https://tanyaler.com',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ms"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#10B981" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'TanyaLer',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'MYR',
                description: 'Percubaan percuma 8 soalan sehari',
              },
              description:
                'Panduan ePerolehan Malaysia yang mudah difahami. Pembantu AI untuk pembekal dan pengguna sistem ePerolehan.',
              url: 'https://tanyaler.com',
              inLanguage: ['ms'],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FDFDFD] text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
