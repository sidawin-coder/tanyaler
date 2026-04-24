import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Harga — TanyaLer',
  description:
    'Pilih pelan langganan TanyaLer yang sesuai untuk anda. Percubaan percuma 8 soalan sehari. Topup pay-as-you-go atau langganan bulanan Pro.',
};

const plans = [
  {
    name: 'Percubaan',
    price: 'RM0',
    unit: '',
    credits: '8 soalan percuma setiap hari',
    description: 'Sesuai untuk mencuba TanyaLer',
    features: [
      '8 soalan percuma setiap hari',
      'Kuota diperbaharui setiap hari',
      'Akses kepada panduan asas',
      'Jawapan berdasarkan dokumen rasmi',
    ],
    cta: 'Mulakan Percubaan',
    href: '/chat',
    popular: false,
  },
  {
    name: 'Topup Basic',
    price: 'RM10',
    unit: '',
    credits: '50 kredit soalan',
    description: 'Pay-as-you-go',
    features: [
      '50 kredit soalan',
      'Digunakan sehingga habis',
      'Kredit sah selama 6 bulan',
      'Bayar sekali, tanpa langganan',
      'Sesuai pengguna tidak tetap',
    ],
    cta: 'Dapatkan Topup',
    href: '/chat',
    popular: false,
  },
  {
    name: 'Topup Value',
    price: 'RM30',
    unit: '',
    credits: '200 kredit soalan',
    description: 'Lebih jimat',
    features: [
      '200 kredit soalan',
      'Lebih jimat berbanding Basic',
      'Kredit sah selama 6 bulan',
      'Bayar sekali, tanpa langganan',
      'Sesuai pengguna kerap',
    ],
    cta: 'Dapatkan Topup',
    href: '/chat',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'RM59',
    unit: '/bulan',
    credits: '600 kredit soalan / bulan',
    description: 'Untuk pengguna aktif',
    features: [
      '600 kredit soalan sebulan',
      'Kuota diperbaharui setiap bulan',
      'Akses semua kategori panduan',
      'Sokongan keutamaan',
      'Boleh batal pada bila-bila masa',
    ],
    cta: 'Langgan Pro',
    href: '/chat',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    credits: 'Sehingga 2,000 kredit / bulan',
    description: 'Untuk syarikat & pasukan',
    features: [
      'Sehingga 2,000 kredit soalan',
      'Akses berbilang pengguna',
      'Laporan penggunaan bulanan',
      'Sokongan keutamaan tinggi',
      'Integrasi boleh disesuaikan',
      'Latihan onboarding pasukan',
    ],
    cta: 'Hubungi Kami',
    href: 'mailto:support@tanyaler.com',
    popular: false,
  },
];

const faqs = [
  {
    q: 'Berapa lamakah kredit soalan sah digunakan?',
    a: 'Kredit soalan anda sah selama 6 bulan dari tarikh pembelian. Anda boleh menggunakannya mengikut kadar yang selesa dalam tempoh tersebut.',
  },
  {
    q: 'Bolehkah saya mendapatkan bayaran balik untuk kredit yang belum digunakan?',
    a: 'Kredit yang belum digunakan boleh dikembalikan dalam tempoh 7 hari bekerja dari tarikh pembelian. Sila hubungi pasukan sokongan kami melalui support@tanyaler.com untuk memulakan proses pengembalian.',
  },
  {
    q: 'Apakah yang berlaku jika kuota harian Percubaan saya habis?',
    a: 'Kuota Percubaan akan diperbaharui secara automatik pada keesokan harinya pada pukul 12:00 tengah malam. Anda juga boleh memilih untuk membeli topup atau melanggan pelan berbayar untuk akses yang lebih luas.',
  },
  {
    q: 'Adakah pelan Pro memperbaharui secara automatik?',
    a: 'Ya, pelan Pro diperbaharui secara automatik setiap bulan. Anda boleh membatalkan langganan pada bila-bila masa melalui tetapan akaun anda tanpa sebarang penalti.',
  },
  {
    q: 'Adakah maklumat pembayaran saya disimpan di TanyaLer?',
    a: 'Tidak. Kami tidak menyimpan maklumat kad kredit atau butiran perbankan anda. Semua pembayaran diproses terus melalui BillPlz, penyedia perkhidmatan pembayaran yang dipercayai di Malaysia.',
  },
  {
    q: 'Bolehkah saya menaik taraf atau menurun taraf pelan?',
    a: 'Ya. Anda boleh menukar pelan pada bila-bila masa melalui halaman akaun. Perubahan akan berkuat kuasa pada kitaran pembilan seterusnya.',
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 md:pt-28 pb-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-4">
            Harga Telus
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
            Pilihan yang sesuai
            <br />
            untuk setiap keperluan.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Mulakan dengan percubaan percuma. Upgrade bila anda bersedia.
            Tiada kontrak jangka panjang.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 md:pb-28 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-3xl p-7 flex flex-col border transition-all ${
                  plan.popular
                    ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 lg:scale-105'
                    : 'border-slate-200/60 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    Paling Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-slate-900 tracking-tight">
                      {plan.price}
                    </span>
                    {plan.unit && (
                      <span className="text-sm text-slate-500">{plan.unit}</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-emerald-700">
                    {plan.credits}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                      <svg
                        className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="4 10 8 14 16 6" />
                      </svg>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Trust badges below pricing */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Pembayaran selamat SSL
            </div>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <div className="inline-flex items-center gap-2">
              Diproses oleh BillPlz (FPX)
            </div>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <div className="inline-flex items-center gap-2">
              Tiada bayaran tersembunyi
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-5 md:px-8 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Soalan Lazim
            </h2>
            <p className="text-lg text-slate-600">
              Jawapan kepada soalan yang paling sering ditanya.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 text-[15px]">
                    {faq.q}
                  </span>
                  <svg
                    className="w-5 h-5 text-slate-500 flex-shrink-0 transition-transform group-open:rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-slate-600 text-[15px] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Ada soalan lain?</p>
            <a
              href="mailto:support@tanyaler.com"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              Hubungi pasukan sokongan
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 8h14M9 2l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
