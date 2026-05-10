'use client';

import Link from 'next/link';

const shareUrl = 'https://tanyaler.my/blog/cara-semak-status-permohonan-eperolehan';
const shareTitle = 'Cara Semak Status Permohonan dan Dokumen dalam ePerolehan — Langkah demi Langkah';

export default function ArticleSemak() {
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
          <span className="text-slate-600">Panduan Praktikal</span>
        </div>

        {/* Category */}
        <span className="inline-block bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
          Panduan Praktikal
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
          Cara Semak Status Permohonan dan Dokumen dalam ePerolehan — Langkah demi Langkah
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
          <span>25 Apr 2026</span>
          <span>·</span>
          <span>6 min baca</span>
          <span>·</span>
          <span>Oleh Pasukan TanyaLer</span>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Anda telah menghantar permohonan pendaftaran vendor atau tawaran tender dalam sistem ePerolehan — dan sekarang anda tertanya-tanya: <strong>apa status permohonan saya? Adakah dokumen saya sudah diterima? Kenapa dah seminggu tiada maklum balas?</strong>
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Ini adalah situasi yang dialami oleh hampir semua vendor baru. Portal ePerolehan mempunyai fungsi semakan status yang lengkap — masalahnya, ramai vendor tidak tahu di mana hendak mencarinya atau bagaimana membaca maklumat yang dipaparkan.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Jenis-Jenis Status dalam Sistem ePerolehan</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Sebelum mula semak, fahami dahulu apakah yang dimaksudkan oleh setiap status yang mungkin anda jumpa:
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 p-4">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 mt-0.5">AKTIF</span>
              <p className="text-slate-600 text-sm">Pendaftaran vendor anda sah dan lengkap. Anda layak menyertai perolehan mengikut kategori yang telah didaftarkan.</p>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 p-4">
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 mt-0.5">DALAM PROSES</span>
              <p className="text-slate-600 text-sm">Permohonan sedang disemak oleh pihak berkaitan. Status normal — boleh ambil masa 1-3 minggu.</p>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 p-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 mt-0.5">MENUNGGU DOKUMEN</span>
              <p className="text-slate-600 text-sm">Sistem atau pegawai memerlukan dokumen tambahan dari anda. Semak emel atau notifikasi dalam portal untuk maklumat lanjut.</p>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 p-4">
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 mt-0.5">DITOLAK</span>
              <p className="text-slate-600 text-sm">Permohonan tidak berjaya. Semak sebab penolakan dalam portal dan kemukakan rayuan atau permohonan baharu dengan pembetulan.</p>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 p-4">
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 mt-0.5">TAMAT TEMPOH</span>
              <p className="text-slate-600 text-sm">Pendaftaran atau dokumen telah melebihi tempoh sah. Perlu diperbaharui sebelum boleh menyertai mana-mana perolehan baharu.</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Cara Semak Status Pendaftaran Vendor</h2>

          <ol className="space-y-4 mb-8 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <div>
                <p className="font-semibold text-slate-800">Log masuk ke Portal ePerolehan</p>
                <p className="text-sm mt-1">Pergi ke <strong>www.eperolehan.gov.my</strong> dan log masuk sebagai <strong>Pentadbir Syarikat</strong> untuk akses penuh kepada semua fungsi semakan.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <div>
                <p className="font-semibold text-slate-800">Navigasi ke Profil Syarikat</p>
                <p className="text-sm mt-1">Dari menu utama, pilih <strong>"Profil Syarikat"</strong> atau <strong>"Maklumat Syarikat"</strong> untuk melihat ringkasan status keseluruhan pendaftaran.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <div>
                <p className="font-semibold text-slate-800">Semak Status Pendaftaran</p>
                <p className="text-sm mt-1">Cari bahagian <strong>"Status Pendaftaran"</strong> atau <strong>"Status Kelulusan"</strong>. Jika ada dokumen yang perlu dikemaskini, ia akan disenaraikan di sini.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <div>
                <p className="font-semibold text-slate-800">Semak Senarai Dokumen</p>
                <p className="text-sm mt-1">Pergi ke bahagian <strong>"Dokumen"</strong> atau <strong>"Lampiran"</strong> untuk melihat status setiap dokumen. Dokumen ditolak akan disertakan sebab penolakan.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
              <div>
                <p className="font-semibold text-slate-800">Semak Notifikasi dan Mesej</p>
                <p className="text-sm mt-1">Klik ikon notifikasi atau bahagian <strong>"Peti Masuk"</strong>. Semua permintaan dokumen tambahan dan makluman penting dihantar ke sini.</p>
              </div>
            </li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl mb-8">
            <p className="text-blue-800 font-semibold text-sm">
              💡 Tips: Semak juga peti masuk emel yang didaftarkan semasa permohonan. Sistem ePerolehan menghantar notifikasi penting melalui emel — termasuk permintaan dokumen tambahan dan makluman keputusan.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Cara Semak Status Tawaran Tender / Sebutharga</h2>

          <ol className="space-y-4 mb-8 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <div>
                <p className="font-semibold text-slate-800">Log masuk dan pilih "Perolehan"</p>
                <p className="text-sm mt-1">Dari dashboard utama, pilih menu <strong>"Perolehan"</strong> atau <strong>"Tawaran Saya"</strong>.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <div>
                <p className="font-semibold text-slate-800">Cari tawaran berkenaan</p>
                <p className="text-sm mt-1">Gunakan nombor rujukan tender atau nama agensi untuk mencari. Tapis mengikut tarikh atau status jika perlu.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <div>
                <p className="font-semibold text-slate-800">Baca status tawaran</p>
                <p className="text-sm mt-1">Klik tawaran berkenaan untuk status terperinci — <strong>"Sedang Dinilai"</strong>, <strong>"Berjaya"</strong>, <strong>"Tidak Berjaya"</strong>, atau <strong>"Dibatalkan"</strong>.</p>
              </div>
            </li>
          </ol>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Apa Yang Perlu Dilakukan Jika Status Tertangguh Terlalu Lama?</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Hubungi Helpdesk ePerolehan</p>
                <p className="text-slate-500 text-sm mt-1">Hubungi Pusat Operasi ePerolehan melalui talian hotline atau emel support rasmi. Sediakan nombor rujukan permohonan dan nama syarikat.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">🏢</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Hubungi Terus Agensi Berkenaan</p>
                <p className="text-slate-500 text-sm mt-1">Untuk tender spesifik, hubungi terus bahagian perolehan agensi kerajaan yang mengeluarkan tawaran. Mereka boleh beri maklumat lebih tepat tentang status penilaian.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">📄</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Semak Kelengkapan Dokumen Anda</p>
                <p className="text-slate-500 text-sm mt-1">Kelewatan sering berlaku kerana dokumen tidak jelas, tidak lengkap, atau dalam format salah. Semak semula dan muat naik semula jika perlu.</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <h3 className="font-black text-amber-800 mb-2">⚠️ Jangan Tunggu Terlalu Lama</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              Banyak vendor kehilangan peluang tender kerana tidak menyedari permohonan mereka ditangguh akibat dokumen tidak lengkap. Sistem ePerolehan tidak selalu menghantar notifikasi automatik — semak status sendiri sekurang-kurangnya dua kali seminggu.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Soalan Lazim</h2>

          <div className="space-y-5 mb-10">
            <div>
              <p className="font-bold text-slate-900 mb-1">Berapa lama proses semakan pendaftaran vendor biasanya mengambil masa?</p>
              <p className="text-slate-600 text-sm">Pendaftaran baharu: 7-21 hari bekerja. Pembaharuan: 3-7 hari bekerja. Bergantung kepada beban kerja pejabat dan kelengkapan dokumen.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Bolehkah saya menyertai tender semasa pendaftaran masih "Dalam Proses"?</p>
              <p className="text-slate-600 text-sm">Tidak. Pendaftaran mestilah berstatus "Aktif" sebelum layak menyertai mana-mana perolehan kerajaan. Pastikan pendaftaran selesai jauh sebelum tarikh tutup tender.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Apakah dokumen yang paling kerap menyebabkan kelewatan?</p>
              <p className="text-slate-600 text-sm">TCC tamat tempoh, penyata kewangan tidak diaudit, sijil SSM tidak dikemaskini, dan dokumen dimuat naik dalam resolusi terlalu rendah sehingga tidak boleh dibaca.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Apa yang perlu dilakukan jika permohonan ditolak?</p>
              <p className="text-slate-600 text-sm">Baca sebab penolakan dalam portal, perbetulkan semua isu, kumpulkan dokumen yang diperlukan, dan kemukakan permohonan baharu. Boleh hubungi helpdesk untuk penjelasan lanjut.</p>
            </div>
          </div>

          {/* Soft CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 my-10 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Ada soalan tentang prosedur ePerolehan?</h3>
            <p className="text-slate-600 text-sm mb-5">
              TanyaLer boleh jawab soalan spesifik berkaitan prosedur ePerolehan, keperluan dokumen, dan tatacara permohonan — terus dari 56 dokumen rasmi termasuk panduan vendor terkini.
            </p>
            <Link href="/apps" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-all">
              Tanya TanyaLer Sekarang — Percuma
            </Link>
            <p className="text-xs text-slate-400 mt-3">5 soalan percuma setiap hari. Tiada kad kredit diperlukan.</p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Rumusan</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Semakan status permohonan dalam ePerolehan adalah tanggungjawab aktif vendor. Sistem tidak selalu menghantar notifikasi automatik, dan kelewatan bertindak boleh menyebabkan anda terlepas peluang tender yang berharga.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Jadikan semakan status sebagai rutin dua kali seminggu. Lima minit masa anda boleh menyelamatkan peluang kontrak bernilai puluhan ribu ringgit.
          </p>

          <p className="text-slate-600 leading-relaxed">
            Jika ada prosedur ePerolehan yang masih mengelirukan, <Link href="/apps" className="text-emerald-600 font-semibold hover:underline">TanyaLer sedia membantu</Link> dengan jawapan tepat dari dokumen rasmi.
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
            <Link href="/blog/apa-itu-tcc-sijil-pematuhan-cukai-eperolehan" className="block text-emerald-600 hover:underline text-sm font-medium">
              → Apa Itu TCC? Sijil Pematuhan Cukai yang Wajib Ada Sebelum Menang Tender
            </Link>
            <Link href="/blog/sebab-vendor-gagal-eperolehan-bukan-sebab-harga" className="block text-emerald-600 hover:underline text-sm font-medium">
              → 7 Sebab Vendor Gagal ePerolehan — Dan Kebanyakannya Bukan Sebab Harga
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
