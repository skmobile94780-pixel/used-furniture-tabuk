import { useState } from 'react';
import { Phone, Search, Menu, X, Sofa, Globe } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';

type Page = 'home' | 'about' | 'blog' | 'contact';

type Props = {
  current: Page;
  onNavigate: (p: Page) => void;
};

const navKeys: Page[] = ['home', 'about', 'blog', 'contact'];

export default function Header({ current, onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { phone, telLink } = useSettings();

  const go = (p: Page) => {
    onNavigate(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLabel = (key: Page) => t.nav[key][lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="bg-emerald-600 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <span>{t.topBar.service24[lang]}</span>
          <a href={telLink} className="flex items-center gap-2 font-semibold hover:text-emerald-100 transition">
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr">{phone}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button onClick={() => go('home')} className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition">
            <Sofa className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
              {t.header.siteName[lang]}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500 leading-tight">
              {t.header.siteSubtitle[lang]}
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {navKeys.map((key) => (
            <button
              key={key}
              onClick={() => go(key)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                current === key
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
              }`}
            >
              {navLabel(key)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition"
            title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label={t.header.search[lang]}
            className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition"
          >
            <Search className="w-4 h-4" />
          </button>
          <a
            href={telLink}
            className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <Phone className="w-4 h-4" />
            <span>{t.header.callUs[lang]}</span>
            <span dir="ltr" className="font-mono">{phone}</span>
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t.header.menu[lang]}
            className="lg:hidden w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="relative">
              <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400`} />
              <input
                type="text"
                placeholder={t.header.searchPlaceholder[lang]}
                className={`w-full ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-400 focus:bg-white transition`}
              />
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navKeys.map((key) => (
              <button
                key={key}
                onClick={() => go(key)}
                className={`px-4 py-3 text-sm font-semibold rounded-lg ${lang === 'ar' ? 'text-right' : 'text-left'} transition ${
                  current === key ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {navLabel(key)}
              </button>
            ))}
            <a
              href={telLink}
              className="mt-2 sm:hidden inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-bold px-4 py-3 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              <span>{t.header.callNow[lang]}</span>
              <span dir="ltr">{phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
