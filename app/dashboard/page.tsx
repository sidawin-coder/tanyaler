cd /root/tanyaler-frontend && cat > app/dashboard/page.tsx << 'EOF'
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const API = 'http://localhost:8000';

interface Stats {
  credits: { balance: number; used_today: number };
  total_credits_used: number;
  questions_30d: number;
  questions_today: number;
  satisfaction_score: number | null;
  activity_7d: { day: string; count: number }[];
  top_docs: { doc: string; count: number }[];
  confidence_distribution: { band: string; count: number }[];
  language_breakdown: { lang: string; count: number }[];
  credit_burn_7d: { day: string; used: number }[];
}
interface Question {
  id: number; question: string; answer_preview: string;
  source_files: string[]; language: string;
  credit_used: number; timestamp: string; rating: number | null;
}
interface AdminStats {
  total_users: number; active_today: number;
  questions_today: number; questions_30d: number;
  daily_activity: { day: string; questions: number; users: number }[];
  language_breakdown: { lang: string; count: number }[];
}
interface Coupon {
  id: number; code: string; credit_amount: number;
  discount_percent: number; max_uses: number; used_count: number;
  valid_until: string; is_active: boolean; description: string; expired: boolean;
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtTime(d: string) {
  return new Date(d).toLocaleString('ms-MY', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

const baseScales = {
  y: { beginAtZero: true as const, ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
  x: { ticks: { font: { size: 10 } }, grid: { display: false as const } },
};

function ActivityLineChart({ data }: { data: { day: string; count: number }[] }) {
  if (!data || data.length === 0)
    return <div className="h-32 flex items-center justify-center text-xs text-slate-400">Belum ada aktiviti</div>;
  return (
    <div className="h-32">
      <Line
        data={{
          labels: data.map(d => d.day.slice(5)),
          datasets: [{ label: 'Soalan', data: data.map(d => d.count), borderColor: '#059669', backgroundColor: 'rgba(5,150,105,0.08)', fill: true, tension: 0.4, pointBackgroundColor: '#059669', pointRadius: 4 }],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: baseScales }}
      />
    </div>
  );
}

function LanguageDoughnutChart({ data }: { data: { lang: string; count: number }[] }) {
  if (!data || data.length === 0)
    return <div className="h-40 flex items-center justify-center text-xs text-slate-400">Belum ada data</div>;
  const langNames: Record<string, string> = { ms: 'Melayu', en: 'English', zh: 'Mandarin' };
  return (
    <div className="h-40">
      <Doughnut
        data={{
          labels: data.map(d => langNames[d.lang] || d.lang.toUpperCase()),
          datasets: [{ data: data.map(d => d.count), backgroundColor: ['#059669', '#3b82f6', '#f59e0b', '#8b5cf6'], borderWidth: 2, borderColor: '#fff' }],
        }}
        options={{ responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 8, boxWidth: 10 } } } }}
      />
    </div>
  );
}

function CreditBurnChart({ data }: { data: { day: string; used: number }[] }) {
  if (!data || data.length === 0)
    return <div className="h-32 flex items-center justify-center text-xs text-slate-400">Belum ada data</div>;
  return (
    <div className="h-32">
      <Bar
        data={{
          labels: data.map(d => d.day.slice(5)),
          datasets: [{ label: 'Kredit', data: data.map(d => d.used), backgroundColor: '#059669', borderRadius: 6 }],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: baseScales }}
      />
    </div>
  );
}

function ConfidenceChart({ data }: { data: { band: string; count: number }[] }) {
  const ordered = ['90-100%', '80-89%', '70-79%', '60-69%', '<60%'];
  const sorted = ordered.map(b => ({ band: b, count: data?.find(d => d.band === b)?.count ?? 0 }));
  if (sorted.every(d => d.count === 0))
    return <div className="h-32 flex items-center justify-center text-xs text-slate-400">Belum ada data</div>;
  return (
    <div className="h-32">
      <Bar
        data={{
          labels: sorted.map(d => d.band),
          datasets: [{ label: 'Soalan', data: sorted.map(d => d.count), backgroundColor: ['#059669', '#34d399', '#fbbf24', '#f97316', '#ef4444'], borderRadius: 6 }],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: baseScales }}
      />
    </div>
  );
}

function AdminActivityChart({ data }: { data: { day: string; questions: number; users: number }[] }) {
  if (!data || data.length === 0)
    return <div className="h-40 flex items-center justify-center text-xs text-slate-400">Belum ada data</div>;
  return (
    <div className="h-40">
      <Bar
        data={{
          labels: data.map(d => d.day.slice(5)),
          datasets: [
            { label: 'Soalan', data: data.map(d => d.questions), backgroundColor: '#059669', borderRadius: 4 },
            { label: 'Pengguna', data: data.map(d => d.users), backgroundColor: '#3b82f6', borderRadius: 4 },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 8, boxWidth: 10 } } }, scales: baseScales }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qPage, setQPage] = useState(1);
  const [qTotal, setQTotal] = useState(0);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [cpCode, setCpCode] = useState('');
  const [cpCredit, setCpCredit] = useState(10);
  const [cpMaxUses, setCpMaxUses] = useState(1);
  const [cpDays, setCpDays] = useState(30);
  const [cpDesc, setCpDesc] = useState('');
  const [cpMsg, setCpMsg] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemMsg, setRedeemMsg] = useState('');
  const [adjUserId, setAdjUserId] = useState('');
  const [adjAmount, setAdjAmount] = useState(0);
  const [adjMsg, setAdjMsg] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { window.location.href = '/login?redirect=/dashboard'; return; }
      setUser(session.user); setToken(session.access_token); setAuthChecked(true);
    });
  }, []);

  useEffect(() => {
    if (!user || !token) return;
    fetch(`${API}/api/admin/stats?admin_id=${user.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => { if (r.ok) setIsAdmin(true); }).catch(() => {});
  }, [user, token]);

  useEffect(() => {
    if (!user || !token) return;
    const uid = user.id;
    setLoading(true);
    if (activeTab === 'overview') {
      fetch(`${API}/api/dashboard/stats/${uid}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(r => r.json()).then(d => { setStats(d); setLoading(false); }).catch(() => setLoading(false));
    }
    if (activeTab === 'questions') {
      fetch(`${API}/api/dashboard/questions/${uid}?page=${qPage}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(r => r.json()).then(d => { setQuestions(d.questions || []); setQTotal(d.total || 0); setLoading(false); }).catch(() => setLoading(false));
    }
    if (activeTab === 'admin' && isAdmin) {
      fetch(`${API}/api/admin/stats?admin_id=${uid}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(r => r.json()).then(d => { setAdminStats(d); setLoading(false); }).catch(() => setLoading(false));
    }
    if (activeTab === 'coupons' && isAdmin) {
      fetch(`${API}/api/admin/coupons?admin_id=${uid}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(r => r.json()).then(d => { setCoupons(d.coupons || []); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [activeTab, user, token, qPage, isAdmin]);

  async function createCoupon() {
    if (!cpCode) { setCpMsg('Sila isi kod kupon'); return; }
    const uid = user.id;
    const r = await fetch(`${API}/api/admin/coupons/create?admin_id=${uid}&code=${cpCode}&credit_amount=${cpCredit}&max_uses=${cpMaxUses}&valid_days=${cpDays}&description=${encodeURIComponent(cpDesc)}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    const d = await r.json();
    if (r.ok) { setCpMsg(`Kupon ${d.code} berjaya dibuat!`); setCpCode(''); setCpDesc(''); }
    else setCpMsg(`Gagal: ${d.detail || 'Cuba semula'}`);
    fetch(`${API}/api/admin/coupons?admin_id=${uid}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(d => setCoupons(d.coupons || []));
  }

  async function redeemCoupon() {
    if (!redeemCode) return;
    const uid = user.id;
    const r = await fetch(`${API}/api/coupon/redeem?user_id=${uid}&code=${redeemCode}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    const d = await r.json();
    setRedeemMsg(r.ok ? `${d.message}` : `${d.detail || 'Gagal'}`);
    setRedeemCode('');
  }

  async function adjustCredit() {
    if (!adjUserId || adjAmount === 0) return;
    const uid = user.id;
    const r = await fetch(`${API}/api/admin/credits/adjust?admin_id=${uid}&user_id=${adjUserId}&amount=${adjAmount}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    const d = await r.json();
    setAdjMsg(r.ok ? `${d.message}` : `${d.detail || 'Gagal'}`);
  }

  if (!authChecked) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const uid = user?.id;
  const name = user?.user_metadata?.full_name || user?.email || 'Pengguna';
  const avatar = user?.user_metadata?.avatar_url;
  const initials = (name[0] || 'U').toUpperCase();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'questions', label: 'Soalan Saya', icon: '💬' },
    { id: 'credits', label: 'Kredit & Plan', icon: '💳' },
    { id: 'coupon', label: 'Guna Kupon', icon: '🎟️' },
    ...(isAdmin ? [
      { id: 'admin', label: 'Admin Panel', icon: '👑' },
      { id: 'coupons', label: 'Urus Kupon', icon: '🏷️' },
      { id: 'users', label: 'Pengguna', icon: '👥' },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-56 bg-white border-r border-slate-100 flex flex-col min-h-screen sticky top-0">
        <div className="p-4 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm">🔍</div>
            <span className="font-black text-slate-900">Tanya<span className="text-emerald-600">Ler</span></span>
          </Link>
          <p className="text-[10px] text-slate-400 mt-1 ml-10">Dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${activeTab === item.id ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
          {isAdmin && (
            <div className="pt-2 mt-2 border-t border-slate-100">
              <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest px-3 mb-1">Admin</p>
            </div>
          )}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center gap-2.5 mb-2">
            {avatar
              ? <img src={avatar} className="w-8 h-8 rounded-full object-cover border border-emerald-100" alt="avatar" />
              : <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
            }
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Link href="/apps" className="flex-1 text-center text-[10px] py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700">Tanya AI</Link>
            <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
              className="flex-1 text-center text-[10px] py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200">Keluar</button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">

        {activeTab === 'overview' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Selamat datang, {name.split(' ')[0]}!</h1>
            <p className="text-sm text-slate-500 mb-6">Ringkasan aktiviti TanyaLer anda.</p>
            {loading ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                Memuatkan data...
              </div>
            ) : stats && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Kredit Baki', value: stats.credits.balance, sub: `${stats.credits.used_today} guna hari ini`, icon: '💳' },
                    { label: 'Soalan Bulan Ini', value: stats.questions_30d, sub: `${stats.questions_today} hari ini`, icon: '💬' },
                    { label: 'Jumlah Kredit Guna', value: stats.total_credits_used, sub: 'Sepanjang masa', icon: '📊' },
                    { label: 'Skor Kepuasan', value: stats.satisfaction_score ? `${stats.satisfaction_score}%` : 'N/A', sub: 'Berdasarkan rating', icon: '⭐' },
                  ].map((c, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-500">{c.label}</p>
                        <span className="text-base">{c.icon}</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900">{c.value}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{c.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">Aktiviti Soalan (7 Hari)</p>
                    <p className="text-xs text-slate-400 mb-3">Bilangan soalan yang ditanya setiap hari</p>
                    <ActivityLineChart data={stats.activity_7d} />
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">Bahasa Soalan</p>
                    <p className="text-xs text-slate-400 mb-3">30 hari terakhir</p>
                    <LanguageDoughnutChart data={stats.language_breakdown || []} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">Penggunaan Kredit (7 Hari)</p>
                    <p className="text-xs text-slate-400 mb-3">Jumlah kredit digunakan setiap hari</p>
                    <CreditBurnChart data={stats.credit_burn_7d || []} />
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">Tahap Keyakinan Jawapan</p>
                    <p className="text-xs text-slate-400 mb-3">Semakin tinggi semakin tepat jawapan AI</p>
                    <ConfidenceChart data={stats.confidence_distribution || []} />
                  </div>
                </div>

                {stats.top_docs.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-4">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Dokumen Rujukan Teratas</p>
                    <div className="space-y-2">
                      {stats.top_docs.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 w-4">{i + 1}.</span>
                          <div className="flex-1">
                            <p className="text-xs text-slate-700 truncate">{d.doc}</p>
                            <div className="h-1.5 bg-slate-100 rounded-full mt-1">
                              <div className="h-1.5 bg-emerald-400 rounded-full" style={{ width: `${(d.count / stats.top_docs[0].count) * 100}%` }} />
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 w-8 text-right">{d.count}x</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Mahu tanya lebih banyak soalan?</p>
                    <p className="text-xs text-slate-500 mt-0.5">Kredit anda: {stats.credits.balance} baki</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/apps" className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-emerald-700">Tanya Sekarang</Link>
                    <Link href="/pricing" className="bg-white text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">Topup Kredit</Link>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'questions' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Soalan Saya</h1>
            <p className="text-sm text-slate-500 mb-6">Rekod semua soalan yang pernah anda tanya. Jumlah: {qTotal}</p>
            {loading ? <div className="text-slate-400 text-sm">Memuatkan...</div> : (
              <div className="space-y-3">
                {questions.length === 0
                  ? <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
                      <p className="text-slate-400 text-sm">Belum ada soalan. <Link href="/apps" className="text-emerald-600 underline">Tanya sekarang</Link></p>
                    </div>
                  : questions.map(q => (
                      <div key={q.id} className="bg-white rounded-2xl border border-slate-100 p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="text-sm font-semibold text-slate-900 flex-1">{q.question}</p>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {q.rating === 1 && <span className="text-emerald-500 text-xs">👍</span>}
                            {q.rating === -1 && <span className="text-red-400 text-xs">👎</span>}
                            <span className="text-[10px] text-slate-400">{fmtTime(q.timestamp)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{q.answer_preview}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {q.source_files.slice(0, 2).map((s, i) => (
                            <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full truncate max-w-[180px]">📄 {s}</span>
                          ))}
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ml-auto">{q.language?.toUpperCase()} · {q.credit_used} kredit</span>
                        </div>
                      </div>
                    ))
                }
                {qTotal > 20 && (
                  <div className="flex gap-2 justify-center pt-2">
                    <button onClick={() => setQPage(p => Math.max(1, p - 1))} disabled={qPage === 1} className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg disabled:opacity-40">Prev</button>
                    <span className="px-3 py-1.5 text-xs text-slate-500">Halaman {qPage}</span>
                    <button onClick={() => setQPage(p => p + 1)} disabled={qPage * 20 >= qTotal} className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg disabled:opacity-40">Next</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'credits' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Kredit & Plan</h1>
            <p className="text-sm text-slate-500 mb-6">Semak penggunaan kredit dan pelan anda.</p>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              {[
                { name: 'Explorer', price: 'Percuma', credits: '5/hari', days: 'Reset harian', rollover: false },
                { name: 'Rintis', price: 'RM39', credits: '50', days: '45 hari', rollover: false },
                { name: 'Strategis', price: 'RM89', credits: '200', days: '120 hari', rollover: true },
                { name: 'Prestij', price: 'RM199', credits: '500', days: '250 hari', rollover: true },
              ].map((p, i) => (
                <div key={i} className={`bg-white rounded-2xl border p-4 ${i === 2 ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-slate-900 text-sm">{p.name}{i === 2 ? ' ⭐' : ''}</p>
                    <p className="font-black text-slate-900">{p.price}</p>
                  </div>
                  <p className="text-2xl font-black text-emerald-600 mb-1">{p.credits}</p>
                  <p className="text-xs text-slate-400">{p.days} · {p.rollover ? '✅ Rollover' : '❌ No rollover'}</p>
                  {i > 0 && <Link href="/pricing" className="mt-3 block text-center text-xs bg-slate-900 text-white py-2 rounded-xl hover:bg-slate-800">Beli Plan →</Link>}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-900 mb-3">Sejarah kredit (30 hari)</p>
              <CreditHistory userId={uid} token={token} />
            </div>
          </div>
        )}

        {activeTab === 'coupon' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Guna Kupon</h1>
            <p className="text-sm text-slate-500 mb-6">Ada kod kupon? Masukkan di sini untuk tambah kredit percuma.</p>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-md">
              <div className="flex gap-2 mb-4">
                <input value={redeemCode} onChange={e => setRedeemCode(e.target.value.toUpperCase())}
                  placeholder="Contoh: WELCOME50"
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 font-mono tracking-wider uppercase" />
                <button onClick={redeemCoupon} className="bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-emerald-700">Guna</button>
              </div>
              {redeemMsg && (
                <p className={`text-sm px-4 py-3 rounded-xl ${redeemMsg.includes('berjaya') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{redeemMsg}</p>
              )}
              <p className="text-xs text-slate-400 mt-4">Kupon terhad kepada 1 penggunaan per akaun.</p>
            </div>
          </div>
        )}

        {activeTab === 'admin' && isAdmin && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-black text-slate-900">Admin Panel</h1>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Superadmin</span>
            </div>
            <p className="text-sm text-slate-500 mb-6">Analisa sistem dan pengurusan TanyaLer.</p>
            {loading ? <div className="text-slate-400 text-sm">Memuatkan...</div> : adminStats && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Jumlah Pengguna', value: adminStats.total_users },
                    { label: 'Aktif Hari Ini', value: adminStats.active_today },
                    { label: 'Soalan Hari Ini', value: adminStats.questions_today },
                    { label: 'Soalan 30 Hari', value: adminStats.questions_30d },
                  ].map((c, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4">
                      <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                      <p className="text-2xl font-black text-slate-900">{c.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">Soalan & Pengguna Harian (14 Hari)</p>
                    <p className="text-xs text-slate-400 mb-3">Hijau = soalan · Biru = pengguna unik</p>
                    <AdminActivityChart data={adminStats.daily_activity} />
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Bahasa Soalan (30 Hari)</p>
                    {adminStats.language_breakdown.map((l, i) => (
                      <div key={i} className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-slate-600 w-8 uppercase">{l.lang}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full">
                          <div className="h-2 bg-emerald-400 rounded-full" style={{ width: `${(l.count / adminStats.language_breakdown[0].count) * 100}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 w-8 text-right">{l.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Laras Kredit Pengguna</p>
                  <div className="flex gap-2 flex-wrap">
                    <input value={adjUserId} onChange={e => setAdjUserId(e.target.value)} placeholder="User ID (UUID)"
                      className="flex-1 min-w-0 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400" />
                    <input type="number" value={adjAmount} onChange={e => setAdjAmount(Number(e.target.value))} placeholder="Jumlah"
                      className="w-36 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400" />
                    <button onClick={adjustCredit} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800">Laras</button>
                  </div>
                  {adjMsg && <p className={`text-xs mt-2 ${adjMsg.includes('berjaya') ? 'text-emerald-600' : 'text-red-500'}`}>{adjMsg}</p>}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'coupons' && isAdmin && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Urus Kupon</h1>
            <p className="text-sm text-slate-500 mb-6">Cipta dan urus kupon untuk pengguna TanyaLer.</p>
            <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-4">
              <p className="text-sm font-semibold text-slate-900 mb-3">Cipta Kupon Baru</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Kod Kupon</label>
                  <input value={cpCode} onChange={e => setCpCode(e.target.value.toUpperCase())} placeholder="WELCOME50" maxLength={20}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 font-mono uppercase" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Kredit Diberikan</label>
                  <input type="number" value={cpCredit} onChange={e => setCpCredit(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Had Penggunaan</label>
                  <input type="number" value={cpMaxUses} onChange={e => setCpMaxUses(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Sah (hari)</label>
                  <input type="number" value={cpDays} onChange={e => setCpDays(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400" />
                </div>
              </div>
              <div className="flex gap-2">
                <input value={cpDesc} onChange={e => setCpDesc(e.target.value)} placeholder="Keterangan kupon (pilihan)"
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400" />
                <button onClick={createCoupon} className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700">Cipta</button>
              </div>
              {cpMsg && <p className={`text-xs mt-2 ${cpMsg.includes('berjaya') ? 'text-emerald-600' : 'text-red-500'}`}>{cpMsg}</p>}
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 text-xs font-semibold text-slate-500 grid grid-cols-6 gap-2">
                <span>Kod</span><span>Kredit</span><span>Guna</span><span>Sah hingga</span><span>Status</span><span>Keterangan</span>
              </div>
              {coupons.length === 0
                ? <p className="text-xs text-slate-400 text-center py-8">Belum ada kupon</p>
                : coupons.map(c => (
                    <div key={c.id} className="px-4 py-3 border-b border-slate-50 text-sm grid grid-cols-6 gap-2 items-center hover:bg-slate-50">
                      <span className="font-mono font-semibold text-emerald-700">{c.code}</span>
                      <span>{c.credit_amount} kredit</span>
                      <span>{c.used_count}/{c.max_uses}</span>
                      <span className="text-xs text-slate-500">{fmt(c.valid_until)}</span>
                      <span>{c.expired ? <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full">Tamat</span> : c.is_active ? <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">Aktif</span> : <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Tidak aktif</span>}</span>
                      <span className="text-xs text-slate-400 truncate">{c.description || '—'}</span>
                    </div>
                  ))
              }
            </div>
          </div>
        )}

        {activeTab === 'users' && isAdmin && <UsersTab uid={uid} token={token} />}

      </main>
    </div>
  );
}

function CreditHistory({ userId, token }: { userId: string; token: string }) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8000/api/dashboard/credits/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(d => setData(d.history || []));
  }, [userId]);
  if (data.length === 0) return <p className="text-xs text-slate-400">Belum ada data kredit.</p>;
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
          <span className="text-slate-600">{d.date}</span>
          <span className="text-slate-500 text-xs">{d.used} digunakan</span>
          <span className={`font-semibold ${d.balance > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{d.balance} baki</span>
        </div>
      ))}
    </div>
  );
}

function UsersTab({ uid, token }: { uid: string; token: string }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:8000/api/admin/users?admin_id=${uid}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setUsers(d.users || []); setLoading(false); });
  }, []);
  return (
    <div>
      <h1 className="text-xl font-black text-slate-900 mb-1">Senarai Pengguna</h1>
      <p className="text-sm text-slate-500 mb-6">Semua pengguna yang pernah menggunakan TanyaLer.</p>
      {loading ? <p className="text-slate-400 text-sm">Memuatkan...</p> : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 text-xs font-semibold text-slate-500 grid grid-cols-4 gap-2">
            <span>User ID</span><span>Kredit Baki</span><span>Total Guna</span><span>Terakhir Aktif</span>
          </div>
          {users.map((u, i) => (
            <div key={i} className="px-4 py-3 border-b border-slate-50 text-sm grid grid-cols-4 gap-2 items-center hover:bg-slate-50">
              <span className="font-mono text-xs text-slate-600 truncate">{u.user_id.slice(0, 8)}...</span>
              <span className="font-semibold text-emerald-600">{u.current_balance}</span>
              <span className="text-slate-500">{u.total_used} kredit</span>
              <span className="text-xs text-slate-400">{u.last_active ? new Date(u.last_active).toLocaleDateString('ms-MY') : '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
EOF
