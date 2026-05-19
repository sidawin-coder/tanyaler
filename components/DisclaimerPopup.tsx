'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CONSENT_KEY = 'tanyaler_consent_v1';
const EXEMPT_PAGES = ['/terms', '/privacy', '/disclaimer'];

export default function DisclaimerPopup() {
  const [show, setShow] = useState(false);
  const [declined, setDeclined] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-emerald-600 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-white text-lg">⚖️</span>
            <h2 className="text-white font-black text-base">Notis Penting & Penafian</h2>
          </div>
          <p className="text-emerald-100 text-xs mt-1">Sila baca sebelum menggunakan TanyaLer</p>
        </div>

        {/* Body */}
        <div className="px-5 py-4 max-h-[50vh] overflow-y-auto">
          {declined ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🚫</div>
              <p className="font-semibold text-slate-800 text-sm mb-2">Anda telah menolak terma penggunaan.</p>
              <p className="text-slate-500 text-xs mb-4">Anda tidak dapat menggunakan TanyaLer tanpa menerima terma kami.</p>
              <button
                onClick={() => setDeclined(false)}
                className="text-xs text-emerald-600 underline"
              >
                Semak semula terma
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-slate-800">TanyaLer</span> adalah sistem rujukan maklumat berasaskan AI untuk konteks ePerolehan Malaysia.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="font-semibold text-amber-800 mb-1">⚠️ Had Penggunaan</p>
                  <p className="text-amber-700">Maklumat yang dipaparkan adalah untuk <strong>rujukan sahaja</strong> dan tidak boleh dianggap sebagai nasihat undang-undang atau keputusan rasmi.</p>
                </div>
                <p>
                  Dengan menggunakan platform ini, anda <strong>bersetuju</strong> bahawa:
                </p>
                <ul className="space-y-1.5 pl-3">
                  <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">✓</span><span>Anda menggunakan maklumat ini atas tanggungjawab sendiri</span></li>
                  <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">✓</span><span>ILHAM KREATIF tidak bertanggungjawab atas sebarang keputusan yang dibuat berdasarkan output sistem</span></li>
                  <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">✓</span><span>Anda telah membaca dan bersetuju dengan <Link href="/terms" className="text-emerald-600 underline">Terma Perkhidmatan</Link> dan <Link href="/privacy" className="text-emerald-600 underline">Dasar Privasi</Link> kami</span></li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!declined && (
          <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAgree}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              ✅ Saya Faham & Bersetuju
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none sm:px-5 bg-white hover:bg-slate-100 text-slate-500 font-medium text-sm py-3 rounded-xl border border-slate-200 transition-colors"
            >
              Tolak
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
