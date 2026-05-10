'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const HIDDEN_ON = ['/apps'];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isHidden = HIDDEN_ON.some(p => pathname?.startsWith(p));

  const NAV_LINKS = [
    { href: '/untuk-siapa', label: t('nav.untuk_siapa') },
    { href: '/pricing',     label: t('nav.harga')       },
    { href: '/blog',        label: t('nav.blog')         },
    { href: '/manual',      label: t('nav.manual')       },
    { href: '/support',     label: t('nav.sokongan')     },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isActive = (href: string) => pathname === href;

  if (isHidden) return null;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.06)] border-b border-slate-100' : ''
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-0.5 flex-shrink-0" aria-label="TanyaLer.my">
              <span className="text-[1.35rem] font-extrabold text-slate-900 tracking-tight leading-none">Tanya</span>
              <span className="text-[1.35rem] font-extrabold text-emerald-600 tracking-tight leading-none">Ler</span>
              <span className="text-[0.65rem] font-semibold text-slate-400 ml-0.5 mt-1 hidden sm:block">.my</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-5">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href}
                  className={`text-[0.8rem] font-medium transition-colors duration-200 relative ${
                    isActive(link.href) ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'
                  }`}>
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              {loading ? (
                <div className="h-4 w-20 bg-slate-100 animate-pulse rounded" />
              ) : user ? (
                <>
                  {/* Logged in — terus ke /apps */}
                  <Link href="/apps" className={`text-[0.8rem] font-medium transition-colors ${isActive('/apps') ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}>
                    {t('nav.dashboard')}
                  </Link>
                  <button onClick={handleSignOut} className="text-[0.8rem] font-medium text-slate-400 hover:text-slate-700 transition-colors">
                    {t('nav.log_keluar')}
                  </button>
                </>
              ) : (
                <>
                  {/* Belum login — paksa login dulu */}
                  <Link href="/login" className="text-[0.8rem] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    {t('nav.log_masuk')}
                  </Link>
                  <Link href="/login?redirect=/apps" className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[0.8rem] font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm">
                    {t('nav.mula_sekarang')}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile: Language + Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                className="p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              >
                <div className="w-5 h-5 relative flex flex-col justify-center gap-1.5">
                  <span className={`block h-0.5 bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
                  <span className={`block h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block h-0.5 bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-slate-100 bg-white px-4 py-3 space-y-0.5">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href) ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}>
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-slate-100 space-y-1.5">
              {loading ? (
                <div className="h-10 bg-slate-100 animate-pulse rounded-lg" />
              ) : user ? (
                <>
                  <Link href="/apps" className="flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                    {t('nav.dashboard')}
                  </Link>
                  <button onClick={handleSignOut} className="w-full flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors">
                    {t('nav.log_keluar')}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors">
                    {t('nav.log_masuk')}
                  </Link>
                  <Link href="/login?redirect=/apps" className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                    {t('nav.mula_sekarang')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
