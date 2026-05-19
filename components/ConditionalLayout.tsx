'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import DisclaimerPopup from './DisclaimerPopup';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/apps');
  return (
    <>
      {!isDashboard && <Navbar />}
      {!isDashboard && <DisclaimerPopup />}
      <main>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
