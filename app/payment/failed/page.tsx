import Link from 'next/link';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Pembayaran Tidak Berjaya</h1>
        <p className="text-slate-500 text-sm mb-8">
          Tiada sebarang caj dikenakan. Sila cuba semula.
        </p>

        <Link
          href="/pricing"
          className="flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors mb-3"
        >
          Cuba Semula
        </Link>
        <Link href="/" className="block text-sm text-slate-400 hover:text-slate-600 py-2">
          Kembali ke Laman Utama
        </Link>
        <p className="mt-6 text-xs text-slate-400">
          Bantuan:{' '}
          <a href="mailto:support@tanyaler.my" className="text-emerald-600 hover:underline">
            support@tanyaler.my
          </a>
        </p>
      </div>
    </div>
  );
}