import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DisclaimerPopup from '@/components/DisclaimerPopup';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TanyaLer — Sistem Rujukan Pintar ePerolehan Malaysia',
  description: 'Sistem Rujukan Pintar ePerolehan Malaysia berasaskan Sumber Rasmi. 7,375 muka surat dari 56 dokumen rasmi. Jawapan tepat untuk vendor, kontraktor, dan pembekal kerajaan.',
  keywords: 'ePerolehan, tender kerajaan Malaysia, sijil MOF, sebut harga, vendor kerajaan, katalog ePerolehan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body className={inter.className}>
        <DisclaimerPopup />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
