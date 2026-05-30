import { FormEvent, useState } from 'react';
import { Phone, MapPin, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { supabase } from '../lib/supabase';
import { SITE } from '../lib/site';
import { useLang } from '../lib/i18n';
import { useSettings } from '../lib/settings';
import Breadcrumb from '../components/Breadcrumb';

type Props = {
  onNavigateHome?: () => void;
};

export default function Contact({ onNavigateHome }: Props) {
  const [name, setName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const { lang, t } = useLang();
  const { phone, telLink, whatsappLink } = useSettings();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !formPhone.trim() || !message.trim()) {
      setError(t.contact.requiredError[lang]);
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.from('contact_messages').insert({
      name: name.trim(),
      phone: formPhone.trim(),
      message: message.trim(),
    });
    setLoading(false);
    if (err) {
      setError(t.contact.genericError[lang]);
      return;
    }
    setDone(true);
    setName('');
    setFormPhone('');
    setMessage('');
  };

  const contactInfo = [
    { icon: Phone, title: t.contact.phone[lang], value: phone, href: telLink, ltr: true },
    { icon: WhatsAppIcon, title: t.contact.whatsapp[lang], value: phone, href: whatsappLink, ltr: true },
    { icon: MapPin, title: t.contact.addressLabel[lang], value: lang === 'ar' ? SITE.address : SITE.addressEn },
    { icon: Clock, title: t.contact.workingHoursLabel[lang], value: t.contact.workingHoursValue[lang] },
  ];

  return (
    <div>
      <section className="bg-gradient-to-bl from-emerald-50 via-white to-white py-14 sm:py-16">
        <Breadcrumb
          items={[
            { label: t.breadcrumb.home[lang], onClick: onNavigateHome },
            { label: t.contact.badge[lang] },
          ]}
        />
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full mb-4">
            {t.contact.badge[lang]}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            {t.contact.title[lang]}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.contact.subtitle[lang]}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-5 gap-8">
          <address className="lg:col-span-2 space-y-4 not-italic">
            {contactInfo.map((c) => {
              const Wrap: any = c.href ? 'a' : 'div';
              const props: any = c.href
                ? { href: c.href, target: c.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                : {};
              return (
                <Wrap
                  key={c.title}
                  {...props}
                  className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 mb-1">{c.title}</div>
                    <div className="text-sm font-bold text-slate-900" dir={c.ltr ? 'ltr' : undefined}>
                      {c.value}
                    </div>
                  </div>
                </Wrap>
              );
            })}
          </address>

          <div className="lg:col-span-3">
            <form
              onSubmit={submit}
              className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-5">
                {t.contact.formTitle[lang]}
              </h2>

              {done && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 text-sm font-semibold px-4 py-3 rounded-lg mb-5" role="alert">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  {t.contact.successMsg[lang]}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-600 mb-1.5">
                    {t.contact.nameLabel[lang]}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-600 mb-1.5">
                    {t.contact.phoneLabel[lang]}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    dir="ltr"
                    autoComplete="tel"
                    className={`w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:bg-white transition ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="contact-message" className="block text-xs font-bold text-slate-600 mb-1.5">
                  {t.contact.messageLabel[lang]}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.messagePlaceholder[lang]}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:bg-white transition resize-none"
                />
              </div>

              {error && <div className="text-sm text-rose-600 mb-3" role="alert">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" aria-hidden="true" />}
                {t.contact.sendMessage[lang]}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100">
            <iframe
              title={t.contact.mapTitle[lang]}
              src={SITE.mapsEmbed}
              width="100%"
              height="380"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
