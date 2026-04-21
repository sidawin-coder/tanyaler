'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useChat } from 'ai/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Language, t } from '@/lib/i18n';
import {
  Send, Coins, Zap, AlertTriangle, RotateCcw,
  MessageSquare, ChevronDown, Globe, ArrowRight
} from 'lucide-react';

interface CreditInfo {
  balance: number;
  freeRemaining: number;
  dailyFreeLimit: number;
  totalUsed: number;
  plan: string;
}

function ChatContent() {
  const [lang, setLang] = useState<Language>('ms');
  const [credits, setCredits] = useState<CreditInfo | null>(null);
  const [creditsLoading, setCreditsLoading] = useState(true);
  const [showTopup, setShowTopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, setMessages } = useChat({
    api: '/api/chat',
    body: { language: lang },
    onFinish: () => {
      fetchCredits();
    },
    onError: (err) => {
      if (err.message.includes('insufficient_credits') || err.message.includes('402')) {
        setShowTopup(true);
      }
    },
  });

  const fetchCredits = async () => {
    try {
      const res = await fetch('/api/credits');
      if (res.ok) {
        const data = await res.json();
        setCredits(data);
        if (data.balance === 0 && data.freeRemaining === 0) setShowTopup(true);
      }
    } catch {}
    setCreditsLoading(false);
  };

  useEffect(() => {
    fetchCredits();
    // Show payment success toast
    if (searchParams.get('payment') === 'success') {
      setTimeout(() => fetchCredits(), 2000);
    }
    // Set welcome message
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: lang === 'ms'
        ? 'Selamat datang ke **TanyaLer**! 👋\n\nSaya sedia membantu anda tentang sistem ePerolehan Malaysia. Tanya apa-apa soalan dan saya akan berikan jawapan step-by-step yang mudah difahami.\n\n**Contoh soalan yang boleh ditanya:**\n- Cara daftar ePerolehan buat kali pertama\n- Cara submit sebut harga atau tender\n- Cara renew sijil MOF\n- Kenapa tender saya reject?\n- Cara buat pemenuhan dalam sistem eP'
        : lang === 'en'
        ? 'Welcome to **TanyaLer**! 👋\n\nI\'m ready to help you with Malaysia\'s ePerolehan system. Ask any question and I\'ll give you step-by-step answers in simple language.\n\n**Example questions you can ask:**\n- How to register for ePerolehan for the first time\n- How to submit a quotation or tender\n- How to renew MOF certificate\n- Why was my tender rejected?\n- How to submit fulfillment in the eP system'
        : '欢迎使用**TanyaLer**！👋\n\n我随时准备帮助您了解马来西亚ePerolehan系统。提出任何问题，我将以简单的语言给出逐步答案。\n\n**您可以询问的示例问题：**\n- 如何第一次注册ePerolehan\n- 如何提交报价或招标\n- 如何续期MOF证书\n- 为什么我的招标被拒绝？\n- 如何在eP系统中提交履约',
    }]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const totalCredits = (credits?.balance || 0) + (credits?.freeRemaining || 0);
  const hasFreeCredits = (credits?.freeRemaining || 0) > 0;
  const hasPaidCredits = (credits?.balance || 0) > 0;
  const canChat = hasFreeCredits || hasPaidCredits;

  const QUICK_QUESTIONS: Record<Language, string[]> = {
    ms: ['Cara daftar ePerolehan', 'Cara renew sijil MOF', 'Cara submit sebut harga', 'Kenapa tender reject?', 'Cara buat pemenuhan'],
    en: ['How to register ePerolehan', 'How to renew MOF cert', 'How to submit quotation', 'Why was tender rejected?', 'How to do fulfillment'],
    zh: ['如何注册ePerolehan', '如何续期MOF证书', '如何提交报价', '为什么招标被拒绝？', '如何提交履约'],
  };

  const sendQuickQuestion = async (q: string) => {
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleInputChange({ target: { value: q } } as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      const event = new Event('submit') as unknown as React.FormEvent;
      handleSubmit({ ...fakeEvent, target: { elements: { input: { value: q } } } } as React.FormEvent);
    }, 100);
  };

  const langs: { code: Language; label: string }[] = [
    { code: 'ms', label: '🇲🇾 BM' },
    { code: 'en', label: '🇬🇧 EN' },
    { code: 'zh', label: '🇨🇳 中文' },
  ];

  function renderMessage(content: string) {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Bold
      const boldProcessed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Numbered list
      if (/^\d+\./.test(line)) {
        return <p key={i} className="my-0.5" dangerouslySetInnerHTML={{ __html: `&nbsp;&nbsp;${boldProcessed}` }} />;
      }
      // Bullet
      if (/^[-•☐✓]/.test(line)) {
        return <p key={i} className="my-0.5 pl-2" dangerouslySetInnerHTML={{ __html: boldProcessed }} />;
      }
      // Heading
      if (/^##/.test(line)) {
        return <p key={i} className="font-semibold text-navy-800 mt-2" dangerouslySetInnerHTML={{ __html: boldProcessed.replace(/^##\s*/, '') }} />;
      }
      if (!line.trim()) return <br key={i} />;
      return <p key={i} className="my-0.5" dangerouslySetInnerHTML={{ __html: boldProcessed }} />;
    });
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* ─── Top bar ─── */}
      <div className="bg-navy-900 text-white px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gold-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">Tanya<span className="text-gold-400">Ler</span></span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="hidden sm:flex items-center gap-1 bg-navy-800 rounded-lg p-0.5">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  lang === l.code ? 'bg-gold-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Credits display */}
          {!creditsLoading && credits && (
            <div className="flex items-center gap-2">
              {hasFreeCredits && (
                <div className="flex items-center gap-1.5 bg-green-900/40 border border-green-700/40 text-green-400 text-xs px-2.5 py-1.5 rounded-lg">
                  <Zap className="w-3 h-3" />
                  <span>{credits.freeRemaining} {lang === 'ms' ? 'percuma' : lang === 'en' ? 'free' : '免费'}</span>
                </div>
              )}
              {credits.balance > 0 && (
                <div className="flex items-center gap-1.5 bg-gold-900/40 border border-gold-700/40 text-gold-400 text-xs px-2.5 py-1.5 rounded-lg">
                  <Coins className="w-3 h-3" />
                  <span>{credits.balance}</span>
                </div>
              )}
              <Link
                href="/pricing"
                className="text-xs bg-gold-500 hover:bg-gold-600 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Topup
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ─── Messages ─── */}
      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-6 space-y-4 max-w-3xl w-full mx-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1 text-sm">
                🤖
              </div>
            )}
            <div className={msg.role === 'user' ? 'bubble-user' : 'bubble-ai'}>
              {renderMessage(msg.content)}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm">
              🤖
            </div>
            <div className="bubble-ai">
              <div className="flex items-center gap-1 py-1">
                <span className="loading-dot" />
                <span className="loading-dot" />
                <span className="loading-dot" />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bubble-ai border-red-200 bg-red-50 text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">
                {lang === 'ms' ? 'Ralat berlaku. ' : lang === 'en' ? 'An error occurred. ' : '发生错误。'}
              </span>
              <button onClick={() => reload()} className="text-xs underline flex items-center gap-1">
                <RotateCcw className="w-3 h-3" />
                {lang === 'ms' ? 'Cuba lagi' : lang === 'en' ? 'Retry' : '重试'}
              </button>
            </div>
          </div>
        )}

        {/* Topup prompt */}
        {showTopup && (
          <div className="flex justify-center animate-slide-up">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center max-w-sm">
              <Coins className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-semibold text-amber-900 mb-1">
                {lang === 'ms' ? 'Kredit Habis' : lang === 'en' ? 'Credits Exhausted' : '积分已用完'}
              </p>
              <p className="text-sm text-amber-700 mb-3">
                {t(lang, 'chat_topup_prompt')}
              </p>
              <Link href="/pricing" className="btn-primary text-sm px-5 py-2">
                {t(lang, 'chat_topup_btn')}
                <ArrowRight className="ml-1 w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ─── Quick questions ─── */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 max-w-3xl w-full mx-auto">
          <div className="flex gap-2 flex-wrap">
            {QUICK_QUESTIONS[lang].map((q, i) => (
              <button
                key={i}
                onClick={() => sendQuickQuestion(q)}
                className="text-xs bg-white border border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700 px-3 py-1.5 rounded-full transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Disclaimer ─── */}
      <div className="px-4 max-w-3xl w-full mx-auto mb-1">
        <p className="text-xs text-gray-400 text-center">{t(lang, 'chat_disclaimer')}</p>
      </div>

      {/* ─── Input area ─── */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 items-end"
          >
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder={t(lang, 'chat_placeholder')}
                disabled={isLoading || (!canChat && !creditsLoading)}
                className="input-field pr-4 resize-none text-sm w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() && canChat) {
                      handleSubmit(e as unknown as React.FormEvent);
                    }
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim() || (!canChat && !creditsLoading)}
              className="flex-shrink-0 w-11 h-11 bg-navy-800 hover:bg-navy-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl flex items-center justify-center transition-all active:scale-95"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-2">
            {lang === 'ms' ? 'Tekan Enter untuk hantar' : lang === 'en' ? 'Press Enter to send' : '按Enter发送'}
            {credits && ` · ${totalCredits} ${lang === 'ms' ? 'kredit berbaki' : lang === 'en' ? 'credits left' : '积分剩余'}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
