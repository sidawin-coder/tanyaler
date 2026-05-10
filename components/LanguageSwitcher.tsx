'use client';

import { useLanguage, Language } from '@/contexts/LanguageContext';

const LANGS: { code: Language; label: string; short: string }[] = [
  { code: 'ms', label: 'Bahasa Malaysia', short: 'BM' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '中文', short: '中文' },
];

interface LanguageSwitcherProps {
  mobile?: boolean; // true = render as full-width row for mobile menu
}

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();

  if (mobile) {
    return (
      <div className="flex items-center gap-1 px-3 py-2">
        <span className="text-xs text-slate-400 mr-1">🌐</span>
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              lang === l.code
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {l.short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          title={l.label}
          className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
            lang === l.code
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
