import Link from 'next/link';

export const metadata = {
  title: 'Terma Penggunaan — TanyaLer',
  description: 'Terma dan Syarat Penggunaan Platform TanyaLer.my oleh ILHAM KREATIF (202303225352)',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">Perundangan</p>
          <h1 className="text-4xl font-black tracking-tight mb-4">Terma & Syarat Penggunaan</h1>
          <p className="text-slate-300 text-lg">
            Platform TanyaLer.my dikendalikan oleh <strong className="text-white">ILHAM KREATIF</strong> (No. Pendaftaran: 202303225352).
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span>📅 Berkuat kuasa: 1 Mei 2026</span>
            <span>🔄 Dikemaskini: 3 Mei 2026</span>
            <span>🏛️ Versi: 1.0</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-12">
          <p className="font-bold text-amber-800 mb-2">⚠️ SILA BACA DENGAN TELITI SEBELUM MENGGUNAKAN PLATFORM INI</p>
          <p className="text-amber-700 text-sm leading-relaxed">
            Dengan mengakses atau menggunakan platform TanyaLer.my, anda bersetuju untuk terikat dengan Terma dan Syarat ini.
            Jika anda tidak bersetuju, sila hentikan penggunaan platform ini dengan serta-merta.
            Platform ini adalah untuk tujuan rujukan sahaja dan bukan nasihat profesional, undang-undang, atau rasmi.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-12">
          <h2 className="font-bold text-slate-900 mb-4">Kandungan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              ['1', 'Definisi & Interpretasi'],
              ['2', 'Penerimaan Terma'],
              ['3', 'Penerangan Perkhidmatan'],
              ['4', 'Had Liabiliti & Penafian'],
              ['5', 'Penggunaan Yang Dibenarkan'],
              ['6', 'Larangan Penggunaan'],
              ['7', 'Hak Cipta & Harta Intelek'],
              ['8', 'Polisi Kredit & Bayaran Balik'],
              ['9', 'Privasi & Perlindungan Data'],
              ['10', 'Penamatan & Penggantungan Akaun'],
              ['11', 'Perubahan Terma'],
              ['12', 'Undang-undang & Bidang Kuasa'],
            ].map(([num, title]) => (
              <a key={num} href={`#seksyen-${num}`}
                className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{num}</span>
                {title}
              </a>
            ))}
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-12">

          {/* Section 1 */}
          <section id="seksyen-1">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              1. Definisi & Interpretasi
            </h2>
            <div className="space-y-3 text-slate-700 leading-relaxed">
              <p>Dalam Terma ini, perkataan dan ungkapan berikut mempunyai maksud seperti yang dinyatakan:</p>
              <ul className="space-y-3 mt-4">
                {[
                  ['"Platform"', 'merujuk kepada laman web TanyaLer.my, aplikasinya, dan semua perkhidmatan yang disediakan oleh ILHAM KREATIF.'],
                  ['"Syarikat"', 'merujuk kepada ILHAM KREATIF (No. Pendaftaran: 202303225352), pemilik dan pengendali platform TanyaLer.my.'],
                  ['"Pengguna" atau "Anda"', 'merujuk kepada mana-mana individu atau entiti yang mengakses atau menggunakan platform ini.'],
                  ['"Perkhidmatan"', 'merujuk kepada sistem rujukan maklumat ePerolehan berasaskan AI yang disediakan melalui platform ini.'],
                  ['"Kredit"', 'merujuk kepada unit yang diperlukan untuk menggunakan perkhidmatan soal jawab dalam platform.'],
                  ['"Dokumen Rasmi"', 'merujuk kepada manual, garis panduan, dan pekeliling yang diterbitkan oleh pihak berkuasa ePerolehan Malaysia.'],
                  ['"Kandungan"', 'merujuk kepada semua teks, jawapan, analisis, dan maklumat yang dijana oleh sistem AI platform ini.'],
                ].map(([term, def]) => (
                  <li key={term} className="flex gap-3">
                    <strong className="text-emerald-700 min-w-fit">{term}</strong>
                    <span>{def}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="seksyen-2">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              2. Penerimaan Terma
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>2.1</strong> Dengan mendaftar, log masuk, atau menggunakan mana-mana bahagian platform TanyaLer.my,
                anda mengesahkan bahawa anda telah membaca, memahami, dan bersetuju untuk terikat dengan Terma ini.
              </p>
              <p>
                <strong>2.2</strong> Jika anda menggunakan platform bagi pihak syarikat atau organisasi, anda menyatakan
                bahawa anda mempunyai kuasa untuk mengikat entiti tersebut kepada Terma ini.
              </p>
              <p>
                <strong>2.3</strong> Pengguna mestilah berumur sekurang-kurangnya 18 tahun atau telah mencapai umur majoriti
                di negeri atau negara anda.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                <p className="text-red-700 font-medium text-sm">
                  ⚠️ Jika anda tidak bersetuju dengan mana-mana bahagian Terma ini, anda tidak dibenarkan menggunakan platform ini.
                  ILHAM KREATIF berhak untuk menamatkan akses anda tanpa notis jika berlaku pelanggaran Terma ini.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="seksyen-3">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              3. Penerangan Perkhidmatan
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>3.1</strong> TanyaLer.my adalah platform rujukan maklumat yang menggunakan teknologi AI untuk
                menjawab soalan berkaitan sistem ePerolehan Malaysia berdasarkan dokumen rasmi yang tersedia awam.
              </p>
              <p>
                <strong>3.2</strong> Platform ini <strong>BUKAN</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Platform atau sistem rasmi kerajaan Malaysia</li>
                <li>Wakil atau ejen Kementerian Kewangan Malaysia</li>
                <li>Penyedia nasihat undang-undang atau perkhidmatan guaman</li>
                <li>Penyedia nasihat kewangan atau pelaburan</li>
                <li>Pengganti kepada portal rasmi ePerolehan (www.eperolehan.gov.my)</li>
              </ul>
              <p>
                <strong>3.3</strong> Semua jawapan yang dijana adalah untuk tujuan panduan dan rujukan am sahaja.
                Pengguna bertanggungjawab sepenuhnya untuk mengesahkan maklumat dengan sumber rasmi sebelum membuat
                sebarang keputusan perniagaan atau undang-undang.
              </p>
              <p>
                <strong>3.4</strong> Syarikat berhak untuk mengubah, menambah, atau menghentikan mana-mana ciri
                perkhidmatan pada bila-bila masa tanpa notis awal.
              </p>
            </div>
          </section>

          {/* Section 4 - CRITICAL */}
          <section id="seksyen-4">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-red-500 pb-2 mb-6">
              4. Had Liabiliti & Penafian <span className="text-red-500 text-lg">(Kritikal)</span>
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <p className="font-bold text-red-800 mb-3">PENAFIAN PENTING — SILA BACA:</p>
              <p className="text-red-700 leading-relaxed">
                ILHAM KREATIF DAN PLATFORM TANYALER.MY TIDAK BERTANGGUNGJAWAB ATAS SEBARANG KERUGIAN,
                KEROSAKAN, ATAU AKIBAT YANG TIMBUL DARIPADA PERGANTUNGAN KEPADA MAKLUMAT YANG DISEDIAKAN
                OLEH PLATFORM INI, TERMASUK TETAPI TIDAK TERHAD KEPADA:
              </p>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <ul className="space-y-3">
                {[
                  'Kegagalan tender, sebut harga, atau permohonan kerana bergantung kepada maklumat platform ini',
                  'Kerugian kewangan akibat keputusan perniagaan yang dibuat berdasarkan jawapan AI',
                  'Tindakan undang-undang, denda, atau penalti yang dikenakan oleh pihak berkuasa',
                  'Ketidaktepatan, keusangan, atau ketidaklengkapan maklumat yang disediakan',
                  'Gangguan perkhidmatan, masa tidak beroperasi, atau masalah teknikal',
                  'Penggunaan maklumat platform oleh pihak ketiga',
                  'Sebarang keputusan yang dibuat berdasarkan jawapan AI tanpa pengesahan dengan sumber rasmi',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-red-500 font-bold mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                <strong>4.2</strong> Jumlah maksimum liabiliti Syarikat kepada pengguna dalam apa jua keadaan
                adalah terhad kepada jumlah yang dibayar oleh pengguna kepada Syarikat dalam tempoh 30 hari
                sebelum tuntutan timbul.
              </p>
              <p>
                <strong>4.3</strong> Pengguna dengan ini <strong>melepaskan, membebaskan, dan menjaga Syarikat</strong>,
                pengarahnya, pekerjanya, dan ejennya daripada sebarang tuntutan, kerugian, atau liabiliti
                yang berkaitan dengan penggunaan platform ini.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="seksyen-5">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              5. Penggunaan Yang Dibenarkan
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>Pengguna dibenarkan untuk:</p>
              <ul className="space-y-2 mt-3">
                {[
                  'Menggunakan platform untuk mendapatkan panduan am berkaitan ePerolehan Malaysia',
                  'Merujuk maklumat yang dijana sebagai titik permulaan kajian peribadi',
                  'Berkongsi jawapan untuk tujuan pembelajaran dan maklumat am (dengan atribusi kepada TanyaLer.my)',
                  'Menggunakan platform untuk latihan dan pembangunan kapasiti dalaman organisasi',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="seksyen-6">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              6. Larangan Penggunaan
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>Pengguna <strong>DILARANG KERAS</strong> daripada:</p>
              <ul className="space-y-3 mt-3">
                {[
                  'Menggunakan platform untuk aktiviti haram, penipuan, atau menyalahi undang-undang Malaysia',
                  'Cuba untuk "reverse engineer", menyalin, atau meniru sistem, algoritma, atau kandungan platform',
                  'Menggunakan bot, scraper, atau alatan automatik untuk mengekstrak data atau kandungan platform',
                  'Memasukkan kod hasad, injection attacks, atau cubaan untuk menjejaskan keselamatan sistem',
                  'Berkongsi akaun atau kredit dengan pengguna lain tanpa kebenaran bertulis Syarikat',
                  'Menggunakan platform untuk mencipta produk atau perkhidmatan yang bersaing secara langsung',
                  'Membuat tuntutan palsu bahawa platform adalah sistem rasmi kerajaan',
                  'Mengumpul atau memproses data peribadi pengguna lain melalui platform',
                  'Menggunakan platform untuk tujuan promosi atau pengiklanan tanpa kebenaran Syarikat',
                  'Melakukan sebarang tindakan yang boleh menjejaskan reputasi atau operasi platform',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-red-500 font-bold mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm bg-slate-100 rounded-xl p-4">
                Pelanggaran mana-mana larangan di atas boleh mengakibatkan penamatan akaun serta-merta,
                tanpa bayaran balik, dan Syarikat berhak mengambil tindakan undang-undang yang sesuai.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="seksyen-7">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              7. Hak Cipta & Harta Intelek
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>7.1</strong> Semua kandungan platform TanyaLer.my, termasuk teks, grafik, antara muka pengguna,
                kod sumber, algoritma, kaedah pemprosesan, dan reka bentuk, adalah hak milik eksklusif
                <strong> ILHAM KREATIF</strong> dan dilindungi oleh undang-undang hak cipta Malaysia
                (Akta Hak Cipta 1987) serta undang-undang harta intelek antarabangsa.
              </p>
              <p>
                <strong>7.2</strong> Nama "TanyaLer", logo, dan tanda dagangan berkaitan adalah harta intelek
                ILHAM KREATIF. Penggunaan tanpa kebenaran bertulis adalah dilarang.
              </p>
              <p>
                <strong>7.3</strong> Dokumen rasmi ePerolehan yang dirujuk oleh sistem ini adalah milik
                pihak berkuasa masing-masing. Platform ini hanya menggunakan dokumen tersedia awam sebagai
                sumber rujukan sesuai dengan peruntukan Akta Hak Cipta 1987 (Seksyen 3).
              </p>
              <p>
                <strong>7.4</strong> Pengguna tidak memperoleh sebarang hak ke atas harta intelek Syarikat
                melalui penggunaan platform ini.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="seksyen-8">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              8. Polisi Kredit & Bayaran Balik
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p><strong>8.1 Kredit Percuma (Explorer)</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>5 kredit percuma diberikan setiap hari</li>
                <li>Kredit diperbaharui pada tengah malam setiap hari</li>
                <li>Kredit yang tidak digunakan tidak akan dibawa ke hari berikutnya</li>
              </ul>

              <p className="mt-4"><strong>8.2 Kredit Berbayar</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Rintis (RM39):</strong> 50 kredit, sah 45 hari, tiada rollover</li>
                <li><strong>Strategis (RM89):</strong> 200 kredit, sah 120 hari, rollover aktif</li>
                <li><strong>Prestij (RM199):</strong> 500 kredit, sah 250 hari, rollover aktif</li>
              </ul>

              <p className="mt-4"><strong>8.3 Polisi Bayaran Balik</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Bayaran balik boleh dimohon dalam tempoh 7 hari bekerja dari tarikh pembelian</li>
                <li>Hanya kredit yang belum digunakan layak untuk bayaran balik</li>
                <li>Permohonan bayaran balik hendaklah dikemukakan ke support@tanyaler.my</li>
                <li>Syarikat berhak menolak permohonan bayaran balik jika terdapat bukti penyalahgunaan</li>
              </ul>

              <p className="mt-4"><strong>8.4 Rollover Kredit</strong></p>
              <p>
                Pengguna pelan Strategis dan Prestij layak untuk membawa kredit berbaki ke tempoh
                pembaharuan berikutnya (rollover). Kredit yang dibawa adalah terhad kepada baki kredit
                semasa tempoh berakhir.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="seksyen-9">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              9. Privasi & Perlindungan Data
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>9.1</strong> Pengumpulan dan pemprosesan data peribadi pengguna adalah tertakluk kepada
                <Link href="/privacy" className="text-emerald-700 underline ml-1">Dasar Privasi</Link> kami
                yang mematuhi Akta Perlindungan Data Peribadi 2010 (PDPA).
              </p>
              <p>
                <strong>9.2</strong> Dengan menggunakan platform ini, anda bersetuju kepada pengumpulan dan
                pemprosesan data anda seperti yang dihuraikan dalam Dasar Privasi kami.
              </p>
              <p>
                <strong>9.3</strong> Syarikat tidak akan menjual, memindahkan, atau mendedahkan data peribadi
                pengguna kepada pihak ketiga tanpa persetujuan kecuali seperti yang dinyatakan dalam Dasar Privasi
                atau sebagaimana yang dikehendaki oleh undang-undang.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="seksyen-10">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              10. Penamatan & Penggantungan Akaun
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>10.1</strong> Syarikat berhak untuk menggantung atau menamatkan akaun pengguna
                pada bila-bila masa, dengan atau tanpa sebab, termasuk:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Pelanggaran mana-mana peruntukan Terma ini</li>
                <li>Aktiviti yang mencurigakan atau penggunaan yang menyalahi undang-undang</li>
                <li>Percubaan untuk menjejaskan keselamatan atau integriti sistem</li>
                <li>Permintaan dari pihak berkuasa yang berwajib</li>
              </ul>
              <p>
                <strong>10.2</strong> Pengguna boleh menamatkan akaun mereka pada bila-bila masa dengan
                menghubungi support@tanyaler.my. Kredit berbayar yang masih berbaki tertakluk kepada
                Polisi Bayaran Balik (Seksyen 8.3).
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="seksyen-11">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              11. Perubahan Terma
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>11.1</strong> Syarikat berhak untuk mengubah atau mengemas kini Terma ini pada
                bila-bila masa. Perubahan material akan dimaklumkan kepada pengguna melalui:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Notis di halaman utama platform</li>
                <li>E-mel kepada pengguna berdaftar (jika berkenaan)</li>
                <li>Kemaskini tarikh "Dikemaskini" di bahagian atas halaman ini</li>
              </ul>
              <p>
                <strong>11.2</strong> Penggunaan berterusan platform selepas perubahan Terma diterbitkan
                dianggap sebagai penerimaan terma yang telah dikemas kini.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="seksyen-12">
            <h2 className="text-2xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-6">
              12. Undang-undang & Bidang Kuasa
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>12.1</strong> Terma ini ditadbir oleh dan ditafsirkan mengikut undang-undang Malaysia.
              </p>
              <p>
                <strong>12.2</strong> Sebarang pertikaian yang timbul daripada atau berkaitan dengan Terma ini
                atau penggunaan platform ini hendaklah diselesaikan melalui bidang kuasa eksklusif mahkamah
                di Malaysia.
              </p>
              <p>
                <strong>12.3</strong> Jika mana-mana peruntukan Terma ini didapati tidak sah atau tidak boleh
                dikuatkuasakan, peruntukan lain akan terus berkuat kuasa sepenuhnya.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-emerald-50 rounded-2xl p-8 mt-8">
            <h2 className="text-xl font-black text-slate-900 mb-4">Hubungi Kami</h2>
            <p className="text-slate-700 mb-4">
              Jika anda mempunyai sebarang soalan berkaitan Terma ini, sila hubungi kami:
            </p>
            <div className="space-y-2 text-slate-700">
              <p><strong>Syarikat:</strong> ILHAM KREATIF</p>
              <p><strong>No. Pendaftaran:</strong> 202303225352</p>
              <p><strong>E-mel:</strong> <a href="mailto:support@tanyaler.my" className="text-emerald-700 underline">support@tanyaler.my</a></p>
              <p><strong>Platform:</strong> <a href="https://tanyaler.my" className="text-emerald-700 underline">tanyaler.my</a></p>
            </div>
          </section>

        </div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-emerald-700 hover:underline text-sm">
            ← Kembali ke Laman Utama
          </Link>
          <span className="mx-4 text-slate-300">|</span>
          <Link href="/privacy" className="text-emerald-700 hover:underline text-sm">
            Dasar Privasi →
          </Link>
        </div>
      </div>
    </div>
  );
}
