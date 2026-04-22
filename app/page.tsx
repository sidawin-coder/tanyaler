'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Language, t } from '@/lib/i18n';
import {
  CheckCircle, ArrowRight, MessageSquare, Zap, Globe,
  FileText, Clock, Star, ChevronRight, Shield, BookOpen, ListChecks
} from 'lucide-react';

const EXAMPLE_QUESTIONS = {
  ms: [
    'Macam mana nak daftar ePerolehan buat kali pertama?',
    'Kenapa tender saya rejected? Apa yang perlu diperbetulkan?',
    'Cara nak submit pemenuhan dalam sistem eP?',
    'Bila sijil MOF nak expire, macam mana nak renew?',
    'Cara buat katalog ePerolehan yang akan lulus?',
    'Apa beza Akaun Asas dengan Akaun MOF?',
  ],
  en: [
    'How to register for ePerolehan for the first time?',
    'Why was my tender rejected? What needs to be corrected?',
    'How to submit fulfillment in the eP system?',
    'My MOF certificate is expiring, how do I renew it?',
    'How to create an ePerolehan catalog that will be approved?',
    'What is the difference between Basic Account and MOF Account?',
  ],
  zh: [
    '第一次如何注册ePerolehan？',
    '为什么我的招标被拒绝？需要纠正什么？',
    '如何在eP系统中提交履约？',
    'MOF证书即将到期，如何续期？',
    '如何创建会被批准的ePerolehan目录？',
    '基本账户和MOF账户有什么区别？',
  ],
};

const FEATURES = [
  { icon: ListChecks, key: 'feat1', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: MessageSquare, key: 'feat2', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: Zap, key: 'feat3', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: BookOpen, key: 'feat4', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: CheckCircle, key: 'feat5', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: Globe, key: 'feat6', color: 'text-teal-500', bg: 'bg-teal-50' },
];

