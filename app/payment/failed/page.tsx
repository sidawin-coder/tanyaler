import Link from 'next/link';
import Logo from '@/components/Logo';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <header className="px-5 py-5">
        <Logo size={32} href="/" />
      </header>

      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md bg-white border border-slate-200/60 rounded-3xl p-10 shadow-sm text-center">
          {/* Failed icon */}
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-rose-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Pembayaran Tidak Berjaya
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Pembayaran anda tidak dapat diproses. Tiada bayaran telah ditolak
            dari akaun anda.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-left">
            <h3 className="font-semibold text-slate-900 mb-3">
              Sebab biasa yang mungkin:
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                Sesi tamat tempoh
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                Baki akaun tidak mencukupi
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                Transaksi dibatalkan
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                Masalah teknikal sementara
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-3.5 rounded-full transition-all"
            >
              Cuba Semula
            </Link>
            <a
              href="mailto:support@tanyaler.com"
              className="inline-flex items-center justify-center text-sm text-emerald-700 hover:text-emerald-800 font-medium py-2"
            >
              Hubungi sokongan jika masalah berterusan →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
