import Link from 'next/link';
import { Language, t } from '@/lib/i18n';
import { MessageSquare, Shield, Mail, Phone } from 'lucide-react';

interface FooterProps { lang: Language; }

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-navy-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Tanya<span className="text-gold-400">Ler</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">{t(lang, 'footer_desc')}</p>
            <div className="flex items-start gap-2 bg-amber-950/30 border border-amber-900/30 rounded-xl p-3">
              <Shield className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-400">{t(lang, 'footer_not_official')}</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">{t(lang, 'footer_links')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">{lang === 'ms' ? 'Laman Utama' : lang === 'en' ? 'Home' : '首页'}</Link></li>
              <li><Link href="/chat" className="hover:text-white transition-colors">{lang === 'ms' ? 'Mula Tanya' : lang === 'en' ? 'Start Asking' : '开始提问'}</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">{lang === 'ms' ? 'Harga' : lang === 'en' ? 'Pricing' : '价格'}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">{t(lang, 'footer_legal')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">{t(lang, 'footer_disclaimer')}</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">{t(lang, 'footer_privacy')}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">{t(lang, 'footer_terms')}</Link></li>
            </ul>

            <h3 className="font-semibold text-white mb-3 mt-6 text-sm">{t(lang, 'footer_contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@tanyaler.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  support@tanyaler.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} TanyaLer. {t(lang, 'footer_rights')}
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-green-500" />
              SSL Secured
            </span>
            <span className="text-navy-700">|</span>
            <span>PDPA 2010 Compliant</span>
            <span className="text-navy-700">|</span>
            <span>🇲🇾 Made in Malaysia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
