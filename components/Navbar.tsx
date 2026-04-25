'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Logo from './Logo';
import type { User } from '@supabase/supabase-js';

const NAV_LINKS = [
  { href: '/untuk-siapa', label: 'Untuk Siapa' },
  { href: '/pricing', label: 'Harga' },
  { href: '/blog', label: 'Blog' },
  { href: '/manual', label: 'Manual Pengguna' },
  { href: '/support', label: 'Sokongan' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Akaun';
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm'
        : 'bg-white/95 backdrop-blur-lg border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <Logo size={36} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight transition-colors ${
                  isActive(link.href) ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={firstName} className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                        {firstName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200/60 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">Dashboard</Link>
                    <Link href="/pricing" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">Topup Kredit</Link>
                    <button onClick={handleLogout} disabled={loggingOut} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                      {loggingOut ? 'Sedang log keluar...' : 'Log Keluar'}
                    </button>
                  </div>
                </div>
                <Link href="/chat" className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all">
                  Mula Tanya
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 8h14M9 2l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Log Masuk</Link>
                <Link href="/login" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all">
                  Cuba Percuma
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 -mr-2 text-slate-900">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /></>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 pt-2 space-y-1 border-t border-slate-100">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={`block px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.href) ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/dashboard" className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50">Dashboard</Link>
                <Link href="/chat" className="block mt-4 mx-3 bg-slate-900 text-white text-center font-semibold py-3 rounded-full">Mula Tanya →</Link>
                <button onClick={handleLogout} className="block w-full text-center mt-2 text-rose-600 text-sm font-medium py-2">Log Keluar</button>
              </>
            ) : (
              <Link href="/login" className="block mt-4 mx-3 bg-slate-900 text-white text-center font-semibold py-3 rounded-full">Log Masuk / Daftar →</Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
