'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomeContent() {
  const { t, lang } = useLanguage();

  const FEATURES = {
    ms: [
      { icon: '📂', title: 'Bukti Rujukan Setiap Jawapan', desc: 'Bukan andaian. Setiap jawapan disertakan nama fail rasmi dan fasal yang tepat — anda boleh semak sendiri.' },
      { icon: '⚡', title: 'Keputusan dalam Saat', desc: 'Lupakan mencari dalam 7,375 muka surat manual. Dapatkan jawapan tepat dalam masa beberapa saat.' },
      { icon: '🎯', title: 'Ketepatan Terukur', desc: 'Setiap jawapan ada skor ketepatan. Anda tahu bila perlu sahkan lebih lanjut — tiada kejutan.' },
      { icon: '🛡️', title: 'Sumber 100% Sah & Rasmi', desc: '56 dokumen rasmi ePerolehan termasuk PK 5.1 (pindaan Jun 2025) dan manual terkini MOF.' },
    ],
    en: [
      { icon: '📂', title: 'Evidence-Based Answers', desc: 'Not guesswork. Every answer includes the exact official file name and clause — you can verify it yourself.' },
      { icon: '⚡', title: 'Results in Seconds', desc: 'Stop searching through 7,375 pages of manuals. Get accurate answers in seconds.' },
      { icon: '🎯', title: 'Measurable Accuracy', desc: 'Every answer has an accuracy score. You know when to verify further — no surprises.' },
      { icon: '🛡️', title: '100% Official Sources', desc: '56 official ePerolehan documents including PK 5.1 (amended June 2025) and latest MOF manuals.' },
    ],
    zh: [
      { icon: '📂', title: '每个答案均有参考依据', desc: '不是猜测。每个答案都附有准确的官方文件名称和条款——您可以自行核实。' },
      { icon: '⚡', title: '秒速获得结果', desc: '无需翻阅7,375页手册。在几秒钟内获得准确答案。' },
      { icon: '🎯', title: '可量化的准确性', desc: '每个答案都有准确度分数。您知道何时需要进一步核实——没有意外。' },
      { icon: '🛡️', title: '100%官方来源', desc: '56份电子采购官方文件，包括PK 5.1（2025年6月修订版）和最新财政部手册。' },
    ],
  };

  const HOW = {
    ms: [
      { num: '01', title: 'Daftar Percuma', desc: 'Sign up dengan Google dalam 30 saat. Tiada kad kredit diperlukan.' },
      { num: '02', title: 'Tanya Soalan', desc: 'Taip soalan ePerolehan anda dalam Bahasa Malaysia, English, atau Mandarin.' },
      { num: '03', title: 'Dapat Jawapan + Rujukan', desc: 'Terima jawapan tepat dengan nama fail sumber untuk anda sahkan sendiri.' },
    ],
    en: [
      { num: '01', title: 'Register Free', desc: 'Sign up with Google in 30 seconds. No credit card required.' },
      { num: '02', title: 'Ask Your Question', desc: 'Type your ePerolehan question in Malay, English, or Mandarin.' },
      { num: '03', title: 'Get Answer + References', desc: 'Receive accurate answers with source file names for you to verify.' },
    ],
    zh: [
      { num: '01', title: '免费注册', desc: '30秒内用Google注册。无需信用卡。' },
      { num: '02', title: '提问', desc: '用马来语、英语或中文输入您的电子采购问题。' },
      { num: '03', title: '获得答案+参考资料', desc: '收到准确答案，附有来源文件名称供您自行核实。' },
    ],
  };

  const TESTIMONIALS = {
    ms: [
      { quote: 'Saya baru daftar SSM dan terus tersadung dengan ePerolehan. TanyaLer jawab step-by-step, terus faham. Dalam masa seminggu saya berjaya sertai sebut harga pertama.', name: 'Ahmad Hakim', role: 'Pembekal Baru · Selangor', initials: 'AH' },
      { quote: 'Sijil MOF saya nak expire, panik. Tanya TanyaLer, dapat checklist lengkap untuk renew. Settle dalam sehari. Save masa dan tenaga.', name: 'Siti Lina', role: 'Pengurus Operasi · KL', initials: 'SL' },
      { quote: 'Tender saya asyik reject dan saya tak tahu kenapa. TanyaLer breakdown semua punca dan cara betulkan. Tender berikutnya terus lulus.', name: 'Razif Nordin', role: 'Kontraktor · Johor', initials: 'RN' },
      { quote: 'Katalog saya reject tiga kali. Setelah guna TanyaLer, saya faham format yang betul. Approve first try.', name: 'Kevin Chin', role: 'Pengarah Syarikat · Melaka', initials: 'KC' },
    ],
    en: [
      { quote: 'I just registered with SSM and was confused about ePerolehan. TanyaLer explained step-by-step. Within a week I successfully joined my first quotation.', name: 'Ahmad Hakim', role: 'New Vendor · Selangor', initials: 'AH' },
      { quote: 'My MOF certificate was about to expire and I panicked. Asked TanyaLer, got a complete renewal checklist. Settled in one day.', name: 'Siti Lina', role: 'Operations Manager · KL', initials: 'SL' },
      { quote: 'My tenders kept getting rejected and I didn\'t know why. TanyaLer broke down all the reasons and how to fix them. My next tender was approved.', name: 'Razif Nordin', role: 'Contractor · Johor', initials: 'RN' },
      { quote: 'My catalogue was rejected three times. After using TanyaLer, I understood the correct format. Approved on first try.', name: 'Kevin Chin', role: 'Company Director · Melaka', initials: 'KC' },
    ],
    zh: [
      { quote: '我刚在SSM注册，对电子采购感到困惑。TanyaLer一步一步地解释。一周内我成功参与了第一次报价。', name: 'Ahmad Hakim', role: '新供应商 · 雪兰莪', initials: 'AH' },
      { quote: '我的MOF证书即将到期，我很慌张。询问TanyaLer后，得到了完整的更新清单。一天内解决了。', name: 'Siti Lina', role: '运营经理 · 吉隆坡', initials: 'SL' },
      { quote: '我的投标一直被拒绝，但不知道原因。TanyaLer列出了所有原因和解决方法。下一次投标就通过了。', name: 'Razif Nordin', role: '承包商 · 柔佛', initials: 'RN' },
      { quote: '我的目录被拒绝了三次。使用TanyaLer后，我了解了正确的格式。第一次就获批了。', name: 'Kevin Chin', role: '公司董事 · 马六甲', initials: 'KC' },
    ],
  };

  const ui = {
    ms: {
      badge: '7,375 muka surat dari 56 dokumen rasmi ePerolehan',
      h1a: 'Sistem Rujukan Pintar',
      h1b: 'ePerolehan Malaysia.',
      sub: 'Bukan sekadar AI — ini adalah <strong class="text-slate-700">Decision Support System</strong> berasaskan dokumen rasmi. Setiap jawapan disertakan bukti rujukan fail untuk anda sahkan sendiri.',
      sub2: 'Dipercayai vendor, kontraktor, dan pembekal kerajaan Malaysia.',
      cta1: 'Mulakan Percuma →',
      cta2: 'Lihat Harga',
      freeNote: '5 soalan percuma setiap hari · Tiada kad kredit diperlukan',
      whyBadge: 'Apa Yang Membezakan TanyaLer',
      whyTitle: 'Maklumat Sahih. Keputusan Pasti.',
      whySub: 'Tanyaler direka untuk memberi anda maklumat yang <strong>boleh diaudit</strong> — bukan sekadar jawapan, tetapi jawapan dengan bukti.',
      howBadge: 'Cara Ia Berfungsi',
      howTitle: 'Semudah 1, 2, 3.',
      testimonialBadge: 'Kata Pengguna',
      testimonialTitle: 'Dipercayai Pembekal Malaysia.',
      testimonialTag: '98% pengguna dapat jawapan pada percubaan pertama',
      priceBadge: 'Harga Telus',
      priceTitle: 'Mulakan Percuma. Upgrade Bila Bersedia.',
      priceSub: 'Tiada kontrak jangka panjang. Topup bila perlu.',
      priceCta: 'Lihat Perbandingan Penuh →',
      finalTitle: 'Jom mula, percuma.',
      finalSub: 'Tanya soalan pertama anda hari ini.<br/>Tidak perlu kad kredit, tidak perlu komitmen.',
      finalCta: 'Mulakan Sekarang →',
      finalNote: '5 soalan percuma · Tiada kad kredit · Tiada komitmen',
    },
    en: {
      badge: '7,375 pages from 56 official ePerolehan documents',
      h1a: 'Smart Reference System for',
      h1b: 'Malaysian ePerolehan.',
      sub: 'Not just AI — this is a <strong class="text-slate-700">Decision Support System</strong> based on official documents. Every answer comes with file reference evidence for you to verify.',
      sub2: 'Trusted by vendors, contractors, and Malaysian government suppliers.',
      cta1: 'Start Free →',
      cta2: 'View Pricing',
      freeNote: '5 free questions daily · No credit card required',
      whyBadge: 'What Sets TanyaLer Apart',
      whyTitle: 'Verified Intelligence. Accountable Decisions.',
      whySub: 'TanyaLer is Malaysia\'s Smart ePerolehan Reference System — every answer is grounded in official documents that can be verified and audited. You don\'t just get answers; you get <strong>accountable evidence</strong> that stands up in any procurement decision.',
      howBadge: 'How It Works',
      howTitle: 'As Simple as 1, 2, 3.',
      testimonialBadge: 'What Users Say',
      testimonialTitle: 'Trusted by Malaysian Vendors.',
      testimonialTag: '98% of users get answers on their first try',
      priceBadge: 'Transparent Pricing',
      priceTitle: 'Start Free. Upgrade When Ready.',
      priceSub: 'No long-term contracts. Top up when needed.',
      priceCta: 'View Full Comparison →',
      finalTitle: 'Let\'s start, for free.',
      finalSub: 'Ask your first question today.<br/>No credit card, no commitment.',
      finalCta: 'Start Now →',
      finalNote: '5 free questions · No credit card · No commitment',
    },
    zh: {
      badge: '来自56份官方电子采购文件的7,375页内容',
      h1a: '马来西亚电子采购',
      h1b: '智能参考系统。',
      sub: '不仅仅是AI——这是一个基于官方文件的<strong class="text-slate-700">决策支持系统</strong>。每个答案都附有文件参考证据供您核实。',
      sub2: '受到马来西亚供应商、承包商和政府采购商的信赖。',
      cta1: '免费开始 →',
      cta2: '查看价格',
      freeNote: '每天5个免费问题 · 无需信用卡',
      whyBadge: 'TanyaLer的独特优势',
      whyTitle: '可验证的信息。负责任的决策。',
      whySub: 'TanyaLer旨在为您提供<strong>可审计</strong>的信息——不仅仅是答案，而是有证据支撑的答案。',
      howBadge: '使用方法',
      howTitle: '简单如1、2、3。',
      testimonialBadge: '用户反馈',
      testimonialTitle: '受马来西亚供应商信赖。',
      testimonialTag: '98%的用户第一次就得到了答案',
      priceBadge: '透明定价',
      priceTitle: '免费开始。准备好时升级。',
      priceSub: '无需长期合约。按需充值。',
      priceCta: '查看完整对比 →',
      finalTitle: '让我们免费开始吧。',
      finalSub: '今天就提出您的第一个问题。<br/>无需信用卡，无需承诺。',
      finalCta: '立即开始 →',
      finalNote: '5个免费问题 · 无信用卡 · 无承诺',
    },
  };

  const u = ui[lang];
  const features = FEATURES[lang];
  const how = HOW[lang];
  const testimonials = TESTIMONIALS[lang];

  const STATS = [
    ['7,375', lang === 'ms' ? 'Muka Surat Dokumen Rasmi' : lang === 'en' ? 'Official Document Pages' : '官方文件页数'],
    ['56', lang === 'ms' ? 'Dokumen ePerolehan Diindex' : lang === 'en' ? 'Indexed ePerolehan Documents' : '已索引电子采购文件'],
    ['98%', lang === 'ms' ? 'Pengguna Dapat Jawapan' : lang === 'en' ? 'Users Get Answers' : '用户获得答案'],
    ['< 10s', lang === 'ms' ? 'Masa Jawapan Purata' : lang === 'en' ? 'Average Response Time' : '平均响应时间'],
  ];

  const PLANS = [
    { name: 'Explorer', price: 'RM0', note: lang === 'ms' ? '5 kredit/hari' : lang === 'en' ? '5 credits/day' : '5积分/天', highlight: false },
    { name: 'Rintis',   price: 'RM39', note: lang === 'ms' ? '50 kredit' : lang === 'en' ? '50 credits' : '50积分', highlight: false },
    { name: 'Strategis',price: 'RM89', note: lang === 'ms' ? '200 kredit 🔥' : lang === 'en' ? '200 credits 🔥' : '200积分 🔥', highlight: true },
    { name: 'Prestij',  price: 'RM199', note: lang === 'ms' ? '500 kredit' : lang === 'en' ? '500 credits' : '500积分', highlight: false },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-emerald-700 font-semibold mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"/>
            {u.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-4 sm:mb-6">
            {u.h1a}<br/>
            <span className="text-emerald-600">{u.h1b}</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto mb-3 sm:mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: u.sub }} />

          <p className="text-slate-400 text-sm sm:text-base mb-8 sm:mb-10">{u.sub2}</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <Link href="/login?redirect=/apps" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg transition-all shadow-lg text-center">
              {u.cta1}
            </Link>
            <Link href="/pricing" className="bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-700 font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg transition-all text-center">
              {u.cta2}
            </Link>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm">{u.freeNote}</p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-900 text-white py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {STATS.map(([num, label]) => (
            <div key={label as string}>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">{num}</div>
              <div className="text-slate-400 text-xs sm:text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-emerald-600 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">{u.whyBadge}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">{u.whyTitle}</h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: u.whySub }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
                <div className="text-2xl sm:text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">{f.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-emerald-600 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">{u.howBadge}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{u.howTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {how.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">{step.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-emerald-600 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">{u.testimonialBadge}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{u.testimonialTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">{testimonial.name}</p>
                    <p className="text-slate-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm text-emerald-700 font-bold">
              {u.testimonialTag}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-emerald-600 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">{u.priceBadge}</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{u.priceTitle}</h2>
          <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8">{u.priceSub}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {PLANS.map((p) => (
              <div key={p.name} className={`rounded-2xl p-3 sm:p-4 border-2 ${
                p.highlight ? 'border-emerald-500 bg-white shadow-lg shadow-emerald-100' : 'border-slate-200 bg-white'
              }`}>
                <p className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1 ${p.highlight ? 'text-emerald-600' : 'text-slate-400'}`}>{p.name}</p>
                <p className={`text-xl sm:text-2xl font-black ${p.highlight ? 'text-emerald-600' : 'text-slate-900'}`}>{p.price}</p>
                <p className="text-slate-500 text-[10px] sm:text-xs mt-1">{p.note}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="inline-block border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl transition-all text-sm sm:text-base">
            {u.priceCta}
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 text-white py-14 sm:py-20 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">{u.finalTitle}</h2>
          <p className="text-slate-400 text-base sm:text-lg mb-6 sm:mb-8"
            dangerouslySetInnerHTML={{ __html: u.finalSub }} />
          <Link href="/login?redirect=/apps" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl transition-all shadow-xl">
            {u.finalCta}
          </Link>
          <p className="text-slate-500 text-xs sm:text-sm mt-4 sm:mt-5">{u.finalNote}</p>
        </div>
      </section>

    </div>
  );
}
