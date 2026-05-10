'use client';

import Link from 'next/link';

const shareUrl = 'https://tanyaler.my/blog/apa-itu-tcc-sijil-pematuhan-cukai-eperolehan';
const shareTitle = 'Apa Itu TCC? Sijil Pematuhan Cukai yang Wajib Ada Sebelum Menang Tender';

export default function ArticleTCC() {
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
          <span className="text-slate-600">TCC & Sijil Pematuhan</span>
        </div>

        {/* Category */}
        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
          Pematuhan & Sijil
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
          Apa Itu TCC? Sijil Pematuhan Cukai yang Wajib Ada Sebelum Menang Tender
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
          <span>2 Mei 2026</span>
          <span>·</span>
          <span>7 min baca</span>
          <span>·</span>
          <span>Oleh Pasukan TanyaLer</span>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Bayangkan anda telah bersusah payah menyediakan dokumen tender selama seminggu. Harga kompetitif. Spesifikasi teknikal lengkap. Semua borang ditandatangani. Tapi permohonan anda ditolak atas satu sebab mudah — <strong>Tax Compliance Certificate (TCC) anda telah tamat tempoh tiga hari yang lalu.</strong>
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Ini bukan cerita rekaan. Ia berlaku kepada ratusan vendor setiap tahun di seluruh Malaysia. Dan yang paling menyedihkan, kesilapan ini boleh dielakkan sepenuhnya jika vendor memahami apa itu TCC, bagaimana ia berfungsi, dan bila perlu diperbaharui.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Apa Itu TCC (Tax Compliance Certificate)?</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            TCC atau Sijil Pematuhan Cukai adalah dokumen rasmi yang dikeluarkan oleh <strong>Lembaga Hasil Dalam Negeri (LHDN)</strong> yang mengesahkan bahawa sesebuah syarikat atau individu telah mematuhi semua kewajipan cukai mereka.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Dalam konteks ePerolehan Malaysia, TCC adalah <strong>syarat mandatori</strong> untuk menyertai kebanyakan tawaran tender kerajaan dan sebutharga. Tanpa TCC yang sah dan terkini, sistem ePerolehan akan menolak permohonan anda secara automatik — walaupun semua dokumen lain sempurna.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl mb-8">
            <p className="text-blue-800 font-semibold text-sm">
              📌 Penting: TCC bukan hanya bukti pembayaran cukai. Ia mengesahkan bahawa syarikat anda tiada tunggakan cukai, telah mengemukakan penyata cukai tepat pada masanya, dan mematuhi semua keperluan pelaporan LHDN.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Siapa Yang Memerlukan TCC?</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            TCC diperlukan oleh semua entiti yang ingin menyertai proses perolehan kerajaan melalui sistem ePerolehan, termasuk:
          </p>

          <ul className="space-y-2 mb-6 text-slate-600">
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Syarikat Sendirian Berhad (Sdn. Bhd.)</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Syarikat Berhad (Bhd.)</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Perniagaan milikan tunggal (Sole Proprietorship)</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Perkongsian (Partnership)</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span>Kontraktor individu yang berdaftar dengan Pusat Khidmat Kontraktor (PKK)</span></li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Berapa Lama Tempoh Sah TCC?</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            TCC yang dikeluarkan oleh LHDN mempunyai <strong>tempoh sah selama 12 bulan</strong> dari tarikh dikeluarkan. Walau bagaimanapun, beberapa agensi kerajaan mungkin memerlukan TCC yang dikeluarkan dalam tempoh 6 bulan atau lebih singkat bergantung kepada nilai dan jenis perolehan.
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Ini bermakna anda perlu <strong>memantau tarikh luput TCC anda secara aktif</strong> dan memohon pembaharuan sebelum ia tamat tempoh — bukan setelah anda kalah tender.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <h3 className="font-black text-amber-800 mb-2">⚠️ Kesilapan Lazim Vendor</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              Ramai vendor hanya ingat untuk memperbaharui TCC apabila mereka ingin menyertai tender. Pada masa itu, proses permohonan LHDN mungkin mengambil masa 2-4 minggu, menyebabkan mereka terlepas peluang tender yang ada.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Cara Memohon TCC — Langkah demi Langkah</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Terdapat dua cara untuk memohon TCC daripada LHDN:
          </p>

          <h3 className="text-lg font-bold text-slate-900 mb-3">Cara 1: Melalui MyTax (Online)</h3>
          <ol className="space-y-3 mb-6 text-slate-600">
            <li className="flex items-start gap-3"><span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span>Log masuk ke portal <strong>MyTax LHDN</strong> (mytax.hasil.gov.my)</span></li>
            <li className="flex items-start gap-3"><span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span>Pilih menu <strong>e-Hasil</strong> → <strong>Sijil Pematuhan Cukai</strong></span></li>
            <li className="flex items-start gap-3"><span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span>Isi maklumat permohonan dan tujuan TCC diperlukan</span></li>
            <li className="flex items-start gap-3"><span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span><span>Hantar permohonan — proses biasanya <strong>3-14 hari bekerja</strong></span></li>
          </ol>

          <h3 className="text-lg font-bold text-slate-900 mb-3">Cara 2: Kaunter LHDN</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Anda juga boleh hadir terus ke cawangan LHDN berhampiran dengan membawa dokumen syarikat (Sijil Pendaftaran SSM, Borang 9/13/24/49 mengikut berkenaan) dan penyata kewangan terkini.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">TCC vs Sijil Zakat — Adakah Berbeza?</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Ya, kedua-duanya berbeza. TCC adalah sijil pematuhan cukai pendapatan (income tax) yang dikeluarkan oleh LHDN. Sijil Zakat pula dikeluarkan oleh Lembaga Zakat Negeri masing-masing dan merujuk kepada pembayaran zakat perniagaan.
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Sesetengah tender kerajaan, terutamanya di peringkat negeri, mungkin memerlukan <strong>kedua-dua dokumen</strong> — TCC dan Sijil Zakat. Sentiasa semak syarat tender secara teliti sebelum menghantar permohonan.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Apa Yang Berlaku Jika TCC Tidak Sah?</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Dalam sistem ePerolehan Malaysia, TCC yang tidak sah atau tamat tempoh akan menyebabkan:
          </p>

          <ul className="space-y-2 mb-6 text-slate-600">
            <li className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1">✕</span><span>Permohonan pendaftaran vendor ditolak secara automatik</span></li>
            <li className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1">✕</span><span>Tawaran tender tidak boleh dihantar</span></li>
            <li className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1">✕</span><span>Status vendor dalam sistem ePerolehan mungkin digantung</span></li>
            <li className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1">✕</span><span>Kontrak yang sedang berjalan boleh terjejas jika tidak diperbaharui</span></li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Tips Pengurusan TCC untuk Vendor Aktif</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Set peringatan 2 bulan awal</p>
                <p className="text-slate-500 text-sm mt-1">Jangan tunggu TCC hampir luput. Mohon pembaharuan 2 bulan sebelum tarikh tamat untuk elak gangguan operasi tender.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">📁</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Simpan salinan digital</p>
                <p className="text-slate-500 text-sm mt-1">Simpan TCC dalam format PDF di Google Drive atau folder khusus. Ini memudahkan upload semasa proses tender.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">Pastikan cukai kemas kini sebelum memohon</p>
                <p className="text-slate-500 text-sm mt-1">Selesaikan semua tunggakan cukai dan hantar penyata yang tertunggak sebelum memohon TCC. Ini mempercepatkan proses kelulusan.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Soalan Lazim Tentang TCC</h2>

          <div className="space-y-5 mb-10">
            <div>
              <p className="font-bold text-slate-900 mb-1">Bolehkah saya guna TCC lama yang masih sah untuk beberapa tender?</p>
              <p className="text-slate-600 text-sm">Ya, selagi TCC masih dalam tempoh sah (belum luput), anda boleh menggunakannya untuk semua permohonan tender sepanjang tempoh tersebut.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Adakah TCC sama dengan Borang CP58?</p>
              <p className="text-slate-600 text-sm">Tidak. Borang CP58 adalah penyata pendapatan komisyen atau imbuhan untuk ejen. TCC adalah sijil pematuhan cukai yang berbeza sepenuhnya.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Berapa kos memohon TCC?</p>
              <p className="text-slate-600 text-sm">Permohonan TCC melalui LHDN adalah <strong>percuma</strong>. Tiada sebarang bayaran dikenakan oleh LHDN untuk mengeluarkan sijil ini.</p>
            </div>
          </div>

          {/* Soft CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 my-10 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Ada soalan lain tentang syarat ePerolehan?</h3>
            <p className="text-slate-600 text-sm mb-5">
              TanyaLer boleh jawab soalan spesifik berkaitan TCC, syarat vendor, pekeliling terkini dan banyak lagi — terus dari 56 dokumen rasmi ePerolehan Malaysia.
            </p>
            <Link href="/chat" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-all">
              Tanya TanyaLer Sekarang — Percuma
            </Link>
            <p className="text-xs text-slate-400 mt-3">5 soalan percuma setiap hari. Tiada kad kredit diperlukan.</p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Rumusan</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            TCC adalah satu daripada dokumen paling kritikal dalam perjalanan anda sebagai vendor kerajaan. Ia bukan sekadar formaliti — ia adalah bukti bahawa syarikat anda beroperasi secara sah dan mematuhi undang-undang cukai negara.
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Vendor yang berjaya dalam ePerolehan adalah vendor yang proaktif — mereka tidak menunggu masalah berlaku. Mereka memantau, memperbaharui, dan memastikan semua dokumen sentiasa kemas kini.
          </p>

          <p className="text-slate-600 leading-relaxed">
            Mulakan dengan semak tarikh luput TCC anda hari ini. Dan jika ada kekeliruan tentang syarat-syarat ePerolehan yang lain, <Link href="/chat" className="text-emerald-600 font-semibold hover:underline">TanyaLer sedia membantu</Link> dengan jawapan berasaskan dokumen rasmi.
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
            <Link href="/blog/pekeliling-perbendaharaan-pk-vendor-perlu-tahu" className="block text-emerald-600 hover:underline text-sm font-medium">
              → Pekeliling Perbendaharaan yang Setiap Vendor ePerolehan Wajib Tahu
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
