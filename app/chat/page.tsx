'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Suspense } from 'react';
import type { User } from '@supabase/supabase-js';

interface Credits {
  freeRemaining: number;
  balance: number;
  canChat: boolean;
}

function ChatContent() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  // Load user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  // Load credits
  useEffect(() => {
    fetch('/api/user/credits')
      .then((r) => r.json())
      .then((d) => setCredits(d))
      .catch(() => {});
  }, []);

  // Pre-fill question from URL param
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setInput(decodeURIComponent(q));
  }, [searchParams]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const deductCredit = async () => {
    try {
      const res = await fetch('/api/user/credits', { method: 'POST' });
      if (res.status === 402) return false;
      const data = await res.json();
      if (data.success) {
        setCredits((prev) => prev ? {
          ...prev,
          freeRemaining: Math.max(0, prev.freeRemaining - (data.creditType === 'free' ? 1 : 0)),
          balance: prev.balance - (data.creditType === 'paid' ? 1 : 0),
        } : prev);
        return true;
      }
      return false;
    } catch {
      return true; // Allow if API fails
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check credits
    const ok = await deductCredit();
    if (!ok) {
      router.push('/pricing');
      return;
    }

    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantMsg = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMsg.content += decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantMsg };
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseMessageContent = (text: string) => {
    // Style rujukan fail
    text = text.replace(
      /\[RUJUKAN FAIL\]/g,
      '<span class="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Rujukan:</span>'
    );
    // Style peringatan
    text = text.replace(
      /\[REMINDER\]/gi,
      '<span class="font-semibold text-slate-900">Peringatan:</span>'
    );
    text = text.replace(
      /Reminder\s*:/gi,
      '<span class="font-semibold text-slate-900">Peringatan:</span>'
    );
    // Style bold markdown
    text = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-slate-900">$1</strong>'
    );
    // Style penafian — subtle grey italic
    text = text.replace(
      /Penafian:(.*?)(?=\n|$)/g,
      '<span class="text-xs text-slate-400 italic">Penafian:$1</span>'
    );
    return text;
  };

  const totalCredits = (credits?.freeRemaining ?? 0) + (credits?.balance ?? 0);
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || '';
  const avatarUrl = user?.user_metadata?.avatar_url;

  const quickQuestions = [
    'Cara daftar ePerolehan buat kali pertama',
    'Cara renew sijil MOF',
    'Kenapa tender saya rejected?',
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200/60 px-5 md:px-8 py-4 flex items-center justify-between bg-white/95 backdrop-blur-lg sticky top-0 z-20">
        <Logo size={32} />

        <div className="flex items-center gap-3">
          {/* Credit display */}
          {credits && (
            <Link
              href="/pricing"
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {totalCredits} kredit berbaki
            </Link>
          )}

          {/* RAG badge */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            RAG Aktif
          </div>

          {/* User avatar & menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={firstName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                    {firstName.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </button>

              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200/60 rounded-2xl shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user.user_metadata?.full_name || firstName}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      href="/pricing"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      Topup Kredit
                    </Link>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Log Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Chat area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
          {messages.length === 0 ? (
            <div className="text-center py-16 md:py-24 space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-700 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Instruktor ePerolehan Peribadi Anda
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance leading-[1.1]">
                Bagaimana saya boleh{' '}
                <span className="text-emerald-600">membimbing</span>
                <br className="hidden sm:block" /> anda hari ini?
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto">
                Tanya apa sahaja tentang ePerolehan. Jawapan step-by-step
                disokong dokumen rasmi.
              </p>
              <div className="pt-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Soalan popular
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center flex-wrap">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[90%] px-6 py-5 rounded-3xl text-[15px] leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-slate-900 text-white rounded-br-lg'
                        : 'bg-slate-50 border border-slate-200/60 text-slate-800 rounded-bl-lg'
                    }`}
                  >
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: parseMessageContent(m.content) }}
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-3xl rounded-bl-lg px-6 py-5">
                    <div className="flex gap-1.5">
                      {[0, 150, 300].map((delay) => (
                        <div
                          key={delay}
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <footer className="border-t border-slate-200/60 px-5 md:px-8 py-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative">
            <textarea
              ref={textareaRef}
              rows={1}
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-3xl outline-none transition-all text-[15px] resize-none placeholder:text-slate-400"
              placeholder="Tanya soalan ePerolehan anda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              style={{ minHeight: '56px', maxHeight: '200px' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2.5 bottom-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:cursor-not-allowed text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M1 8h14M9 2l6 6-6 6" />
              </svg>
            </button>
          </form>
          <p className="text-[11px] text-slate-400 text-center mt-3">
            TanyaLer boleh membuat kesilapan. Sahkan maklumat penting dengan portal rasmi ePerolehan.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatContent />
    </Suspense>
  );
}
