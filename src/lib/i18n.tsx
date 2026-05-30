import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export type Lang = 'ar' | 'en';

const translations = {
  nav: {
    home: { ar: 'الرئيسية', en: 'Home' },
    about: { ar: 'من نحن', en: 'About' },
    blog: { ar: 'المدونة', en: 'Blog' },
    contact: { ar: 'اتصل بنا', en: 'Contact' },
  },
  topBar: {
    service24: { ar: 'خدمة على مدار 24 ساعة في جميع أحياء تبوك', en: '24/7 service across all Tabuk neighborhoods' },
  },
  header: {
    siteName: { ar: 'شراء اثاث مستعمل تبوك', en: 'Used Furniture Buying Tabuk' },
    siteSubtitle: { ar: 'Used Furniture Buying Tabuk', en: 'Buy & Sell Used Furniture' },
    callUs: { ar: 'اتصل بنا:', en: 'Call us:' },
    callNow: { ar: 'اتصل الآن:', en: 'Call now:' },
    search: { ar: 'بحث', en: 'Search' },
    searchPlaceholder: { ar: 'ابحث في الموقع...', en: 'Search the site...' },
    menu: { ar: 'القائمة', en: 'Menu' },
  },
  hero: {
    badge: { ar: 'الأسرع والأفضل في تبوك', en: 'Fastest & Best in Tabuk' },
    title: { ar: 'شركة شراء أثاث مستعمل تبوك', en: 'Used Furniture Buying Company Tabuk' },
    subtitle: { ar: 'شراء مطاعم الأثاث بتبوك', en: 'Restaurant Furniture Buying in Tabuk' },
    description: {
      ar: 'نشتري جميع أنواع الاثاث المستعمل بتبوك بأسعار ممتازة. بيع وشراء مكيفات، غرف نوم، أو مطابخ، نحن جاهزون للشراء فوراً مع ضمان النقل المجاني والمعاينة السريعة.',
      en: 'We buy all types of used furniture in Tabuk at excellent prices. Whether it\'s AC units, bedrooms, or kitchens, we\'re ready to buy immediately with free transportation and quick inspection.',
    },
    callNow: { ar: 'اتصل الآن شراء أثاث مستعمل تبوك', en: 'Call Now - Used Furniture Tabuk' },
    whatsapp: { ar: 'راسلنا واتساب', en: 'WhatsApp Us' },
    service247: { ar: '24/7 خدمة', en: '24/7 Service' },
    freeTransport: { ar: 'نقل مجاني', en: 'Free Transport' },
    instantPayment: { ar: 'دفع فوري', en: 'Instant Payment' },
    callNowOverlay: { ar: 'اتصل الآن', en: 'Call Now' },
  },
  stats: {
    happyClients: { ar: 'عميل راضٍ', en: 'Happy Clients' },
    clientRating: { ar: 'تقييم العملاء', en: 'Client Rating' },
    yearsExperience: { ar: 'سنوات خبرة', en: 'Years Experience' },
    securePayment: { ar: 'دفع آمن', en: 'Secure Payment' },
  },
  services: {
    badge: { ar: 'خدماتنا', en: 'Our Services' },
    title: { ar: 'شراء وبيع الأثاث المستعمل بتبوك', en: 'Buying & Selling Used Furniture in Tabuk' },
    subtitle: {
      ar: 'خدمة متكاملة واحترافية لشراء جميع أنواع الأثاث المستعمل في مدينة تبوك',
      en: 'Complete professional service for buying all types of used furniture in Tabuk city',
    },
    callNow: { ar: 'اتصل الآن', en: 'Call Now' },
    whatsapp: { ar: 'واتساب', en: 'WhatsApp' },
    items: [
      {
        title: { ar: 'ارقام شراء اثاث مستعمل بتبوك', en: 'Used Furniture Buying Numbers in Tabuk' },
        text: {
          ar: 'نوفر لعملائنا في تبوك أرقام تواصل مباشرة وسريعة للحصول على خدمة شراء الأثاث المستعمل خلال دقائق. فريقنا جاهز على مدار 24 ساعة طوال أيام الأسبوع لاستقبال طلباتكم، مع تقديم تقييم فوري ودفع نقدي مباشر لأثاث المنازل والمطاعم والمكاتب. نؤمن بأن سرعة الاستجابة وأمانة التقييم هي أساس الثقة مع عملائنا الكرام.',
          en: 'We provide our clients in Tabuk with direct and fast contact numbers to get used furniture buying service within minutes. Our team is available 24/7 to receive your requests, with instant evaluation and direct cash payment for home, restaurant, and office furniture. We believe that fast response and honest evaluation are the foundation of trust with our valued clients.',
        },
      },
      {
        title: { ar: 'شراء الاثاث المستعمل بتبوك', en: 'Buying Used Furniture in Tabuk' },
        text: {
          ar: 'نقدم خدمة شراء الأثاث المستعمل بتبوك مع توفير النقل المجاني وخدمة الفك والتركيب من قبل فنيين محترفين. نقوم بالمعاينة الميدانية في موقعك وتقديم سعر عادل وشفاف يتناسب مع حالة القطع وجودتها. لا حاجة للتعب في نقل أي قطعة، فريقنا يتكفل بكل شيء من التقييم حتى النقل النهائي.',
          en: 'We offer used furniture buying service in Tabuk with free transportation and professional disassembly and assembly. We conduct on-site inspections at your location and provide fair and transparent pricing based on the condition and quality of items. No need to worry about moving anything -- our team handles everything from evaluation to final transport.',
        },
      },
      {
        title: { ar: 'بيع اثاث مستعمل تبوك', en: 'Selling Used Furniture in Tabuk' },
        text: {
          ar: 'نساعدك على تجديد منزلك بسهولة عن طريق التخلص من الأثاث القديم وتحويله إلى مبلغ نقدي فوري. سواء كنت تنتقل إلى منزل جديد أو ترغب بتغيير ديكور منزلك، نشتري منك غرف النوم والصالات والمطابخ والأجهزة الكهربائية بأسعار منافسة دون أي تعقيدات أو وسطاء.',
          en: 'We help you renovate your home easily by getting rid of old furniture and turning it into instant cash. Whether you\'re moving to a new house or want to change your decor, we buy bedrooms, living rooms, kitchens, and appliances at competitive prices without any complications or middlemen.',
        },
      },
      {
        title: { ar: 'شركة شراء اثاث مستعمل تبوك', en: 'Used Furniture Buying Company Tabuk' },
        text: {
          ar: 'شركتنا هي الخيار الأمثل لشراء الأثاث المستعمل بتبوك بفضل خبرتنا الطويلة وسمعتنا الطيبة. نقدم خدمة متكاملة تشمل شراء غرف النوم، المطابخ، المكيفات، أثاث المطاعم، والأجهزة الكهربائية، مع التزامنا التام بالمواعيد والأسعار المتفق عليها. ثقة عملائنا هي أهم استثماراتنا.',
          en: 'Our company is the best choice for buying used furniture in Tabuk thanks to our long experience and good reputation. We offer a complete service including buying bedrooms, kitchens, AC units, restaurant furniture, and appliances, with full commitment to agreed schedules and prices. Our clients\' trust is our most important investment.',
        },
      },
    ],
  },
  location: {
    badge: { ar: 'موقعنا على الخريطة', en: 'Our Location on Map' },
    title: { ar: 'تفضل بزيارة مقر الشركة في تبوك', en: 'Visit Our Office in Tabuk' },
    subtitle: {
      ar: 'نخدم جميع أحياء تبوك ويسعدنا استقبالكم في مقر الشركة على مدار اليوم',
      en: 'We serve all Tabuk neighborhoods and welcome you at our office around the clock',
    },
    companyName: {
      ar: 'شركة شراء أثاث مستعمل تبوك شراء مطاعم الأثاث بتبوك',
      en: 'Used Furniture Buying Company Tabuk',
    },
    address: { ar: 'العنوان', en: 'Address' },
    addressShort: { ar: 'البلدة القديمة، تبوك 47914', en: 'Old Town, Tabuk 47914' },
    workingHours: { ar: 'ساعات العمل', en: 'Working Hours' },
    hours247: { ar: '24 ساعة / 7 أيام', en: '24 hours / 7 days' },
    callNow: { ar: 'اتصل بنا الآن', en: 'Call Us Now' },
    openInMaps: { ar: 'فتح في خرائط جوجل', en: 'Open in Google Maps' },
    directions: { ar: 'الاتجاهات', en: 'Directions' },
    mapTitle: { ar: 'موقع شركة شراء أثاث مستعمل تبوك على الخريطة', en: 'Used Furniture Buying Company Tabuk Location on Map' },
  },
  testimonials: {
    title: { ar: 'آراء عملائنا', en: 'Client Testimonials' },
    subtitle: { ar: 'ثقة تبنى على تجارب حقيقية', en: 'Trust built on real experiences' },
    items: [
      {
        name: { ar: 'أبو محمد', en: 'Abu Mohammed' },
        text: {
          ar: 'خدمة سريعة واحترافية، جاء الفريق في نفس اليوم ودفعوا سعراً عادلاً لغرفة النوم.',
          en: 'Fast and professional service. The team came the same day and paid a fair price for the bedroom set.',
        },
      },
      {
        name: { ar: 'أم سعود', en: 'Um Saud' },
        text: {
          ar: 'أفضل شركة شراء أثاث مستعمل بتبوك، معاينة سريعة ونقل مجاني. أنصح بهم.',
          en: 'Best used furniture buying company in Tabuk. Quick inspection and free transport. Highly recommend.',
        },
      },
      {
        name: { ar: 'خالد العتيبي', en: 'Khalid Al-Otaibi' },
        text: {
          ar: 'بعت أثاث مطعمي كاملاً معهم، تعامل راقٍ والتزام بالمواعيد والأسعار.',
          en: 'I sold all my restaurant furniture with them. Excellent dealings, commitment to schedules and prices.',
        },
      },
    ],
  },
  cta: {
    title: { ar: 'جاهزون لشراء أثاثك المستعمل الآن', en: 'Ready to Buy Your Used Furniture Now' },
    subtitle: {
      ar: 'اتصل بنا واحصل على تقييم فوري لأثاثك مع خدمة النقل المجاني في جميع أحياء تبوك',
      en: 'Call us and get an instant evaluation of your furniture with free transport across all Tabuk neighborhoods',
    },
    callNow: { ar: 'اتصل الآن', en: 'Call Now' },
    whatsapp: { ar: 'واتساب', en: 'WhatsApp' },
  },
  about: {
    badge: { ar: 'من نحن', en: 'About Us' },
    title: { ar: 'شركة شراء اثاث مستعمل تبوك', en: 'Used Furniture Buying Company Tabuk' },
    description: {
      ar: 'نحن شركة رائدة في مجال شراء وبيع الأثاث المستعمل بمدينة تبوك. نقدم خدمة احترافية وشاملة تشمل المعاينة المجانية، التقييم العادل، والنقل المجاني، مع فريق عمل مدرب ومتخصص.',
      en: 'We are a leading company in buying and selling used furniture in Tabuk city. We offer professional and comprehensive service including free inspection, fair evaluation, and free transport, with a trained and specialized team.',
    },
    storyTitle: { ar: 'قصتنا وخبرتنا', en: 'Our Story & Experience' },
    storyP1: {
      ar: 'منذ أكثر من عقد ونحن نقدم خدماتنا لأهالي تبوك في شراء وبيع الأثاث المستعمل. بنينا سمعتنا على الأمانة، سرعة التنفيذ، وعدالة الأسعار. نفتخر بثقة آلاف العملاء الذين تعاملوا معنا وأوصوا بنا لأصدقائهم وأقاربهم.',
      en: 'For over a decade, we have been providing our services to the people of Tabuk in buying and selling used furniture. We built our reputation on honesty, fast execution, and fair prices. We are proud of the trust of thousands of clients who dealt with us and recommended us to their friends and relatives.',
    },
    storyP2: {
      ar: 'نمتلك فريقاً متكاملاً من المقيّمين والفنيين وعمال النقل لضمان تجربة سلسة من أول اتصال حتى تسليم المبلغ النقدي.',
      en: 'We have a complete team of evaluators, technicians, and transport workers to ensure a smooth experience from the first call to cash delivery.',
    },
    contactUs: { ar: 'تواصل معنا', en: 'Contact Us' },
    whyChooseUs: { ar: 'لماذا تختارنا؟', en: 'Why Choose Us?' },
    reasons: [
      { title: { ar: 'خبرة موثوقة', en: 'Trusted Experience' }, text: { ar: 'أكثر من 10 سنوات في خدمة أهالي تبوك.', en: 'Over 10 years serving the people of Tabuk.' } },
      { title: { ar: 'أسعار عادلة', en: 'Fair Prices' }, text: { ar: 'تقييم دقيق ومنافس لجميع القطع.', en: 'Accurate and competitive evaluation for all items.' } },
      { title: { ar: 'تعامل راقٍ', en: 'Professional Dealings' }, text: { ar: 'أمانة والتزام كامل بالمواعيد.', en: 'Honesty and full commitment to schedules.' } },
      { title: { ar: 'فريق متخصص', en: 'Specialized Team' }, text: { ar: 'مقيمون وفنيون ومشرفون محترفون.', en: 'Professional evaluators, technicians, and supervisors.' } },
    ],
  },
  blog: {
    badge: { ar: 'المدونة', en: 'Blog' },
    title: { ar: 'مقالات ونصائح عن الأثاث المستعمل', en: 'Articles & Tips About Used Furniture' },
    subtitle: {
      ar: 'أحدث المقالات حول شراء وبيع الأثاث المستعمل بتبوك',
      en: 'Latest articles about buying and selling used furniture in Tabuk',
    },
    backToBlog: { ar: 'العودة للمدونة', en: 'Back to Blog' },
    readMore: { ar: 'قراءة المزيد', en: 'Read More' },
    noPosts: { ar: 'لا توجد مقالات حالياً', en: 'No articles available' },
  },
  contact: {
    badge: { ar: 'اتصل بنا', en: 'Contact Us' },
    title: { ar: 'تواصل معنا في أي وقت', en: 'Get in Touch Anytime' },
    subtitle: {
      ar: 'فريقنا جاهز للرد على استفساراتك على مدار 24 ساعة',
      en: 'Our team is ready to answer your inquiries 24 hours a day',
    },
    phone: { ar: 'هاتف', en: 'Phone' },
    whatsapp: { ar: 'واتساب', en: 'WhatsApp' },
    email: { ar: 'البريد الإلكتروني', en: 'Email' },
    addressLabel: { ar: 'العنوان', en: 'Address' },
    workingHoursLabel: { ar: 'ساعات العمل', en: 'Working Hours' },
    workingHoursValue: { ar: 'نعمل على مدار 24 ساعة', en: 'We work around the clock' },
    formTitle: { ar: 'أرسل لنا رسالة', en: 'Send Us a Message' },
    successMsg: { ar: 'تم استلام رسالتك بنجاح، سنتواصل معك قريباً', en: 'Your message was received successfully. We will contact you soon.' },
    nameLabel: { ar: 'الاسم *', en: 'Name *' },
    phoneLabel: { ar: 'الهاتف *', en: 'Phone *' },
    emailLabel: { ar: 'البريد الإلكتروني', en: 'Email' },
    messageLabel: { ar: 'رسالتك *', en: 'Your Message *' },
    messagePlaceholder: { ar: 'أخبرنا ما هو الأثاث الذي تود بيعه...', en: 'Tell us what furniture you want to sell...' },
    requiredError: { ar: 'الرجاء تعبئة الحقول المطلوبة', en: 'Please fill in the required fields' },
    genericError: { ar: 'حدث خطأ، يرجى المحاولة لاحقاً', en: 'An error occurred, please try again later' },
    sendMessage: { ar: 'إرسال الرسالة', en: 'Send Message' },
    mapTitle: { ar: 'موقعنا على الخريطة', en: 'Our Location on Map' },
  },
  footer: {
    aboutCompany: { ar: 'عن الشركة', en: 'About Company' },
    aboutText: {
      ar: 'نشتري جميع أنواع الأثاث المستعمل (غرف نوم - مطابخ - مكيفات - أجهزة كهربائية - أثاث مطاعم) بأفضل الأسعار في تبوك مع خدمة نقل مجانية وتقييم فوري.',
      en: 'We buy all types of used furniture (bedrooms, kitchens, AC units, appliances, restaurant furniture) at the best prices in Tabuk with free transport and instant evaluation.',
    },
    quickLinks: { ar: 'روابط مهمة', en: 'Quick Links' },
    contactUs: { ar: 'تواصل معنا', en: 'Contact Us' },
    ourLocation: { ar: 'موقعنا', en: 'Our Location' },
    workingHours: { ar: 'نعمل على مدار 24 ساعة', en: 'Open 24 hours' },
    rights: { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
    mapTitle: { ar: 'موقعنا على الخريطة', en: 'Our Location on Map' },
  },
  faq: {
    title: { ar: 'الأسئلة الشائعة', en: 'Frequently Asked Questions' },
    subtitle: { ar: 'إجابات على أكثر الأسئلة التي يطرحها عملاؤنا', en: 'Answers to the most common questions from our clients' },
    items: [
      {
        q: { ar: 'كيف أبيع أثاثي المستعمل في تبوك؟', en: 'How do I sell my used furniture in Tabuk?' },
        a: {
          ar: 'اتصل بنا على الرقم 0531442546 أو راسلنا عبر واتساب. سيقوم فريقنا بزيارتك لمعاينة الأثاث وتقديم سعر عادل مع نقل مجاني ودفع فوري نقدي.',
          en: 'Call us at 0531442546 or message us on WhatsApp. Our team will visit you to inspect the furniture and offer a fair price with free transport and instant cash payment.',
        },
      },
      {
        q: { ar: 'ما أنواع الأثاث التي تشترونها؟', en: 'What types of furniture do you buy?' },
        a: {
          ar: 'نشتري جميع أنواع الأثاث المستعمل: غرف نوم، مطابخ، مكيفات، أجهزة كهربائية، أثاث مطاعم، صالات، ومكاتب.',
          en: 'We buy all types of used furniture: bedrooms, kitchens, AC units, appliances, restaurant furniture, living rooms, and offices.',
        },
      },
      {
        q: { ar: 'هل خدمة النقل مجانية؟', en: 'Is the transport service free?' },
        a: {
          ar: 'نعم، نوفر خدمة نقل مجانية بالكامل مع فريق متخصص في الفك والتركيب والنقل الآمن.',
          en: 'Yes, we provide a completely free transport service with a specialized team for disassembly, assembly, and safe transport.',
        },
      },
      {
        q: { ar: 'ما هي مناطق الخدمة؟', en: 'What areas do you serve?' },
        a: {
          ar: 'نخدم جميع أحياء ومناطق مدينة تبوك على مدار 24 ساعة طوال أيام الأسبوع.',
          en: 'We serve all neighborhoods and areas of Tabuk city, 24 hours a day, 7 days a week.',
        },
      },
      {
        q: { ar: 'كيف يتم تقييم سعر الأثاث؟', en: 'How is the furniture price evaluated?' },
        a: {
          ar: 'يقوم فريقنا المتخصص بمعاينة الأثاث في موقعك وتقديم تقييم عادل ومنافس بناءً على حالة القطع وجودتها، مع الدفع النقدي الفوري.',
          en: 'Our specialized team inspects the furniture at your location and provides a fair and competitive evaluation based on the condition and quality, with instant cash payment.',
        },
      },
    ],
  },
  breadcrumb: {
    home: { ar: 'الرئيسية', en: 'Home' },
  },
  floating: {
    whatsappLabel: { ar: 'تواصل عبر واتساب', en: 'Chat on WhatsApp' },
    callLabel: { ar: 'اتصال', en: 'Call' },
  },
} as const;

type Translations = typeof translations;

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dir: 'rtl' | 'ltr';
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return saved === 'en' ? 'en' : 'ar';
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  }, []);

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    document.body.style.direction = dir;
    document.body.style.textAlign = lang === 'ar' ? 'right' : 'left';
    document.body.style.fontFamily = lang === 'ar'
      ? "'Tajawal', 'Cairo', system-ui, -apple-system, sans-serif"
      : "'Inter', system-ui, -apple-system, sans-serif";
  }, [lang]);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
