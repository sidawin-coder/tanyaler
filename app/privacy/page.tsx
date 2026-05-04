import Link from 'next/link';

export const metadata = {
  title: 'Dasar Privasi — TanyaLer',
  description: 'Dasar Privasi TanyaLer.my oleh ILHAM KREATIF (202303225352). Mematuhi Akta Perlindungan Data Peribadi 2010 (PDPA).',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">Perundangan</p>
          <h1 className="text-4xl font-black tracking-tight mb-4">Dasar Privasi</h1>
          <p className="text-slate-300 text-lg">
            Platform TanyaLer.my dikendalikan oleh <strong className="text-white">ILHAM KREATIF</strong> (No. Pendaftaran: 202303225352).
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span>📅 Berkuat kuasa: 1 Mei 2026</span>
            <span>🔄 Dikemaskini: 3 Mei 2026</span>
            <span>📋 Mematuhi PDPA 2010</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* Intro */}
        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-6">
          <p className="text-emerald-800 text-sm leading-relaxed">
            ILHAM KREATIF menghormati privasi anda. Dasar Privasi ini menerangkan bagaimana kami mengumpul,
            menggunakan, dan melindungi maklumat peribadi anda apabila menggunakan platform TanyaLer.my,
            selaras dengan <strong>Akta Perlindungan Data Peribadi 2010 (PDPA)</strong> Malaysia.
          </p>
        </div>

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
            1. Maklumat Yang Kami Kumpul
          </h2>
          <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
            <p><strong>1.1 Maklumat yang anda berikan:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Nama dan alamat e-mel (melalui log masuk Google)</li>
              <li>Soalan yang anda hantar kepada sistem</li>
              <li>Maklum balas rating (👍👎) yang anda berikan</li>
              <li>Maklumat pembayaran (diproses oleh BillPlz — kami tidak menyimpan data kad)</li>
            </ul>
            <p className="mt-4"><strong>1.2 Maklumat yang dikumpul secara automatik:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Alamat IP dan maklumat peranti</li>
              <li>Data penggunaan (halaman yang dilawati, masa penggunaan)</li>
              <li>Kuki (cookies) untuk pengesahan sesi</li>
              <li>Log sistem untuk penyelesaian masalah teknikal</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
            2. Bagaimana Kami Menggunakan Maklumat Anda
          </h2>
          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            {[
              'Menyediakan dan meningkatkan perkhidmatan TanyaLer',
              'Memproses pembayaran dan mengurus kredit akaun anda',
              'Menghantar notis perkhidmatan dan kemas kini penting',
              'Mengesan dan mencegah penyalahgunaan sistem',
              'Menganalisis corak penggunaan untuk penambahbaikan produk',
              'Mematuhi keperluan undang-undang Malaysia',
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
            3. Perkongsian Maklumat
          </h2>
          <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
            <p>Kami <strong>tidak menjual</strong> data peribadi anda. Kami hanya berkongsi maklumat dengan:</p>
            <ul className="space-y-3 mt-3">
              {[
                ['Google (OAuth)', 'Untuk pengesahan log masuk sahaja'],
                ['OpenAI', 'Untuk memproses soalan dan menjana jawapan (data diproses mengikut polisi privasi OpenAI)'],
                ['BillPlz', 'Untuk memproses pembayaran dengan selamat'],
                ['Vercel', 'Platform hosting — data diproses di pelayan Vercel'],
                ['Pihak berkuasa', 'Jika dikehendaki oleh undang-undang Malaysia'],
              ].map(([party, desc]) => (
                <li key={party} className="flex gap-3">
                  <strong className="text-slate-900 min-w-fit">{party}:</strong>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
            4. Hak Anda Di Bawah PDPA 2010
          </h2>
          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            <p>Sebagai pengguna, anda mempunyai hak untuk:</p>
            <ul className="space-y-2 mt-3">
              {[
                'Mengakses data peribadi yang kami simpan tentang anda',
                'Membetulkan data peribadi yang tidak tepat',
                'Meminta pemadaman akaun dan data anda',
                'Menarik balik persetujuan pemprosesan data',
                'Membuat aduan kepada Jabatan Perlindungan Data Peribadi Malaysia',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Untuk menggunakan hak-hak ini, hubungi kami di{' '}
              <a href="mailto:support@tanyaler.my" className="text-emerald-700 underline">
                support@tanyaler.my
              </a>
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
            5. Keselamatan Data
          </h2>
          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            <p>
              Kami mengambil langkah-langkah teknikal dan organisasi yang sesuai untuk melindungi
              data peribadi anda, termasuk:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
              <li>Enkripsi SSL/TLS untuk semua komunikasi</li>
              <li>Pengesahan dua faktor untuk akses admin</li>
              <li>Pemantauan keselamatan berterusan</li>
              <li>Had akses berdasarkan peranan (role-based access)</li>
            </ul>
            <p className="mt-3">
              Walaupun begitu, tiada sistem di internet yang 100% selamat.
              Kami menggalakkan anda untuk melaporkan sebarang kebimbangan keselamatan kepada support@tanyaler.my.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
            6. Tempoh Penyimpanan Data
          </h2>
          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            <ul className="space-y-3">
              {[
                ['Data akaun', 'Selagi akaun aktif + 30 hari selepas penamatan'],
                ['Log soalan', '12 bulan untuk penambahbaikan sistem'],
                ['Data pembayaran', 'Mengikut keperluan undang-undang cukai Malaysia (7 tahun)'],
                ['Log sistem', '90 hari untuk penyelesaian masalah teknikal'],
              ].map(([type, period]) => (
                <li key={type} className="flex gap-3">
                  <strong className="text-slate-900 min-w-fit">{type}:</strong>
                  <span>{period}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
            7. Kuki (Cookies)
          </h2>
          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            <p>TanyaLer menggunakan kuki untuk:</p>
            <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
              <li>Mengekalkan sesi log masuk anda</li>
              <li>Menyimpan keutamaan bahasa</li>
              <li>Menganalisis penggunaan platform (Google Analytics)</li>
            </ul>
            <p className="mt-3">
              Anda boleh menyahaktifkan kuki dalam tetapan browser anda, tetapi ini mungkin
              mempengaruhi fungsi platform.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-emerald-50 rounded-2xl p-8">
          <h2 className="text-xl font-black text-slate-900 mb-4">Hubungi Kami</h2>
          <p className="text-slate-700 text-sm mb-4">
            Untuk sebarang pertanyaan berkaitan privasi:
          </p>
          <div className="space-y-2 text-slate-700 text-sm">
            <p><strong>Syarikat:</strong> ILHAM KREATIF</p>
            <p><strong>No. Pendaftaran:</strong> 202303225352</p>
            <p><strong>E-mel:</strong>{' '}
              <a href="mailto:support@tanyaler.my" className="text-emerald-700 underline">
                support@tanyaler.my
              </a>
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="text-center">
          <Link href="/" className="text-emerald-700 hover:underline text-sm">
            ← Kembali ke Laman Utama
          </Link>
          <span className="mx-4 text-slate-300">|</span>
          <Link href="/terms" className="text-emerald-700 hover:underline text-sm">
            Terma Penggunaan →
          </Link>
        </div>
      </div>
    </div>
  );
}
