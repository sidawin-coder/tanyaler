'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';


export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(true);
  const [tab, setTab] = useState('overview');
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<any>(undefined);
  const [questions, setQuestions] = useState<any[]>([]);
  const [qTotal, setQTotal] = useState(0);
  const [qPage, setQPage] = useState(1);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [adminStats, setAdminStats] = useState<any>(null);
  const [cpCode, setCpCode] = useState('');
  const [cpCredit, setCpCredit] = useState(10);
  const [cpMaxUses, setCpMaxUses] = useState(1);
  const [cpDays, setCpDays] = useState(30);
  const [cpDesc, setCpDesc] = useState('');
  const [cpMsg, setCpMsg] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemMsg, setRedeemMsg] = useState('');
  const [adjUid, setAdjUid] = useState('');
  const [adjAmt, setAdjAmt] = useState(10);
  const [adjMsg, setAdjMsg] = useState('');
  // Chat states
  const [chatMessages, setChatMessages] = useState<{id:string;role:'user'|'assistant';content:string;source_files?:string[];confidence?:number;share_urls?:any;rating?:1|-1|null}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const chatTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [debug, setDebug] = useState('init...');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [chatMessages]);

  // Auth
  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(({ data }) => {
      if (!data.user) { window.location.href = '/login?redirect=/dashboard'; return; }
      const u = data.user;
      setUser(u);
      fetch('/api/dashboard/dashboard/stats/' + u.id)
        .then(r => r.json()).then(d => setStats(d)).catch(() => setStats({}));
      fetch('/api/dashboard/admin/stats?admin_id=' + u.id)
        .then(r => { if (r.ok) setIsAdmin(true); }).catch(() => {});
    });
  }, []);

  // Load data bila tukar tab
  useEffect(() => {
    if (!user) return;
    const supabase = createClient(); // eslint-disable-line
    const uid = user.id;
    if (tab === 'overview') {
      fetch(`/api/dashboard/dashboard/stats/${uid}`)
        .then(r => r.json()).then(d => setStats(d)).catch(() => setStats({}));
    } else if (tab === 'questions') {
      fetch(`/api/dashboard/dashboard/questions/${uid}?page=${qPage}`)
        .then(r => r.json()).then(d => { setQuestions(d.questions || []); setQTotal(d.total || 0); })
        .catch(() => setQuestions([]));
    } else if (tab === 'admin' && isAdmin) {
      fetch(`/api/dashboard/admin/stats?admin_id=${uid}`)
        .then(r => r.json()).then(d => setAdminStats(d)).catch(() => setAdminStats({}));
    } else if (tab === 'coupons' && isAdmin) {
      fetch(`/api/dashboard/admin/coupons?admin_id=${uid}`)
        .then(r => r.json()).then(d => setCoupons(d.coupons || [])).catch(() => setCoupons([]));
    }
  }, [tab, user, qPage, isAdmin]);

  async function createCoupon() {
    if (!cpCode) { setCpMsg('Sila isi kod'); return; }
    const r = await fetch(`/api/dashboard/admin/coupons/create?admin_id=${user.id}&code=${cpCode}&credit_amount=${cpCredit}&max_uses=${cpMaxUses}&valid_days=${cpDays}&description=${encodeURIComponent(cpDesc)}`, { method: 'POST' });
    const d = await r.json();
    setCpMsg(r.ok ? `✅ Kupon ${d.code} berjaya!` : `❌ ${d.detail || 'Gagal'}`);
    if (r.ok) { setCpCode(''); fetch(`/api/dashboard/admin/coupons?admin_id=${user.id}`).then(r=>r.json()).then(d=>setCoupons(d.coupons||[])); }
  }
  async function redeemCoupon() {
    if (!redeemCode) return;
    const r = await fetch(`/api/dashboard/coupon/redeem?user_id=${user.id}&code=${redeemCode}`, { method: 'POST' });
    const d = await r.json();
    setRedeemMsg(r.ok ? `✅ ${d.message}` : `❌ ${d.detail || 'Gagal'}`);
    setRedeemCode('');
  }
  async function adjustCredit() {
    const r = await fetch(`/api/dashboard/admin/credits/adjust?admin_id=${user.id}&user_id=${adjUid}&amount=${adjAmt}`, { method: 'POST' });
    const d = await r.json();
    setAdjMsg(r.ok ? `✅ ${d.message}` : `❌ ${d.detail || 'Gagal'}`);
  }

  const genId = () => Math.random().toString(36).slice(2, 9);

  function parseChat(text: string): string {
    if (!text) return '';
    text = text.replace(/⚠️\s*\*\*PENAFIAN RASMI TANYALER:\*\*/g, '<span class="text-red-600 font-bold">⚠️ PENAFIAN RASMI</span>');
    text = text.replace(/⚠️\s*PENAFIAN RASMI TANYALER:/g, '<span class="text-red-600 font-bold">⚠️ PENAFIAN RASMI</span>');
    text = text.replace(/PENAFIAN RASMI TANYALER:/g, '<span class="text-red-600 font-bold">PENAFIAN RASMI</span>');
    const lines = text.split('\n');
    const out: string[] = [];
    let inList = false;
    for (const line of lines) {
      let l = line;
      l = l.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
      if (/^### (.+)$/.test(l)) { if (inList) { out.push('</ul>'); inList=false; } out.push('<h3 class="text-sm font-bold text-slate-900 mt-3 mb-1">'+l.replace(/^### /,'')+'</h3>'); continue; }
      if (/^---+$/.test(l.trim())) { if (inList) { out.push('</ul>'); inList=false; } out.push('<hr class="border-slate-200 my-3"/>'); continue; }
      if (/^> (.+)$/.test(l)) { if (inList) { out.push('</ul>'); inList=false; } out.push('<blockquote class="border-l-4 border-emerald-400 bg-emerald-50 pl-3 py-1 my-1 text-slate-700 rounded-r text-sm">'+l.replace(/^> /,'')+'</blockquote>'); continue; }
      if (/^[-•]\s+(.+)$/.test(l)) { if (!inList) { out.push('<ul class="space-y-1 my-1">'); inList=true; } out.push('<li class="flex gap-2 text-sm text-slate-700"><span class="text-emerald-500 flex-shrink-0">•</span><span>'+l.replace(/^[-•]\s+/,'')+'</span></li>'); continue; }
      if (/^\d+\.\s+(.+)$/.test(l)) { if (!inList) { out.push('<ul class="space-y-1 my-1 list-none">'); inList=true; } const num=l.match(/^(\d+)\./)?.[1]||''; out.push('<li class="flex gap-2 text-sm text-slate-700"><span class="text-emerald-600 font-bold flex-shrink-0 w-4">'+num+'.</span><span>'+l.replace(/^\d+\.\s+/,'')+'</span></li>'); continue; }
      if (inList && l.trim() !== '') { out.push('</ul>'); inList=false; }
      if (l.trim() === '') { out.push('<div class="h-1.5"></div>'); continue; }
      out.push('<p class="text-sm text-slate-700 leading-relaxed">'+l+'</p>');
    }
    if (inList) out.push('</ul>');
    return out.join('');
  }

  async function handleChatSend(e?: React.FormEvent, override?: string) {
    if (e) e.preventDefault();
    const q = (override ?? chatInput).trim();
    if (!q || chatLoading) return;
    const userMsg = { id: genId(), role: 'user' as const, content: q };
    const loadMsg = { id: genId(), role: 'assistant' as const, content: '' };
    setChatMessages(prev => [...prev, userMsg, loadMsg]);
    setChatInput('');
    if (chatTextareaRef.current) chatTextareaRef.current.style.height = 'auto';
    setChatLoading(true);
    try {
      const sb = createClient();
      const { data: { session } } = await sb.auth.getSession();
      const userToken = session?.access_token || '';
      const history = chatMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Token': userToken },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: q }] }),
      });
      const data = await res.json();
      setChatMessages(prev => {
        const updated = [...prev];
        updated[updated.length-1] = { ...updated[updated.length-1], content: data.answer || 'Ralat sambungan. Sila cuba lagi.', source_files: data.source_files||[], confidence: data.confidence||0, share_urls: data.share_urls||null };
        return updated;
      });
      if (data.credit_balance != null) {
        fetch('/api/dashboard/dashboard/stats/'+user.id).then(r=>r.json()).then(d=>setStats(d)).catch(()=>{});
      }
    } catch {
      setChatMessages(prev => { const u=[...prev]; u[u.length-1]={...u[u.length-1],content:'Ralat sambungan. Sila cuba lagi.'}; return u; });
    } finally {
      setChatLoading(false);
    }
  }

  function handleChatRate(id: string, val: 1|-1) {
    setChatMessages(prev => prev.map(m => m.id===id ? {...m, rating: m.rating===val ? null : val} : m));
  }



  const name = user?.user_metadata?.full_name || user?.email || 'Pengguna';
  const avatar = user?.user_metadata?.avatar_url;

  const navItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'chat', icon: '🤖', label: 'Tanya AI' },
    { id: 'questions', icon: '💬', label: 'Soalan Saya' },
    { id: 'credits', icon: '💳', label: 'Kredit & Plan' },
    { id: 'coupon', icon: '🎟️', label: 'Guna Kupon' },
    { id: 'affiliate', icon: '🤝', label: 'Affiliate' },
    ...(isAdmin ? [
      { id: 'admin', icon: '👑', label: 'Admin Panel' },
      { id: 'coupons', icon: '🏷️', label: 'Urus Kupon' },
      { id: 'users', icon: '👥', label: 'Pengguna' },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header (only mobile) */}
      <header className="md:hidden bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">T</div>
          <span className="font-black text-slate-900">Tanya<span className="text-emerald-600">Ler</span></span>
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 -mr-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 min-h-[48px] min-w-[48px] flex items-center justify-center" aria-label="Buka menu">
          <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </header>

      <div className="md:flex">
        {/* Mobile overlay when menu open */}
        {mobileMenuOpen && (
          <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden" aria-hidden="true"/>
        )}

      {/* Sidebar (drawer on mobile, sticky on desktop) */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 md:z-auto w-72 md:w-56 h-screen bg-white border-r border-slate-100 flex flex-col transform transition-transform duration-200 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} overflow-y-auto`}>
        {/* Logo + Close (mobile only) */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">T</div>
            <span className="font-black text-slate-900">Tanya<span className="text-emerald-600">Ler</span></span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden p-2 rounded hover:bg-slate-100 min-h-[40px] min-w-[40px] flex items-center justify-center" aria-label="Tutup menu">
            <svg className="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6L18 18M6 18L18 6"/></svg>
          </button>
        </div>
        {/* User info — atas nav */}
        <div className="px-3 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-2.5">
            {avatar
              ? <img src={avatar} className="w-9 h-9 rounded-full border-2 border-emerald-100 object-cover flex-shrink-0" alt="avatar"/>
              : <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{name[0]?.toUpperCase()}</div>
            }
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{name.split(' ')[0]}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => createClient().auth.signOut().then(() => window.location.href='/')}
            className="w-full text-center text-[10px] py-1.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 hover:text-slate-700 transition-all font-medium">
            Log Keluar
          </button>
        </div>
        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-3 md:py-2.5 rounded-xl text-sm text-left transition-all min-h-[48px] md:min-h-0 ${tab === item.id ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'}`}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 min-w-0 w-full">

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Selamat datang, {name.split(' ')[0]}!</h1>
            <p className="text-sm text-slate-500 mb-6">Ringkasan aktiviti TanyaLer anda.</p>
            {stats === undefined ? (
              <div className="text-slate-400 text-sm p-4">Memuatkan data... [{debug}]</div>
            ) : stats === null || Object.keys(stats).length === 0 ? (
              <div className="text-slate-400 text-sm p-4">Tiada data. Cuba muat semula halaman.</div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Kredit Baki', value: stats.credits?.balance ?? 0, sub: `${stats.credits?.used_today ?? 0} guna hari ini` },
                    { label: 'Soalan 30 Hari', value: stats.questions_30d ?? 0, sub: `${stats.questions_today ?? 0} hari ini` },
                    { label: 'Jumlah Kredit Guna', value: stats.total_credits_used ?? 0, sub: 'Sepanjang masa' },
                    { label: 'Kepuasan', value: stats.satisfaction_score ? `${stats.satisfaction_score}%` : '—', sub: 'Berdasarkan rating' },
                  ].map((c, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4">
                      <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                      <p className="text-2xl font-black text-slate-900">{c.value}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{c.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Aktiviti soalan (7 hari)</p>
                    {(stats.activity_7d?.length ?? 0) === 0
                      ? <p className="text-xs text-slate-400">Belum ada data</p>
                      : <div className="flex items-end gap-2 h-16">
                          {stats.activity_7d.map((d: any, i: number) => {
                            const max = Math.max(...stats.activity_7d.map((x: any) => x.count), 1);
                            return (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full bg-emerald-500 rounded-sm" style={{height:`${Math.max((d.count/max)*52,4)}px`}}/>
                                <span className="text-[9px] text-slate-400">{d.day.slice(5)}</span>
                              </div>
                            );
                          })}
                        </div>
                    }
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Dokumen rujukan teratas</p>
                    {(stats.top_docs?.length ?? 0) === 0
                      ? <p className="text-xs text-slate-400">Belum ada data</p>
                      : stats.top_docs.map((d: any, i: number) => (
                          <div key={i} className="flex items-center gap-2 mb-2">
                            <div className="flex-1">
                              <p className="text-xs text-slate-700 truncate">{d.doc}</p>
                              <div className="h-1.5 bg-slate-100 rounded-full mt-1">
                                <div className="h-1.5 bg-emerald-400 rounded-full" style={{width:`${(d.count/stats.top_docs[0].count)*100}%`}}/>
                              </div>
                            </div>
                            <span className="text-xs text-slate-400 w-5 text-right">{d.count}</span>
                          </div>
                        ))
                    }
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Mahu tanya lebih banyak?</p>
                    <p className="text-xs text-slate-500">Kredit baki: {stats.credits?.balance ?? 0}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setTab('chat')} className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-emerald-700">Tanya Sekarang</button>
                    <Link href="/pricing" className="bg-white text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200">Topup</Link>
                  </div>
                </div>
              </>
            )}
          </div>
        )}


        {/* TANYA AI */}
        {tab === 'chat' && (
          <div className="flex flex-col h-[calc(100vh-120px)]">
            <div className="mb-4">
              <h1 className="text-xl font-black text-slate-900">Tanya AI</h1>
              <p className="text-sm text-slate-500">Sistem Rujukan Pintar ePerolehan Malaysia · 7,375 muka surat · 59 dokumen rasmi</p>
            </div>
            {/* Chat messages */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8 space-y-4 overflow-hidden">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">🤖</div>
                  <div>
                    <p className="text-slate-700 font-semibold text-sm mb-1">Tanya AI ePerolehan</p>
                    <p className="text-slate-400 text-xs">Soalan anda akan dijawab berdasarkan 59 dokumen rasmi</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center max-w-lg px-4">
                    {['Cara daftar sebagai vendor ePerolehan','Had nilai perolehan terus Kelas F','Prosedur tender dalam ePerolehan','Dokumen diperlukan untuk sebut harga'].map((s,i) => (
                      <button key={i} onClick={() => handleChatSend(undefined, s)}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 text-xs hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                chatMessages.map((m) => (
                  <div key={m.id} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[85%] space-y-2">
                      <div className={`px-5 py-4 rounded-2xl text-sm shadow-sm border ${m.role==='user' ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-white border-slate-100 text-slate-800'}`}>
                        {m.role==='assistant' && !m.content && chatLoading && (
                          <div className="flex gap-1.5 items-center py-1">
                            {[0,1,2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" style={{animationDelay:`${i*0.15}s`}}/>)}
                          </div>
                        )}
                        {m.content && <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{__html: parseChat(m.content)}}/>}
                      </div>
                      {m.role==='assistant' && m.content && !!m.source_files?.length && (
                        <div className="flex flex-wrap gap-1.5 px-1">
                          {m.source_files.map((f,i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 border border-blue-100 rounded-full text-[10px] text-blue-700 font-medium max-w-[220px]">
                              📄 <span className="truncate">{f}</span>
                            </span>
                          ))}
                        </div>
                      )}
                      {m.role==='assistant' && m.content && (
                        <div className="flex items-center gap-1 px-1">
                          <button onClick={() => handleChatRate(m.id, 1)} className={`p-1.5 rounded-lg transition-all text-sm ${m.rating===1 ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600'}`}>👍</button>
                          <button onClick={() => handleChatRate(m.id, -1)} className={`p-1.5 rounded-lg transition-all text-sm ${m.rating===-1 ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-500'}`}>👎</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Kredit info */}
            {stats && (
              <div className="py-2 px-1">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  (stats.credits?.balance||0) > 10 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  (stats.credits?.balance||0) > 3 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-red-50 text-red-600 border-red-200'
                }`}>{stats.credits?.balance||0} kredit berbaki</span>
                {(stats.credits?.balance||0) === 0 && (
                  <button onClick={() => setTab('credits')} className="ml-2 text-xs text-emerald-600 underline font-semibold">Topup kredit →</button>
                )}
              </div>
            )}
            {/* Input */}
            <div className="pt-3 border-t border-slate-100">
              <form onSubmit={handleChatSend} className="flex items-end gap-2">
                <textarea ref={chatTextareaRef} rows={1}
                  className="flex-1 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-xl outline-none transition-all text-base text-slate-900 placeholder:text-slate-400 shadow-inner resize-none overflow-hidden"
                  placeholder="Taip soalan ePerolehan anda..."
                  value={chatInput}
                  onChange={(e) => { setChatInput(e.target.value); e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,120)+'px'; }}
                  onKeyDown={(e) => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); handleChatSend(); } }}
                  style={{minHeight:'48px',maxHeight:'120px'}}/>
                <button type="submit" disabled={chatLoading || !chatInput.trim()}
                  className="bg-emerald-700 text-white p-3 rounded-xl hover:bg-emerald-800 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-lg flex-shrink-0">
                  {chatLoading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  }
                </button>
              </form>
              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-2">TANYALER SYSTEM V1.0 · 7,375 Muka Surat · 59 Dokumen Rasmi</p>
            </div>
          </div>
        )}

        {/* QUESTIONS */}
        {tab === 'questions' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Soalan Saya</h1>
            <p className="text-sm text-slate-500 mb-6">Rekod semua soalan anda. Jumlah: {qTotal}</p>
            <div className="space-y-3">
              {questions.length === 0
                ? <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
                    <p className="text-slate-400 text-sm">Belum ada soalan. <button onClick={() => setTab('chat')} type="button" className="text-emerald-600 underline">Tanya sekarang</button></p>
                  </div>
                : questions.map((q: any) => (
                    <div key={q.id} className="bg-white rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm font-semibold text-slate-900">{q.question}</p>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">{new Date(q.timestamp).toLocaleDateString('ms-MY')}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{q.answer_preview}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {q.source_files?.slice(0,2).map((s: string, i: number) => (
                          <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full truncate max-w-[160px]">📄 {s}</span>
                        ))}
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ml-auto">{q.language?.toUpperCase()} · {q.credit_used} kredit</span>
                      </div>
                    </div>
                  ))
              }
              {qTotal > 20 && (
                <div className="flex gap-2 justify-center pt-2">
                  <button onClick={() => setQPage(p => Math.max(1,p-1))} disabled={qPage===1} className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg disabled:opacity-40">← Prev</button>
                  <span className="px-3 py-1.5 text-xs text-slate-500">Halaman {qPage}</span>
                  <button onClick={() => setQPage(p => p+1)} disabled={qPage*20>=qTotal} className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg disabled:opacity-40">Next →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CREDITS */}
        {tab === 'credits' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Kredit & Plan</h1>
            <p className="text-sm text-slate-500 mb-6">Semak penggunaan kredit dan pelan anda.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { name: 'Explorer', price: 'Percuma', credits: '20 kredit', days: 'Percubaan 10 hari' },
                { name: 'Rintis', price: 'RM39', credits: '50 kredit', days: '45 hari' },
                { name: 'Strategis ⭐', price: 'RM89', credits: '200 kredit', days: '120 hari + Rollover' },
                { name: 'Prestij', price: 'RM199', credits: '500 kredit', days: '250 hari + Rollover' },
              ].map((p, i) => (
                <div key={i} className={`bg-white rounded-2xl border p-4 ${i===2 ? 'border-emerald-300' : 'border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                    <p className="font-black text-slate-900 text-sm">{p.price}</p>
                  </div>
                  <p className="text-2xl font-black text-emerald-600 mb-1">{p.credits}</p>
                  <p className="text-xs text-slate-400 mb-3">{p.days}</p>
                  {i > 0 && <Link href="/pricing" className="block text-center text-xs bg-slate-900 text-white py-2 rounded-xl">Beli →</Link>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COUPON */}
        {tab === 'coupon' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Guna Kupon</h1>
            <p className="text-sm text-slate-500 mb-6">Ada kod kupon? Masukkan di sini untuk tambah kredit.</p>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-md">
              <div className="flex gap-2 mb-4">
                <input value={redeemCode} onChange={e => setRedeemCode(e.target.value.toUpperCase())}
                  placeholder="Contoh: WELCOME50"
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 font-mono uppercase"/>
                <button onClick={redeemCoupon} className="bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-emerald-700">Guna</button>
              </div>
              {redeemMsg && <p className={`text-sm px-4 py-3 rounded-xl ${redeemMsg.startsWith('✅') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{redeemMsg}</p>}
            </div>
          </div>
        )}

        {/* ADMIN */}
        {tab === 'admin' && isAdmin && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-black text-slate-900">Admin Panel</h1>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Superadmin</span>
            </div>
            <p className="text-sm text-slate-500 mb-6">Analisa sistem TanyaLer.</p>
            {!adminStats
              ? <div className="text-slate-400 text-sm p-4">Memuatkan data admin...</div>
              : <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Jumlah Pengguna', value: adminStats.total_users ?? 0 },
                      { label: 'Aktif Hari Ini', value: adminStats.active_today ?? 0 },
                      { label: 'Soalan Hari Ini', value: adminStats.questions_today ?? 0 },
                      { label: 'Soalan 30 Hari', value: adminStats.questions_30d ?? 0 },
                    ].map((c, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4">
                        <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                        <p className="text-2xl font-black text-slate-900">{c.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Laras Kredit Pengguna</p>
                    <div className="flex gap-2 flex-wrap">
                      <input value={adjUid} onChange={e => setAdjUid(e.target.value)} placeholder="User ID"
                        className="flex-1 min-w-0 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400"/>
                      <input type="number" value={adjAmt} onChange={e => setAdjAmt(Number(e.target.value))} placeholder="Jumlah"
                        className="w-24 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400"/>
                      <button onClick={adjustCredit} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold">Laras</button>
                    </div>
                    {adjMsg && <p className={`text-xs mt-2 ${adjMsg.startsWith('✅') ? 'text-emerald-600' : 'text-red-500'}`}>{adjMsg}</p>}
                  </div>
                </>
            }
          </div>
        )}

        {/* COUPONS ADMIN */}
        {tab === 'coupons' && isAdmin && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Urus Kupon</h1>
            <p className="text-sm text-slate-500 mb-6">Cipta dan urus kupon.</p>
            <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-4">
              <p className="text-sm font-semibold text-slate-900 mb-3">Cipta Kupon Baru</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                {[
                  { label: 'Kod', value: cpCode, onChange: (v: string) => setCpCode(v.toUpperCase()), placeholder: 'WELCOME50', mono: true },
                  { label: 'Kredit', value: cpCredit, onChange: (v: string) => setCpCredit(Number(v)), type: 'number' },
                  { label: 'Had Guna', value: cpMaxUses, onChange: (v: string) => setCpMaxUses(Number(v)), type: 'number' },
                  { label: 'Sah (hari)', value: cpDays, onChange: (v: string) => setCpDays(Number(v)), type: 'number' },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-xs text-slate-500 mb-1 block">{f.label}</label>
                    <input type={f.type || 'text'} value={f.value} onChange={e => f.onChange(e.target.value)}
                      placeholder={f.placeholder || ''}
                      className={`w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 ${f.mono ? 'font-mono uppercase' : ''}`}/>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={cpDesc} onChange={e => setCpDesc(e.target.value)} placeholder="Keterangan (pilihan)"
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400"/>
                <button onClick={createCoupon} className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700">Cipta</button>
              </div>
              {cpMsg && <p className={`text-xs mt-2 ${cpMsg.startsWith('✅') ? 'text-emerald-600' : 'text-red-500'}`}>{cpMsg}</p>}
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 grid grid-cols-5 gap-2 text-xs font-semibold text-slate-500">
                <span>Kod</span><span>Kredit</span><span>Guna</span><span>Sah Hingga</span><span>Status</span>
              </div>
              {coupons.length === 0
                ? <p className="text-xs text-slate-400 text-center py-8">Belum ada kupon</p>
                : coupons.map((c: any) => (
                    <div key={c.id} className="px-4 py-3 border-b border-slate-50 grid grid-cols-5 gap-2 items-center text-sm hover:bg-slate-50">
                      <span className="font-mono font-semibold text-emerald-700 text-xs">{c.code}</span>
                      <span className="text-xs">{c.credit_amount} kredit</span>
                      <span className="text-xs">{c.used_count}/{c.max_uses}</span>
                      <span className="text-xs text-slate-500">{new Date(c.valid_until).toLocaleDateString('ms-MY')}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full w-fit"
                        style={{background: c.expired ? '#fee2e2' : c.is_active ? '#d1fae5' : '#f1f5f9', color: c.expired ? '#dc2626' : c.is_active ? '#065f46' : '#64748b'}}>
                        {c.expired ? 'Tamat' : c.is_active ? 'Aktif' : 'Tidak aktif'}
                      </span>
                    </div>
                  ))
              }
            </div>
          </div>
        )}

        {/* AFFILIATE — Growth Partner Program (stub) */}
        {tab === 'affiliate' && (
          <div>
            <h1 className="text-xl font-black text-slate-900 mb-1">Growth Partner Program 🤝</h1>
            <p className="text-sm text-slate-500 mb-6">Daftar sebagai partner dan dapat komisen daripada setiap pelanggan baru.</p>

            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border border-emerald-200 rounded-3xl p-6 md:p-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                🚀 Akan Datang
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Jadi Growth Partner TanyaLer
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Bantu vendor lain temui TanyaLer dan dapat komisen sehingga <strong>15%</strong> untuk setiap pelanggan yang berjaya.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <p className="text-sm font-bold text-slate-900">Activation</p>
                  <p className="text-xs text-slate-500 mt-1">1 customer = Rintis FREE</p>
                </div>
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">💰</div>
                  <p className="text-sm font-bold text-slate-900">Earner</p>
                  <p className="text-xs text-slate-500 mt-1">10% commission</p>
                </div>
                <div className="bg-white border-2 border-emerald-300 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">👑</div>
                  <p className="text-sm font-bold text-slate-900">Elite Partner</p>
                  <p className="text-xs text-slate-500 mt-1">15% + Strategis FREE</p>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm text-slate-600">
                <p>✨ Sales page peribadi: <code className="text-xs bg-slate-100 px-2 py-0.5 rounded">go.tanyaler.my/anda</code></p>
                <p>📊 Dashboard analytics tersendiri</p>
                <p>💸 Withdrawal automatik selepas validasi</p>
                <p>🛡️ Refund protection + fraud detection</p>
              </div>

              <button onClick={() => alert('Growth Partner Program akan dilancarkan post-launch (Jun-Jul 2026). Terima kasih atas minat anda — kami akan beritahu bila ia siap.')}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all w-full sm:w-auto min-h-[48px]">
                🔔 Beritahu Saya Bila Dilancarkan
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 8h14M9 2l6 6-6 6"/>
                </svg>
              </button>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Akan tersedia selepas TanyaLer rasmi dilancarkan. Program direka oleh ILHAM KREATIF untuk memberi ganjaran kepada vendor yang membantu mengembangkan ekosistem TanyaLer.
              </p>
            </div>
          </div>
        )}

        {/* USERS ADMIN */}
        {tab === 'users' && isAdmin && <UsersTab uid={user.id}/>}

      </main>
      </div>
    </div>
  );
}

function UsersTab({ uid }: { uid: string }) {
  const [users, setUsers] = useState<any[]>([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    fetch(`/api/dashboard/admin/users?admin_id=${uid}`)
      .then(r => r.json()).then(d => { setUsers(d.users || []); setDone(true); }).catch(() => setDone(true));
  }, []);
  return (
    <div>
      <h1 className="text-xl font-black text-slate-900 mb-1">Senarai Pengguna</h1>
      <p className="text-sm text-slate-500 mb-6">Semua pengguna TanyaLer.</p>
      {!done
        ? <div className="flex items-center gap-2 text-slate-400 text-sm"><div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"/>Memuatkan...</div>
        : <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500">
              <span>User ID</span><span>Kredit Baki</span><span>Total Guna</span><span>Terakhir Aktif</span>
            </div>
            {users.map((u: any, i: number) => (
              <div key={i} className="px-4 py-3 border-b border-slate-50 grid grid-cols-4 gap-2 items-center text-sm hover:bg-slate-50">
                <span className="font-mono text-xs text-slate-600">{u.user_id?.slice(0,8)}...</span>
                <span className="font-semibold text-emerald-600">{u.current_balance}</span>
                <span className="text-slate-500 text-xs">{u.total_used} kredit</span>
                <span className="text-xs text-slate-400">{u.last_active ? new Date(u.last_active).toLocaleDateString('ms-MY') : '—'}</span>
              </div>
            ))}
          </div>
      }
    </div>
  );
}
