'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// ─── Logo ──────────────────────────────────────────────────────────────────
const TanyalerLogo = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    clipboard_text?: string;
  } | null;
  is_out_of_scope?: boolean;
  rating?: 1 | -1 | null;
  id: string;
}

function genId() { return Math.random().toString(36).slice(2, 9); }

function confBadge(c: number, lang: string) {
  const labels = {
    ms: ['Tepat', 'Sederhana', 'Rendah'],
    en: ['High', 'Medium', 'Low'],
    zh: ['高', '中', '低'],
  }[lang] || ['Tepat', 'Sederhana', 'Rendah'];

  if (c >= 0.80) return { label: labels[0], cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  if (c >= 0.55) return { label: labels[1], cls: 'bg-amber-50 text-amber-700 border-amber-200' };
  return { label: labels[2], cls: 'bg-red-50 text-red-600 border-red-200' };
}

function deduplicateDisclaimer(text: string): string {
  const marker = '---';
  const parts = text.split(marker);
  if (parts.length <= 2) return text;
  return parts[0] + marker + parts[1];
}

function parseMessageContent(text: string): string {
  text = deduplicateDisclaimer(text);
  text = text.replace(/⚠️\s*\*\*PENAFIAN RASMI TANYALER:\*\*/g, '<span class="text-red-600 font-bold tracking-tight">⚠️ PENAFIAN RASMI</span>');
  text = text.replace(/⚠️\s*PENAFIAN RASMI TANYALER:/g, '<span class="text-red-600 font-bold tracking-tight">⚠️ PENAFIAN RASMI</span>');
  text = text.replace(/PENAFIAN RASMI TANYALER:/g, '<span class="text-red-600 font-bold tracking-tight">PENAFIAN RASMI</span>');
  text = text.replace(/\[DISCLAIMER\]/g, '<span class="text-red-600 font-bold tracking-tight">PENAFIAN RASMI</span>');
  text = text.replace(/\[RUJUKAN FAIL\]/g, '<span class="text-blue-600 font-bold">[RUJUKAN FAIL]</span>');
  text = text.replace(/\[REMINDER\]/gi, '<span class="font-bold">Reminder :</span>');
  text = text.replace(/Reminder\s*:/gi, '<span class="font-bold">Reminder :</span>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return text;
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
  }, [onClose]);

  const copy = () => {
    navigator.clipboard.writeText(urls.clipboard_text || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={ref} className="absolute bottom-full mb-2 right-0 bg-white border border-slate-100 rounded-2xl shadow-xl p-3 min-w-[180px] z-50">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Kongsi</p>
      <div className="flex flex-col gap-1.5">
        {urls.whatsapp_url && (
          <a href={urls.whatsapp_url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-sm font-medium transition-all">
            <span className="text-green-500 text-base">💬</span> WhatsApp
          </a>
        )}
        {urls.telegram_url && (
          <a href={urls.telegram_url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-600 text-sm font-medium transition-all">
            <span className="text-sky-500 text-base">✈️</span> Telegram
          </a>
        )}
        <button onClick={copy}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${copied ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'}`}>
          {copied ? '✅ Disalin!' : '📋 Salin Teks'}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
export default function TanyaLerChat() {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [activeShare, setActiveShare] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const SUGGESTED = {
    ms: [
      'Cara daftar sebagai vendor ePerolehan',
      'Had nilai perolehan terus Kelas F',
      'Prosedur tender dalam ePerolehan',
      'Dokumen diperlukan untuk sebut harga',
    ],
    en: [
      'How to register as an ePerolehan vendor',
      'Direct purchase value limit for Class F',
      'Tender procedure in ePerolehan',
      'Documents required for quotation',
    ],
    zh: [
      '如何注册为电子采购供应商',
      'F级直接采购价值限额',
      '电子采购中的招标程序',
      '报价所需文件',
    ],
  }[lang];

  const ACCURACY_LABEL = { ms: 'Ketepatan', en: 'Accuracy', zh: '准确率' }[lang];

  const handleSend = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const question = (overrideInput ?? input).trim();
    if (!question || isLoading) return;

    const userMsg: Message = { id: genId(), role: 'user', content: question };
    const loadingMsg: Message = { id: genId(), role: 'assistant', content: '' };

    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
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
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content:         data.answer      || t('chat.error'),
          source_files:    data.source_files || [],
          confidence:      data.confidence   || 0,
          share_urls:      data.share_urls   || null,
          is_out_of_scope: data.is_out_of_scope || false,
        };
        return updated;
      });

      if (data.credit_balance != null) setCreditBalance(data.credit_balance);
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], content: t('chat.error') };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRate = (id: string, val: 1 | -1) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, rating: m.rating === val ? null : val } : m));
  };

  const FOOTER_LABEL = { ms: 'Sedang mencari...', en: 'Searching...', zh: '搜索中...' }[lang];
  const READY_LABEL  = { ms: 'Sedia', en: 'Ready', zh: '就绪' }[lang];
  const MANUAL_LABEL = { ms: 'Manual', en: 'Manual', zh: '手册' }[lang];
  const SUPPORT_LABEL = { ms: 'Sokongan', en: 'Support', zh: '支持' }[lang];
  const PREMIUM_LABEL = { ms: 'Premium Edition', en: 'Premium Edition', zh: '高级版' }[lang];
  const CREDITS_LABEL = { ms: 'kredit', en: 'credits', zh: '积分' }[lang];

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD]">

      {/* HEADER — responsive */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-3">

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <TanyalerLogo />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                Tanya<span className="text-emerald-700">Ler</span>
              </h1>
              <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest mt-0.5">{PREMIUM_LABEL}</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Credit badge */}
            {creditBalance !== null && (
              <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full border flex-shrink-0 ${
                creditBalance > 10 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                creditBalance > 3  ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-red-50 text-red-600 border-red-200'
              }`}>
                {creditBalance} {CREDITS_LABEL}
              </span>
            )}

            {/* Nav links — hidden on small screens */}
            <div className="hidden md:flex gap-4 lg:gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Link href="/manual" className="hover:text-emerald-700 transition-all">{MANUAL_LABEL}</Link>
              <Link href="/support" className="hover:text-emerald-700 transition-all">{SUPPORT_LABEL}</Link>
              <Link href="/pricing" className="hover:text-emerald-700 transition-all text-emerald-600">+ {CREDITS_LABEL}</Link>
            </div>

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Home link on mobile */}
            <Link href="/" className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* CHAT AREA */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 py-8 sm:py-12">

          {/* Empty state */}
          {messages.length === 0 ? (
            <div className="text-center py-10 sm:py-16 space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                {lang === 'ms' ? <>Bagaimana saya boleh <br className="hidden sm:block"/><span className="text-emerald-700 underline decoration-emerald-200 underline-offset-4 sm:underline-offset-8">membimbing</span> anda?</> :
                 lang === 'en' ? <>How can I <br className="hidden sm:block"/><span className="text-emerald-700 underline decoration-emerald-200 underline-offset-4 sm:underline-offset-8">guide</span> you?</> :
                 <>我如何 <br className="hidden sm:block"/><span className="text-emerald-700 underline decoration-emerald-200 underline-offset-4 sm:underline-offset-8">指导</span> 您？</>}
              </h1>
              <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
                {lang === 'ms' ? <>Disokong <strong>7,375 muka surat dari 56 dokumen rasmi ePerolehan</strong>.</> :
                 lang === 'en' ? <>Powered by <strong>7,375 pages from 56 official ePerolehan documents</strong>.</> :
                 <>由 <strong>56份官方电子采购文件7,375页内容</strong> 支持。</>}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-xl mx-auto pt-2">
                {SUGGESTED.map((s, i) => (
                  <button key={i} onClick={() => handleSend(undefined, s)}
                    className="px-3 sm:px-5 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 text-xs sm:text-sm font-medium hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm text-left">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-10">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[92%] sm:max-w-[85%] space-y-2">

                    {/* Bubble */}
                    <div className={`px-4 sm:px-6 py-4 sm:py-5 rounded-2xl sm:rounded-[2rem] text-sm sm:text-base shadow-sm border ${
                      m.role === 'user'
                        ? 'bg-emerald-700 text-white border-emerald-800'
                        : 'bg-white border-slate-100 text-slate-800'
                    }`}>
                      {m.role === 'assistant' && !m.content && isLoading && (
                        <div className="flex gap-1.5 items-center py-1">
                          {[0,1,2].map(i => (
                            <span key={i} className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"
                              style={{ animationDelay: `${i * 0.15}s` }}/>
                          ))}
                        </div>
                      )}
                      {m.content && (
                        <div className="whitespace-pre-wrap leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: parseMessageContent(m.content) }}/>
                      )}
                    </div>

                    {/* Source files */}
                    {m.role === 'assistant' && m.content && !!m.source_files?.length && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 px-1 sm:px-2">
                        {m.source_files.map((f, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[10px] sm:text-[11px] text-blue-700 font-medium max-w-[200px] sm:max-w-[280px]">
                            📄 <span className="truncate">{f}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    {m.role === 'assistant' && m.content && (
                      <div className="flex items-center justify-between px-1 sm:px-2">
                        <div>
                          {m.confidence !== undefined && m.confidence > 0 && (() => {
                            const { label, cls } = confBadge(m.confidence, lang);
                            return (
                              <span className={`text-[10px] font-bold px-2 sm:px-2.5 py-1 rounded-full border ${cls}`}>
                                {ACCURACY_LABEL}: {label} ({Math.round(m.confidence * 100)}%)
                              </span>
                            );
                          })()}
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleRate(m.id, 1)} className={`p-1.5 rounded-lg transition-all text-sm sm:text-base ${m.rating === 1 ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600'}`}>👍</button>
                          <button onClick={() => handleRate(m.id, -1)} className={`p-1.5 rounded-lg transition-all text-sm sm:text-base ${m.rating === -1 ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-500'}`}>👎</button>
                          {m.share_urls && (
                            <div className="relative">
                              <button onClick={() => setActiveShare(activeShare === m.id ? null : m.id)}
                                className={`p-1.5 rounded-lg transition-all ${activeShare === m.id ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600'}`}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* INPUT BAR — responsive */}
      <footer className="p-3 sm:p-5 lg:p-6 bg-white border-t border-slate-100 shadow-xl">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-end gap-2 sm:gap-3">
            <textarea
              ref={textareaRef}
              autoFocus
              rows={1}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-xl sm:rounded-2xl outline-none transition-all text-sm sm:text-base shadow-inner font-medium resize-none overflow-hidden"
              placeholder={t('chat.placeholder')}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{ minHeight: '52px', maxHeight: '150px' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-emerald-700 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-emerald-800 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-lg flex-shrink-0"
            >
              {isLoading ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </button>
          </form>

          <div className="mt-2 sm:mt-4 flex justify-between items-center px-1">
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-300 uppercase tracking-widest hidden sm:block">
              Corrective Agentic RAG v5.0 · 7,375 Muka Surat · 56 Dokumen Rasmi
            </span>
            <span className="text-[9px] sm:text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
              {isLoading ? FOOTER_LABEL : READY_LABEL}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
