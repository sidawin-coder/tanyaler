'use client';
import Link from 'next/link';
const shareUrl = 'https://tanyaler.my/blog/sebab-vendor-gagal-eperolehan-bukan-sebab-harga';
const shareTitle = '7 Sebab Vendor Gagal ePerolehan — Dan Kebanyakannya Bukan Sebab Harga';
export default function ArticleGagal() {
  const shareWhatsapp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle+' '+shareUrl)}`, '_blank');
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareThreads = () => window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(shareTitle+' '+shareUrl)}`, '_blank');
  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-emerald-600">Utama</Link><span>/</span>
          <Link href="/blog" className="hover:text-emerald-600">Blog</Link><span>/</span>
          <span className="text-slate-600">Strategi Tender</span>
        </div>
        <span className="inline-block bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-4">Strategi Tender</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">7 Sebab Vendor Gagal ePerolehan — Dan Kebanyakannya Bukan Sebab Harga</h1>
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
          <span>28 Apr 2026</span><span>·</span><span>8 min baca</span><span>·</span><span>Oleh Pasukan TanyaLer</span>
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">Anda sudah letak harga paling rendah. Dokumen lengkap. Hantar sebelum tarikh tutup. Tapi nama syarikat anda tidak ada dalam senarai pemenang. Lagi sekali. Dan lagi sekali.</p>
          <p className="text-slate-600 leading-relaxed mb-6">Ini bukan nasib buruk. Ini adalah pola yang boleh dikenal pasti dan diperbaiki. Majoriti kegagalan vendor bukan disebabkan harga yang tinggi — tetapi oleh kesilapan yang boleh dielakkan.</p>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Sebab 1: Dokumen Tidak Lengkap atau Tidak Sah</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Satu dokumen yang tertinggal, satu cop yang kabur, satu tandatangan yang terlepas — dan keseluruhan tawaran anda ditolak tanpa penilaian lebih lanjut. Sistem ePerolehan tidak bertolak ansur dengan ketidaklengkapan dokumen.</p>
          <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl mb-8">
            <p className="text-red-800 text-sm font-semibold">Dokumen yang paling kerap tertinggal: TCC, Sijil PKK/CIDB, Penyata Kewangan tidak disahkan, Borang Tender tidak ditandatangani semua halaman.</p>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Sebab 2: Sijil dan Lesen Tamat Tempoh</h2>
          <p className="text-slate-600 leading-relaxed mb-6">TCC, Sijil PKK, Sijil CIDB, lesen perniagaan — semua ini mempunyai tarikh luput. Ramai vendor lupa memperbaharui sehingga tiba-tiba sedar ketika ingin menghantar tawaran tender. Pada masa itu sudah terlambat — permohonan pembaharuan memakan masa 2-4 minggu.</p>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Sebab 3: Spesifikasi Teknikal Tidak Dipenuhi</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Tender kerajaan mempunyai spesifikasi teknikal yang sangat terperinci. Vendor yang tidak membaca dokumen tender dengan teliti sering menghantar tawaran yang tidak memenuhi keperluan minimum. Ini bukan salah sistem — ini kesilapan vendor yang tidak buat kerja rumah mereka.</p>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Sebab 4: Kesilapan dalam Pengiraan Harga</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Harga terlalu rendah menimbulkan syak wasangka. Harga terlalu tinggi menjadikan anda tidak kompetitif. Kesilapan pengiraan seperti tertinggal komponen kos atau salah kira SST boleh membatalkan tawaran anda.</p>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Sebab 5: Profil ePerolehan Tidak Dikemas Kini</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Profil vendor yang lapuk — maklumat syarikat lama, kategori perkhidmatan tidak tepat, dokumen sokongan yang sudah tamat tempoh dalam sistem — semuanya boleh menyebabkan tawaran anda gagal pada peringkat pra-kelayakan.</p>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Sebab 6: Tidak Faham Skop Tender</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Ramai vendor menyertai tender tanpa benar-benar memahami skop kerja yang diperlukan. Mereka menghantar tawaran generik yang tidak menjawab keperluan spesifik agensi. Jawatankuasa penilaian mencari vendor yang memahami masalah mereka.</p>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Sebab 7: Tersalah Kategori Perolehan</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Menyertai tender yang tidak sesuai dengan kategori pendaftaran vendor anda adalah kesilapan klasik. Sistem ePerolehan akan menolak tawaran dari vendor yang tidak berdaftar dalam kategori yang berkaitan.</p>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Cara Elak — Pendekatan Sistematik</h2>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4"><span className="text-2xl">📋</span><div><p className="font-bold text-slate-900 text-sm">Buat checklist dokumen untuk setiap tender</p><p className="text-slate-500 text-sm mt-1">Jangan bergantung kepada ingatan. Buat senarai semak dan tanda setiap item sebelum hantar.</p></div></div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4"><span className="text-2xl">🗓️</span><div><p className="font-bold text-slate-900 text-sm">Pantau tarikh luput semua sijil</p><p className="text-slate-500 text-sm mt-1">Set peringatan 2 bulan awal untuk semua dokumen yang perlu diperbaharui.</p></div></div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4"><span className="text-2xl">📖</span><div><p className="font-bold text-slate-900 text-sm">Baca dokumen tender dengan teliti</p><p className="text-slate-500 text-sm mt-1">Luangkan masa untuk memahami skop, spesifikasi, dan syarat kelayakan sebelum memutuskan menyertai.</p></div></div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 my-10 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Keliru dengan peraturan atau syarat tender tertentu?</h3>
            <p className="text-slate-600 text-sm mb-5">TanyaLer boleh jawab soalan spesifik berdasarkan dokumen rasmi ePerolehan — bukan agakan.</p>
            <Link href="/chat" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-all">Tanya TanyaLer Sekarang</Link>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">Rumusan</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Kegagalan dalam ePerolehan bukan takdir. Ia adalah maklum balas. Setiap kegagalan memberitahu anda apa yang perlu diperbaiki. Vendor yang berjaya adalah mereka yang belajar dari setiap kegagalan dan membina sistem yang mengelakkan kesilapan yang sama berulang.</p>
          <p className="text-slate-600 leading-relaxed">Mulakan dengan menyemak semula tawaran terakhir anda. Di mana ia gagal? Gunakan 7 sebab di atas sebagai panduan. Dan jika ada soalan, <Link href="/chat" className="text-emerald-600 font-semibold hover:underline">TanyaLer sedia membantu</Link>.</p>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Kongsi artikel ini</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={shareWhatsapp} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">WhatsApp</button>
            <button onClick={shareFacebook} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">Facebook</button>
            <button onClick={shareThreads} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">Threads</button>
            <button onClick={shareTwitter} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">X</button>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Artikel Berkaitan</p>
          <div className="space-y-3">
            <Link href="/blog/beza-tender-sebutharga-pembelian-terus-eperolehan" className="block text-emerald-600 hover:underline text-sm font-medium">→ Beza Tender, Sebutharga dan Pembelian Terus</Link>
            <Link href="/blog/strategi-harga-tender-kerajaan-malaysia" className="block text-emerald-600 hover:underline text-sm font-medium">→ Strategi Harga Tender Kerajaan Malaysia</Link>
            <Link href="/pricing" className="block text-emerald-600 hover:underline text-sm font-medium">→ Lihat Pelan TanyaLer — Mulakan dengan Percuma</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
