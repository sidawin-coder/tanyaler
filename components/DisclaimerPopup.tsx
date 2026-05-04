'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CONSENT_KEY = 'tanyaler_consent_v1';

// Halaman yang TIDAK perlu popup
const EXEMPT_PAGES = ['/terms', '/privacy', '/disclaimer'];

export default function DisclaimerPopup() {
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [declined, setDeclined] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Jangan tunjuk popup di halaman terms, privacy, disclaimer
    if (EXEMPT_PAGES.some(p => pathname?.startsWith(p))) return;

    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleAgree = () => {
    localStorage.setItem(CONSENT_KEY, 'agreed');
    setShow(false);
  };

  const handleDecline = () => {
    setDeclined(true);
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in slide-in-from-bottom-4">

          {!declined ? (
            <>
              {/* Header */}
              <div className="bg-slate-900 px-8 py-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🛡️</span>
                  <h2 className="text-white font-black text-xl">
                    Sebelum Anda Teruskan
                  </h2>
                </div>
                <p className="text-slate-400 text-sm">
                  Platform <span className="text-white font-bold">Tanya</span><span className="text-emerald-400 font-bold">Ler</span> dikendalikan oleh{' '}
                  <span className="text-white font-semibold">ILHAM KREATIF</span> (202303225352)
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-6 space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-amber-800 text-sm font-bold mb-2">⚠️ Penafian Penting</p>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    TanyaLer adalah platform <strong>rujukan maklumat sahaja</strong> berdasarkan dokumen rasmi ePerolehan Malaysia yang tersedia awam.
                    Platform ini <strong>bukan</strong> sistem rasmi kerajaan dan tidak mewakili mana-mana agensi kerajaan.
                  </p>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  {[
                    'Semua jawapan adalah untuk panduan am sahaja — bukan nasihat undang-undang atau profesional',
                    'ILHAM KREATIF tidak bertanggungjawab atas sebarang kerugian akibat penggunaan maklumat ini',
                    'Sila sahkan maklumat penting dengan portal rasmi www.eperolehan.gov.my',
                    'Dengan meneruskan, anda bersetuju dengan Terma Penggunaan dan Dasar Privasi kami',
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href="/terms" target="_blank"
                    className="text-xs text-emerald-700 underline hover:no-underline">
                    Baca Terma Penggunaan
                  </Link>
                  <span className="text-slate-300 text-xs">·</span>
                  <Link href="/privacy" target="_blank"
                    className="text-xs text-emerald-700 underline hover:no-underline">
                    Dasar Privasi
                  </Link>
                </div>

                {/* Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer bg-slate-50 rounded-xl p-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-emerald-600 flex-shrink-0"
                  />
                  <span className="text-sm text-slate-700 leading-relaxed">
                    Saya <strong>faham dan bersetuju</strong> bahawa TanyaLer adalah platform rujukan sahaja,
                    dan semua maklumat perlu disahkan dengan sumber rasmi sebelum digunakan untuk keputusan perniagaan.
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="px-8 pb-6 flex gap-3">
                <button
                  onClick={handleAgree}
                  disabled={!agreed}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                    agreed
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  ✓ Saya Bersetuju — Teruskan
                </button>
                <button
                  onClick={handleDecline}
                  className="px-4 py-3 rounded-2xl font-semibold text-sm text-slate-500 hover:bg-slate-100 transition-all"
                >
                  Tidak
                </button>
              </div>
            </>
          ) : (
            /* Declined state */
            <div className="px-8 py-12 text-center">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Terima kasih atas kejujuran anda.
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                TanyaLer adalah platform rujukan maklumat ePerolehan yang direka untuk membantu vendor dan pembekal Malaysia.
                Jika anda berubah fikiran dan ingin mencuba, kami sentiasa sedia membantu.
              </p>
              <p className="text-slate-400 text-xs mb-6">
                Untuk maklumat rasmi ePerolehan, layari{' '}
                <a href="https://www.eperolehan.gov.my" target="_blank" rel="noopener noreferrer"
                  className="text-emerald-700 underline">
                  www.eperolehan.gov.my
                </a>
              </p>
              <button
                onClick={() => setDeclined(false)}
                className="text-sm text-emerald-700 underline hover:no-underline"
              >
                ← Kembali & semak semula
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
