import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import DisclaimerPopup from '@/components/DisclaimerPopup';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TanyaLer.my — Sistem Rujukan Pintar ePerolehan Malaysia',
    template: '%s | TanyaLer.my',
  },
  description: 'Sistem Rujukan Pintar ePerolehan Malaysia Berasaskan Sumber Rasmi. Jawapan tepat dari 56 dokumen rasmi ePerolehan, 7,375 muka surat.',
  keywords: ['ePerolehan', 'procurement Malaysia', 'tender Malaysia', 'kontraktor kerajaan', 'MOF Malaysia'],
  metadataBase: new URL('https://tanyaler.my'),
  openGraph: {
    title: 'TanyaLer.my — Sistem Rujukan Pintar ePerolehan Malaysia',
    description: 'Jawapan tepat berdasarkan 56 dokumen rasmi ePerolehan Malaysia.',
    url: 'https://tanyaler.my',
    siteName: 'TanyaLer.my',
    locale: 'ms_MY',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased bg-white text-slate-900">
        <LanguageProvider>
          <Navbar />
          <DisclaimerPopup />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
