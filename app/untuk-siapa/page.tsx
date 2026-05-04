import Link from 'next/link';

export const metadata = {
  title: 'Untuk Siapa — TanyaLer | Sistem Rujukan Pintar ePerolehan Malaysia',
  description: 'TanyaLer direka untuk vendor, kontraktor, konsultan, dan pegawai kerajaan yang berurusan dengan sistem ePerolehan Malaysia.',
};

const PROFILES = [
  {
    rank: 1,
    emoji: '🏗️',
    title: 'Kontraktor Binaan & Kejuruteraan',
    subtitle: 'Dah bertender tapi selalu kalah atau ditolak',
    pain: 'Setiap tender yang gagal bermakna bulan kerja keras anda terbuang sia-sia. Dokumen salah format, harga tidak kompetitif, atau prosedur tidak ikut — anda tidak tahu yang mana. Satu tender yang menang boleh bernilai ratusan ribu ringgit.',
    bigWhy: '🎯 TanyaLer beri anda "unfair advantage" — faham prosedur sebelum pesaing anda.',
    helps: [
      'Analisis sebab tender ditolak berdasarkan dokumen rasmi',
      'Panduan menyediakan dokumen tender yang lengkap dan betul format',
      'Rujukan spesifik Fasal & Manual untuk sokong keputusan anda',
    ],
    shareText: 'Kontraktor yang selalu kalah tender? Cuba TanyaLer — sistem rujukan pintar ePerolehan Malaysia. 7,375 muka surat dokumen rasmi dalam genggaman anda. Cuba percuma: tanyaler.my',
  },
  {
    rank: 2,
    emoji: '💻',
    title: 'Syarikat IT & Teknologi',
    subtitle: 'Mahir teknologi tapi keliru dengan proses kerajaan',
    pain: 'Pasaran IT kerajaan Malaysia bernilai berbilion ringgit setahun — tapi syarikat anda terlepas kontrak demi kontrak hanya kerana tidak faham prosedur sebut harga IT kerajaan. Teknologi anda bagus, tapi sistem ePerolehan anda tidak faham.',
    bigWhy: '🎯 Jangan biar kesilapan prosedur halang syarikat IT anda daripada kontrak berjuta ringgit.',
    helps: [
      'Panduan kategori perkhidmatan IT dalam ePerolehan (kod UNSPSC tepat)',
      'Cara bina katalog produk/perkhidmatan IT yang lulus pertama kali',
      'Proses sebut harga IT dari mula hingga pemenuhan',
    ],
    shareText: 'Syarikat IT anda terlepas kontrak kerajaan kerana masalah prosedur? TanyaLer — rujukan pintar ePerolehan Malaysia berasaskan dokumen rasmi. Cuba percuma: tanyaler.my',
  },
  {
    rank: 3,
    emoji: '🏢',
    title: 'Syarikat Bumiputera & Enterprise',
    subtitle: 'Ada kelayakan istimewa tapi tidak tahu cara maksimakan',
    pain: 'Anda mempunyai kelayakan Bumiputera dan saiz syarikat yang layak untuk program enterprise kerajaan — tapi peluang ini tidak dimanfaatkan sepenuhnya. Setiap hari, vendor lain yang lebih tahu prosedur menang kontrak yang sepatutnya milik anda.',
    bigWhy: '🎯 Kelayakan Bumiputera anda adalah aset — TanyaLer bantu anda gunakannya dengan betul.',
    helps: [
      'Panduan lengkap program khas Bumiputera dan enterprise dalam ePerolehan',
      'Cara daftar dan manfaatkan set-aside dan panel khas',
      'Strategi tender untuk syarikat Bumiputera bersaiz sederhana dan besar',
    ],
    shareText: 'Syarikat Bumiputera perlu tahu ini — TanyaLer bantu anda maksimakan peluang ePerolehan dengan kelayakan Bumiputera anda. Cuba percuma: tanyaler.my',
  },
  {
    rank: 4,
    emoji: '📦',
    title: 'Pembekal Peralatan & Barangan',
    subtitle: 'Nak jual produk ke kerajaan tapi katalog selalu ditolak',
    pain: 'Katalog anda ditolak kali pertama, kedua, ketiga — tanpa penjelasan jelas. Sementara itu, pembekal lain dengan produk sama kualiti sudah dapat kontrak automatik. Katalog yang diluluskan bermakna jualan automatik tanpa perlu tender.',
    bigWhy: '🎯 Setiap hari katalog anda tidak lulus = kehilangan jualan automatik kepada kerajaan.',
    helps: [
      'Cara bina katalog produk yang akan diluluskan pertama kali',
      'Spesifikasi tepat yang diperlukan untuk setiap kategori produk',
      'Cara kemaskini harga dan stok dalam sistem ePerolehan',
    ],
    shareText: 'Katalog ePerolehan anda selalu ditolak? TanyaLer bantu anda faham spesifikasi yang tepat dari dokumen rasmi. Cuba percuma: tanyaler.my',
  },
  {
    rank: 5,
    emoji: '🏪',
    title: 'Pembekal Baru SSM',
    subtitle: 'Baru daftar, belum tahu nak mulakan dari mana',
    pain: 'Manual rasmi ePerolehan tebal, helpdesk sukar dihubungi, kursus mahal pula. Setiap hari berlalu tanpa daftar ePerolehan = peluang kontrak yang lepas terus. Pembekal lain yang daftar awal sudah dapat kontrak pertama mereka.',
    bigWhy: '🎯 Mulakan perjalanan ePerolehan anda dengan panduan yang betul dari hari pertama.',
    helps: [
      'Panduan pendaftaran ePerolehan lengkap langkah demi langkah',
      'Penjelasan sijil MOF — apa, kenapa, dan cara mohon',
      'Jawapan dalam bahasa mudah, tanpa jargon teknikal',
    ],
    shareText: 'Baru daftar SSM dan keliru dengan ePerolehan? TanyaLer beri panduan langkah demi langkah berdasarkan dokumen rasmi. Cuba percuma: tanyaler.my',
  },
  {
    rank: 6,
    emoji: '🏛️',
    title: 'Pegawai Bekalan Agensi Kerajaan',
    subtitle: 'Perlu pastikan prosedur perolehan betul dan patuh',
    pain: 'Satu kesilapan prosedur perolehan boleh mengakibatkan audit, teguran, atau tindakan tatatertib. Anda perlu rujukan cepat yang tepat — bukan menunggu pertanyaan ke pejabat lain atau mencari dalam manual beratus muka surat.',
    bigWhy: '🎯 Pastikan setiap keputusan perolehan anda disokong oleh rujukan dokumen rasmi yang boleh diaudit.',
    helps: [
      'Rujukan pantas prosedur dan had nilai perolehan terkini',
      'Penjelasan peraturan PK 5.1 dan pekeliling terkini',
      'Semakan prosedur sebut harga, tender, dan perolehan terus',
    ],
    shareText: 'Pegawai bekalan perlu rujukan prosedur ePerolehan yang tepat dan pantas? TanyaLer sediakan jawapan dari dokumen rasmi dalam saat. Cuba percuma: tanyaler.my',
  },
  {
    rank: 7,
    emoji: '🏢',
    title: 'Firma Perunding & Profesional',
    subtitle: 'Mahir dalam bidang tapi keliru cara tawar khidmat ke kerajaan',
    pain: 'Anda perunding, jurutera, akauntan, atau arkitek yang layak berkhidmat untuk kerajaan — tapi proses sebut harga perkhidmatan profesional dalam ePerolehan tidak jelas. Perkhidmatan profesional adalah salah satu kategori dengan permintaan tertinggi.',
    bigWhy: '🎯 Kepakaran anda bernilai tinggi — jangan biar kekeliruan prosedur halang anda mendapat kontrak kerajaan.',
    helps: [
      'Panduan sebut harga perkhidmatan profesional (konsultansi, kejuruteraan, dll)',
      'Cara daftar dalam panel perkhidmatan profesional kerajaan',
      'Keperluan dokumen untuk setiap jenis perkhidmatan profesional',
    ],
    shareText: 'Firma perunding atau profesional yang ingin berkhidmat untuk kerajaan? TanyaLer sediakan panduan prosedur ePerolehan berasaskan dokumen rasmi. Cuba percuma: tanyaler.my',
  },
  {
    rank: 8,
    emoji: '👩‍💼',
    title: 'Usahawan Wanita & Bumiputera',
    subtitle: 'Ada kelayakan khas tapi tidak tahu cara manfaatkannya',
    pain: 'Program khas untuk usahawan wanita dan Bumiputera dalam ePerolehan mempunyai kuota terhad. Setiap hari anda tidak mendaftar atau tidak tahu cara manfaatkan program ini = tempat anda diambil oleh vendor lain yang lebih informasi.',
    bigWhy: '🎯 Program ini ada — soalannya, adakah anda tahu cara gunakan sepenuhnya?',
    helps: [
      'Panduan program khas Bumiputera dan wanita dalam ePerolehan',
      'Cara mendaftar sebagai pembekal panel khas',
      'Peluang sebut harga yang terbuka khas untuk kumpulan ini',
    ],
    shareText: 'Usahawan wanita Bumiputera perlu tahu tentang program khas ePerolehan ini. TanyaLer bantu anda faham dan manfaatkan peluang yang ada. Cuba percuma: tanyaler.my',
  },
  {
    rank: 9,
    emoji: '👨‍💼',
    title: 'Pengurus & Staf Syarikat',
    subtitle: 'Terpaksa urus ePerolehan tapi tiada latihan formal',
    pain: 'Anda ditugaskan mengurus tender dan sebut harga syarikat tanpa latihan. Satu kesilapan prosedur boleh membatalkan sebut harga seluruh syarikat — dan itu tanggungjawab anda. Kursus formal mahal dan tidak fleksibel.',
    bigWhy: '🎯 Kuasai ePerolehan sendiri tanpa kursus mahal — TanyaLer adalah jurulatih peribadi anda.',
    helps: [
      'Asas ePerolehan yang perlu tahu dalam masa singkat',
      'Checklist untuk setiap proses pastikan tiada yang tertinggal',
      'Rujukan pantas untuk masalah yang dihadapi',
    ],
    shareText: 'Kena urus tender tapi tiada latihan formal? TanyaLer sediakan panduan ePerolehan berdasarkan dokumen rasmi — seperti jurulatih peribadi anda. Cuba percuma: tanyaler.my',
  },
  {
    rank: 10,
    emoji: '🌱',
    title: 'Usahawan Muda & Graduan',
    subtitle: 'Baru dalam dunia perniagaan, nak cepat faham sistem',
    pain: 'Anda tahu ePerolehan adalah peluang besar untuk perniagaan baru anda — tapi tidak tahu dari mana nak mula. Kursus bernilai ratusan ringgit di luar kemampuan. Masa muda adalah aset terbesar — jangan buang masa yang berharga.',
    bigWhy: '🎯 Mulakan lebih awal, lebih tahu — advantage yang akan kekal seumur hidup perniagaan anda.',
    helps: [
      'Pembelajaran ePerolehan berstruktur dan mudah difahami',
      'Mulakan dari asas hingga mahir dalam masa singkat',
      'Jimat ratusan ringgit kursus — TanyaLer lebih berbaloi',
    ],
    shareText: 'Graduan dan usahawan muda perlu tahu ini — TanyaLer beri panduan ePerolehan percuma berdasarkan dokumen rasmi. Mulakan perniagaan anda dengan betul: tanyaler.my',
  },
];

