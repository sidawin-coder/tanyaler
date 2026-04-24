import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-5">
            <Logo showBadge={false} href={null as unknown as string} />
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Panduan ePerolehan Malaysia yang mudah difahami. Direka untuk membantu
              pembekal dan pengguna sistem memahami setiap langkah dengan jelas.
            </p>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Precision RAG Engine
            </div>
          </div>

          {/* Links column */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-5">
              Laman
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-emerald-700 transition-colors">
                  Laman Utama
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-emerald-700 transition-colors">
                  Mula Tanya
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-700 transition-colors">
                  Harga
                </Link>
              </li>
              <li>
                <Link href="/manual" className="hover:text-emerald-700 transition-colors">
                  Manual Pengguna
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-emerald-700 transition-colors">
                  Support Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-5">
              Undang-undang
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-700 transition-colors">
                  Penafian
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-700 transition-colors">
                  Dasar Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-700 transition-colors">
                  Terma Penggunaan
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@tanyaler.com"
                  className="hover:text-emerald-700 transition-colors"
                >
                  support@tanyaler.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100">
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Penafian:</strong> TanyaLer adalah platform AI
            pihak ketiga yang menyediakan panduan berdasarkan maklumat awam berkaitan sistem
            ePerolehan Malaysia. Platform ini tidak mempunyai hubungan rasmi dengan kerajaan
            Malaysia atau sistem ePerolehan. Semua maklumat adalah untuk tujuan rujukan sahaja.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            © {year} TanyaLer. Hak cipta terpelihara.
          </p>
          <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-emerald-500 rounded-full" />
              SSL Dilindungi
            </span>
            <span>PDPA 2010</span>
            <span>🇲🇾 Made in Malaysia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