const COMPARISON = {
  ms: {
    bad: { label: '❌ Tanpa TanyaLer', items: ['Baca manual 1,000 muka surat', 'Tunggu reply helpdesk berjam-jam', 'Tanya kawan yang mungkin tak tahu', 'Hadiri kursus mahal & memakan masa', 'Buat silap & perlu ulang proses'] },
    good: { label: '✅ Dengan TanyaLer', items: ['Jawapan dalam masa 5 saat', 'Step-by-step yang jelas', 'Checklist untuk elak silap', 'Bahasa mudah, 3 pilihan bahasa', 'Jimat masa, fokus pada bisnes anda'] },
  },
  en: {
    bad: { label: '❌ Without TanyaLer', items: ['Read 1,000-page manuals', 'Wait hours for helpdesk replies', 'Ask friends who may not know', 'Attend expensive time-consuming courses', 'Make mistakes and redo the process'] },
    good: { label: '✅ With TanyaLer', items: ['Answers in 5 seconds', 'Clear step-by-step guidance', 'Checklists to avoid mistakes', 'Simple language, 3 language options', 'Save time, focus on your business'] },
  },
  zh: {
    bad: { label: '❌ 没有TanyaLer', items: ['阅读1000页手册', '等待几小时的客服回复', '询问可能不知道的朋友', '参加昂贵耗时的课程', '犯错并重新操作流程'] },
    good: { label: '✅ 有TanyaLer', items: ['5秒内得到答案', '清晰的逐步指导', '避免错误的清单', '简单语言，3种语言选择', '节省时间，专注于您的业务'] },
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Language>('ms');
  const [demoQ, setDemoQ] = useState('');

  const examples = EXAMPLE_QUESTIONS[lang];
  const comparison = COMPARISON[lang];

  const handleExampleClick = (q: string) => {
    setDemoQ(q);
    window.location.href = `/login`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header lang={lang} onLangChange={setLang} />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>
        {/* Gold gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-navy-800/80 border border-navy-700 rounded-full px-4 py-2 text-sm text-gold-400 font-medium mb-8 animate-fade-in">
            <Star className="w-4 h-4 fill-gold-400" />
            {t(lang, 'hero_badge')}
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="text-white">{t(lang, 'hero_title')}</span>
            <br />
            <span className="text-gold-400">{t(lang, 'hero_title_accent')}</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
            {t(lang, 'hero_subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
            <Link href="/login" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
              {t(lang, 'hero_cta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto border-navy-600 text-gray-300 hover:text-white hover:bg-navy-800">
              {lang === 'ms' ? 'Lihat Harga' : lang === 'en' ? 'View Pricing' : '查看价格'}
            </Link>
          </div>
          <p className="text-sm text-gray-500">{t(lang, 'hero_cta_sub')}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-16 border-t border-navy-800">
            {[
              { num: '10,000+', label: t(lang, 'hero_stats_users') },
              { num: '500,000+', label: t(lang, 'hero_stats_questions') },
              { num: '98%', label: t(lang, 'hero_stats_satisfaction') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-gold-400">{s.num}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LIVE DEMO PREVIEW
      ══════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">
            {lang === 'ms' ? '💬 Cuba tanya soalan popular ini:' : lang === 'en' ? '💬 Try these popular questions:' : '💬 试试这些热门问题：'}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {examples.map((q, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(q)}
                className="text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-navy-400 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm text-gray-700 group-hover:text-navy-800">{q}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/login" className="btn-primary">
              {lang === 'ms' ? 'Cuba Sekarang — Percuma' : lang === 'en' ? 'Try Now — Free' : '立即试用 — 免费'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">{t(lang, 'features_title')}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t(lang, 'features_subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, key, color, bg }) => (
              <div key={key} className="card p-6">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">
                  {t(lang, `${key}_title` as Parameters<typeof t>[1])}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(lang, `${key}_desc` as Parameters<typeof t>[1])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEFORE vs AFTER COMPARISON
      ══════════════════════════════════════ */}
      <section className="py-20 bg-navy-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            {lang === 'ms' ? 'Sebelum vs Selepas TanyaLer' : lang === 'en' ? 'Before vs After TanyaLer' : '使用前 vs 使用后'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-red-950/30 border border-red-900/30 rounded-2xl p-6">
              <h3 className="font-semibold text-red-400 mb-4 text-lg">{comparison.bad.label}</h3>
              <ul className="space-y-3">
                {comparison.bad.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <span className="text-red-500 flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* After */}
            <div className="bg-green-950/30 border border-green-900/30 rounded-2xl p-6">
              <h3 className="font-semibold text-green-400 mb-4 text-lg">{comparison.good.label}</h3>
              <ul className="space-y-3">
                {comparison.good.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-16">{t(lang, 'how_title')}</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: t(lang, 'how1'), desc: t(lang, 'how1_desc'), icon: '📝' },
              { step: '2', title: t(lang, 'how2'), desc: t(lang, 'how2_desc'), icon: '💬' },
              { step: '3', title: t(lang, 'how3'), desc: t(lang, 'how3_desc'), icon: '⚡' },
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-full h-px border-t-2 border-dashed border-gray-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-navy-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
                    {step.icon}
                  </div>
                  <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-3 -mt-2">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DISCLAIMER BANNER
      ══════════════════════════════════════ */}
      <section className="py-6 bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto px-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>{lang === 'ms' ? 'Penafian: ' : lang === 'en' ? 'Disclaimer: ' : '声明：'}</strong>
            {t(lang, 'disclaimer_content')}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING TEASER
      ══════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            {lang === 'ms' ? 'Mulakan Percuma. Upgrade Bila Perlu.' : lang === 'en' ? 'Start Free. Upgrade When Ready.' : '免费开始。需要时升级。'}
          </h2>
          <p className="text-gray-500 mb-10">
            {lang === 'ms' ? '5 soalan percuma setiap hari. Topup bila kredit habis. Tanpa kontrak.' : lang === 'en' ? '5 free questions every day. Topup when credits run out. No contracts.' : '每天5个免费问题。积分用完时充值。无合同。'}
          </p>
          <div className="grid sm:grid-cols-4 gap-4 mb-10">
            {[
              { plan: lang === 'ms' ? 'Percuma' : lang === 'en' ? 'Free' : '免费', price: 'RM0', desc: lang === 'ms' ? '5 soalan/hari' : lang === 'en' ? '5 questions/day' : '5问题/天' },
              { plan: 'Basic', price: 'RM5', desc: lang === 'ms' ? '50 soalan' : lang === 'en' ? '50 questions' : '50个问题' },
              { plan: 'Pro', price: 'RM49', desc: lang === 'ms' ? '600 soalan/bulan' : lang === 'en' ? '600 questions/month' : '600问题/月', popular: true },
              { plan: 'Enterprise', price: 'RM99', desc: lang === 'ms' ? '1500 soalan/bulan' : lang === 'en' ? '1500 questions/month' : '1500问题/月' },
            ].map((p) => (
              <div key={p.plan} className={`relative card p-4 text-center ${p.popular ? 'border-2 border-gold-500' : ''}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {lang === 'ms' ? 'Popular' : lang === 'en' ? 'Popular' : '最受欢迎'}
                  </div>
                )}
                <div className="font-semibold text-navy-900 mb-1">{p.plan}</div>
                <div className="text-2xl font-bold text-gold-600">{p.price}</div>
                <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/login" className="btn-primary px-8">
              {lang === 'ms' ? 'Mula Percuma' : lang === 'en' ? 'Start Free' : '免费开始'}
            </Link>
            <Link href="/pricing" className="btn-secondary px-8">
              {lang === 'ms' ? 'Lihat Semua Plan' : lang === 'en' ? 'See All Plans' : '查看所有方案'}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section className="py-20 bg-navy-900 text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            {lang === 'ms' ? 'Mula Jimat Masa Anda Hari Ini' : lang === 'en' ? 'Start Saving Time Today' : '今天开始节省您的时间'}
          </h2>
          <p className="text-gray-400 mb-10">
            {lang === 'ms' ? 'Sertai ribuan pembekal Malaysia yang dah jimat masa dengan TanyaLer.' : lang === 'en' ? 'Join thousands of Malaysian suppliers already saving time with TanyaLer.' : '加入已通过TanyaLer节省时间的数千名马来西亚供应商。'}
          </p>
          <Link href="/login" className="btn-primary text-lg px-10 py-4">
            {t(lang, 'hero_cta')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
