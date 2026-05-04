import Link from 'next/link';

export const metadata = {
  title: 'Manual Pengguna — TanyaLer | Panduan Lengkap Penggunaan Sistem',
  description: 'Panduan lengkap cara guna TanyaLer dari A hingga Z. Daftar akaun, faham kredit, cara bertanya yang berkesan, dan tips pengguna pro.',
};

const STEPS = [
  {
    id: 'langkah-01',
    num: '01',
    emoji: '👤',
    title: 'Daftar Akaun',
    desc: 'Daftar menggunakan akaun Google anda dalam masa 30 saat. Tiada borang panjang, tiada kata laluan baru.',
    steps: [
      'Klik butang "Cuba Percuma" atau "Mulakan Sekarang"',
      'Klik "Teruskan dengan Google"',
      'Pilih akaun Google anda',
      'Anda akan dibawa terus ke halaman chat',
      'Tiada langkah tambahan — terus boleh tanya soalan',
    ],
    tip: 'Guna akaun Google utama anda supaya mudah log masuk pada masa hadapan.',
    next: 'langkah-02',
    nextLabel: 'Faham Dashboard Anda',
  },
  {
    id: 'langkah-02',
    num: '02',
    emoji: '📊',
    title: 'Faham Dashboard Anda',
    desc: 'Dashboard adalah pusat kawalan anda. Di sini anda dapat melihat semua maklumat penting.',
    steps: [
      'Kredit berbaki hari ini — ditunjukkan di bahagian atas',
      'Badge status kredit: hijau (cukup), kuning (hampir habis), merah (kritikal)',
      'Butang biru besar: klik untuk mula bertanya',
      'Soalan yang pernah ditanya kekal dalam sesi semasa',
      'Log keluar dengan klik butang "Keluar" di sudut kanan atas',
    ],
    tip: 'Kredit Explorer (percuma) diperbaharui setiap tengah malam. Kredit berbayar tidak luput sehingga tamat tempoh pelan.',
    next: 'langkah-03',
    nextLabel: 'Cara Bertanya yang Berkesan',
  },
  {
    id: 'langkah-03',
    num: '03',
    emoji: '💬',
    title: 'Cara Bertanya yang Berkesan',
    desc: 'Cara anda bertanya menentukan kualiti jawapan. Ikut panduan ini untuk hasil terbaik.',
    steps: [
      'Tanya SATU soalan pada satu masa — sistem proses 1 soalan per kredit',
      'Jadikan soalan spesifik: "Cara daftar ePerolehan buat kali pertama" lebih baik dari "cara daftar"',
      'Sertakan konteks: "Syarikat saya Kelas F, boleh saya tender projek RM200k?"',
      'Bertanya dalam Bahasa Malaysia, English, atau Bahasa Cina — semua disokong',
      'Tekan Enter atau klik butang hantar untuk menghantar soalan',
      'Boleh tanya soalan susulan dalam sesi yang sama',
    ],
    tip: 'Soalan yang spesifik = Jawapan yang lebih tepat dengan rujukan fail yang lebih relevan.',
    next: 'langkah-04',
    nextLabel: 'Baca Jawapan dengan Bijak',
  },
  {
    id: 'langkah-04',
    num: '04',
    emoji: '📖',
    title: 'Baca Jawapan dengan Bijak',
    desc: 'Setiap jawapan TanyaLer mengandungi maklumat tersusun dengan ciri-ciri SYSTEM TANYALER V5.0.',
    steps: [
      'Jawapan utama — penjelasan tepat berdasarkan dokumen rasmi',
      'Badge rujukan fail (biru) — nama fail spesifik yang menjadi sumber jawapan',
      'Badge Ketepatan — Tinggi (80%+), Sederhana (55-79%), Rendah (<55%)',
      'PENAFIAN RASMI (merah) — peringatan untuk sahkan dengan sumber rasmi',
      'Butang 👍 👎 — beri maklum balas kualiti jawapan',
      'Butang share — kongsi jawapan ke WhatsApp, Telegram, Facebook',
    ],
    tip: 'Klik nama fail rujukan (badge biru) untuk tahu dokumen mana yang menjadi sumber — anda boleh semak sendiri untuk keyakinan penuh.',
    next: 'langkah-05',
    nextLabel: 'Urus Kredit Anda',
  },
  {
    id: 'langkah-05',
    num: '05',
    emoji: '💳',
    title: 'Urus Kredit Anda',
    desc: 'TanyaLer menggunakan sistem kredit yang telus. Anda sentiasa tahu berapa kredit yang berbaki.',
    steps: [
      'Explorer (Percuma): 5 kredit sehari — reset setiap tengah malam',
      'Rintis (RM39): 50 kredit — sah 45 hari, TIADA rollover',
      'Strategis (RM89): 200 kredit — sah 120 hari, ADA rollover ✓',
      'Prestij (RM199): 500 kredit — sah 250 hari, ADA rollover ✓',
      'Lihat baki kredit di header halaman chat',
      'Rollover = kredit berbaki dibawa ke pembelian berikutnya',
    ],
    tip: 'Pelan Strategis adalah pilihan paling berbaloi untuk vendor aktif — kos RM0.45/soalan dengan rollover kredit.',
    next: 'langkah-06',
    nextLabel: 'Topup & Pilih Pelan',
  },
  {
    id: 'langkah-06',
    num: '06',
    emoji: '⬆️',
    title: 'Topup & Pilih Pelan',
    desc: 'Apabila kredit hampir habis atau anda memerlukan lebih akses, topup adalah mudah dan selamat.',
    steps: [
      'Klik tab "Plan & Harga" dalam halaman chat atau pergi ke /pricing',
      'Pilih pelan yang sesuai (Rintis RM39, Strategis RM89, atau Prestij RM199)',
      'Klik butang pelan yang dipilih',
      'Bayar menggunakan FPX (internet banking Malaysia)',
      'Kredit ditambah automatik dalam masa 1-2 minit selepas bayaran berjaya',
      'Pelan Strategis disyorkan untuk vendor yang aktif tender',
    ],
    tip: 'Pelan Strategis (RM89) adalah pilihan paling popular — jimat 42% berbanding Rintis dengan lebih banyak kredit dan rollover.',
    next: 'langkah-07',
    nextLabel: 'Topik yang Boleh Ditanya',
  },
  {
    id: 'langkah-07',
    num: '07',
    emoji: '🎯',
    title: 'Topik yang Boleh Ditanya',
    desc: 'TanyaLer merujuk 7,375 muka surat dari 56 dokumen rasmi. Berikut topik yang boleh anda tanya.',
    steps: [
      'Pendaftaran ePerolehan — akaun asas, akaun MOF, sijil MOF',
      'Sebut Harga — cara sertai, hantar tawaran, dan menang',
      'Tender Terbuka & Terhad — proses, dokumen, dan tips',
      'Katalog ePerolehan — cara bina, spesifikasi, dan hantar untuk kelulusan',
      'Kod UNSPSC & Kod Bidang — kategori produk dan perkhidmatan',
      'Pemenuhan & Kontrak — cara submit selepas dapat projek',
      'Peraturan & Pekeliling — PK 5.1, had nilai, prosedur terkini',
      'Masalah teknikal sistem ePerolehan',
    ],
    tip: 'TanyaLer tidak dapat membantu untuk perkara di luar ePerolehan. Sistem akan memaklumkan anda dengan sopan jika soalan di luar skop.',
    next: 'langkah-08',
    nextLabel: 'Tips Pengguna Pro',
  },
  {
    id: 'langkah-08',
    num: '08',
    emoji: '🏆',
    title: 'Tips Pengguna Pro',
    desc: 'Teknik lanjutan untuk mendapatkan manfaat maksimum daripada TanyaLer.',
    steps: [
      'Buat sesi soalan berurutan — tanya A, kemudian B berdasarkan jawapan A',
      'Sertakan nombor rujukan tender atau sebut harga untuk jawapan lebih spesifik',
      'Minta checklist: "Beri saya checklist lengkap untuk hantar sebut harga Kelas F"',
      'Minta perbandingan: "Apa beza Sebut Harga A dan Sebut Harga B?"',
      'Semak badge rujukan fail — guna nama fail untuk cari dokumen asal',
      'Gunakan butang 👍👎 — maklum balas anda bantu tingkatkan sistem',
      'Share jawapan ke WhatsApp untuk simpan atau kongsi dengan rakan niaga',
    ],
    tip: 'Pengguna pro guna TanyaLer sebagai "jurulatih peribadi" — tanya secara konsisten untuk setiap peringkat proses tender.',
    next: null,
    nextLabel: null,
  },
];

