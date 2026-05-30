import { Phone } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingButtons() {
  const { lang, t } = useLang();
  const { phone, telLink, whatsappLink } = useSettings();

  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floating.whatsappLabel[lang]}
        className="float-pulse fixed bottom-5 left-5 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      <a
        href={telLink}
        aria-label={`${t.floating.callLabel[lang]} ${phone}`}
        className="float-pulse-blue fixed bottom-5 right-5 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
      >
        <Phone className="w-6 h-6" strokeWidth={2.2} />
      </a>
    </>
  );
}
