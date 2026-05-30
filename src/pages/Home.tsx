import { Star, Users, Award, ShieldCheck, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useState } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import LocationMap from '../components/LocationMap';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';

const statIcons = [Users, Star, Award, ShieldCheck];
const statValues = ['+5000', '4.9', '+10', '100%'];

export default function Home() {
  const { lang, t } = useLang();
  const { telLink, whatsappLink } = useSettings();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const statLabels = [
    t.stats.happyClients[lang],
    t.stats.clientRating[lang],
    t.stats.yearsExperience[lang],
    t.stats.securePayment[lang],
  ];

  return (
    <>
      <Hero />

      <section className="bg-slate-900 text-white py-10 sm:py-14" aria-label={lang === 'ar' ? 'إحصائيات الشركة' : 'Company Statistics'}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statIcons.map((Icon, i) => (
            <div key={i} className="text-center">
              <Icon className="w-8 h-8 mx-auto mb-2 text-emerald-400" aria-hidden="true" />
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{statValues[i]}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{statLabels[i]}</div>
            </div>
          ))}
        </div>
      </section>

      <Services />

      <LocationMap />

      <section className="py-14 sm:py-20 bg-slate-50" aria-label={t.testimonials.title[lang]}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              {t.testimonials.title[lang]}
            </h2>
            <p className="text-slate-600">{t.testimonials.subtitle[lang]}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, idx) => (
              <article
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div className="flex gap-1 mb-3" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content="5" />
                  <meta itemProp="bestRating" content="5" />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4" itemProp="reviewBody">"{item.text[lang]}"</p>
                <div className="text-sm font-bold text-slate-900" itemProp="author">{item.name[lang]}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white" aria-label={t.faq.title[lang]}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              {t.faq.title[lang]}
            </h2>
            <p className="text-slate-600">{t.faq.subtitle[lang]}</p>
          </div>
          <div className="space-y-3">
            {t.faq.items.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden transition-shadow hover:shadow-sm"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900" itemProp="name">
                      {faq.q[lang]}
                    </h3>
                    {isOpen
                      ? <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    }
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 pb-4' : 'max-h-0'}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p className="px-5 text-slate-600 leading-relaxed" itemProp="text">
                      {faq.a[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`py-14 sm:py-20 bg-gradient-to-${lang === 'ar' ? 'l' : 'r'} from-emerald-600 to-emerald-700 text-white`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {t.cta.title[lang]}
          </h2>
          <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle[lang]}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={telLink}
              className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 text-base font-extrabold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition"
              aria-label={`${t.cta.callNow[lang]} - 0531442546`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {t.cta.callNow[lang]}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-base font-extrabold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition"
              aria-label={`${t.cta.whatsapp[lang]} - 0531442546`}
            >
              <WhatsAppIcon className="w-5 h-5" />
              {t.cta.whatsapp[lang]}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
