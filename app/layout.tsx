import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'TanyaLer — Panduan ePerolehan Malaysia yang Mudah Difahami',
    template: '%s | TanyaLer',
  },
  description:
    'Tak faham ePerolehan? TanyaLer bantu anda dengan panduan langkah demi langkah, disokong dokumen rasmi, dijelaskan dalam bahasa mudah. Direka untuk pembekal baru SSM.',
  keywords: [
    'panduan ePerolehan Malaysia',
    'cara guna ePerolehan',
    'bantuan ePerolehan',
    'sistem ePerolehan Malaysia',
    'pembekal kerajaan Malaysia',
    'tender kerajaan',
    'sebut harga kerajaan',
    'sijil MOF',
    'TanyaLer',
  ],
  authors: [{ name: 'TanyaLer' }],
  metadataBase: new URL('https://tanyaler.com'),
  openGraph: {
    title: 'TanyaLer — Panduan ePerolehan Malaysia',
    description:
      'Pembantu AI untuk pembekal Malaysia. Jelas, tersusun, mudah difahami.',
    url: 'https://tanyaler.com',
    siteName: 'TanyaLer',
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TanyaLer — Panduan ePerolehan Malaysia',
    description: 'Jawapan ePerolehan yang mudah difahami.',
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#10B981" />
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
              },
              description:
                'Panduan ePerolehan Malaysia yang mudah difahami.',
              url: 'https://tanyaler.com',
              inLanguage: 'ms',
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FDFDFD] text-slate-900">
        {children}
      </body>
    </html>
  );
}
