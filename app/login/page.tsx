'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  // ── Google Login ──
  const handleGoogle = async () => {
    setBusy(true); setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/chat` },
    });
    if (error) setError('Gagal log masuk dengan Google. Cuba lagi.');
    setBusy(false);
  };

  // ── Email Login ──
  const handleEmailLogin = async () => {
    if (!email || !password) { setError('Sila isi email dan kata laluan.'); return; }
    setBusy(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Email atau kata laluan tidak tepat. Cuba lagi.');
    } else {
      window.location.href = '/chat';
    }
    setBusy(false);
  };

  // ── Register ──
  const handleRegister = async () => {
    if (!email || !password || !name) { setError('Sila isi semua ruangan.'); return; }
    if (password.length < 8) { setError('Kata laluan mestilah sekurang-kurangnya 8 aksara.'); return; }
    setBusy(true); setError('');
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } },
    });
    if (error) {
      setError(error.message || 'Pendaftaran gagal. Cuba lagi.');
    } else {
      setSuccess('Akaun berjaya dibuat! Sila semak email anda untuk pengesahan.');
      setEmail(''); setPassword(''); setName('');
    }
    setBusy(false);
  };

  // ── Forgot Password ──
  const handleForgotPassword = async () => {
    if (!email) { setError('Sila masukkan email anda dahulu.'); return; }
    setBusy(true); setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError('Gagal hantar email reset. Cuba lagi.');
    } else {
      setSuccess('E-mel reset kata laluan telah dihantar. Sila semak inbox anda.');
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-xl">🔍</div>
            <span className="text-2xl font-black text-slate-900">
              Tanya<span className="text-emerald-600">Ler</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm mt-2">Sistem Rujukan Pintar ePerolehan Malaysia</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            {(['login', 'register'] as const).map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(''); setSuccess(''); }}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  tab === t
                    ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/50'
                    : 'text-slate-400 hover:text-slate-600'
                }`}>
                {t === 'login' ? 'Log Masuk' : 'Daftar Akaun'}
              </button>
            ))}
          </div>

          <div className="p-8">

            {/* Google Button */}
            <button onClick={handleGoogle} disabled={busy}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-slate-200 hover:border-slate-400 rounded-2xl font-semibold text-slate-700 text-sm transition-all mb-5 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Teruskan dengan Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-slate-200"/>
              <span className="text-slate-400 text-xs font-medium">atau</span>
              <div className="flex-1 h-px bg-slate-200"/>
            </div>

            {/* Register extra field */}
            {tab === 'register' && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Nama Penuh
                </label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Nama anda"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all"
                />
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Alamat E-mel
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="email@syarikat.com"
                onKeyDown={e => { if (e.key === 'Enter') tab === 'login' ? handleEmailLogin() : handleRegister(); }}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Kata Laluan
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder={tab === 'register' ? 'Minimum 8 aksara' : '••••••••'}
                onKeyDown={e => { if (e.key === 'Enter') tab === 'login' ? handleEmailLogin() : handleRegister(); }}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all"
              />
            </div>

            {/* Forgot password */}
            {tab === 'login' && (
              <div className="text-right mb-5">
                <button onClick={handleForgotPassword}
                  className="text-xs text-emerald-700 hover:underline font-medium">
                  Lupa kata laluan?
                </button>
              </div>
            )}

            {/* Error / Success */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={tab === 'login' ? handleEmailLogin : handleRegister}
              disabled={busy}
              className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                busy ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                     : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}>
              {busy ? 'Memproses...' : tab === 'login' ? 'Log Masuk →' : 'Buat Akaun →'}
            </button>

            {/* Register note */}
            {tab === 'register' && (
              <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
                Dengan mendaftar, anda bersetuju dengan{' '}
                <Link href="/terms" className="text-emerald-700 underline">Terma Penggunaan</Link>
                {' '}dan{' '}
                <Link href="/privacy" className="text-emerald-700 underline">Dasar Privasi</Link>
                {' '}kami.
              </p>
            )}
          </div>
        </div>

        {/* Explorer note */}
        <div className="mt-6 bg-white border border-emerald-200 rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-600">
            🆓 <strong>Pelan Explorer</strong> — 5 soalan percuma setiap hari.
          </p>
          <p className="text-xs text-slate-400 mt-1">Tiada kad kredit diperlukan untuk daftar.</p>
        </div>

        <p className="text-center text-slate-400 text-xs mt-4">
          <Link href="/" className="hover:text-slate-600">← Kembali ke Laman Utama</Link>
        </p>
      </div>
    </div>
  );
}
