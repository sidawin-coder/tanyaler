'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Logo (kekal sama) ─────────────────────────────────────────────────────
const TanyalerLogoSaaS = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.2"/>
    <path d="M12 2C17.5228 2 22 6.47715 22 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#10B981"/>
    <path d="M12 17V19" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ─── Types ─────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
  source_files?: string[];
  confidence?: number;
  share_urls?: {
    whatsapp_url?: string;
    telegram_url?: string;
    facebook_url?: string;
    clipboard_text?: string;
  } | null;
  is_out_of_scope?: boolean;
  rating?: 1 | -1 | null;
  id: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function confBadge(c: number) {
  if (c >= 0.80) return { label: 'Tepat', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  if (c >= 0.55) return { label: 'Sederhana', cls: 'bg-amber-50 text-amber-700 border-amber-200' };
  return { label: 'Rendah', cls: 'bg-red-50 text-red-600 border-red-200' };
}

// ─── Share Panel ───────────────────────────────────────────────────────────
function SharePanel({ urls, onClose }: { urls: NonNullable<Message['share_urls']>; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(urls.clipboard_text || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={ref}
      className="absolute bottom-full mb-2 right-0 bg-white border border-slate-100 rounded-2xl shadow-xl p-3 min-w-[190px] z-50 animate-in fade-in slide-in-from-bottom-2"
    >
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Kongsi Jawapan</p>
      <div className="flex flex-col gap-1.5">
        {urls.whatsapp_url && (
          <a href={urls.whatsapp_url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-sm font-medium transition-all">
            <span className="text-green-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </span>
            WhatsApp
          </a>
        )}
        {urls.telegram_url && (
          <a href={urls.telegram_url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-600 text-sm font-medium transition-all">
            <span className="text-sky-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </span>
            Telegram
          </a>
        )}
        <button onClick={copy}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            copied ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
          }`}>
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Disalin!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Salin Teks
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Parsing Format (kekal sama) ───────────────────────────────────────────
function deduplicateDisclaimer(text: string): string {
  // Buang disclaimer duplikat - kekal yang pertama sahaja
  const marker = '---';
  const parts = text.split(marker);
  if (parts.length <= 2) return text;
  // Ambil bahagian utama + disclaimer pertama sahaja
  return parts[0] + marker + parts[1];
}

function parseMessageContent(text: string): string {
  // Deduplicate dulu
  text = deduplicateDisclaimer(text);
  // Tukar semua variasi disclaimer kepada "PENAFIAN RASMI" merah
  text = text.replace(/⚠️\s*\*\*PENAFIAN RASMI TANYALER:\*\*/g, '<span class="text-red-600 font-bold tracking-tight">⚠️ PENAFIAN RASMI</span>');
  text = text.replace(/⚠️\s*PENAFIAN RASMI TANYALER:/g, '<span class="text-red-600 font-bold tracking-tight">⚠️ PENAFIAN RASMI</span>');
  text = text.replace(/PENAFIAN RASMI TANYALER:/g, '<span class="text-red-600 font-bold tracking-tight">PENAFIAN RASMI</span>');
  text = text.replace(/\[DISCLAIMER\]/g, '<span class="text-red-600 font-bold tracking-tight">PENAFIAN RASMI</span>');
  text = text.replace(/\[RUJUKAN FAIL\]/g, '<span class="text-blue-600 font-bold">[RUJUKAN FAIL]</span>');
  text = text.replace(/\[REMINDER\]/gi, '<span class="font-bold">Reminder :</span>');
  text = text.replace(/Reminder\s*:/gi, '<span class="font-bold">Reminder :</span>');
  // Bold markdown
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return text;
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function TanyaLerPremium() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [activeShare, setActiveShare] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const question = (overrideInput ?? input).trim();
    if (!question || isLoading) return;

    const userMsg: Message = { id: genId(), role: 'user', content: question };
    const loadingMsg: Message = { id: genId(), role: 'assistant', content: '', };

    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: question }] }),
      });

      const data = await res.json();

      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        updated[updated.length - 1] = {
          ...last,
          content:       data.answer      || 'Tiada jawapan diterima.',
          source_files:  data.source_files || [],
          confidence:    data.confidence   || 0,
          share_urls:    data.share_urls   || null,
          is_out_of_scope: data.is_out_of_scope || false,
        };
        return updated;
      });

      if (data.credit_balance !== null && data.credit_balance !== undefined) {
        setCreditBalance(data.credit_balance);
      }

    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: 'Sambungan gagal. Pastikan pelayan Tanyaler berjalan dan cuba semula.',
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRate = (id: string, val: 1 | -1) => {
    setMessages(prev => prev.map(m =>
      m.id === id ? { ...m, rating: m.rating === val ? null : val } : m
    ));
  };

  const SUGGESTED = [
    'Cara daftar sebagai vendor ePerolehan',
    'Had nilai perolehan terus Kelas F',
    'Prosedur tender dalam ePerolehan',
    'Dokumen diperlukan untuk sebut harga',
  ];

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD]">

      {/* ── HEADER (kekal sama) ── */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-slate-200 px-8 py-5 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <TanyalerLogoSaaS />
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                Tanya<span className="text-emerald-700">Ler</span>
              </h1>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Premium Edition</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* Credit badge */}
            {creditBalance !== null && (
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                creditBalance > 10 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                creditBalance > 3  ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-red-50 text-red-600 border-red-200'
              }`}>
                {creditBalance} kredit
              </span>
            )}
            <div className="flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Link href="/manual" className="hover:text-emerald-700 transition-all">Manual Pengguna</Link>
              <Link href="/support" className="hover:text-emerald-700 transition-all">Support Hub</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── CHAT AREA ── */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Empty state */}
          {messages.length === 0 ? (
            <div className="text-center py-16 space-y-8 animate-in fade-in slide-in-from-bottom-5">
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                Bagaimana saya boleh <br/>
                <span className="text-emerald-700 underline decoration-emerald-200 underline-offset-8">membimbing</span> anda?
              </h1>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto">
                Jurulatih ePerolehan anda. Disokong <strong>7,375 muka surat dari 56 dokumen rasmi ePerolehan</strong>.
              </p>
              {/* Suggested questions */}
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto pt-4">
                {SUGGESTED.map((s, i) => (
                  <button key={i} onClick={() => handleSend(undefined, s)}
                    className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[90%] space-y-2">

                    {/* Bubble */}
                    <div className={`px-8 py-6 rounded-[2rem] text-lg shadow-sm border ${
                      m.role === 'user'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xl'
                        : 'bg-white border-slate-100 text-slate-800'
                    }`}>
                      {/* Loading */}
                      {m.role === 'assistant' && !m.content && isLoading && (
                        <div className="flex gap-1.5 items-center py-1">
                          {[0,1,2].map(i => (
                            <span key={i} className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-pulse"
                              style={{ animationDelay: `${i * 0.15}s` }}/>
                          ))}
                        </div>
                      )}

                      {/* Content */}
                      {m.content && (
                        <div className="whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: parseMessageContent(m.content) }}/>
                      )}
                    </div>

                    {/* Source Files — hanya untuk bot */}
                    {m.role === 'assistant' && m.content && !!m.source_files?.length && (
                      <div className="flex flex-wrap gap-2 px-2">
                        {m.source_files.map((f, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] text-blue-700 font-medium max-w-[280px]">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            <span className="truncate">{f}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions bar — confidence + rating + share */}
                    {m.role === 'assistant' && m.content && (
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                          {/* Confidence badge */}
                          {m.confidence !== undefined && m.confidence > 0 && (() => {
                            const { label, cls } = confBadge(m.confidence);
                            return (
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${cls}`}>
                                Ketepatan: {label} ({Math.round(m.confidence * 100)}%)
                              </span>
                            );
                          })()}
                        </div>

                        <div className="flex items-center gap-1">
                          {/* Thumbs up/down */}
                          <button onClick={() => handleRate(m.id, 1)}
                            title="Jawapan membantu"
                            className={`p-1.5 rounded-lg transition-all ${
                              m.rating === 1 ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-emerald-600'
                            }`}>
                            👍
                          </button>
                          <button onClick={() => handleRate(m.id, -1)}
                            title="Jawapan kurang membantu"
                            className={`p-1.5 rounded-lg transition-all ${
                              m.rating === -1 ? 'text-red-500 bg-red-50' : 'text-slate-500 hover:text-red-500'
                            }`}>
                            👎
                          </button>

                          {/* Share */}
                          {m.share_urls && (
                            <div className="relative">
                              <button
                                onClick={() => setActiveShare(activeShare === m.id ? null : m.id)}
                                className={`p-1.5 rounded-lg transition-all ${
                                  activeShare === m.id ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                                }`}
                                title="Kongsi jawapan">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                                </svg>
                              </button>
                              {activeShare === m.id && m.share_urls && (
                                <SharePanel urls={m.share_urls} onClose={() => setActiveShare(null)} />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── INPUT BAR (kekal sama design) ── */}
      <footer className="p-8 bg-white border-t border-slate-100 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-end gap-5">
            <textarea
              autoFocus
              rows={1}
              className="flex-1 px-10 py-6 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-[2rem] outline-none transition-all text-xl shadow-inner font-medium resize-none overflow-hidden"
              placeholder="Taip isu ePerolehan anda di sini..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{ minHeight: '80px', maxHeight: '200px' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-emerald-700 text-white p-7 rounded-[2rem] hover:bg-emerald-800 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-2xl flex-shrink-0 mb-1"
            >
              {isLoading ? (
                <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </button>
          </form>

          {/* Footer info */}
          <div className="mt-6 flex justify-between items-center px-4">
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">
              Corrective Agentic RAG v5.0 · 7,375 Muka Surat · 56 Dokumen Rasmi
            </span>
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.4em]">
              {isLoading ? 'Mencari...' : 'Sedia'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
