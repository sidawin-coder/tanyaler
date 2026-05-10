'use client';

import Link from 'next/link';

const shareUrl = 'https://tanyaler.my/blog/pekeliling-perbendaharaan-pk-vendor-perlu-tahu';
const shareTitle = 'Pekeliling Perbendaharaan yang Setiap Vendor ePerolehan Wajib Tahu pada 2026';

export default function ArticlePekeliling() {
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
          <span className="text-slate-600">Peraturan & Pekeliling</span>
        </div>

        {/* Category */}
        <span className="inline-block bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
          Peraturan & Pekeliling
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
          Pekeliling Perbendaharaan yang Setiap Vendor ePerolehan Wajib Tahu pada 2026
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
          <span>22 Apr 2026</span>
          <span>·</span>
          <span>10 min baca</span>
          <span>·</span>
          <span>Oleh Pasukan TanyaLer</span>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Ramai vendor ePerolehan Malaysia masih beroperasi berdasarkan peraturan lama — peraturan yang mungkin sudah berubah sejak dua atau tiga tahun lepas. Akibatnya, mereka kehilangan peluang tender, gagal memenuhi syarat baru, atau lebih buruk lagi, tersenarai dalam senarai hitam kerana ketidakpatuhan yang tidak disedari.
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Pekeliling Perbendaharaan adalah dokumen dasar utama yang mengawal selia seluruh sistem perolehan kerajaan Malaysia. Ia bukan sekadar dokumen pentadbiran — ia adalah <strong>peraturan permainan yang menentukan siapa boleh menang dan siapa yang gagal memenuhi syarat</strong> sejak dari peringkat pendaftaran.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Apa Itu Pekeliling Perbendaharaan?</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Pekeliling Perbendaharaan (PP) adalah arahan rasmi yang dikeluarkan oleh <strong>Kementerian Kewangan Malaysia</strong> kepada semua agensi kerajaan persekutuan berkaitan tatacara pengurusan kewangan dan perolehan awam. Ia mempunyai kuasa perundangan di bawah Akta Tatacara Kewangan 1957.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Dalam konteks ePerolehan, Pekeliling Perbendaharaan menentukan:
          </p>

          <ul className="space-y-2 mb-6 text-slate-600">
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Had nilai untuk setiap kaedah perolehan (Pembelian Terus, Sebutharga, Tender)</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Syarat kelayakan vendor dan kontraktor</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Prosedur penilaian dan pemilihan tawaran</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Keperluan dokumen sokongan bagi setiap permohonan</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Hak dan tanggungjawab vendor selepas kontrak dianugerahkan</span></li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl mb-8">
            <p className="text-red-800 font-semibold text-sm">
              📌 Penting: Pekeliling Perbendaharaan dikemaskini dari semasa ke semasa. Vendor yang tidak mengikuti perubahan ini berisiko gagal memenuhi syarat kelayakan walaupun mereka telah berdaftar dalam sistem ePerolehan selama bertahun-tahun.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Siri Pekeliling Perbendaharaan — Yang Perlu Anda Tahu</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Terdapat beberapa siri Pekeliling Perbendaharaan yang relevan kepada vendor ePerolehan. Berikut adalah yang paling kritikal:
          </p>

          <div className="space-y-5 mb-8">
            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">PP 5.1</span>
                <h3 className="font-black text-slate-900 text-base">Tatacara Perolehan Kerajaan (Berkuatkuasa Jun 2025)</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pekeliling paling baharu dan paling berimpak. PP 5.1 memperkenalkan semula had nilai perolehan, memperketatkan syarat penilaian vendor Bumiputera, dan memperkenalkan keperluan dokumen tambahan untuk sebutharga melebihi RM50,000. Vendor yang aktif WAJIB memahami pekeliling ini sepenuhnya.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-slate-600 text-white text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">PP 5.0</span>
                <h3 className="font-black text-slate-900 text-base">Tatacara Perolehan — Versi Terdahulu</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Masih dirujuk untuk kontrak-kontrak yang dimulakan sebelum Jun 2025. Jika anda mempunyai kontrak aktif dari tempoh tersebut, syarat-syarat PP 5.0 masih terpakai sehingga kontrak tamat.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-slate-600 text-white text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">PP 1.1</span>
                <h3 className="font-black text-slate-900 text-base">Perbendaharaan Am — Pengurusan Kontrak</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mengawal tatacara pengurusan kontrak, termasuk prosedur tuntutan bayaran, variasi kerja, dan penamatan kontrak. Relevan kepada semua kontraktor dan pembekal yang sedang melaksanakan kontrak kerajaan.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-slate-600 text-white text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">PP 2.1</span>
                <h3 className="font-black text-slate-900 text-base">Dasar Pembelian Kerajaan — Keutamaan Tempatan</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Menggariskan dasar keutamaan kepada produk dan perkhidmatan tempatan, kontraktor Bumiputera, serta syarat kandungan tempatan (local content) untuk projek-projek tertentu. Memahami pekeliling ini membantu vendor menentukan kedudukan strategik mereka.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Perubahan Utama Dalam PP 5.1 (Jun 2025) — Impak kepada Vendor</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            PP 5.1 yang berkuatkuasa Jun 2025 adalah pekeliling paling signifikan dalam tempoh lima tahun terkini. Berikut adalah perubahan utama yang perlu difahami:
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Had Nilai Perolehan Dikemaskini</p>
                <p className="text-slate-500 text-sm mt-1">Had nilai untuk Pembelian Terus, Sebutharga dan Tender telah disemak semula. Vendor perlu semak semula kategori perolehan yang sesuai dengan kapasiti syarikat mereka berdasarkan had nilai baharu ini.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Keperluan Dokumen Tambahan untuk Sebutharga &gt; RM50,000</p>
                <p className="text-slate-500 text-sm mt-1">Sebutharga melebihi RM50,000 kini memerlukan penyata kewangan yang telah diaudit (dua tahun terkini) dan surat sokongan bank. Vendor yang tidak menyediakan dokumen ini awal akan ketinggalan.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">🏷️</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Pengesahan Semula Status Vendor Bumiputera</p>
                <p className="text-slate-500 text-sm mt-1">Proses pengesahan semula status Bumiputera diperketatkan. Vendor yang menuntut keutamaan Bumiputera perlu mengemukakan dokumen sokongan yang lebih lengkap berbanding sebelum ini.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Tempoh Sah Tawaran Dilanjutkan</p>
                <p className="text-slate-500 text-sm mt-1">Tempoh sah tawaran untuk tender besar kini dilanjutkan dari 90 hari kepada 120 hari. Vendor perlu mengambil kira perubahan ini dalam perancangan aliran tunai semasa menyertai tender bernilai tinggi.</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <h3 className="font-black text-amber-800 mb-2">⚠️ Amaran Penting</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              Ketidakpatuhan kepada Pekeliling Perbendaharaan yang berkuatkuasa bukan sahaja menyebabkan tawaran ditolak — dalam kes yang serius, ia boleh mengakibatkan penggantungan pendaftaran vendor dalam sistem ePerolehan. Pastikan anda sentiasa mengikuti kemaskini terkini.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Cara Akses Pekeliling Perbendaharaan Terkini</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Semua Pekeliling Perbendaharaan yang sah dan terkini boleh diakses melalui saluran rasmi berikut:
          </p>

          <ol className="space-y-3 mb-6 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Portal rasmi <strong>Kementerian Kewangan Malaysia</strong> (www.mof.gov.my) — bahagian Perbendaharaan Am</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Portal <strong>ePerolehan</strong> (www.eperolehan.gov.my) — bahagian Rujukan Dasar & Pekeliling</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span><strong>TanyaLer</strong> — tanya soalan spesifik berkaitan kandungan pekeliling dan dapatkan jawapan terus dari dokumen rasmi</span>
            </li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Soalan Lazim Tentang Pekeliling Perbendaharaan</h2>

          <div className="space-y-5 mb-10">
            <div>
              <p className="font-bold text-slate-900 mb-1">Adakah saya perlu baca semua Pekeliling Perbendaharaan?</p>
              <p className="text-slate-600 text-sm">Tidak semestinya. Fokus kepada pekeliling yang berkaitan dengan jenis perolehan dan nilai kontrak yang anda sertai. PP 5.1 adalah keutamaan mutlak untuk semua vendor aktif pada 2026.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Bagaimana jika pekeliling baharu bercanggah dengan kontrak sedia ada?</p>
              <p className="text-slate-600 text-sm">Secara umumnya, kontrak yang telah ditandatangani akan terus tertakluk kepada syarat asal semasa kontrak dianugerahkan. Pekeliling baharu hanya terpakai kepada perolehan baharu. Namun, rujuk keperluan kontrak anda secara spesifik untuk kepastian.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Di mana saya boleh semak sama ada pendaftaran vendor saya masih mematuhi pekeliling terkini?</p>
              <p className="text-slate-600 text-sm">Log masuk ke portal ePerolehan dan semak profil vendor anda. Sebarang dokumen yang perlu dikemaskini akan ditunjukkan dalam bahagian notifikasi atau status pendaftaran. Anda juga boleh hubungi Pusat Khidmat Kontraktor (PKK) untuk panduan lanjut.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Berapa kerap Pekeliling Perbendaharaan dikemaskini?</p>
              <p className="text-slate-600 text-sm">Tiada jadual tetap. Kemaskini berlaku apabila terdapat keperluan dasar, perubahan ekonomi, atau arahan kerajaan baharu. Rata-rata, pekeliling utama dikemaskini setiap dua hingga empat tahun, manakala pekeliling tambahan boleh dikeluarkan pada bila-bila masa.</p>
            </div>
          </div>

          {/* Soft CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 my-10 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Ada soalan spesifik tentang Pekeliling Perbendaharaan?</h3>
            <p className="text-slate-600 text-sm mb-5">
              TanyaLer boleh jawab soalan berkaitan kandungan pekeliling, had nilai perolehan, syarat vendor, dan banyak lagi — terus dari 56 dokumen rasmi ePerolehan Malaysia termasuk Pekeliling Perbendaharaan terkini.
            </p>
            <Link href="/apps" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-all">
              Tanya TanyaLer Sekarang — Percuma
            </Link>
            <p className="text-xs text-slate-400 mt-3">5 soalan percuma setiap hari. Tiada kad kredit diperlukan.</p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Rumusan</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Pekeliling Perbendaharaan bukan dokumen yang boleh diabaikan oleh mana-mana vendor yang serius dalam perolehan kerajaan Malaysia. Ia adalah asas kepada setiap keputusan yang dibuat oleh agensi kerajaan — dari cara mereka menilai tawaran anda hingga dokumen yang mereka perlukan daripada anda.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Dengan PP 5.1 yang berkuatkuasa Jun 2025, vendor yang tidak mengemas kini pengetahuan mereka berisiko berhadapan dengan penolakan tawaran atas sebab-sebab yang sepatutnya boleh dielakkan. Luangkan masa untuk memahami perubahan utama dan pastikan semua dokumen anda memenuhi keperluan terkini.
          </p>

          <p className="text-slate-600 leading-relaxed">
            Jika ada aspek pekeliling yang mengelirukan, <Link href="/apps" className="text-emerald-600 font-semibold hover:underline">TanyaLer sedia membantu</Link> dengan jawapan berasaskan dokumen rasmi — bukan andaian.
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
            <Link href="/blog/beza-tender-sebutharga-pembelian-terus-eperolehan" className="block text-emerald-600 hover:underline text-sm font-medium">
              → Beza Tender, Sebutharga dan Pembelian Terus — Panduan Lengkap
            </Link>
            <Link href="/blog/apa-itu-tcc-sijil-pematuhan-cukai-eperolehan" className="block text-emerald-600 hover:underline text-sm font-medium">
              → Apa Itu TCC? Sijil Pematuhan Cukai yang Wajib Ada Sebelum Menang Tender
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
