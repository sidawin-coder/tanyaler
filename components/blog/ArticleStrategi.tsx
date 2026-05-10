'use client';

import Link from 'next/link';

const shareUrl = 'https://tanyaler.my/blog/strategi-harga-tender-kerajaan-malaysia';
const shareTitle = 'Strategi Harga Tender Kerajaan: Bagaimana Vendor Berjaya Menentukan Harga yang Menang';

export default function ArticleStrategi() {
  const shareWhatsapp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareThreads = () => window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-emerald-600">Utama</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Strategi Tender</span>
        </div>

        {/* Category */}
        <span className="inline-block bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
          Strategi Tender
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
          Strategi Harga Tender Kerajaan: Bagaimana Vendor Berjaya Menentukan Harga yang Menang
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
          <span>19 Apr 2026</span>
          <span>·</span>
          <span>11 min baca</span>
          <span>·</span>
          <span>Oleh Pasukan TanyaLer</span>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Dalam dunia tender kerajaan Malaysia, harga adalah pedang bermata dua. <strong>Letak harga terlalu rendah — anda menang tender tapi rugi wang.</strong> Letak harga terlalu tinggi — tawaran anda terus ditolak di peringkat pertama penilaian. Di antara dua ekstrem ini terletak satu zon kemenangan yang perlu anda cari dengan teliti.
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Vendor berjaya dalam ePerolehan Malaysia bukan sekadar bergantung kepada nasib atau meneka harga. Mereka menggunakan pendekatan sistematik yang menggabungkan analisis kos, kajian pasaran, dan pemahaman mendalam tentang cara agensi kerajaan menilai tawaran.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Memahami Cara Agensi Kerajaan Menilai Harga</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Sebelum menetapkan harga, anda perlu faham dahulu bagaimana pihak kerajaan menilai tawaran. Penilaian bukan semata-mata tentang siapa yang paling murah — ia adalah tentang <strong>nilai terbaik untuk wang awam</strong>.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Agensi kerajaan Malaysia menggunakan dua kaedah penilaian utama:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-slate-50 rounded-2xl p-5">
              <h3 className="font-black text-slate-900 text-base mb-2">Kaedah 1: Penilaian Harga Terendah (Lowest Conforming Bid)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Digunakan untuk perolehan yang spesifikasi teknikal telah ditetapkan dengan tepat dan tiada ruang untuk variasi. Tawaran yang memenuhi semua syarat teknikal dengan harga paling rendah akan menang. Lazim digunakan untuk bekalan standard dan perkhidmatan mudah.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5">
              <h3 className="font-black text-slate-900 text-base mb-2">Kaedah 2: Penilaian Mata Wajaran (Weighted Scoring)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Harga hanya sebahagian daripada markah keseluruhan — biasanya 30% hingga 60% daripada jumlah wajaran. Baki markah diberikan kepada aspek teknikal, pengalaman syarikat, metodologi kerja, dan faktor lain. Lazim digunakan untuk tender projek, perkhidmatan profesional, dan perolehan bernilai tinggi.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl mb-8">
            <p className="text-orange-800 font-semibold text-sm">
              📌 Penting: Semak dokumen tender dengan teliti untuk tentukan kaedah penilaian yang digunakan. Strategi harga anda perlu disesuaikan mengikut kaedah penilaian — bukan satu saiz untuk semua.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Langkah 1 — Kira Kos Sebenar Anda Dahulu</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Kesilapan paling mahal yang dilakukan vendor adalah menetapkan harga tanpa mengira kos sebenar dengan tepat. Pastikan pengiraan kos anda merangkumi:
          </p>

          <ul className="space-y-2 mb-6 text-slate-600">
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span><strong>Kos langsung</strong> — bahan mentah, buruh, peralatan, perisian atau lesen yang diperlukan</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span><strong>Kos tidak langsung</strong> — overhead pejabat, utiliti, insurans, kos pentadbiran</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span><strong>Kos pematuhan</strong> — kos untuk memenuhi spesifikasi teknikal, standard kualiti, dan keperluan pelaporan</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span><strong>Kos risiko</strong> — kontinjensi untuk kelewatan, perubahan skop, atau kenaikan harga bahan</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span><strong>Margin keuntungan</strong> — sasaran keuntungan bersih yang realistik untuk perniagaan anda</span></li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <h3 className="font-black text-amber-800 mb-2">⚠️ Perangkap Harga Terlalu Rendah</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              Menawarkan harga di bawah kos sebenar untuk menang tender adalah strategi berbahaya. Selain kerugian kewangan, kegagalan melaksanakan kontrak akibat kekurangan dana boleh mengakibatkan penalti, tuntutan ganti rugi, dan yang paling buruk — penyenaraian hitam dalam sistem ePerolehan.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Langkah 2 — Buat Kajian Harga Pasaran</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Setelah mengetahui had bawah (kos sebenar anda), langkah seterusnya adalah mengetahui had atas — iaitu berapa yang pasaran sanggup bayar dan berapa yang pesaing biasanya tawarkan.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Semak Rekod Kontrak Lepas</p>
                <p className="text-slate-500 text-sm mt-1">Portal MyProcurement (www.myprocurement.gov.my) memaparkan rekod kontrak yang telah dianugerahkan beserta nilai kontrak. Gunakan maklumat ini untuk memahami julat harga yang biasanya diterima oleh agensi untuk perolehan serupa.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Analisis Sebut Harga Terdahulu</p>
                <p className="text-slate-500 text-sm mt-1">Jika anda pernah menyertai tender serupa sebelum ini, semak semula harga yang anda tawarkan berbanding pemenang. Ini memberi gambaran tentang kedudukan harga anda dalam pasaran.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Dapatkan Sebut Harga Pembekal</p>
                <p className="text-slate-500 text-sm mt-1">Untuk tender yang melibatkan pembelian bahan atau subkontrak, dapatkan sebut harga dari sekurang-kurangnya tiga pembekal berbeza sebelum menetapkan harga akhir anda.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Langkah 3 — Strategi Penetapan Harga Mengikut Jenis Perolehan</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Strategi harga yang berkesan berbeza mengikut jenis dan nilai perolehan:
          </p>

          <div className="space-y-5 mb-8">
            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">PEMBELIAN TERUS</span>
                <span className="text-slate-500 text-xs mt-1">Hingga had nilai yang ditetapkan</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Dalam Pembelian Terus, agensi membandingkan harga dari beberapa vendor pilihan mereka. Harga perlu kompetitif tetapi tidak semestinya yang paling murah — hubungan dan rekod prestasi turut mempengaruhi pilihan.
              </p>
              <p className="text-slate-600 text-sm font-semibold">Strategi: Tetapkan harga 5-10% di bawah harga pasaran semasa. Fokus pada kelajuan penghantaran dan kebolehpercayaan sebagai nilai tambah.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">SEBUTHARGA</span>
                <span className="text-slate-500 text-xs mt-1">Had nilai pertengahan</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Sebutharga melibatkan persaingan terbuka dengan beberapa vendor. Harga menjadi faktor utama tetapi dokumen teknikal dan kelayakan turut dinilai. Vendor baru sering membuat kesilapan dengan menawarkan harga terlalu murah tanpa mempertimbangkan kos pematuhan syarat teknikal.
              </p>
              <p className="text-slate-600 text-sm font-semibold">Strategi: Hitung kos dengan teliti, tambah margin 15-20%, kemudian bandingkan dengan rekod kontrak serupa dari MyProcurement.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">TENDER TERBUKA</span>
                <span className="text-slate-500 text-xs mt-1">Nilai tinggi, persaingan penuh</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Tender terbuka menggunakan sistem wajaran — harga adalah sebahagian daripada markah keseluruhan. Menawarkan harga paling murah tidak semestinya menang jika markah teknikal anda rendah.
              </p>
              <p className="text-slate-600 text-sm font-semibold">Strategi: Optimalkan markah teknikal dahulu, kemudian tetapkan harga pada tahap kompetitif (bukan semestinya paling murah). Harga 10-15% di bawah anggaran agensi biasanya berada dalam zon selamat.</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Langkah 4 — Teknik Pembentangan Harga yang Profesional</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Cara anda membentangkan harga juga mempengaruhi persepsi nilai. Berikut adalah amalan terbaik:
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Pecahkan Harga dengan Jelas (Bill of Quantities)</p>
                <p className="text-slate-500 text-sm mt-1">Sediakan senarai harga terperinci untuk setiap item atau aktiviti. Pembentangan yang teliti menunjukkan profesionalisme dan memudahkan pihak penilai memahami nilai yang ditawarkan.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Jelaskan Apa yang Termasuk (dan Tidak Termasuk)</p>
                <p className="text-slate-500 text-sm mt-1">Nyatakan dengan jelas skop kerja yang diliputi oleh harga anda. Ini mengelakkan pertikaian kemudian dan menunjukkan ketelusan yang dihargai oleh agensi kerajaan.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Berikan Tempoh Sah Tawaran yang Realistik</p>
                <p className="text-slate-500 text-sm mt-1">Jangan nyatakan tempoh sah tawaran yang terlalu singkat. Ikuti keperluan minimum yang ditetapkan dalam dokumen tender — biasanya 90 hingga 120 hari untuk tender besar.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Kesilapan Harga yang Paling Kerap Dilakukan Vendor</h2>

          <ul className="space-y-3 mb-8 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">✕</span>
              <div>
                <p className="font-semibold text-slate-800">Meneka harga tanpa kajian</p>
                <p className="text-sm mt-0.5">Menetapkan harga berdasarkan andaian atau pengalaman terdahulu yang tidak relevan dengan skop semasa.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">✕</span>
              <div>
                <p className="font-semibold text-slate-800">Tidak memasukkan GST / cukai berkaitan</p>
                <p className="text-sm mt-0.5">Kelupaan atau kekeliruan tentang sama ada harga perlu inklusif atau eksklusif cukai boleh menyebabkan kerugian besar.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">✕</span>
              <div>
                <p className="font-semibold text-slate-800">Tidak membaca spesifikasi teknikal dengan teliti</p>
                <p className="text-sm mt-0.5">Banyak vendor memberikan harga yang tidak merangkumi semua keperluan teknikal, menyebabkan kerugian apabila kontrak dilaksanakan.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">✕</span>
              <div>
                <p className="font-semibold text-slate-800">Mengabaikan kos penyampaian dan logistik</p>
                <p className="text-sm mt-0.5">Untuk bekalan atau projek di lokasi jauh, kos pengangkutan dan penginapan sering terlepas dalam pengiraan awal.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">✕</span>
              <div>
                <p className="font-semibold text-slate-800">Terlalu fokus pada menang, bukan pada keuntungan</p>
                <p className="text-sm mt-0.5">Menang tender yang tidak menguntungkan adalah lebih teruk daripada tidak menang langsung — ia menguras sumber dan boleh menjejaskan reputasi syarikat.</p>
              </div>
            </li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Soalan Lazim Tentang Strategi Harga Tender</h2>

          <div className="space-y-5 mb-10">
            <div>
              <p className="font-bold text-slate-900 mb-1">Berapa margin keuntungan yang wajar untuk tender kerajaan?</p>
              <p className="text-slate-600 text-sm">Tiada jawapan mutlak — bergantung kepada industri, risiko projek, dan keperluan aliran tunai anda. Secara umumnya, vendor berpengalaman menyasar margin bersih 10-20% untuk bekalan, dan 15-25% untuk perkhidmatan atau projek. Pastikan margin ini realistik selepas mengambil kira semua kos tersembunyi.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Adakah harga paling murah sentiasa menang dalam tender kerajaan?</p>
              <p className="text-slate-600 text-sm">Tidak selalu. Untuk tender yang menggunakan sistem wajaran (weighted scoring), harga hanya sebahagian daripada markah keseluruhan. Vendor dengan harga sederhana tetapi markah teknikal yang tinggi sering mengatasi vendor dengan harga paling murah.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Bolehkah saya turunkan harga setelah tawaran dihantar?</p>
              <p className="text-slate-600 text-sm">Secara umumnya tidak dibenarkan kecuali dalam proses rundingan (Best and Final Offer — BAFO) yang mungkin dijalankan oleh agensi selepas penilaian awal. Ikuti prosedur yang ditetapkan dalam dokumen tender.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Adakah ada anggaran harga (price estimate) yang boleh dirujuk dari pihak kerajaan?</p>
              <p className="text-slate-600 text-sm">Untuk tender terbuka, agensi kerajaan biasanya mempunyai anggaran dalaman (Anggaran Jabatan) tetapi tidak mendedahkannya secara awam. Walau bagaimanapun, rekod kontrak terdahulu dalam MyProcurement boleh memberi gambaran yang baik tentang julat harga yang biasanya diterima.</p>
            </div>
          </div>

          {/* Soft CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 my-10 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Perlu rujukan harga atau panduan spesifikasi tender?</h3>
            <p className="text-slate-600 text-sm mb-5">
              TanyaLer boleh membantu anda memahami syarat teknikal, keperluan dokumen, dan tatacara sebutharga atau tender — terus dari 56 dokumen rasmi ePerolehan Malaysia termasuk Pekeliling Perbendaharaan terkini.
            </p>
            <Link href="/apps" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-all">
              Tanya TanyaLer Sekarang — Percuma
            </Link>
            <p className="text-xs text-slate-400 mt-3">5 soalan percuma setiap hari. Tiada kad kredit diperlukan.</p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Rumusan</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Strategi harga yang berjaya dalam tender kerajaan Malaysia bukan tentang siapa yang paling berani menawarkan harga rendah — ia tentang siapa yang paling memahami kos sebenar mereka, memahami cara agensi menilai tawaran, dan mampu menyampaikan nilai terbaik pada harga yang kompetitif.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Mulakan dengan mengira kos sebenar anda dengan teliti. Kemudian buat kajian pasaran menggunakan rekod kontrak terdahulu. Sesuaikan strategi harga mengikut jenis perolehan. Dan yang paling penting — pastikan anda menang tender yang boleh dilaksanakan dengan baik dan masih memberikan keuntungan kepada syarikat anda.
          </p>

          <p className="text-slate-600 leading-relaxed">
            Untuk memahami syarat teknikal dan keperluan spesifik mana-mana tender dengan lebih mendalam, <Link href="/apps" className="text-emerald-600 font-semibold hover:underline">TanyaLer sedia membantu</Link> dengan jawapan berasaskan dokumen rasmi.
          </p>

        </div>

        {/* Share Buttons */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Kongsi artikel ini</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={shareWhatsapp} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </button>
            <button onClick={shareFacebook} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
            <button onClick={shareThreads} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.587 1.5 12.01c0-3.58.85-6.43 2.495-8.48C5.845 1.226 8.598.044 12.18.02h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.513 5.465l-2.388.382c-1.18-4.26-4.114-5.702-7.948-5.728-2.832.02-5.01.9-6.473 2.616-1.38 1.62-2.082 4.017-2.082 7.147 0 3.132.702 5.532 2.082 7.15 1.463 1.718 3.641 2.596 6.47 2.617 2.617-.02 4.353-.705 5.517-2.224.747-.977 1.2-2.185 1.384-3.7h-6.9v-2.344h9.34c-.07 1.902-.45 3.617-1.127 5.085-1.32 2.85-3.791 4.43-7.222 4.416z"/></svg>
              Threads
            </button>
            <button onClick={shareTwitter} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X
            </button>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Artikel Berkaitan</p>
          <div className="space-y-3">
            <Link href="/blog/sebab-vendor-gagal-eperolehan-bukan-sebab-harga" className="block text-emerald-600 hover:underline text-sm font-medium">
              → 7 Sebab Vendor Gagal ePerolehan — Dan Kebanyakannya Bukan Sebab Harga
            </Link>
            <Link href="/blog/beza-tender-sebutharga-pembelian-terus-eperolehan" className="block text-emerald-600 hover:underline text-sm font-medium">
              → Beza Tender, Sebutharga dan Pembelian Terus — Panduan Lengkap
            </Link>
            <Link href="/pricing" className="block text-emerald-600 hover:underline text-sm font-medium">
              → Lihat Pelan TanyaLer — Mulakan dengan Percuma
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
