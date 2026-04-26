import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import Logo from '@/components/Logo';

async function getCredits(userId: string) {
  const service = await createServiceClient();
  const today = new Date().toISOString().split('T')[0];

  const { data } = await service
    .from('credits')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!data) return null;

  if (data.last_reset < today) {
    await service
      .from('credits')
      .update({ daily_free_used: 0, last_reset: today })
      .eq('user_id', userId);
    data.daily_free_used = 0;
  }

  return {
    balance: data.balance,
    freeRemaining: Math.max(0, data.daily_free_limit - data.daily_free_used),
    dailyFreeLimit: data.daily_free_limit,
    totalUsed: data.total_used,
    plan: data.plan,
  };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const credits = await getCredits(user.id);
  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'Pengguna';
  const avatarUrl = user.user_metadata?.avatar_url;
  const totalCredits = (credits?.balance || 0) + (credits?.freeRemaining || 0);
  const canChat = totalCredits > 0;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Dashboard Nav */}
      <header className="bg-white border-b border-slate-200/60 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <Logo size={32} />

          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
            >
              ⚡ {totalCredits} kredit
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={firstName} className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium text-slate-700">{firstName}</span>
              </button>

              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200/60 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-900 truncate">{user.user_metadata?.full_name || firstName}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                </div>
                <Link href="/pricing" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  ⬆️ Topup Kredit
                </Link>
                <Link href="/transactions" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  📋 Sejarah Transaksi
                </Link>
                <form action="/api/auth/signout" method="POST">
                  <button type="submit" className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                    🚪 Log Keluar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Selamat datang, {firstName}. 👋
          </h1>
          <p className="text-lg text-slate-600">Sedia untuk belajar ePerolehan hari ini?</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Soalan Percuma Hari Ini</span>
              <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-base">☀️</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-1">{credits?.freeRemaining ?? 0}</div>
            <div className="text-sm text-slate-500">daripada {credits?.dailyFreeLimit ?? 8} soalan</div>
            <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${((credits?.freeRemaining ?? 0) / (credits?.dailyFreeLimit ?? 8)) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Kredit Berbayar</span>
              <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-base">⚡</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-1">{credits?.balance ?? 0}</div>
            <div className="text-sm text-slate-500">kredit berbaki</div>
            <Link href="/pricing" className="mt-3 inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              Topup kredit →
            </Link>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Jumlah Soalan</span>
              <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                <span className="text-base">💬</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-1">{credits?.totalUsed ?? 0}</div>
            <div className="text-sm text-slate-500">soalan setakat ini</div>
            <Link href="/transactions" className="mt-3 inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900">
              Sejarah transaksi →
            </Link>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute right-8 top-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              RAG Engine Aktif
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Apa soalan ePerolehan anda hari ini?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl">
              Tanya dalam bahasa yang selesa. Jawapan step-by-step disokong dokumen rasmi.
            </p>

            {canChat ? (
              <Link
                href="/chat"
                className="group inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-base px-7 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Mula Bertanya Sekarang
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M1 8h14M9 2l6 6-6 6" />
                </svg>
              </Link>
            ) : (
              <div>
                <p className="text-amber-400 text-sm font-semibold mb-4">
                  ⚠️ Kredit habis untuk hari ini. Topup atau tunggu esok.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-base px-7 py-4 rounded-full"
                >
                  Topup Kredit →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick topics */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: '📋', title: 'Pendaftaran', desc: 'Daftar & kemaskini profil ePerolehan', q: 'Cara daftar ePerolehan buat kali pertama' },
            { icon: '📄', title: 'Sebut Harga', desc: 'Cara sertai dan hantar sebut harga', q: 'Cara submit sebut harga dalam ePerolehan' },
            { icon: '🏆', title: 'Tender', desc: 'Proses tender dan cara menang', q: 'Cara sertai tender kerajaan dalam ePerolehan' },
            { icon: '✅', title: 'Pemenuhan', desc: 'Cara submit pemenuhan selepas dapat projek', q: 'Cara buat pemenuhan dalam sistem eP' },
            { icon: '🔄', title: 'Renew Sijil', desc: 'Pembaharuan sijil MOF', q: 'Cara renew sijil MOF dalam ePerolehan' },
            { icon: '📦', title: 'Katalog', desc: 'Bina dan urus katalog produk', q: 'Cara buat katalog ePerolehan yang akan lulus' },
          ].map((topic) => (
            <Link
              key={topic.title}
              href={`/chat?q=${encodeURIComponent(topic.q)}`}
              className="group bg-white border border-slate-200/60 hover:border-emerald-300 rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="text-2xl mb-3">{topic.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">{topic.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{topic.desc}</p>
            </Link>
          ))}
        </div>

        {/* Upgrade prompt */}
        {credits?.plan === 'free' && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Nak lebih kredit?</h3>
              <p className="text-slate-600 text-[15px]">Plan Pro RM59/bulan bagi anda 600 kredit soalan. Sesuai untuk pengguna aktif.</p>
            </div>
            <Link
              href="/pricing"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Lihat Plan Pro →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
