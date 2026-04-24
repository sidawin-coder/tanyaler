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

export default function SupportHub() {
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
            <Link href="/manual" className="hover:text-emerald-700 cursor-pointer transition-all">Manual Pengguna</Link>
            {/* Active Link */}
            <span className="text-emerald-700 cursor-pointer transition-all">Support Hub</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-24 space-y-20">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-tight">Support Hub TanyaLer.com</h1>
          <p className="text-slate-500 text-2xl max-w-2xl mx-auto">Pusat bantuan pakar untuk perniagaan SaaS anda.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white border border-slate-100 rounded-[2rem] p-12 space-y-6 shadow-sm">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">FAQ (Soalan Lazim)</h3>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <p>1. **Apakah TanyaLer rasmi kerajaan?** No. TanyaLer adalah AI pakar peribadi berdasarkan dokumen rasmi ePerolehan.</p>
              <p>2. **Adakah saya boleh percaya jawapan TanyaLer?** Jawapan adalah berwibawa berdasarkan dokumen, tetapi tindakan rasmi hendaklah dirujuk terus kepada portal rasmi ePerolehan.</p>
              <p>3. **Bagaimana cara langganan Pro?** Pergi ke halaman langganan untuk maklumat lanjut.</p>
            </div>
          </div>
          <div className="bg-emerald-700 border border-emerald-800 rounded-[2rem] p-12 space-y-6 text-white shadow-emerald-200 shadow-2xl">
            <h3 className="text-3xl font-extrabold tracking-tight">Hubungi Pakar Kami</h3>
            <p className="text-lg leading-relaxed text-emerald-50">Jika anda mempunyai soalan spesifik mengenai embedding, pgvector, atau RAG di TanyaLer, pakar kami sedia membantu.</p>
            <Link href="mailto:support@tanyaler.com" className="inline-block bg-white text-emerald-700 font-bold px-8 py-4 rounded-full text-lg hover:bg-slate-50 transition-all">Hubungi Support via Emel</Link>
          </div>
        </section>

        <section className="bg-slate-50 border border-slate-100 rounded-[2rem] p-12 space-y-8">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sistem Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg text-slate-700 leading-relaxed">
            <div>✓ Backend: Supabase pgvector ✓ AI: OpenAI gpt-4o-mini ✓ Deployment: Vercel</div>
            <div>✓ Sistem Status: Online ✓ Waktu Operasi Support: 9 AM - 5 PM (Mon-Fri)</div>
            <div>✓ API Connected: connected</div>
          </div>
        </section>
      </main>

      <footer className="p-10 bg-white border-t border-slate-100 mt-20">
         <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
             <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
               © 2026 TanyaLer SaaS Solutions
             </span>
             <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em]">
               Support Group
             </span>
          </div>
      </footer>
    </div>
  );
}