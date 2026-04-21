'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Language } from '@/lib/i18n';
import { Menu, X, MessageSquare, Globe, LogOut, Coins } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
  credits?: { balance: number; freeRemaining: number } | null;
}

export default function Header({ lang, onLangChange, credits }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email || '' });
    });
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const langs: { code: Language; label: string; flag: string }[] = [
    { code: 'ms', label: 'BM', flag: '🇲🇾' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const totalCredits = (credits?.balance || 0) + (credits?.freeRemaining || 0);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-white">
              Tanya<span className="text-gold-400">Ler</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              {lang === 'ms' ? 'Laman Utama' : lang === 'en' ? 'Home' : '首页'}
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              {lang === 'ms' ? 'Harga' : lang === 'en' ? 'Pricing' : '价格'}
            </Link>
            <Link href="/disclaimer" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              {lang === 'ms' ? 'Penafian' : lang === 'en' ? 'Disclaimer' : '声明'}
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 bg-navy-800/60 rounded-lg p-1">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLangChange(l.code)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                    lang === l.code
                      ? 'bg-gold-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title={l.label}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                {/* Credit display */}
                <Link href="/pricing" className="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 text-gold-400 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{totalCredits}</span>
                </Link>
                <Link href="/chat" className="btn-primary py-2 px-4 text-sm">
                  {lang === 'ms' ? 'Mula Tanya' : lang === 'en' ? 'Ask Now' : '开始提问'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-navy-800 transition-colors"
                  title="Log Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  {lang === 'ms' ? 'Log Masuk' : lang === 'en' ? 'Login' : '登录'}
                </Link>
                <Link href="/login" className="btn-primary py-2 px-4 text-sm">
                  {lang === 'ms' ? 'Cuba Percuma' : lang === 'en' ? 'Try Free' : '免费试用'}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-navy-900 border-t border-navy-800 py-4 px-4 space-y-3 animate-fade-in">
            <Link href="/" className="block text-gray-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>
              {lang === 'ms' ? 'Laman Utama' : lang === 'en' ? 'Home' : '首页'}
            </Link>
            <Link href="/pricing" className="block text-gray-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>
              {lang === 'ms' ? 'Harga' : lang === 'en' ? 'Pricing' : '价格'}
            </Link>
            <Link href="/disclaimer" className="block text-gray-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>
              {lang === 'ms' ? 'Penafian' : lang === 'en' ? 'Disclaimer' : '声明'}
            </Link>

            {/* Language pills */}
            <div className="flex gap-2 pt-2">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { onLangChange(l.code); setMenuOpen(false); }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    lang === l.code ? 'bg-gold-500 text-white' : 'bg-navy-800 text-gray-400'
                  }`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <Link href="/chat" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>
                    {lang === 'ms' ? 'Mula Tanya' : lang === 'en' ? 'Ask Now' : '开始提问'}
                  </Link>
                  <button onClick={handleLogout} className="btn-secondary text-center text-sm">
                    {lang === 'ms' ? 'Log Keluar' : lang === 'en' ? 'Logout' : '退出'}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>
                    {lang === 'ms' ? 'Log Masuk / Daftar' : lang === 'en' ? 'Login / Register' : '登录/注册'}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