function ShareButtons({ profile }: { profile: typeof PROFILES[0] }) {
  const text = encodeURIComponent(profile.shareText);
  const url = encodeURIComponent('https://tanyaler.my/untuk-siapa');

  return (
    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
      <span className="text-xs text-slate-400 font-medium w-full mb-1">Kongsi kepada rakan yang perlukan ini:</span>
      <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-full text-xs font-semibold transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs font-semibold transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Facebook
      </a>
      <a href={`https://www.tiktok.com/share?url=${url}&text=${text}`} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-white rounded-full text-xs font-semibold transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.86a4.85 4.85 0 01-1.01-.17z"/>
        </svg>
        TikTok
      </a>
      <a href={`https://www.threads.net/intent/post?text=${text}`} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-semibold transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.556-1.996-1.484-3.484-2.761-4.428-1.28-.945-2.958-1.442-4.99-1.455-2.6.023-4.664.8-6.136 2.31C5.05 5.989 4.275 8.235 4.249 11.99c.026 3.757.8 6.005 2.363 7.432 1.468 1.338 3.527 2.017 6.134 2.022l.028.001c2.157-.004 3.856-.568 5.052-1.679 1.262-1.17 1.91-2.938 1.927-5.255-.002-1.21-.264-2.26-.78-3.12-.538-.89-1.355-1.56-2.43-1.994-.227 1.566-.77 2.84-1.618 3.793-.97 1.087-2.273 1.674-3.87 1.746-1.215.053-2.36-.288-3.219-.96-.913-.714-1.426-1.765-1.442-2.96-.014-1.127.443-2.14 1.285-2.853.9-.764 2.19-1.164 3.733-1.158.965.003 1.832.135 2.6.39-.003-.063-.005-.127-.005-.19 0-1.4-.528-2.494-1.569-3.17-.954-.622-2.28-.938-3.942-.938l-.048.001c-2.063.018-3.553.633-4.428 1.83-.863 1.18-1.3 2.923-1.296 5.18.004 2.26.444 4 1.31 5.17.875 1.19 2.366 1.8 4.427 1.812 1.616.01 2.958-.325 3.99-.996.936-.609 1.565-1.51 1.867-2.683l.029.002zM12 13.598c-.81-.035-1.53-.275-2.04-.677-.473-.376-.735-.91-.725-1.507.01-.612.273-1.155.743-1.526.508-.4 1.228-.627 2.046-.644.834-.018 1.576.193 2.088.595.478.38.737.9.737 1.498.003 1.21-.865 2.026-2.849 2.261z"/>
        </svg>
        Threads
      </a>
    </div>
  );
}

