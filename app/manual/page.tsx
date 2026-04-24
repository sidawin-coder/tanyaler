'use client';
import Link from 'next/link';

// Guna SVG Logo Baharu (Versi SaaS Minimalist)
const TanyalerLogoSaaS = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.2"/>
    <path d="M12 2C17.5228 2 22 6.47715 22 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#10B981"/>
    <path d="M12 17V19" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function ManualPengguna() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      {/* Navigation Premium (Header) */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-slate-200 px-8 py-5 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Logo Redesign */}
            <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 font-bold text-2xl shadow-xl shadow-emerald-100">
               <TanyalerLogoSaaS />
            </div>
            <div>
               <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight leading-none hover:text-emerald-700 transition-all">Tanya<span className="text-emerald-700">Ler</span></Link>
               <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Premium Edition</p>
            </div>
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {/* Active Link */}
            <span className="text-emerald-700 cursor-pointer transition-all">Manual Pengguna</span>
            <Link href="/support" className="hover:text-emerald-700 cursor-pointer transition-all">Support Hub</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 space-y-16">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">Manual Pengguna TanyaLer.com</h1>
          <p className="text-slate-500 text-xl max-w-xl mx-auto">Panduan langkah-langkah untuk menggunakan pakar ePerolehan peribadi anda.</p>
        </header>

        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Langkah 1: Log Masuk & Bertanya</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>1. Pergi ke halaman utama TanyaLer di <Link href="/" className="text-emerald-700 font-bold hover:underline">app.tanyaler.com</Link>.</p>
            <p>2. Di kotak perbualan (Command Bar) di bahagian bawah, taip soalan anda secara spesifik mengenai sistem ePerolehan Kerajaan Malaysia. Contoh: *"Bagaimana cara pendaftaran syarikat pemula?"*.</p>
            <p>3. Klik butang hantar (ikon kapal terbang kertas) atau tekan Enter.</p>
          </div>
        </section>

        <section className="space-y-12 bg-slate-50 border border-slate-100 rounded-[2rem] p-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Langkah 2: Memahami Jawapan & Rujukan</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>TanyaLer akan memberikan jawapan secara berwibawa berdasarkan dokumen rasmi ePerolehan. Jawapan akan dipaparkan langkah-demi-langkah.</p>
            <ul className="list-disc list-inside space-y-3">
              <li>Mesej Pengguna akan muncul di kotak hijau Zamrud (kanan).</li>
              <li>Mesej TanyaLer akan muncul di kotak putih (kiri) dalam saiz L (text-lg).</li>
              <li>Sertakan peringatan <span className="font-bold">Reminder :</span> hanya jika jawapan mempunyai checklist atau memerlukan peringatan spesifik.</li>
              <li>Bahagian <span className="text-blue-600 font-bold">[RUJUKAN FAIL]</span> di akhir jawapan akan menyenaraikan fail dokumen asal yang digunakan sebagai sumber.</li>
              <li>Penting: Disclaimer merah <span className="text-red-600 font-bold">[DISCLAIMER]</span> akan sentiasa disertakan di hujung setiap jawapan.</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="p-10 bg-white border-t border-slate-100 mt-20">
         <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
             <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
               © 2026 TanyaLer SaaS Solutions
             </span>
             <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em]">
               Expertly Guided
             </span>
          </div>
      </footer>
    </div>
  );
}