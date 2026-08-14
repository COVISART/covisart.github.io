/* UI copy, EN and TR — carried over unchanged from the design prototype. */

export type Lang = 'en' | 'tr';

export const LANGS: Lang[] = ['en', 'tr'];

/* Non-breaking hyphens: the model number must never wrap. */
export const MODEL_NAME = 'NGS‑360‑3';

/* `en` is the shape of record: `tr` is annotated with it, so a key added to
   one language and forgotten in the other is a type error. */
const en = {
  navOverview: 'Overview',
  navSpecs: 'Specifications',
  navCta: 'Request a demo',
  kicker: 'New Generation Simulator',
  heroLede: 'Unlimited motion, unmatched precision.',
  heroBody:
    'COVISART delivers next-generation electrically driven motion systems for modern simulation needs. The NGS-360-3 is built for mid-range payloads up to 800 kg, offering unlimited 3-axis rotation with 1 ms communication speed for ultra-precise response.',
  ctaPrimary: 'Request a demonstration',
  ctaSecondary: 'View specifications',
  figHero: 'NGS-360-3 — three-axis motion base',
  figOperator: 'Reconfigurable gondola, operator seated',
  figFront: 'Front elevation',
  themeToggle: 'Switch theme',
  finishLabel: 'Finish',
  finishBlack: 'Black',
  finishOlive: 'Olive',
  finishSteel: 'Steel',
  finishSand: 'Sand',
  envelopeKicker: 'Interactive',
  envelopeTitle: 'Motion envelope',
  envelopeBody:
    'Drive each axis through its full excursion. Every figure shown is the operational, non-simultaneous value from a neutral start position at design payload.',
  envelopeNote: 'Live model — drag to orbit.',
  orbitHint: 'Drag to orbit · scroll to zoom',
  reset: 'Reset',
  run: 'Run profile',
  stop: 'Stop',
  colVelocity: 'Velocity',
  colAccel: 'Acceleration',
  colJerk: 'Jerk',
  colExcursion: 'Excursion',
  colAxis: 'Axis',
  colPower: 'Power',
  colVoltage: 'Voltage / current',
  advTitle: 'Engineered advantages',
  advBody:
    'Proprietary motion cueing, full digital control and a compact subsystem architecture that arrives assembled and tested.',
  appKicker: 'One system, endless vehicle possibilities',
  appTitle: 'Typical applications',
  appBody:
    'The cockpit (gondola) is fully reconfigurable, allowing it to replicate any vehicle type required for training or research. This rapid adaptability minimises both cost and time, enabling efficient execution of diverse simulation and testing programmes.',
  swKicker: 'Control software',
  swTitle: 'Next Generation Motion Platform Manager',
  swBody:
    'Intuitive control software enabling quick adjustments to motion, bumps, roll and pitch with a single click. Motion cueing, ride-file play and replay, remote access service and diagnostics are included.',
  supplyTitle: 'Scope of supply',
  famKicker: 'Product line',
  famTitle: 'The NGS family',
  aboutKicker: 'About',
  aboutTitle: 'COVISART Research & Development',
  aboutBody:
    'Established in 2018 within the Technology Development Zone by a group of young engineers, COVISART develops high-technology products by integrating rapidly evolving visual processing technologies into simulation environments. Beyond motion training, the New Generation Simulator addresses pilot disorientation, human-factor dynamics and medical research related to spatial perception.',
  demoTitle: 'Request a demonstration',
  demoBody:
    'Tell us the platform you need to replicate and the payload envelope you are working to. Our engineering team will follow up with a payload geometry analysis and a site visit or factory demonstration.',
  address: 'Address',
  fName: 'Name',
  fOrg: 'Organisation',
  fEmail: 'E-mail',
  fCountry: 'Country',
  fUse: 'Intended use and payload',
  fSubmit: 'Submit request',
  fNote: 'Demonstration requests are handled by the COVISART sales engineering team.',
  sentTitle: 'Request received',
  sentBody: 'Our sales engineering team will contact you to arrange the demonstration.',
  specTitle: 'Technical specifications',
  specNote: 'NGS-360-3 · electrically driven three-axis motion system',
  perfTitle: 'Performance',
  perfNote: 'Operational, non-simultaneous. Neutral start position, design payload.',
  dimTitle: 'Dimensions and weight',
  elecTitle: 'Electrical',
  ifaceTitle: 'Interfaces',
  optTitle: 'Options',
  generalSpecs:
    'Motor: servo motor with integrated brake · Platform shape: square · Ambient temperature: −10° to +45°C',
  footerTag: 'Advanced technologies for tomorrow',
  /* Added in the React port: form validation feedback, which the
     prototype's uncontrolled inputs had no need for. */
  fRequired: 'This field is required.',
  fInvalidEmail: 'Enter a valid e-mail address.',
  skipToContent: 'Skip to content',
};

