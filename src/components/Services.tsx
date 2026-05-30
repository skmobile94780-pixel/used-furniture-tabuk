import { Phone, Truck, DollarSign, Building2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';

const icons = [Phone, Truck, DollarSign, Building2];
const images = [
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1000',
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000',
  'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1000',
  'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1000',
];

export default function Services() {
  const { lang, t } = useLang();
  const { telLink, whatsappLink } = useSettings();

  return (
    <section className="py-14 sm:py-20 bg-white" aria-label={t.services.title[lang]}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full mb-3">
            {t.services.badge[lang]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {t.services.title[lang]}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t.services.subtitle[lang]}
          </p>
        </div>

        <div className="space-y-12 sm:space-y-20">
          {t.services.items.map((s, i) => {
            const reverse = i % 2 === 1;
            const Icon = icons[i];
            return (
              <article
                key={i}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  reverse ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-br from-emerald-100 to-blue-50 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition" />
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                    <img
                      src={images[i]}
                      alt={s.title[lang]}
                      className="w-full h-[260px] sm:h-[340px] object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width="1000"
                      height="340"
                      itemProp="image"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-px bg-emerald-500" />
                    <span className="text-xs font-bold text-emerald-700">0{i + 1}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight" itemProp="name">
                    {s.title[lang]}
                  </h3>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6" itemProp="description">{s.text[lang]}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={telLink}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition"
                      aria-label={`${t.services.callNow[lang]} - 0531442546`}
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      {t.services.callNow[lang]}
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition"
                      aria-label={`${t.services.whatsapp[lang]} - 0531442546`}
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      {t.services.whatsapp[lang]}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
