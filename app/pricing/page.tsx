'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Language, t } from '@/lib/i18n';
import { Check, Zap, Building2, Star, ArrowRight, CreditCard } from 'lucide-react';

type PkgId = 'topup_5' | 'topup_10' | 'pro' | 'enterprise';

interface Plan {
  id: PkgId | 'free';
  name: string;
  price: string;
  period?: string;
  credits: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
  cta: string;
  icon: React.ReactNode;
  phase: string;
}

function getPlans(lang: Language): Plan[] {
  return [
    {
      id: 'free',
      name: lang === 'ms' ? 'Percuma' : lang === 'en' ? 'Free' : '免费',
      price: 'RM0',
      credits: lang === 'ms' ? '5 soalan / hari' : lang === 'en' ? '5 questions / day' : '5个问题/天',
      phase: lang === 'ms' ? 'Fasa 1' : 'Phase 1',
      icon: <Zap className="w-5 h-5" />,
      cta: lang === 'ms' ? 'Mulakan Percuma' : lang === 'en' ? 'Start Free' : '免费开始',
      features: [
        lang === 'ms' ? '5 soalan percuma setiap hari' : lang === 'en' ? '5 free questions daily' : '每天5个免费问题',
        lang === 'ms' ? 'Jawapan step-by-step' : lang === 'en' ? 'Step-by-step answers' : '逐步答案',
        lang === 'ms' ? '3 pilihan bahasa' : lang === 'en' ? '3 language options' : '3种语言选项',
        lang === 'ms' ? 'Reset setiap hari' : lang === 'en' ? 'Resets daily' : '每日重置',
      ],
    },
    {
      id: 'topup_5',
      name: lang === 'ms' ? 'Topup Basic' : lang === 'en' ? 'Basic Topup' : '基本充值',
      price: 'RM5',
      credits: lang === 'ms' ? '50 soalan' : lang === 'en' ? '50 questions' : '50个问题',
      phase: lang === 'ms' ? 'Fasa 1 — Pay as you go' : 'Phase 1 — Pay as you go',
      icon: <CreditCard className="w-5 h-5" />,
      cta: lang === 'ms' ? 'Topup RM5' : lang === 'en' ? 'Topup RM5' : '充值RM5',
      features: [
        lang === 'ms' ? '50 soalan (sehingga habis)' : lang === 'en' ? '50 questions (until used up)' : '50个问题（用完为止）',
        lang === 'ms' ? 'Tanpa tarikh luput' : lang === 'en' ? 'No expiry date' : '无到期日期',
        lang === 'ms' ? 'Bayar sekali, guna sampai habis' : lang === 'en' ? 'Pay once, use until gone' : '一次付款用到完',
        lang === 'ms' ? 'Topup bila-bila masa' : lang === 'en' ? 'Topup anytime' : '随时充值',
      ],
    },
    {
      id: 'topup_10',
      name: lang === 'ms' ? 'Topup Value' : lang === 'en' ? 'Value Topup' : '超值充值',
      price: 'RM10',
      credits: lang === 'ms' ? '120 soalan' : lang === 'en' ? '120 questions' : '120个问题',
      phase: lang === 'ms' ? 'Fasa 1 — Lebih jimat' : 'Phase 1 — Better value',
      icon: <Star className="w-5 h-5" />,
      cta: lang === 'ms' ? 'Topup RM10' : lang === 'en' ? 'Topup RM10' : '充值RM10',
      features: [
        lang === 'ms' ? '120 soalan (sehingga habis)' : lang === 'en' ? '120 questions (until used up)' : '120个问题（用完为止）',
        lang === 'ms' ? 'Lebih jimat berbanding RM5' : lang === 'en' ? 'Better value than RM5 pack' : '比RM5套餐更划算',
        lang === 'ms' ? 'Tanpa tarikh luput' : lang === 'en' ? 'No expiry date' : '无到期日期',
        lang === 'ms' ? 'Topup bila-bila masa' : lang === 'en' ? 'Topup anytime' : '随时充值',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'RM49',
      period: lang === 'ms' ? '/bulan' : lang === 'en' ? '/month' : '/月',
      credits: lang === 'ms' ? '600 soalan / bulan' : lang === 'en' ? '600 questions / month' : '600个问题/月',
      phase: lang === 'ms' ? 'Fasa 2 — Untuk pengguna aktif' : 'Phase 2 — For active users',
      highlight: true,
      badge: lang === 'ms' ? 'Paling Popular' : lang === 'en' ? 'Most Popular' : '最受欢迎',
      icon: <Star className="w-5 h-5 fill-current" />,
      cta: lang === 'ms' ? 'Langgan Pro' : lang === 'en' ? 'Subscribe Pro' : '订阅Pro',
      features: [
        lang === 'ms' ? '600 soalan sebulan' : lang === 'en' ? '600 questions per month' : '每月600个问题',
        lang === 'ms' ? 'Quota reset setiap bulan' : lang === 'en' ? 'Quota resets monthly' : '配额每月重置',
        lang === 'ms' ? 'Semua topik ePerolehan' : lang === 'en' ? 'All ePerolehan topics' : '所有ePerolehan主题',
        lang === 'ms' ? 'Checklist & template' : lang === 'en' ? 'Checklists & templates' : '清单和模板',
        lang === 'ms' ? 'Priority support' : lang === 'en' ? 'Priority support' : '优先支持',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'RM99',
      period: lang === 'ms' ? '/bulan' : lang === 'en' ? '/month' : '/月',
      credits: lang === 'ms' ? '1,500 soalan / bulan' : lang === 'en' ? '1,500 questions / month' : '1500个问题/月',
      phase: lang === 'ms' ? 'Fasa 3 — Untuk syarikat' : 'Phase 3 — For companies',
      icon: <Building2 className="w-5 h-5" />,
      cta: lang === 'ms' ? 'Langgan Enterprise' : lang === 'en' ? 'Subscribe Enterprise' : '订阅企业版',
      features: [
        lang === 'ms' ? '1,500 soalan sebulan' : lang === 'en' ? '1,500 questions per month' : '每月1500个问题',
        lang === 'ms' ? 'Sesuai untuk pasukan & syarikat' : lang === 'en' ? 'Suitable for teams & companies' : '适合团队和公司',
        lang === 'ms' ? 'Semua ciri Pro' : lang === 'en' ? 'All Pro features' : '所有Pro功能',
        lang === 'ms' ? 'Boleh guna berbilang pengguna' : lang === 'en' ? 'Multi-user capable' : '支持多用户',
        lang === 'ms' ? 'Support keutamaan tinggi' : lang === 'en' ? 'High-priority support' : '高优先级支持',
        lang === 'ms' ? 'Nilai RM0.066/soalan sahaja' : lang === 'en' ? 'Only RM0.066/question' : '仅RM0.066/问题',
      ],
    },
  ];
}

export default function PricingPage() {
  const [lang, setLang] = useState<Language>('ms');
  const [loading, setLoading] = useState<string | null>(null);
  const plans = getPlans(lang);

  const handlePurchase = async (planId: PkgId) => {
    setLoading(planId);
    try {
      const res = await fetch('/api/payment/billplz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: planId }),
      });
      const data = await res.json();
      if (data.billUrl) {
        window.location.href = data.billUrl;
      } else if (res.status === 401) {
        window.location.href = '/login';
      } else {
        alert(lang === 'ms' ? 'Ralat bayaran. Sila cuba lagi.' : 'Payment error. Please try again.');
      }
    } catch {
      alert(lang === 'ms' ? 'Ralat sambungan. Sila cuba lagi.' : 'Connection error. Please try again.');
    }
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header lang={lang} onLangChange={setLang} />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4">
              {t(lang, 'pricing_title')}
            </h1>
            <p className="text-xl text-gray-500">{t(lang, 'pricing_subtitle')}</p>
          </div>

          {/* Plans grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl border p-6 flex flex-col transition-all duration-200 hover:shadow-lg ${
                  plan.highlight
                    ? 'border-2 border-gold-500 shadow-xl shadow-gold-500/10'
                    : 'border border-gray-200'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    {plan.badge}
                  </div>
                )}

                {/* Phase label */}
                <div className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">{plan.phase}</div>

                {/* Plan name & icon */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${plan.highlight ? 'bg-gold-500 text-white' : 'bg-navy-100 text-navy-700'}`}>
                    {plan.icon}
                  </div>
                  <h2 className="text-xl font-bold text-navy-900">{plan.name}</h2>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-4xl font-bold text-navy-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-1">{plan.period}</span>}
                </div>
                <p className="text-sm text-gold-600 font-semibold mb-6">{plan.credits}</p>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.id === 'free' ? (
                  <Link
                    href="/login"
                    className={`text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                      plan.highlight
                        ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-lg'
                        : 'bg-navy-900 hover:bg-navy-800 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => handlePurchase(plan.id as PkgId)}
                    disabled={loading === plan.id}
                    className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all disabled:opacity-70 ${
                      plan.highlight
                        ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-navy-900 hover:bg-navy-800 text-white'
                    }`}
                  >
                    {loading === plan.id ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Payment info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-6 py-4">
              <span className="text-2xl">🏦</span>
              <div className="text-left">
                <p className="font-semibold text-navy-900 text-sm">
                  {lang === 'ms' ? 'Bayaran selamat melalui BillPlz' : lang === 'en' ? 'Secure payment via BillPlz' : '通过BillPlz安全付款'}
                </p>
                <p className="text-xs text-gray-500">
                  {lang === 'ms' ? 'FPX Online Banking • Semua bank Malaysia • SSL Encrypted' : lang === 'en' ? 'FPX Online Banking • All Malaysian banks • SSL Encrypted' : 'FPX网上银行 • 所有马来西亚银行 • SSL加密'}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ mini */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-navy-900 text-center mb-8">
              {lang === 'ms' ? 'Soalan Lazim' : lang === 'en' ? 'FAQ' : '常见问题'}
            </h3>
            <div className="space-y-4">
              {(lang === 'ms' ? [
                { q: 'Kredit saya expired ke?', a: 'Kredit topup (berbayar) TIDAK expired. Guna sampai habis. Hanya kredit percuma (5/hari) yang reset setiap hari.' },
                { q: 'Boleh refund tak?', a: 'Kredit yang belum digunakan boleh diminta refund dalam masa 7 hari dari tarikh pembelian. Hubungi support kami.' },
                { q: 'Berapa soalan boleh tanya dalam satu hari?', a: 'Plan Free: 5 soalan/hari. Topup & langganan: ikut kredit yang ada. Tiada had harian untuk kredit berbayar.' },
                { q: 'Adakah maklumat saya selamat?', a: 'Ya. Kami tidak simpan kata laluan ePerolehan atau maklumat sulit anda. Data dilindungi dengan SSL dan pematuhan PDPA.' },
              ] : lang === 'en' ? [
                { q: 'Do my credits expire?', a: 'Paid topup credits do NOT expire. Use them until they run out. Only free credits (5/day) reset daily.' },
                { q: 'Can I get a refund?', a: 'Unused credits can be refunded within 7 days of purchase. Contact our support team.' },
                { q: 'How many questions can I ask per day?', a: 'Free plan: 5 questions/day. Topup & subscriptions: based on your credit balance. No daily limit for paid credits.' },
                { q: 'Is my information safe?', a: 'Yes. We do not store your ePerolehan password or sensitive information. Data is protected with SSL and PDPA compliance.' },
              ] : [
                { q: '我的积分会过期吗？', a: '付费充值积分不会过期。用完为止。只有免费积分（每天5个）每天重置。' },
                { q: '可以退款吗？', a: '未使用的积分可在购买后7天内申请退款。请联系我们的支持团队。' },
                { q: '每天可以问多少个问题？', a: '免费版：每天5个问题。充值和订阅：根据您的积分余额。付费积分没有每日限制。' },
                { q: '我的信息安全吗？', a: '是的。我们不存储您的ePerolehan密码或敏感信息。数据受SSL保护并符合PDPA规定。' },
              ]).map(({ q, a }, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                  <p className="font-semibold text-navy-900 mb-2">{q}</p>
                  <p className="text-sm text-gray-600">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
