'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/chat', label: 'Mula Tanya' },
  { href: '/pricing', label: 'Harga' },
  { href: '/manual', label: 'Manual Pengguna' },
  { href: '/support', label: 'Support Hub' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-slate-200 px-6 md:px-8 py-5 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all ${
                isActive(link.href)
                  ? 'text-emerald-700'
                  : 'text-slate-400 hover:text-emerald-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-emerald-700 transition-colors"
          aria-label="Menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-5 pt-5 border-t border-slate-200 max-w-6xl mx-auto space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-bold uppercase tracking-widest transition-all ${
                isActive(link.href) ? 'text-emerald-700' : 'text-slate-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
