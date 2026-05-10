import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: 'TanyaLer — Sistem Rujukan Pintar ePerolehan Malaysia Berasaskan Sumber Rasmi',
  description: 'Sistem Rujukan Pintar ePerolehan Malaysia. 7,375 muka surat dari 56 dokumen rasmi. Jawapan tepat dengan bukti rujukan untuk vendor, kontraktor, dan pembekal kerajaan Malaysia.',
  keywords: 'ePerolehan Malaysia, tender kerajaan, sijil MOF, sebut harga, vendor kerajaan, katalog ePerolehan, panduan ePerolehan',
};

export default function HomePage() {
  return <HomeContent />;
}
