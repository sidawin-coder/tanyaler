'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Logo Baharu: The Emerald Orbit
const TanyalerLogoSaaS = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.2"/>
    <path d="M12 2C17.5228 2 22 6.47715 22 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#10B981"/>
    <path d="M12 17V19" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function TanyaLerPremium() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

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
      let assistantMsg = { role: 'assistant', content: '' };
      
      setMessages((prev) => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantMsg.content += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantMsg };
          return updated;
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi Parsing Warna & Format
  const parseMessageContent = (text: string) => {
    // 1. Disclaimer jadi Merah Bold
    text = text.replace(/\[DISCLAIMER\]/g, '<span class="text-red-600 font-bold tracking-tight">[DISCLAIMER]</span>');
    // 2. Rujukan Fail jadi Biru Bold
    text = text.replace(/\[RUJUKAN FAIL\]/g, '<span class="text-blue-600 font-bold">[RUJUKAN FAIL]</span>');
    // 3. Reminder Bold
    text = text.replace(/\[REMINDER\]/gi, '<span class="font-bold">Reminder :</span>');
    text = text.replace(/Reminder\s*:/gi, '<span class="font-bold">Reminder :</span>');
    return text;
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD]">
      {/* Header */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-slate-200 px-8 py-5 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <TanyalerLogoSaaS />
            <div>
               <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Tanya<span className="text-emerald-700">Ler</span></h1>
               <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Premium Edition</p>
            </div>
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/manual" className="hover:text-emerald-700 transition-all">Manual Pengguna</Link>
            <Link href="/support" className="hover:text-emerald-700 transition-all">Support Hub</Link>
          </div>
        </div>
      </nav>

      {/* Chat Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {messages.length === 0 ? (
            <div className="text-center py-20 space-y-8 animate-in fade-in slide-in-from-bottom-5">
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                Bagaimana saya boleh <br/>
                <span className="text-emerald-700 underline decoration-emerald-200 underline-offset-8">membimbing</span> anda?
              </h1>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto">Jurulatih ePerolehan & TanyaLer anda.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] px-8 py-6 rounded-[2rem] text-lg shadow-sm border ${
                    m.role === 'user' ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xl' : 'bg-white border-slate-100 text-slate-800'
                  }`}>
                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: parseMessageContent(m.content) }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Command Bar (The Wrap Fix) */}
      <footer className="p-8 bg-white border-t border-slate-100 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <form 
            onSubmit={handleSend} 
            className="relative flex items-end gap-5"
          >
            {/* GUNA TEXTAREA UNTUK WORD WRAPPING */}
            <textarea
              autoFocus
              rows={1}
              className="flex-1 px-10 py-6 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-[2rem] outline-none transition-all text-xl shadow-inner font-medium resize-none overflow-hidden"
              placeholder="Taip isu ePerolehan anda di sini..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
              className="bg-emerald-700 text-white p-7 rounded-[2rem] hover:bg-emerald-800 disabled:bg-slate-100 transition-all shadow-2xl flex-shrink-0 mb-1"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          <div className="mt-6 flex justify-between items-center px-4">
             <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">Precision RAG Engine Active</span>
             <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.4em]">Premium Session</span>
          </div>
        </div>
      </footer>
    </div>
  );
}