export default function UntukSiapaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-16 px-6 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">Untuk Siapa</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Adakah <span className="text-slate-900">Tanya</span><span className="text-emerald-600">Ler</span> untuk anda?
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            <span className="text-slate-900">Tanya</span><span className="text-emerald-600">Ler</span> direka untuk mereka yang berurusan dengan sistem ePerolehan Malaysia.
            Kenalpasti diri anda dan lihat bagaimana kami boleh membantu.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 text-sm text-amber-700">
            🤔 Pernah keliru dengan ePerolehan? <span className="font-bold">TanyaLer adalah untuk anda.</span>
          </div>
        </div>
      </div>

      {/* Profiles */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-8">
          {PROFILES.map((profile) => (
            <div key={profile.rank} className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl">
                    {profile.emoji}
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs text-slate-400 font-medium">#{profile.rank}</span>
                  </div>
                </div>

                {/* Right */}
                <div className="flex-1">
                  <h2 className="text-xl font-black text-slate-900 mb-1">{profile.title}</h2>
                  <p className="text-slate-500 text-sm mb-4 italic">{profile.subtitle}</p>

                  {/* Pain */}
                  <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4 mb-4">
                    <p className="text-red-700 text-sm leading-relaxed">{profile.pain}</p>
                  </div>

                  {/* Big Why */}
                  <div className="bg-emerald-50 rounded-xl p-3 mb-4">
                    <p className="text-emerald-700 text-sm font-semibold">{profile.bigWhy}</p>
                  </div>

                  {/* Helps */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      <span className="text-slate-900">Tanya</span><span className="text-emerald-600">Ler</span> Membantu Anda:
                    </p>
                    <ul className="space-y-1.5">
                      {profile.helps.map((h, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-600">
                          <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Share Buttons */}
                  <ShareButtons profile={profile} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">
            Jom mula, percuma.
          </h2>
          <p className="text-slate-400 mb-8">
            Tanya soalan pertama anda hari ini. Tidak perlu kad kredit, tidak perlu komitmen.
          </p>
          <Link href="/chat"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all">
            Mulakan Sekarang — Percuma →
          </Link>
          <p className="text-slate-500 text-sm mt-4">
            5 soalan percuma · Tiada kad kredit · Tiada komitmen
          </p>
        </div>
      </div>
    </div>
  );
}
