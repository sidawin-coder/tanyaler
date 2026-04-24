import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Dasar Privasi — TanyaLer',
  description:
    'Dasar privasi TanyaLer. Kami mematuhi Akta Perlindungan Data Peribadi Malaysia 2010.',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-1 py-20 md:py-28 px-5 md:px-8">
        <article className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Perundangan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Dasar Privasi
            </h1>
            <p className="text-lg text-slate-600">
              Privasi anda adalah keutamaan kami. Kami mematuhi Akta
              Perlindungan Data Peribadi Malaysia 2010.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              Terakhir dikemaskini: 24 April 2026
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                1. Maklumat yang Kami Kumpul
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Kami mengumpul maklumat berikut untuk menyediakan perkhidmatan
                TanyaLer:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• Alamat e-mel (untuk pendaftaran akaun)</li>
                <li>• Nama anda (dari profil Google jika log masuk melalui Google)</li>
                <li>• Soalan yang diajukan (untuk menambahbaik kualiti jawapan)</li>
                <li>• Sejarah penggunaan kredit dan pembelian</li>
                <li>• Alamat IP dan maklumat peranti (untuk keselamatan)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. Maklumat yang TIDAK Kami Kumpul
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Kami tidak pernah meminta atau menyimpan:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• Kata laluan ePerolehan anda</li>
                <li>• Nombor IC penuh</li>
                <li>• Maklumat kad kredit atau perbankan (diproses oleh BillPlz)</li>
                <li>• Butiran tender atau kontrak rahsia</li>
                <li>• Dokumen syarikat yang sensitif</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Bagaimana Data Anda Digunakan
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Data yang kami kumpul digunakan semata-mata untuk:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• Menyediakan dan meningkatkan perkhidmatan TanyaLer</li>
                <li>• Memproses pembelian kredit dan langganan</li>
                <li>• Berkomunikasi dengan anda tentang akaun</li>
                <li>• Memastikan keselamatan platform</li>
                <li>• Mematuhi kewajipan undang-undang</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. Keselamatan Data
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Semua data dihantar melalui sambungan SSL yang disulitkan. Data
                disimpan di pelayan Supabase yang dilindungi dengan standard
                keselamatan industri. Kami tidak pernah menjual data anda kepada
                pihak ketiga.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                5. Perkongsian Data
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Kami hanya berkongsi data dengan pihak ketiga yang berikut, dan
                hanya untuk tujuan yang diperlukan:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <strong>OpenAI</strong> — soalan anda dihantar untuk diproses
                  (tidak disimpan oleh OpenAI untuk latihan)
                </li>
                <li>
                  <strong>Supabase</strong> — menyimpan data akaun dan sejarah
                </li>
                <li>
                  <strong>BillPlz</strong> — memproses pembayaran sahaja
                </li>
                <li>
                  <strong>Vercel</strong> — hosting platform
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Hak Anda di Bawah PDPA
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Mengikut Akta Perlindungan Data Peribadi 2010, anda berhak:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• Mengakses data peribadi yang kami simpan</li>
                <li>• Meminta pembetulan data yang tidak tepat</li>
                <li>• Menarik balik persetujuan pemprosesan data</li>
                <li>• Memadam akaun dan data peribadi</li>
                <li>• Mendapatkan maklumat tentang perkongsian data</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-4">
                Untuk melaksanakan hak-hak ini, sila hubungi{' '}
                <a
                  href="mailto:support@tanyaler.com"
                  className="text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  support@tanyaler.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Cookies
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Kami menggunakan cookies asas untuk memastikan fungsi platform
                berjalan dengan baik (contoh: sesi log masuk). Kami tidak
                menggunakan cookies untuk pengiklanan atau tracking pihak ketiga.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                8. Perubahan Dasar
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Kami mungkin mengemaskini dasar privasi ini dari semasa ke
                semasa. Perubahan penting akan dimaklumkan melalui e-mel kepada
                pengguna berdaftar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                9. Hubungi Kami
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Sekiranya anda mempunyai pertanyaan tentang dasar privasi ini,
                sila hubungi:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mt-4">
                <p className="font-semibold text-slate-900 mb-1">
                  TanyaLer Support
                </p>
                <a
                  href="mailto:support@tanyaler.com"
                  className="text-emerald-700 hover:text-emerald-800"
                >
                  support@tanyaler.com
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
