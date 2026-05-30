import { MapPin, Navigation, Star, ExternalLink, Phone, Clock } from 'lucide-react';
import { SITE } from '../lib/site';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';

export default function LocationMap() {
  const { lang, t } = useLang();
  const { phone, telLink } = useSettings();

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full mb-3">
            <MapPin className="w-4 h-4" />
            {t.location.badge[lang]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {t.location.title[lang]}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t.location.subtitle[lang]}
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <div className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} z-10 bg-white rounded-xl shadow-lg p-4 sm:p-5 max-w-sm border border-slate-100`}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                {t.location.companyName[lang]}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <a
                  href={SITE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.location.openInMaps[lang]}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-100 flex items-center justify-center text-slate-600 hover:text-emerald-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={SITE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.location.directions[lang]}
                  className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              {lang === 'ar' ? SITE.address : SITE.addressEn}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="font-extrabold text-slate-900">5.0</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <a
                href={SITE.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                (20)
              </a>
            </div>
          </div>

          <a
            href={SITE.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-[480px] sm:h-[560px] lg:h-[620px] relative group"
            aria-label={t.location.openInMaps[lang]}
          >
            <img
              src="/image.png"
              alt={t.location.mapTitle[lang]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                {t.location.openInMaps[lang]}
              </span>
            </div>
          </a>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">{t.location.address[lang]}</div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {t.location.addressShort[lang]}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">{t.location.workingHours[lang]}</div>
              <div className="text-sm font-bold text-slate-900">{t.location.hours247[lang]}</div>
            </div>
          </div>
          <a
            href={telLink}
            className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl p-4 text-white transition shadow-md hover:shadow-lg"
          >
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-50">{t.location.callNow[lang]}</div>
              <div className="text-sm font-extrabold" dir="ltr">
                {phone}
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
