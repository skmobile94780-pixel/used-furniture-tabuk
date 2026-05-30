export const SITE = {
  name: 'شراء اثاث مستعمل تبوك',
  address: 'KGAC8348، 8348 محمد بن القويع، 3428، البلدة القديمة، Tabuk 47914, Saudi Arabia',
  addressEn: 'KGAC8348, 8348 Muhammad Ibn Al-Quway, 3428, Al Balda Al Qadima, Tabuk 47914',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d36.5661908!3d28.3835079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15a9ad0594132365%3A0x6f40e3c6b6139acf!2sTabuk%20Saudi%20Arabia!5e0!3m2!1sar!2ssa!4v1700000000000!5m2!1sar!2ssa',
  mapsLink:
    'https://maps.app.goo.gl/yXYAhgbP9kE9fDhn6',
};

export const makeWhatsappLink = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const makeTelLink = (phoneIntl: string) => `tel:${phoneIntl}`;
