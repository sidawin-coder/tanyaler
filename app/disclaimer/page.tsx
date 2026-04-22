'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Language, t } from '@/lib/i18n';
import { Shield, CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';

export default function DisclaimerPage() {
  const [lang, setLang] = useState<Language>('ms');

  const allowed = {
    ms: ['Menyediakan panduan dan tutorial sistem ePerolehan', 'Menerangkan cara menggunakan sistem ePerolehan', 'Meringkaskan manual rasmi yang tersedia secara awam', 'Memberi jawapan step-by-step berdasarkan panduan awam', 'Menyediakan perkhidmatan chatbot AI untuk soalan-soalan umum ePerolehan'],
    en: ['Providing guides and tutorials for the ePerolehan system', 'Explaining how to use the ePerolehan system', 'Summarizing official manuals available to the public', 'Giving step-by-step answers based on public guidelines', 'Providing AI chatbot service for general ePerolehan questions'],
    zh: ['提供ePerolehan系统的指南和教程', '解释如何使用ePerolehan系统', '汇总公开的官方手册', '基于公开指南给出逐步答案', '为一般ePerolehan问题提供AI聊天机器人服务'],
  };

  const notAllowed = {
    ms: ['Mendakwa sebagai platform rasmi ePerolehan atau wakil kerajaan Malaysia', 'Meminta atau menyimpan ID login dan kata laluan ePerolehan pengguna', 'Mengintegrasikan API sistem ePerolehan tanpa kebenaran rasmi', 'Melakukan scraping data dari sistem ePerolehan', 'Menggunakan logo atau nama rasmi Kementerian Kewangan Malaysia tanpa kebenaran'],
    en: ['Claiming to be the official ePerolehan platform or representative of the Malaysian Government', 'Requesting or storing users\' ePerolehan login ID and password', 'Integrating with the ePerolehan API without official permission', 'Scraping data from the ePerolehan system', 'Using official logos or names of the Malaysian Ministry of Finance without permission'],
    zh: ['声称是ePerolehan官方平台或马来西亚政府代表', '请求或存储用户的ePerolehan登录ID和密码', '未经官方许可与ePerolehan API集成', '从ePerolehan系统抓取数据', '未经许可使用马来西亚财政部的官方标志或名称'],
  };

  const laws = {
    ms: ['Akta Komunikasi & Multimedia 1998 (CMA 1998)', 'Akta Perlindungan Data Peribadi 2010 (PDPA 2010)', 'Akta Jenayah Komputer 1997', 'Terma Penggunaan Sistem ePerolehan Malaysia', 'Akta Hak Cipta 1987'],
    en: ['Communications and Multimedia Act 1998 (CMA 1998)', 'Personal Data Protection Act 2010 (PDPA 2010)', 'Computer Crimes Act 1997', 'Terms of Use of the Malaysian ePerolehan System', 'Copyright Act 1987'],
    zh: ['1998年通讯与多媒体法', '2010年个人数据保护法（PDPA）', '1997年计算机犯罪法', '马来西亚ePerolehan系统使用条款', '1987年版权法'],
  };

  const sections = [
    {
      id: 'main',
      title: lang === 'ms' ? '1. Penafian Utama' : lang === 'en' ? '1. Main Disclaimer' : '1. 主要声明',
      content: t(lang, 'disclaimer_content'),
      icon: <Shield className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200',
    },
    {
      id: 'allowed',
      title: lang === 'ms' ? '2. Apa Yang TanyaLer BOLEH Buat' : lang === 'en' ? '2. What TanyaLer CAN Do' : '2. TanyaLer可以做什么',
      list: allowed[lang],
      type: 'allowed' as const,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      bg: 'bg-green-50 border-green-200',
    },
    {
      id: 'notAllowed',
      title: lang === 'ms' ? '3. Apa Yang TanyaLer TIDAK Buat' : lang === 'en' ? '3. What TanyaLer Does NOT Do' : '3. TanyaLer不做什么',
      list: notAllowed[lang],
      type: 'not-allowed' as const,
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      bg: 'bg-red-50 border-red-200',
    },
    {
      id: 'laws',
      title: lang === 'ms' ? '4. Undang-undang Yang Dipatuhi' : lang === 'en' ? '4. Laws We Comply With' : '4. 我们遵守的法律',
      list: laws[lang],
      type: 'laws' as const,
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header lang={lang} onLangChange={setLang} />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-4xl font-bold text-navy-900 mb-3">{t(lang, 'disclaimer_title')}</h1>
            <p className="text-gray-500">
              {lang === 'ms' ? 'Sila baca penafian ini sebelum menggunakan perkhidmatan TanyaLer.' : lang === 'en' ? 'Please read this disclaimer before using TanyaLer services.' : '使用TanyaLer服务前请阅读本声明。'}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className={`bg-white rounded-2xl border p-6 ${section.type ? '' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-lg font-bold text-navy-900">{section.title}</h2>
                </div>

                {section.content && (
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                )}

                {section.list && section.type === 'allowed' && (
                  <ul className="space-y-2.5">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.list && section.type === 'not-allowed' && (
                  <ul className="space-y-2.5">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.list && section.type === 'laws' && (
                  <ul className="space-y-2.5">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Privacy section */}
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-bold text-navy-900 mb-4">
                {lang === 'ms' ? '5. Dasar Privasi Ringkas' : lang === 'en' ? '5. Brief Privacy Policy' : '5. 简要隐私政策'}
              </h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>{lang === 'ms' ? 'Data yang kami kumpul:' : lang === 'en' ? 'Data we collect:' : '我们收集的数据：'}</strong>{' '}
                  {lang === 'ms' ? 'E-mel, soalan yang ditanya (tanpa maklumat sulit), sejarah kredit.' : lang === 'en' ? 'Email, questions asked (without sensitive information), credit history.' : '电子邮件、提问（无敏感信息）、积分历史。'}
                </p>
                <p><strong>{lang === 'ms' ? 'Data yang TIDAK kami kumpul:' : lang === 'en' ? 'Data we do NOT collect:' : '我们不收集的数据：'}</strong>{' '}
                  {lang === 'ms' ? 'Kata laluan ePerolehan, nombor IC, nombor akaun bank, maklumat tender atau kontrak.' : lang === 'en' ? 'ePerolehan password, IC number, bank account numbers, tender or contract information.' : 'ePerolehan密码、身份证号码、银行账户号码、招标或合同信息。'}
                </p>
                <p><strong>{lang === 'ms' ? 'Keselamatan:' : lang === 'en' ? 'Security:' : '安全性：'}</strong>{' '}
                  {lang === 'ms' ? 'Data dilindungi dengan penyulitan SSL 256-bit. Kami mematuhi PDPA 2010.' : lang === 'en' ? 'Data protected with 256-bit SSL encryption. We comply with PDPA 2010.' : '数据受256位SSL加密保护。我们遵守PDPA 2010。'}
                </p>
                <p><strong>{lang === 'ms' ? 'Perkongsian data:' : lang === 'en' ? 'Data sharing:' : '数据共享：'}</strong>{' '}
                  {lang === 'ms' ? 'Kami tidak menjual atau berkongsi data anda kepada pihak ketiga tanpa kebenaran anda.' : lang === 'en' ? 'We do not sell or share your data to third parties without your consent.' : '未经您同意，我们不会出售或与第三方共享您的数据。'}
                </p>
              </div>
            </div>

            {/* Official links */}
            <div className="bg-navy-50 border border-navy-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-navy-900 mb-4">
                {lang === 'ms' ? '6. Pautan Rasmi ePerolehan' : lang === 'en' ? '6. Official ePerolehan Links' : '6. 官方ePerolehan链接'}
              </h2>
              <div className="space-y-3">
                {[
                  { label: 'Portal Rasmi ePerolehan', url: 'https://www.eperolehan.gov.my' },
                  { label: 'Helpdesk ePerolehan: 1800-88-8687', url: 'tel:1800888687' },
                  { label: 'E-mel Helpdesk: helpdesk@eperolehan.gov.my', url: 'mailto:helpdesk@eperolehan.gov.my' },
                ].map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-navy-700 hover:text-navy-900 hover:underline text-sm"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                {lang === 'ms'
                  ? 'TanyaLer tidak mempunyai sebarang kaitan dengan pautan-pautan di atas. Pautan ini disediakan untuk kemudahan pengguna sahaja.'
                  : lang === 'en'
                  ? 'TanyaLer has no affiliation with the links above. These links are provided for user convenience only.'
                  : 'TanyaLer与上述链接没有任何关联。这些链接仅为用户方便而提供。'}
              </p>
            </div>
          </div>

          {/* Last updated */}
          <p className="text-center text-xs text-gray-400 mt-8">
            {lang === 'ms' ? 'Terakhir dikemaskini: Januari 2025' : lang === 'en' ? 'Last updated: January 2025' : '最后更新：2025年1月'}
            {' · '}
            <Link href="/" className="hover:underline">{lang === 'ms' ? 'Kembali ke laman utama' : lang === 'en' ? 'Back to home' : '返回首页'}</Link>
          </p>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
