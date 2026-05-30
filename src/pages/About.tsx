import { BadgeCheck, Target, Heart, Users, Phone } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';
import Breadcrumb from '../components/Breadcrumb';

const reasonIcons = [BadgeCheck, Target, Heart, Users];

type Props = {
  onNavigateHome?: () => void;
};

export default function About({ onNavigateHome }: Props) {
  const { lang, t } = useLang();
  const { telLink } = useSettings();

  return (
    <div>
      <section className="bg-gradient-to-bl from-emerald-50 via-white to-white py-14 sm:py-20">
        <Breadcrumb
          items={[
            { label: t.breadcrumb.home[lang], onClick: onNavigateHome },
            { label: t.about.badge[lang] },
          ]}
        />
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full mb-4">
            {t.about.badge[lang]}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-5">
            {t.about.title[lang]}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            {t.about.description[lang]}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-label={t.about.storyTitle[lang]}>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt={lang === 'ar' ? 'فريق عمل شركة شراء اثاث مستعمل بتبوك' : 'Used furniture buying team in Tabuk'}
              className="w-full h-[360px] object-cover"
              loading="lazy"
              width="1000"
              height="360"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              {t.about.storyTitle[lang]}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t.about.storyP1[lang]}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {t.about.storyP2[lang]}
            </p>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
              aria-label={`${t.about.contactUs[lang]} - 0531442546`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {t.about.contactUs[lang]}
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-slate-50" aria-label={t.about.whyChooseUs[lang]}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              {t.about.whyChooseUs[lang]}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.about.reasons.map((r, i) => {
              const Icon = reasonIcons[i];
              return (
                <article
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-700" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{r.title[lang]}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{r.text[lang]}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
