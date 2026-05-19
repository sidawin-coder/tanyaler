import Link from 'next/link';
export const metadata = { title: 'Terma Penggunaan — TanyaLer' };
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">Perundangan</p>
          <h1 className="text-4xl font-black tracking-tight mb-4">Terma Penggunaan</h1>
          <p className="text-slate-300 text-lg">Platform TanyaLer.my dikendalikan oleh <strong className="text-white">ILHAM KREATIF</strong> (No. Pendaftaran: 202303225352).</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span>📅 Berkuat kuasa: 1 Mei 2026</span>
            <span>🔄 Dikemaskini: 14 Mei 2026</span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        {[
          { title: '1. Penerimaan Terma', content: 'Dengan mengakses atau menggunakan platform TanyaLer.my, anda bersetuju untuk terikat dengan terma dan syarat ini. Jika anda tidak bersetuju, sila hentikan penggunaan platform ini.' },
          { title: '2. Perkhidmatan TanyaLer', content: 'TanyaLer menyediakan sistem rujukan berasaskan AI untuk maklumat berkaitan ePerolehan Malaysia. Jawapan yang diberikan adalah untuk panduan sahaja dan bukan nasihat profesional atau guaman.' },
          { title: '3. Akaun Pengguna', content: 'Anda bertanggungjawab untuk mengekalkan kerahsiaan maklumat akaun anda. Setiap akaun adalah untuk kegunaan individu sahaja dan tidak boleh dikongsi.' },
          { title: '4. Sistem Kredit', content: 'Kredit yang dibeli adalah tidak boleh dikembalikan kecuali dalam keadaan tertentu seperti dinyatakan dalam Polisi Bayaran Balik kami. Kredit mempunyai tempoh sah seperti yang dinyatakan dalam pelan masing-masing.' },
          { title: '5. Penggunaan yang Dilarang', content: 'Anda tidak dibenarkan menggunakan platform ini untuk tujuan menyalahi undang-undang, mengganggu sistem, menyebarkan maklumat palsu, atau melakukan sebarang aktiviti yang boleh menjejaskan pengguna lain.' },
          { title: '6. Penafian Tanggungjawab', content: 'TanyaLer dan ILHAM KREATIF tidak bertanggungjawab atas sebarang kerugian yang timbul daripada penggunaan maklumat yang disediakan. Semua maklumat hendaklah disahkan dengan pihak berkuasa berkenaan.' },
          { title: '7. Pindaan Terma', content: 'Kami berhak mengubah terma ini pada bila-bila masa. Perubahan akan dikuatkuasakan sebaik sahaja diterbitkan di laman web ini. Penggunaan berterusan menandakan penerimaan terma yang dipinda.' },
          { title: '8. Undang-undang Berkenaan', content: 'Terma ini ditadbir oleh undang-undang Malaysia. Sebarang pertikaian akan diselesaikan di mahkamah yang mempunyai bidang kuasa di Malaysia.' },
        ].map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-black text-slate-900 border-b-2 border-emerald-500 pb-2 mb-4">{s.title}</h2>
            <p className="text-slate-700 text-sm leading-relaxed">{s.content}</p>
          </section>
        ))}
        <section className="bg-emerald-50 rounded-2xl p-8">
          <h2 className="text-xl font-black text-slate-900 mb-4">Hubungi Kami</h2>
          <div className="space-y-2 text-slate-700 text-sm">
            <p><strong>Syarikat:</strong> ILHAM KREATIF (202303225352)</p>
            <p><strong>E-mel:</strong> <a href="mailto:support@tanyaler.my" className="text-emerald-700 underline">support@tanyaler.my</a></p>
          </div>
        </section>
        <div className="text-center">
          <Link href="/" className="text-emerald-700 hover:underline text-sm">← Kembali ke Laman Utama</Link>
          <span className="mx-4 text-slate-300">|</span>
          <Link href="/privacy" className="text-emerald-700 hover:underline text-sm">Dasar Privasi →</Link>
        </div>
      </div>
    </div>
  );
}
