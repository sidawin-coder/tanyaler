import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Penafian — TanyaLer',
  description:
    'Penafian rasmi TanyaLer. Kami adalah platform pihak ketiga yang menyediakan panduan ePerolehan berdasarkan maklumat awam.',
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-1 py-20 md:py-28 px-5 md:px-8">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Perundangan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Penafian
            </h1>
            <p className="text-lg text-slate-600">
              Sila baca penafian ini dengan teliti sebelum menggunakan perkhidmatan
              TanyaLer.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              Terakhir dikemaskini: 24 April 2026
            </p>
          </div>

          {/* Main warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <h2 className="font-bold text-amber-900 mb-2">
                  TanyaLer Bukan Platform Rasmi ePerolehan
                </h2>
                <p className="text-amber-800 text-[15px] leading-relaxed">
                  TanyaLer adalah platform pihak ketiga yang menyediakan panduan
                  dan bantuan penggunaan sistem ePerolehan berdasarkan maklumat
                  awam. Kami tidak mempunyai sebarang hubungan rasmi dengan
                  Kerajaan Malaysia atau sistem ePerolehan.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-10">
            {/* What we do */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Apa yang TanyaLer Lakukan
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                TanyaLer menyediakan perkhidmatan pembantu AI yang membantu
                pengguna memahami sistem ePerolehan Malaysia. Kami melakukan
                perkara berikut:
              </p>
              <ul className="space-y-2.5 text-slate-700">
                {[
                  'Menyediakan panduan langkah demi langkah',
                  'Menerangkan cara penggunaan sistem',
                  'Meringkaskan manual rasmi yang tersedia secara awam',
                  'Memberikan jawapan berdasarkan dokumen rasmi',
                  'Menyokong pengguna dalam bahasa Melayu yang mudah',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="4 10 8 14 16 6" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* What we don't do */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Apa yang TanyaLer Tidak Lakukan
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Untuk kejelasan, TanyaLer tidak pernah:
              </p>
              <ul className="space-y-2.5 text-slate-700">
                {[
                  'Mendakwa sebagai platform rasmi ePerolehan',
                  'Meminta ID atau kata laluan ePerolehan anda',
                  'Mengintegrasi dengan API ePerolehan tanpa kebenaran',
                  'Mengambil data dari sistem ePerolehan secara tidak sah',
                  'Menggunakan logo atau nama rasmi kerajaan',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <svg className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="5" x2="15" y2="15" />
                      <line x1="15" y1="5" x2="5" y2="15" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Accuracy */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Ketepatan Maklumat
              </h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Walaupun kami berusaha sebaik mungkin untuk menyediakan maklumat
                yang tepat berdasarkan dokumen rasmi, kandungan yang dijana oleh
                TanyaLer adalah untuk tujuan panduan sahaja.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Untuk tindakan rasmi yang melibatkan pendaftaran, sebut harga,
                tender, atau sebarang urusan rasmi dengan Kerajaan Malaysia,
                sila rujuk terus kepada:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mt-4">
                <a
                  href="https://www.eperolehan.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-2"
                >
                  www.eperolehan.gov.my
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M7 9l5-5M7 4h5v5" />
                  </svg>
                </a>
              </div>
            </section>

            {/* Limitation */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Had Tanggungjawab
              </h2>
              <p className="text-slate-700 leading-relaxed">
                TanyaLer tidak bertanggungjawab atas sebarang keputusan,
                tindakan, atau akibat yang berpunca daripada penggunaan
                perkhidmatan ini. Pengguna dinasihatkan untuk mengesahkan semua
                maklumat penting dengan portal rasmi ePerolehan sebelum membuat
                sebarang tindakan.
              </p>
            </section>

            {/* Kepatuhan undang-undang */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Kepatuhan Undang-undang
              </h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                TanyaLer beroperasi dengan mematuhi undang-undang Malaysia,
                termasuk:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• Akta Komunikasi dan Multimedia 1998</li>
                <li>• Akta Perlindungan Data Peribadi 2010 (PDPA)</li>
                <li>• Akta Jenayah Komputer 1997</li>
                <li>• Akta Hak Cipta 1987</li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Hubungi Kami
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Sekiranya anda mempunyai sebarang pertanyaan tentang penafian
                ini, sila hubungi kami di{' '}
                <a
                  href="mailto:support@tanyaler.com"
                  className="text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  support@tanyaler.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
