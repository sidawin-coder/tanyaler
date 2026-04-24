'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

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
    text = text.replace(/\[DISCLAIMER\]/g, '<span class="text-rose-600 font-semibold text-xs uppercase tracking-wider">Penafian:</span>');
    text = text.replace(/\[RUJUKAN FAIL\]/g, '<span class="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Rujukan:</span>');
    text = text.replace(/\[REMINDER\]/gi, '<span class="font-semibold text-slate-900">Peringatan:</span>');
    text = text.replace(/Reminder\s*:/gi, '<span class="font-semibold text-slate-900">Peringatan:</span>');
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
    return text;
  };

  const quickQuestions = [
    'Cara daftar ePerolehan buat kali pertama',
    'Cara renew sijil MOF',
    'Kenapa tender saya rejected?',
  ];

  const sendQuickQuestion = (q: string) => {
    setInput(q);
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) form.requestSubmit();
    }, 50);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat header - minimal */}
      <header className="border-b border-slate-200/60 px-5 md:px-8 py-4 flex items-center justify-between bg-white/95 backdrop-blur-lg sticky top-0 z-20">
        <Logo size={32} />

        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline-flex"
          >
            Harga
          </Link>
          <div className="w-px h-4 bg-slate-200 hidden sm:block" />
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            RAG Aktif
          </div>
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
                Tanya apa sahaja tentang ePerolehan. Saya akan beri jawapan
                step-by-step yang disokong dokumen rasmi.
              </p>

              {/* Quick questions */}
              <div className="pt-8">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Soalan popular
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center flex-wrap">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendQuickQuestion(q)}
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
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Input area */}
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
              aria-label="Hantar"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M1 8h14M9 2l6 6-6 6" />
              </svg>
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center mt-3">
            TanyaLer boleh membuat kesilapan. Sahkan maklumat penting dengan
            ePerolehan rasmi.
          </p>
        </div>
      </footer>
    </div>
  );
}