const tr: typeof en = {
  navOverview: 'Genel bakış',
  navSpecs: 'Teknik özellikler',
  navCta: 'Demo talebi',
  kicker: 'Yeni Nesil Simülatör',
  heroLede: 'Sınırsız hareket, benzersiz hassasiyet.',
  heroBody:
    "COVISART, modern simülasyon ihtiyaçları için elektrikle tahrik edilen yeni nesil hareket sistemleri geliştirir. NGS-360-3, 800 kg'a kadar orta sınıf faydalı yük için tasarlanmıştır; üç eksende sınırsız dönüş ve 1 ms haberleşme hızıyla yüksek hassasiyette tepki verir.",
  ctaPrimary: 'Demo talep edin',
  ctaSecondary: 'Teknik özellikler',
  figHero: 'NGS-360-3 — üç eksenli hareket platformu',
  figOperator: 'Yeniden yapılandırılabilir gondol, operatör ile',
  figFront: 'Ön görünüş',
  themeToggle: 'Temayı değiştir',
  finishLabel: 'Renk',
  finishBlack: 'Siyah',
  finishOlive: 'Haki',
  finishSteel: 'Çelik',
  finishSand: 'Kum',
  envelopeKicker: 'Etkileşimli',
  envelopeTitle: 'Hareket zarfı',
  envelopeBody:
    'Her ekseni tam hareket aralığında sürün. Gösterilen tüm değerler, nötr başlangıç konumunda ve tasarım yükünde, eş zamansız operasyonel değerlerdir.',
  envelopeNote: 'Canlı model — döndürmek için sürükleyin.',
  orbitHint: 'Sürükleyerek döndür · kaydırarak yakınlaştır',
  reset: 'Sıfırla',
  run: 'Profili çalıştır',
  stop: 'Durdur',
  colVelocity: 'Hız',
  colAccel: 'İvme',
  colJerk: 'Jerk',
  colExcursion: 'Hareket aralığı',
  colAxis: 'Eksen',
  colPower: 'Güç',
  colVoltage: 'Gerilim / akım',
  advTitle: 'Mühendislik avantajları',
  advBody:
    'Özgün hareket işaretleme yazılımı, tam dijital kontrol ve monte edilmiş ile test edilmiş olarak teslim edilen kompakt alt sistem mimarisi.',
  appKicker: 'Tek sistem, sınırsız platform',
  appTitle: 'Tipik uygulamalar',
  appBody:
    'Kokpit (gondol) tamamen yeniden yapılandırılabilir; eğitim veya araştırma için gereken her araç tipini temsil edebilir. Bu hızlı uyarlanabilirlik maliyeti ve süreyi azaltır, farklı simülasyon ve test programlarının verimli yürütülmesini sağlar.',
  swKicker: 'Kontrol yazılımı',
  swTitle: 'Yeni Nesil Hareket Platformu Yöneticisi',
  swBody:
    'Hareket, sarsıntı, roll ve pitch ayarlarını tek tıkla değiştirmeye izin veren sezgisel kontrol yazılımı. Hareket işaretleme, kayıt dosyası oynatma ve tekrar oynatma, uzaktan erişim ve tanılama araçları dahildir.',
  supplyTitle: 'Tedarik kapsamı',
  famKicker: 'Ürün hattı',
  famTitle: 'NGS ailesi',
  aboutKicker: 'Hakkında',
  aboutTitle: 'COVISART Araştırma ve Geliştirme',
  aboutBody:
    "2018 yılında Teknoloji Geliştirme Bölgesi'nde genç bir mühendis ekibi tarafından kurulan COVISART, hızla gelişen görüntü işleme teknolojilerini simülasyon ortamlarına entegre ederek yüksek teknoloji ürünleri geliştirir. Yeni Nesil Simülatör, hareket eğitiminin ötesinde pilot mekansal şaşkınlığı, insan faktörleri ve mekansal algıya ilişkin tıbbi araştırmaları da kapsar.",
  demoTitle: 'Demo talebi',
  demoBody:
    'Temsil etmeniz gereken platformu ve çalıştığınız faydalı yük aralığını bize bildirin. Mühendislik ekibimiz yük geometrisi analizi ve saha ya da fabrika demosu için sizinle iletişime geçer.',
  address: 'Adres',
  fName: 'Ad Soyad',
  fOrg: 'Kurum',
  fEmail: 'E-posta',
  fCountry: 'Ülke',
  fUse: 'Kullanım amacı ve faydalı yük',
  fSubmit: 'Talebi gönder',
  fNote: 'Demo talepleri COVISART satış mühendisliği ekibi tarafından değerlendirilir.',
  sentTitle: 'Talebiniz alındı',
  sentBody: 'Satış mühendisliği ekibimiz demo organizasyonu için sizinle iletişime geçecek.',
  specTitle: 'Teknik özellikler',
  specNote: 'NGS-360-3 · elektrikle tahrik edilen üç eksenli hareket sistemi',
  perfTitle: 'Performans',
  perfNote: 'Operasyonel, eş zamansız. Nötr başlangıç konumu, tasarım yükü.',
  dimTitle: 'Boyutlar ve ağırlık',
  elecTitle: 'Elektrik',
  ifaceTitle: 'Arayüzler',
  optTitle: 'Opsiyonlar',
  generalSpecs:
    'Motor: entegre frenli servo motor · Platform şekli: kare · Ortam sıcaklığı: −10° ila +45°C',
  footerTag: 'Yarının ileri teknolojileri',
  fRequired: 'Bu alan zorunludur.',
  fInvalidEmail: 'Geçerli bir e-posta adresi girin.',
  skipToContent: 'İçeriğe geç',
};

export const COPY = { en, tr };

export type Copy = typeof en;

export const CONTACT = {
  tel: '+90 312 395 9639',
  mail: 'info@covisart.com',
  web: 'covisart.com.tr',
  webHref: 'https://covisart.com.tr',
  address:
    'Teknopark Ankara, Technology Development Zone · Ivedik OSB, 1466 Street No:22, Yenimahalle / Ankara, Türkiye',
  legal: '© COVISART Research & Development · Ankara, Türkiye',
};
