import type { Lang } from './i18n';

type PageSEO = {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
};

const pageSEO: Record<string, PageSEO> = {
  home: {
    title: {
      ar: 'شراء اثاث مستعمل تبوك | شركة شراء وبيع الأثاث المستعمل بتبوك - نقل مجاني 0531442546',
      en: 'Buy Used Furniture Tabuk | Best Used Furniture Buying Company in Tabuk - Free Transport',
    },
    description: {
      ar: 'شركة شراء أثاث مستعمل بتبوك - نشتري جميع أنواع الأثاث المستعمل: غرف نوم، مطابخ، مكيفات، أجهزة كهربائية، وأثاث مطاعم بأفضل الأسعار. خدمة 24 ساعة مع نقل مجاني ودفع فوري. اتصل الآن 0531442546',
      en: 'Used furniture buying company in Tabuk - We buy all types of used furniture: bedrooms, kitchens, AC units, appliances & restaurant furniture at best prices. 24/7 service with free transport. Call 0531442546',
    },
  },
  about: {
    title: {
      ar: 'من نحن - شركة شراء اثاث مستعمل تبوك | خبرة أكثر من 10 سنوات',
      en: 'About Us - Used Furniture Buying Company Tabuk | 10+ Years Experience',
    },
    description: {
      ar: 'تعرف على شركة شراء الأثاث المستعمل بتبوك. خبرة تتجاوز 10 سنوات في شراء وبيع الأثاث المستعمل مع فريق متخصص وسمعة موثوقة. معاينة مجانية - تقييم عادل - نقل مجاني.',
      en: 'Learn about the leading used furniture buying company in Tabuk. Over 10 years of experience with a specialized team and trusted reputation. Free inspection - fair evaluation - free transport.',
    },
  },
  blog: {
    title: {
      ar: 'مدونة الأثاث المستعمل بتبوك | مقالات ونصائح شراء وبيع الاثاث',
      en: 'Used Furniture Blog Tabuk | Articles & Tips on Buying and Selling Furniture',
    },
    description: {
      ar: 'أحدث المقالات والنصائح حول شراء وبيع الأثاث المستعمل في تبوك. معلومات مفيدة عن تقييم الأثاث والحفاظ عليه وأفضل طرق البيع والشراء.',
      en: 'Latest articles and tips about buying and selling used furniture in Tabuk. Useful information about furniture evaluation, maintenance, and best buying/selling practices.',
    },
  },
  contact: {
    title: {
      ar: 'اتصل بنا - شراء اثاث مستعمل تبوك | واتساب 0531442546',
      en: 'Contact Us - Used Furniture Buying Tabuk | WhatsApp 0531442546',
    },
    description: {
      ar: 'تواصل مع شركة شراء الأثاث المستعمل بتبوك عبر الهاتف أو الواتساب 0531442546. فريقنا جاهز على مدار 24 ساعة للرد على استفساراتك ومعاينة أثاثك.',
      en: 'Contact used furniture buying company in Tabuk via phone or WhatsApp 0531442546. Our team is available 24/7 to answer your inquiries and inspect your furniture.',
    },
  },
};

export function updatePageSEO(page: string, lang: Lang) {
  const seo = pageSEO[page];
  if (!seo) return;

  document.title = seo.title[lang];

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', seo.description[lang]);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seo.title[lang]);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', seo.description[lang]);

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', seo.title[lang]);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', seo.description[lang]);

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', lang === 'ar' ? 'ar_SA' : 'en_US');
}
