'use client';

import Link from 'next/link';

const shareUrl = 'https://tanyaler.my/blog/beza-tender-sebutharga-pembelian-terus-eperolehan';
const shareTitle = 'Beza Tender, Sebutharga dan Pembelian Terus — Panduan Lengkap untuk Vendor';

export default function ArticleTenderSebutharga() {
  const shareWhatsapp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareThreads = () => window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-emerald-600">Utama</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Asas ePerolehan</span>
        </div>

        <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-4">Asas ePerolehan</span>

        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
          Beza Tender, Sebutharga dan Pembelian Terus — Panduan Lengkap untuk Vendor
        </h1>

        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
          <span>30 Apr 2026</span><span>·</span><span>9 min baca</span><span>·</span><span>Oleh Pasukan TanyaLer</span>
        </div>

        <div className="prose prose-slate max-w-none">

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Soalan ini kerap ditanya oleh vendor baru dalam sistem ePerolehan Malaysia: <strong>"Saya perlu tender ke sebutharga ke pembelian terus?"</strong> Jawapannya bergantung kepada nilai kontrak, jenis bekalan atau perkhidmatan, dan agensi kerajaan yang terlibat.
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Memahami perbezaan ketiga-tiga kaedah ini bukan sekadar pengetahuan asas — ia adalah kelebihan strategik. Vendor yang faham mekanisme perolehan kerajaan tahu di mana untuk fokus, berapa peluang yang ada, dan bagaimana meningkatkan kadar kejayaan mereka.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Gambaran Keseluruhan 3 Kaedah Perolehan</h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-3 text-left rounded-tl-lg">Kaedah</th>
                  <th className="p-3 text-left">Had Nilai</th>
                  <th className="p-3 text-left">Proses</th>
                  <th className="p-3 text-left rounded-tr-lg">Masa</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 bg-white">
                  <td className="p-3 font-semibold text-slate-900">Pembelian Terus</td>
                  <td className="p-3 text-slate-600">Hingga RM50,000</td>
                  <td className="p-3 text-slate-600">Terus ke vendor berdaftar</td>
                  <td className="p-3 text-slate-600">1-2 minggu</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Sebutharga</td>
                  <td className="p-3 text-slate-600">RM50,001 – RM500,000</td>
                  <td className="p-3 text-slate-600">Undangan 5 vendor minimum</td>
                  <td className="p-3 text-slate-600">4-8 minggu</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-900">Tender</td>
                  <td className="p-3 text-slate-600">Melebihi RM500,000</td>
                  <td className="p-3 text-slate-600">Terbuka kepada semua vendor layak</td>
                  <td className="p-3 text-slate-600">3-6 bulan</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 mb-8 italic">*Had nilai adalah panduan umum. Nilai sebenar mungkin berbeza mengikut pekeliling terkini dan jenis perolehan.</p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">1. Pembelian Terus — Peluang Terbesar untuk Vendor Kecil</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Pembelian Terus adalah kaedah perolehan paling ringkas. Agensi kerajaan boleh membeli terus daripada vendor berdaftar tanpa perlu melalui proses sebutharga atau tender yang panjang, selagi nilai pembelian tidak melebihi had yang ditetapkan.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Bagi vendor yang baru bermula, <strong>Pembelian Terus adalah pintu masuk terbaik</strong> ke dalam ekosistem perolehan kerajaan. Anda tidak perlu bersaing dengan ramai pihak, proses lebih cepat, dan bayaran lebih pantas.
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6">
            <p className="text-emerald-800 font-semibold text-sm">
              💡 Strategi: Pastikan profil ePerolehan anda lengkap dan kategori bekalan/perkhidmatan tepat. Agensi kerajaan mencari vendor melalui carian dalam sistem — profil yang lengkap meningkatkan peluang anda dipilih untuk Pembelian Terus.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">2. Sebutharga — Zon Pertengahan yang Kompetitif</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Sebutharga digunakan untuk perolehan bernilai antara RM50,001 hingga RM500,000. Berbeza dengan tender terbuka, sebutharga hanya melibatkan <strong>undangan kepada vendor tertentu</strong> — biasanya 5 vendor atau lebih yang dipilih oleh agensi.
          </p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Ini bermakna anda perlu <strong>dikenali</strong> oleh agensi kerajaan untuk mendapat undangan sebutharga. Cara terbaik? Pastikan rekod prestasi anda dalam sistem ePerolehan cemerlang, respons pantas kepada Pembelian Terus, dan kekalkan hubungan profesional dengan pegawai agensi berkaitan.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">3. Tender — Pertandingan Besar, Ganjaran Besar</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Tender adalah kaedah perolehan untuk projek atau kontrak bernilai melebihi RM500,000. Proses tender adalah terbuka kepada semua vendor yang memenuhi syarat kelayakan, dan keputusan dibuat berdasarkan penilaian teknikal dan kewangan yang komprehensif.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Menyertai tender memerlukan persiapan yang lebih teliti — dokumen yang lebih banyak, spesifikasi teknikal yang lengkap, dan harga yang kompetitif. Kesilapan kecil dalam dokumentasi boleh menyebabkan tawaran anda ditolak walaupun harga anda paling rendah.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <h3 className="font-black text-amber-800 mb-2">⚠️ Ralat Lazim dalam Tender</h3>
            <ul className="space-y-2 text-amber-700 text-sm">
              <li>• Dokumen sokongan tidak lengkap atau tidak disahkan</li>
              <li>• TCC atau Sijil PKK sudah tamat tempoh</li>
              <li>• Spesifikasi teknikal tidak memenuhi keperluan minimum</li>
              <li>• Harga tidak merangkumi semua komponen yang diperlukan</li>
              <li>• Hantar tawaran selepas tarikh tutup</li>
            </ul>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Kaedah Mana Yang Sesuai Untuk Anda?</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Jawapannya bergantung kepada tahap perkembangan syarikat anda:
          </p>

          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-emerald-400 pl-5">
              <p className="font-bold text-slate-900">Vendor Baru (0-2 tahun)</p>
              <p className="text-slate-600 text-sm mt-1">Fokus kepada Pembelian Terus. Bina rekod prestasi, tingkatkan rating vendor, dan kumpul pengalaman sebelum masuk ke sebutharga.</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-5">
              <p className="font-bold text-slate-900">Vendor Pertengahan (2-5 tahun)</p>
              <p className="text-slate-600 text-sm mt-1">Aktifkan untuk sebutharga. Gunakan rekod prestasi yang ada untuk mendapat undangan dari agensi kerajaan yang lebih besar.</p>
            </div>
            <div className="border-l-4 border-purple-400 pl-5">
              <p className="font-bold text-slate-900">Vendor Berpengalaman (5+ tahun)</p>
              <p className="text-slate-600 text-sm mt-1">Sertai tender bernilai tinggi. Pada peringkat ini, anda sudah ada modal reputasi, pengalaman, dan kapasiti untuk projek besar.</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 my-10 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Ada soalan spesifik tentang had nilai atau prosedur?</h3>
            <p className="text-slate-600 text-sm mb-5">
              TanyaLer boleh jawab soalan berkaitan had nilai terkini, syarat kelayakan, dan prosedur betul untuk setiap kaedah perolehan — terus dari pekeliling rasmi.
            </p>
            <Link href="/chat" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-all">
              Tanya TanyaLer — Percuma
            </Link>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Rumusan</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Pembelian Terus, Sebutharga, dan Tender bukan tiga pilihan yang sama — ia adalah tiga peringkat berbeza dalam ekosistem perolehan kerajaan Malaysia. Vendor yang bijak tahu cara menggunakan ketiga-tiganya secara strategik untuk memaksimumkan peluang dan pendapatan mereka.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Mulakan di mana anda berada sekarang. Bina reputasi. Naik tangga secara sistematik. Dan apabila anda ada soalan tentang peraturan atau prosedur, <Link href="/chat" className="text-emerald-600 font-semibold hover:underline">TanyaLer ada untuk membantu</Link>.
          </p>

        </div>

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

        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Artikel Berkaitan</p>
          <div className="space-y-3">
            <Link href="/blog/apa-itu-tcc-sijil-pematuhan-cukai-eperolehan" className="block text-emerald-600 hover:underline text-sm font-medium">→ Apa Itu TCC? Sijil Pematuhan Cukai yang Wajib Ada</Link>
            <Link href="/blog/sebab-vendor-gagal-eperolehan-bukan-sebab-harga" className="block text-emerald-600 hover:underline text-sm font-medium">→ 7 Sebab Vendor Gagal ePerolehan</Link>
            <Link href="/pricing" className="block text-emerald-600 hover:underline text-sm font-medium">→ Lihat Pelan TanyaLer — Mulakan dengan Percuma</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
