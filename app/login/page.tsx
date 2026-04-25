'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Suspense } from 'react';

function LoginContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const err = searchParams.get('error');
    if (err === 'auth_failed') setError('Log masuk gagal. Sila cuba semula.');
    if (err === 'no_code') setError('Kod pengesahan tidak ditemui.');
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      setError('Log masuk gagal. Sila cuba semula.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Top nav minimal */}
      <header className="px-5 py-5">
        <Logo size={32} href="/" />
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
            {/* Icon */}
            <div className="w-14 h-14 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-7 h-7 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            {/* Headline */}
            <h1 className="text-2xl font-bold text-slate-900 text-center mb-2 tracking-tight">
              Selamat datang ke TanyaLer
            </h1>
            <p className="text-[15px] text-slate-600 text-center mb-8 leading-relaxed">
              Log masuk untuk mula bertanya tentang ePerolehan.
            </p>

            {/* Error message */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl mb-5">
                {error}
              </div>
            )}

            {/* Google login button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-[15px] py-3.5 px-5 rounded-2xl transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              {loading ? 'Sedang log masuk...' : 'Teruskan dengan Google'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">ATAU</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Free tier info */}
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4">
              <div className="flex gap-3">
                <span className="text-xl leading-none mt-0.5">🎁</span>
                <div>
                  <p className="text-sm font-semibold text-emerald-900 mb-1">
                    Percuma tanpa kad kredit
                  </p>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Daftar sekarang dan dapatkan 8 soalan percuma setiap hari.
                    Upgrade bila anda bersedia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal */}
          <p className="text-xs text-slate-500 text-center mt-6 px-4 leading-relaxed">
            Dengan log masuk, anda bersetuju dengan{' '}
            <Link href="/disclaimer" className="text-emerald-700 hover:underline">
              Terma Penggunaan
            </Link>{' '}
            dan{' '}
            <Link href="/privacy" className="text-emerald-700 hover:underline">
              Dasar Privasi
            </Link>{' '}
            kami.
          </p>

          <p className="text-xs text-slate-400 text-center mt-3">
            TanyaLer bukan platform rasmi ePerolehan.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