export default function ManualPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-16 px-6 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Manual Pengguna</p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Kuasai <span className="text-slate-900">Tanya</span><span className="text-emerald-600">Ler</span> dari A hingga Z.
          </h1>
          <p className="text-slate-500 text-lg">
            Panduan lengkap untuk memaksimakan penggunaan sistem TanyaLer.
            Ikut langkah demi langkah — mudah, jelas, dan berkesan.
          </p>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="py-8 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
            Pergi terus ke bahagian
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <a href={`#${step.id}`}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-emerald-400 hover:text-emerald-700 rounded-xl text-sm text-slate-600 transition-all shadow-sm">
                  <span>{step.emoji}</span>
                  <span className="font-medium hidden md:inline">{step.title}</span>
                  <span className="font-bold text-xs text-slate-400">#{step.num}</span>
                </a>
                {i < STEPS.length - 1 && (
                  <span className="text-red-500 font-black text-lg">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {STEPS.map((step) => (
            <div key={step.id} id={step.id} className="scroll-mt-24">
              {/* Step header */}
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {step.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Langkah {step.num}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">{step.title}</h2>
                  <p className="text-slate-500 mt-1">{step.desc}</p>
                </div>
              </div>

              {/* Step content */}
              <div className="ml-0 md:ml-22 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <ul className="space-y-3">
                  {step.steps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-black">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed pt-0.5">{s}</span>
                    </li>
                  ))}
                </ul>

                {/* Tip */}
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                  <span className="text-lg flex-shrink-0">💡</span>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    <strong>Tips:</strong> {step.tip}
                  </p>
                </div>
              </div>

              {/* Arrow to next step */}
              {step.next && (
                <div className="flex justify-center mt-6">
                  <a href={`#${step.next}`}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-bold transition-colors">
                    <span>Seterusnya: {step.nextLabel}</span>
                    <span className="text-2xl">↓</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 pt-16 border-t border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Soalan Lazim Pengguna Baru</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Adakah saya perlu bayar untuk mendaftar?',
                a: 'Tidak. Pendaftaran adalah percuma dan anda mendapat 5 soalan percuma setiap hari tanpa perlu memasukkan maklumat kad kredit.',
              },
              {
                q: 'Kredit percuma saya tidak diperbaharui, kenapa?',
                a: 'Kredit percuma diperbaharui pada tengah malam setiap hari. Cuba log keluar dan log masuk semula jika masih tidak dikemas kini. Jika masalah berterusan, hubungi support@tanyaler.my.',
              },
              {
                q: 'Bolehkah saya guna TanyaLer dalam bahasa lain?',
                a: 'Ya! Anda boleh bertanya dalam Bahasa Malaysia, English, atau Bahasa Cina. Sistem akan memahami dan menjawab dalam bahasa yang anda gunakan.',
              },
              {
                q: 'Jawapan TanyaLer 100% tepat ke?',
                a: 'TanyaLer merujuk terus kepada 7,375 muka surat dokumen rasmi ePerolehan, tetapi seperti semua sistem AI, ia boleh membuat kesilapan. Badge Ketepatan menunjukkan tahap keyakinan sistem. Sila sahkan maklumat penting dengan portal rasmi ePerolehan.',
              },
              {
                q: 'Berapa banyak soalan boleh saya tanya dalam satu sesi?',
                a: 'Tiada had dalam satu sesi — anda boleh tanya seberapa banyak soalan yang anda mahu selagi ada kredit. Setiap soalan menggunakan 1 kredit.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5">
                <p className="font-bold text-slate-900 text-sm mb-2">❓ {faq.q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-slate-900 rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-black mb-3">Sudah faham? Jom mula!</h2>
          <p className="text-slate-400 mb-6">5 soalan percuma menunggu anda. Tiada kad kredit diperlukan.</p>
          <Link href="/chat"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-2xl transition-all">
            Mula Bertanya Sekarang →
          </Link>
        </div>
      </div>
    </div>
  );
}
