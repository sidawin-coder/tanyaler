import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      {/* Disclaimer Banner */}
      <div className="bg-amber-950/50 border-b border-amber-900/30 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-300/80 text-xs leading-relaxed text-center">
            ⚠️ <strong className="text-amber-300">PENAFIAN:</strong> TanyaLer.my adalah platform rujukan pihak ketiga yang menyediakan panduan berdasarkan dokumen rasmi ePerolehan Malaysia yang tersedia awam.
            Platform ini <strong>tidak mempunyai hubungan rasmi</strong> dengan kerajaan Malaysia atau sistem ePerolehan.
            Semua maklumat adalah untuk panduan sahaja — sila sahkan dengan{' '}
            <a href="https://www.eperolehan.gov.my" target="_blank" rel="noopener noreferrer"
              className="underline hover:text-amber-200">
              www.eperolehan.gov.my
            </a>{' '}
            untuk tindakan rasmi. ILHAM KREATIF (202303225352) tidak bertanggungjawab atas sebarang kerugian akibat penggunaan maklumat ini.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-lg">🔍</div>
              <div>
                <span className="font-black text-lg">Tanya<span className="text-emerald-400">Ler</span></span>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest">SYSTEM V5.0</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sistem Rujukan Pintar ePerolehan Malaysia berasaskan Sumber Rasmi.
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-slate-500 text-xs">🇲🇾 Dibina di Malaysia</p>
              <p className="text-slate-500 text-xs">🔒 SSL Dilindungi</p>
              <p className="text-slate-500 text-xs">📋 PDPA 2010 Compliant</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Laman</h3>
            <ul className="space-y-2">
              {[
                ['/', 'Laman Utama'],
                ['/chat', 'Mula Tanya'],
                ['/pricing', 'Harga'],
                ['/untuk-siapa', 'Untuk Siapa'],
                ['/blog', 'Blog'],
                ['/manual', 'Manual Pengguna'],
                ['/support', 'Sokongan'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Perundangan</h3>
            <ul className="space-y-2">
              {[
                ['/terms', 'Terma Penggunaan'],
                ['/privacy', 'Dasar Privasi'],
                ['/disclaimer', 'Penafian'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="mailto:support@tanyaler.my"
                  className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-slate-500 text-xs">Dikendalikan oleh:</p>
              <p className="text-slate-300 text-xs font-bold mt-1">ILHAM KREATIF</p>
              <p className="text-slate-500 text-xs">No. Pendaftaran: 202303225352</p>
            </div>
          </div>

          {/* Articles */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Artikel Terkini</h3>
            <ul className="space-y-2">
              {[
                'Cara Daftar ePerolehan: Panduan Lengkap',
                'Sijil MOF: Cara Mohon dan Renew',
                'Tips Menang Tender Kerajaan',
                'Kesilapan Pembekal Baru',
              ].map((title) => (
                <li key={title}>
                  <Link href="/blog"
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors leading-relaxed block">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 TanyaLer by ILHAM KREATIF (202303225352). Hak cipta terpelihara.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-xs">SSL Dilindungi</span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-500 text-xs">PDPA 2010</span>
            <span className="text-slate-700">·</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-500 text-xs font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/>
              SYSTEM V5.0 Aktif
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
