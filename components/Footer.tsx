import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 mt-auto">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="md:col-span-4 space-y-5">
            <Logo size={36} href={null} />
            <p className="text-[15px] leading-relaxed text-slate-600 max-w-sm">
              Panduan ePerolehan Malaysia yang mudah difahami. Direka untuk
              pembekal baru dan pengguna sistem ePerolehan.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-xs font-medium text-slate-600 px-3 py-1.5 rounded-full">
                <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="3" /></svg>
                RAG Engine Aktif
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-xs font-medium text-slate-600 px-3 py-1.5 rounded-full">
                🇲🇾 Dibina di Malaysia
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1" />

          {/* Laman */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Laman</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Laman Utama' },
                { href: '/chat', label: 'Mula Tanya' },
                { href: '/pricing', label: 'Harga' },
                { href: '/untuk-siapa', label: 'Untuk Siapa' },
                { href: '/blog', label: 'Blog' },
                { href: '/manual', label: 'Manual Pengguna' },
                { href: '/support', label: 'Sokongan' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Perundangan</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/disclaimer', label: 'Penafian' },
                { href: '/privacy', label: 'Dasar Privasi' },
                { href: '/terms', label: 'Terma Penggunaan' },
                { href: 'mailto:support@tanyaler.com', label: 'Hubungi Kami' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog terkini */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Artikel Terkini</h3>
            <ul className="space-y-3 text-sm">
              {[
                'Cara Daftar ePerolehan: Panduan Lengkap',
                'Sijil MOF: Cara Mohon dan Renew',
                'Tips Menang Tender Kerajaan',
                'Kesilapan Pembekal Baru',
              ].map((title, i) => (
                <li key={i}>
                  <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors line-clamp-2 leading-snug">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 mb-10">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-900">Penafian: </span>
              TanyaLer adalah platform pihak ketiga yang menyediakan panduan berdasarkan maklumat awam sistem ePerolehan Malaysia. Platform ini tidak mempunyai hubungan rasmi dengan kerajaan Malaysia atau sistem ePerolehan. Untuk tindakan rasmi, sila rujuk{' '}
              <a href="https://www.eperolehan.gov.my" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-medium">
                www.eperolehan.gov.my
              </a>.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200/80">
          <p className="text-xs text-slate-500">© {year} TanyaLer. Hak cipta terpelihara.</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0L2 3v5c0 3.3 2.6 6.4 6 8 3.4-1.6 6-4.7 6-8V3L8 0z" />
              </svg>
              SSL Dilindungi
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>PDPA 2010</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
