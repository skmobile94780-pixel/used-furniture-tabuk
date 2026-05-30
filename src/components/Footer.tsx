import { useState, useEffect, ComponentType } from 'react';
import { Phone, MapPin, Clock, Instagram } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import SnapchatIcon from './SnapchatIcon';
import TikTokIcon from './TikTokIcon';
import { SITE } from '../lib/site';
import { supabase, SocialLink } from '../lib/supabase';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';

type Page = 'home' | 'about' | 'blog' | 'contact';

type Props = {
  onNavigate: (p: Page) => void;
};

type IconProps = { className?: string };

const platformConfig: Record<string, {
  icon: ComponentType<IconProps>;
  hover: string;
  label: string;
}> = {
  instagram: {
    icon: Instagram,
    hover: 'hover:bg-gradient-to-br hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]',
    label: 'Instagram',
  },
  snapchat: {
    icon: SnapchatIcon,
    hover: 'hover:bg-[#FFFC00] hover:text-slate-900',
    label: 'Snapchat',
  },
  tiktok: {
    icon: TikTokIcon,
    hover: 'hover:bg-[#00f2ea] hover:text-slate-900',
    label: 'TikTok',
  },
  whatsapp: {
    icon: WhatsAppIcon,
    hover: 'hover:bg-[#25D366]',
    label: 'WhatsApp',
  },
};

export default function Footer({ onNavigate }: Props) {
  const { lang, t } = useLang();
  const { phone, telLink, whatsappLink } = useSettings();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    supabase
      .from('social_links')
      .select('id, platform, url, display_order, is_active')
      .eq('is_active', true)
      .order('display_order')
      .then(({ data }) => {
        if (data) setSocialLinks(data);
      });
  }, []);

  const go = (p: Page) => {
    onNavigate(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navKeys: { key: Page; label: string }[] = [
    { key: 'home', label: t.nav.home[lang] },
    { key: 'about', label: t.nav.about[lang] },
    { key: 'blog', label: t.nav.blog[lang] },
    { key: 'contact', label: t.nav.contact[lang] },
  ];

  const resolveHref = (link: SocialLink) =>
    link.platform === 'whatsapp' ? whatsappLink : link.url;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-white text-lg font-extrabold mb-4">{t.footer.aboutCompany[lang]}</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            {t.footer.aboutText[lang]}
          </p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((link) => {
                const config = platformConfig[link.platform];
                if (!config) return null;
                const Icon = config.icon;
                return (
                  <a
                    key={link.id}
                    href={resolveHref(link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={config.label}
                    className={`w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center transition ${config.hover}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-white text-lg font-extrabold mb-4">{t.footer.quickLinks[lang]}</h3>
          <ul className="space-y-2.5 text-sm">
            {navKeys.map((l) => (
              <li key={l.key}>
                <button
                  onClick={() => go(l.key)}
                  className={`hover:text-emerald-400 transition ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-extrabold mb-4">{t.footer.contactUs[lang]}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
              <a href={telLink} className="hover:text-emerald-400 transition" dir="ltr">
                {phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
              <span>{lang === 'ar' ? SITE.address : SITE.addressEn}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
              <span>{t.footer.workingHours[lang]}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-extrabold mb-4">{t.footer.ourLocation[lang]}</h3>
          <div className="rounded-xl overflow-hidden border border-slate-800 shadow-md">
            <iframe
              title={t.footer.mapTitle[lang]}
              src={SITE.mapsEmbed}
              width="100%"
              height="180"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 text-center text-xs sm:text-sm text-slate-400">
        &copy; {new Date().getFullYear()} {SITE.name} - {t.footer.rights[lang]}
      </div>
    </footer>
  );
}
