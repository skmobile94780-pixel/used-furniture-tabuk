import { Phone, CheckCircle2, Clock, Truck, BadgeCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';

export default function Hero() {
  const { lang, t } = useLang();
  const { phone, telLink, whatsappLink } = useSettings();

  const features = [
    { icon: Clock, label: t.hero.service247[lang] },
    { icon: Truck, label: t.hero.freeTransport[lang] },
    { icon: CheckCircle2, label: t.hero.instantPayment[lang] },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-emerald-50 via-white to-white" aria-label={t.hero.title[lang]}>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #059669 0%, transparent 40%), radial-gradient(circle at 80% 80%, #1d4ed8 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full mb-5">
            <BadgeCheck className="w-4 h-4" aria-hidden="true" />
            {t.hero.badge[lang]}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
            {t.hero.title[lang]}
            <span className="block text-emerald-700 mt-2">{t.hero.subtitle[lang]}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7 max-w-xl">
            {t.hero.description[lang]}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={telLink}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              aria-label={`${t.hero.callNow[lang]} - 0531442546`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {t.hero.callNow[lang]}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm sm:text-base font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
              aria-label={`${t.hero.whatsapp[lang]} - 0531442546`}
            >
              <WhatsAppIcon className="w-5 h-5" />
              {t.hero.whatsapp[lang]}
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col items-center text-center gap-2"
              >
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-bold text-slate-700">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-emerald-200 to-blue-100 rounded-3xl blur-2xl opacity-50" aria-hidden="true" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt={lang === 'ar' ? 'شراء أثاث مستعمل بتبوك - غرف نوم ومطابخ ومكيفات بأفضل الأسعار' : 'Buy used furniture in Tabuk - bedrooms, kitchens, AC units at best prices'}
              className="w-full h-[300px] sm:h-[420px] object-cover"
              loading="eager"
              width="1200"
              height="420"
              fetchPriority="high"
            />
            <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">{t.hero.callNowOverlay[lang]}</div>
                  <a href={telLink} className="text-lg font-extrabold text-emerald-700" dir="ltr">
                    {phone}
                  </a>
                </div>
                <a
                  href={telLink}
                  className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md"
                  aria-label={`${t.hero.callNowOverlay[lang]} ${phone}`}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
