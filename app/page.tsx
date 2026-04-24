import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'TanyaLer — Panduan ePerolehan Malaysia yang Mudah Difahami',
  description:
    'Tak faham ePerolehan? TanyaLer bantu anda dengan panduan langkah demi langkah, disokong dokumen rasmi, dijelaskan dalam bahasa mudah. Direka untuk pembekal baru SSM.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO — Generous whitespace, bold typography
          ═══════════════════════════════════════════ */}
      <section className="relative pt-20 md:pt-28 pb-20 md:pb-28 px-5 md:px-8 overflow-hidden">
        {/* Subtle emerald glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200/80 text-xs font-medium text-slate-700 px-3 py-1.5 rounded-full mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Disokong 4,000+ muka surat dokumen rasmi ePerolehan
          </div>

          {/* Hero headline */}
          <h1 className="text-[44px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[84px] lg:leading-[0.95] font-bold tracking-[-0.03em] text-slate-900 mb-8 text-balance">
            Tak faham ePerolehan?
            <br />
            <span className="text-emerald-600">TanyaLer.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Pembantu AI peribadi anda untuk memahami sistem ePerolehan Malaysia.
            Jawapan tepat. Langkah demi langkah. Dalam bahasa yang mudah difahami.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <Link
              href="/chat"
              className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold px-7 py-4 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center"
            >
              Mulakan Percuma
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M1 8h14M9 2l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center text-base font-semibold text-slate-700 hover:text-slate-900 px-6 py-4 transition-colors"
            >
              Lihat Harga
            </Link>
          </div>

          <p className="text-sm text-slate-500">
            8 soalan percuma setiap hari · Tiada kad kredit diperlukan
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VALUE PROPOSITION — 3 Pillars
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Mengapa TanyaLer
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 text-balance">
              Bukan AI biasa.
              <br />
              Bukan jawapan umum.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Direka khas untuk pembekal SSM yang ingin memahami ePerolehan
              dengan lebih yakin dan pantas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-8 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Ikut Langkah Sebenar
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Setiap jawapan disusun sebagai langkah 1, 2, 3 yang anda boleh
                ikut terus. Tiada teori yang mengelirukan.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-8 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Disokong Dokumen Rasmi
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Setiap jawapan dirujuk terus kepada manual rasmi ePerolehan.
                Bukan andaian, bukan ringkasan umum.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-8 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Bahasa Mudah Difahami
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Tiada jargon teknikal yang memeningkan. Jawapan dalam bahasa
                Melayu yang mudah, seperti dijelaskan oleh guru yang sabar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — 3 Simple Steps
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Bagaimana Ia Berfungsi
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 text-balance">
              Semudah 1, 2, 3.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
            {/* Connection line - desktop only */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-[1px] border-t border-dashed border-slate-300 -z-10" />

            {[
              {
                step: '01',
                title: 'Daftar Percuma',
                desc: 'Sign up dengan Google dalam 30 saat. Tiada kad kredit diperlukan.',
              },
              {
                step: '02',
                title: 'Tanya Soalan',
                desc: 'Taip soalan berkaitan ePerolehan dalam bahasa yang selesa untuk anda.',
              },
              {
                step: '03',
                title: 'Dapat Jawapan',
                desc: 'Terima penjelasan step-by-step yang jelas dan disokong dokumen rasmi.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-3xl p-8 text-center border border-slate-200/60 relative">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-5 font-bold text-sm tracking-wider">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — Social Proof
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Kata Pengguna
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 text-balance">
              Dipercayai pembekal Malaysia.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Testimonial 1 */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="flex gap-0.5 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-5 text-[15px]">
                &ldquo;Saya baru daftar SSM dan terus tersadung dengan ePerolehan.
                Hadir kursus pun masih blur. TanyaLer jawab step-by-step, terus
                faham. Dalam masa seminggu saya berjaya sertai sebut harga
                pertama.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  AH
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Ahmad Hakim
                  </div>
                  <div className="text-xs text-slate-500">
                    Pembekal Baru · Selangor
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="flex gap-0.5 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-5 text-[15px]">
                &ldquo;Sijil MOF saya nak expire, panik. Call helpdesk susah nak
                dapat. Tanya TanyaLer, dapat checklist lengkap untuk renew.
                Settle dalam sehari. Save masa dan tenaga.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  SL
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Siti Lina
                  </div>
                  <div className="text-xs text-slate-500">
                    Pengurus Operasi · KL
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="flex gap-0.5 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-5 text-[15px]">
                &ldquo;Tender saya asyik reject dan saya tak tahu kenapa. Tanya
                TanyaLer dia breakdown semua punca tender tolak dan macam mana
                nak betulkan. Tender berikutnya terus lulus.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  RN
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Razif Nordin
                  </div>
                  <div className="text-xs text-slate-500">
                    Kontraktor · Johor
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="flex gap-0.5 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-5 text-[15px]">
                &ldquo;Baca manual 500 muka surat memang pening. TanyaLer
                ringkaskan info penting dan bagi contoh sebenar. Macam ada
                mentor peribadi. Worth every ringgit.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  NF
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Nurul Fatihah
                  </div>
                  <div className="text-xs text-slate-500">
                    Usahawan SME · Pulau Pinang
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="flex gap-0.5 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-5 text-[15px]">
                &ldquo;Katalog saya reject tiga kali. Setelah guna TanyaLer, saya
                faham apa yang perlu ada dan format yang betul. Approve first
                try. Highly recommended untuk pembekal baru.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  KC
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Kevin Chin
                  </div>
                  <div className="text-xs text-slate-500">
                    Pengarah Syarikat · Melaka
                  </div>
                </div>
              </div>
            </div>

            {/* Stat card */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-7 text-white flex flex-col justify-between min-h-[240px]">
              <div>
                <div className="text-5xl font-bold mb-2 tracking-tight">98%</div>
                <div className="text-emerald-100 text-sm font-medium">
                  Pengguna dapat jawapan pada percubaan pertama
                </div>
              </div>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all"
              >
                Cuba sekarang
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING TEASER
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Harga Telus
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 text-balance">
              Mulakan percuma.
              <br />
              Upgrade bila perlu.
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              8 soalan percuma setiap hari. Topup tanpa kontrak. Pro plan untuk
              pengguna aktif.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { name: 'Percubaan', price: 'RM0', unit: '/hari', desc: '8 soalan' },
              { name: 'Basic', price: 'RM10', unit: '', desc: '50 kredit' },
              { name: 'Value', price: 'RM30', unit: '', desc: '200 kredit', popular: false },
              { name: 'Pro', price: 'RM59', unit: '/bulan', desc: '600 kredit', popular: true },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-3xl p-6 text-center border transition-all ${
                  plan.popular
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                    : 'border-slate-200/60 hover:border-slate-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  {plan.name}
                </div>
                <div className="flex items-baseline justify-center gap-0.5 mb-1">
                  <span className="text-3xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-500">{plan.unit}</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {plan.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold text-sm group"
            >
              Lihat perbandingan penuh
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M1 8h14M9 2l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 text-balance">
            Jom mula, percuma.
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto">
            Tanya soalan pertama anda hari ini. Tidak perlu kad kredit, tidak
            perlu komitmen.
          </p>
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 bg-white text-slate-900 text-base font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
          >
            Mulakan Sekarang
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M1 8h14M9 2l6 6-6 6" />
            </svg>
          </Link>
          <p className="text-sm text-slate-400 mt-6">
            8 soalan percuma · Tiada kad kredit diperlukan
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
