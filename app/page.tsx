import Link from 'next/link';

export const metadata = {
  title: 'TanyaLer — AI Rujukan ePerolehan Malaysia untuk Vendor MOF',
  description:
    'Pening dengan 7,375 muka surat ePerolehan? TanyaLer beri jawapan tepat dalam saat. AI khas untuk vendor ePerolehan Malaysia — berdasarkan 59 dokumen rasmi MOF, Treasury, ePerolehan. Cuba 20 kredit percuma 10 hari.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">

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
            Berdasarkan 7,375 muka surat dari 59 dokumen rasmi MOF, Treasury & ePerolehan
          </div>

          {/* Hero headline */}
          <h1 className="text-[44px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[84px] lg:leading-[0.95] font-bold tracking-[-0.03em] text-slate-900 mb-8 text-balance">
            Pening dengan
            <br />
            ePerolehan?
            <br />
            <span className="text-emerald-600">TanyaLer jawab.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Sistem rujukan pintar untuk vendor ePerolehan Malaysia.
            Berdasarkan 59 dokumen rasmi MOF, Treasury & ePerolehan.
            Jawapan dalam saat. Bahasa Malaysia mudah. Sumber boleh disahkan.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold px-7 py-4 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center"
            >
              Mulakan Percubaan Percuma
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
            20 kredit percuma · 10 hari · Tiada kad kredit diperlukan
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
          USE CASES — Cara TanyaLer Membantu (18 Mei 2026: replaces fake testimonials)
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Cara TanyaLer Membantu
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 text-balance">
              Scenario penggunaan biasa.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Contoh bagaimana TanyaLer membantu vendor ePerolehan Malaysia setiap hari.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Vendor Baru SSM</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Tak tahu mula dari mana untuk daftar di ePerolehan? TanyaLer beri
                checklist langkah demi langkah dari Panduan Pendaftaran Akaun MOF rasmi.
              </p>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Sijil MOF Nak Expire</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Tanya prosedur renewal, dokumen diperlukan, dan timeline — terus
                dari panduan rasmi. Tiada perlu call helpdesk berjam-jam.
              </p>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tender Asyik Ditolak</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Pelajari punca biasa tender reject — format dokumen, syarat
                kelayakan, kesilapan submission. Betulkan untuk percubaan seterusnya.
              </p>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Manual Terlalu Tebal</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                7,375 muka surat dokumen tak perlu dibaca semua. Tanya soalan
                spesifik, dapat jawapan spesifik dengan rujukan ke sumber relevan.
              </p>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-7">
              <div className="text-3xl mb-4">🏷️</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Katalog Reject Berulang</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Fahami klasifikasi UNSPSC, format katalog, dan syarat khusus.
                Berdasarkan Panduan Padanan Kod Bidang ePerolehan rasmi.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-7 text-white flex flex-col justify-between min-h-[240px]">
              <div>
                <div className="text-5xl font-bold mb-3 tracking-tight">59</div>
                <div className="text-emerald-100 text-sm font-medium mb-1">
                  Dokumen rasmi terindeks
                </div>
                <div className="text-emerald-200/90 text-xs leading-relaxed">
                  7,375 muka surat · 27,820 chunks
                  <br />
                  MOF · Treasury · ePerolehan
                </div>
              </div>
              <Link
                href="/login"
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
              Mulakan percubaan percuma.
              <br />
              Upgrade bila yakin.
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              20 kredit percuma untuk 10 hari. Plan paid mulai RM39.
              Tiada langganan bulanan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { name: 'Explorer', price: 'RM0', unit: '/10 hari', desc: '20 kredit' },
              { name: 'Rintis', price: 'RM39', unit: '/45 hari', desc: '50 kredit' },
              { name: 'Strategis', price: 'RM89', unit: '/120 hari', desc: '200 kredit', popular: true },
              { name: 'Prestij', price: 'RM199', unit: '/250 hari', desc: '500 kredit' },
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
            Cuba 10 hari. Percuma.
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto">
            20 kredit untuk uji kualiti jawapan TanyaLer.
            Tiada kad kredit. Tiada komitmen. Decide bila anda dah yakin.
          </p>
          <Link
            href="/login"
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
            20 kredit · 10 hari · Tiada kad kredit diperlukan
          </p>
        </div>
      </section>

    </div>
  );
}
