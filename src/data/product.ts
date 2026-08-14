/* Product data, EN and TR — carried over unchanged from the design prototype. */

import type { Copy, Lang } from './copy';

export type FinishId = 'black' | 'olive' | 'steel' | 'sand';

export interface Finish {
  id: FinishId;
  labelKey: keyof Copy;
  hex: string;
}

export const FINISHES: Finish[] = [
  { id: 'black', labelKey: 'finishBlack', hex: '#43403D' },
  { id: 'olive', labelKey: 'finishOlive', hex: '#3f4a34' },
  { id: 'steel', labelKey: 'finishSteel', hex: '#6b7178' },
  { id: 'sand', labelKey: 'finishSand', hex: '#a8987b' },
];

export type AxisKey = 'roll' | 'pitch' | 'yaw';

export interface Axis {
  key: AxisKey;
  name: string;
  title: string;
  min: number;
  max: number;
  accel: string;
  jerk: string;
  velocity: string;
  excursion: string;
}

export const AXES: Record<Lang, Axis[]> = {
  en: [
    { key: 'roll', name: 'Roll', title: 'Roll', min: 0, max: 360, accel: '±220 deg/s²', jerk: '±600 deg/s²', velocity: '±220 deg/s', excursion: '360° unlimited' },
    { key: 'pitch', name: 'Pitch', title: 'Pitch', min: -180, max: 180, accel: '±180 deg/s²', jerk: '±400 deg/s²', velocity: '±110 deg/s', excursion: '360° unlimited' },
    { key: 'yaw', name: 'Yaw', title: 'Yaw', min: 0, max: 360, accel: '±110 deg/s²', jerk: '±200 deg/s²', velocity: '±90 deg/s', excursion: '360° unlimited' },
  ],
  tr: [
    { key: 'roll', name: 'Roll', title: 'Yuvarlanma (Roll)', min: 0, max: 360, accel: '±220 der/s²', jerk: '±600 der/s²', velocity: '±220 der/s', excursion: '360° sınırsız' },
    { key: 'pitch', name: 'Pitch', title: 'Yanlama (Pitch)', min: -180, max: 180, accel: '±180 der/s²', jerk: '±400 der/s²', velocity: '±110 der/s', excursion: '360° sınırsız' },
    { key: 'yaw', name: 'Yaw', title: 'Sapma (Yaw)', min: 0, max: 360, accel: '±110 der/s²', jerk: '±200 der/s²', velocity: '±90 der/s', excursion: '360° sınırsız' },
  ],
};

export const FIGURES: Record<Lang, { value: string; label: string }[]> = {
  en: [
    { value: '360° × 3', label: 'Unlimited rotation axes' },
    { value: '1 ms', label: 'Host communication' },
    { value: '500 kg', label: 'Platform payload' },
    { value: '220 °/s', label: 'Peak roll velocity' },
  ],
  tr: [
    { value: '360° × 3', label: 'Sınırsız dönüş ekseni' },
    { value: '1 ms', label: 'Haberleşme hızı' },
    { value: '500 kg', label: 'Platform faydalı yükü' },
    { value: '220 °/s', label: 'Azami roll hızı' },
  ],
};

export const ADVANTAGES: Record<Lang, { n: string; title: string; body: string }[]> = {
  en: [
    { n: '01', title: 'Optimal motion control', body: 'Proprietary motion cueing software and full digital control for unmatched precision.' },
    { n: '02', title: 'Best-in-class smoothness', body: 'Advanced friction compensation, ball screw spindles, oil lubrication and low-friction seals ensure seamless operation.' },
    { n: '03', title: 'Economic and efficient', body: 'High performance at low power consumption through optimised transmission ratios and integrated static compensation.' },
    { n: '04', title: 'Optimised motion envelope', body: 'Parallel-mounted Beckhoff servo motors with integrated brakes deliver responsive and reliable motion.' },
    { n: '05', title: 'Safe operation', body: 'Built-in cushioning system, holding brakes and advanced safety electronics and software.' },
    { n: '06', title: 'Fast commissioning', body: 'Compact subsystem architecture simplifies setup; units arrive completely assembled and tested, engineered for low-interval servicing.' },
  ],
  tr: [
    { n: '01', title: 'Optimum hareket kontrolü', body: 'Özgün hareket işaretleme yazılımı ve tam dijital kontrol ile üstün hassasiyet.' },
    { n: '02', title: 'Sınıfının en iyisi yumuşaklık', body: 'İleri sürtünme kompanzasyonu, bilyalı vida milleri, yağ yağlama ve düşük sürtünmeli keceler ile kesintisiz çalışma.' },
    { n: '03', title: 'Ekonomik ve verimli', body: 'Optimize edilmiş çevrim oranları ve entegre statik kompanzasyon sayesinde düşük enerji tüketimiyle yüksek performans.' },
    { n: '04', title: 'Optimize hareket zarfı', body: 'Paralel montajlı, entegre frenli Beckhoff servo motorlar hızlı ve güvenilir hareket sağlar.' },
    { n: '05', title: 'Güvenli çalışma', body: 'Dahili yastıklama sistemi, tutma frenleri ve ileri güvenlik elektroniği ile yazılımı.' },
    { n: '06', title: 'Hızlı devreye alma', body: 'Kompakt alt sistem mimarisi kurulumu kolaylaştırır; üniteler tamamen monte ve test edilmiş olarak, uzun bakım aralıklarına göre tasarlanmış teslim edilir.' },
  ],
};

export const APPS: Record<Lang, { title: string; body: string }[]> = {
  en: [
    { title: 'Driving simulation', body: 'Cars, trucks, buses, trains, trams and off-road / rough terrain vehicles.' },
    { title: 'Flight simulation', body: 'Small aircraft and light helicopters.' },
    { title: 'Motion rides', body: 'Immersive entertainment and theme park applications.' },
  ],
  tr: [
    { title: 'Sürüş simülasyonu', body: 'Otomobil, kamyon, otobüs, tren, tramvay ve arazi araçları.' },
    { title: 'Uçuş simülasyonu', body: 'Küçük uçaklar ve hafif helikopterler.' },
    { title: 'Hareket platformları', body: 'Eğlence ve tema parkı uygulamaları.' },
  ],
};

export const SUPPLY: Record<Lang, { title: string; body: string }[]> = {
  en: [
    { title: 'Motion base assembly', body: 'Three electric servo motors, motion platform, base frame with integrated floor mounting plates.' },
    { title: 'System electronics', body: 'Drive controllers and power units.' },
    { title: 'Motion computer', body: 'Digital I/O and Ethernet communication interface.' },
    { title: 'Motion control software', body: 'Advanced motion cueing plus ride-file play and replay.' },
    { title: 'User interface', body: 'Menu-driven design with remote access service and diagnostic tools.' },
    { title: 'Cabling and documentation', body: 'Complete wiring for plug-and-play integration; system description, ICD, operating and maintenance manuals.' },
  ],
  tr: [
    { title: 'Hareket tabanı grubu', body: 'Üç elektrikli servo motor, hareket platformu, entegre zemin montaj plakalı taban şasisi.' },
    { title: 'Sistem elektroniği', body: 'Sürücü kontrolörleri ve güç üniteleri.' },
    { title: 'Hareket bilgisayarı', body: 'Dijital G/Ç ve Ethernet haberleşme arayüzü.' },
    { title: 'Hareket kontrol yazılımı', body: 'İleri hareket işaretleme ile kayıt dosyası oynatma ve tekrar oynatma.' },
    { title: 'Kullanıcı arayüzü', body: 'Menü tabanlı tasarım, uzaktan erişim hizmeti ve tanılama araçları.' },
    { title: 'Kablolama ve dokümantasyon', body: 'Tak-çalıştır entegrasyon için eksiksiz kablolama; sistem tanımı, ICD, kullanım ve bakım kılavuzları.' },
  ],
};

export const OPTIONS: Record<Lang, { title: string; body: string }[]> = {
  en: [
    { title: 'Access ramp', body: 'simplifies entry and exit to the simulator' },
    { title: 'Extended motion capability', body: 'upgradeable up to 5 axes' },
    { title: 'Alternative host interfacing', body: 'options such as reflective memory' },
    { title: 'User-tunable software', body: 'customisable motion profiles and parameters' },
    { title: 'Tailor-made motion cueing', body: 'cueing algorithms adapted to customer requirements' },
    { title: 'Motion ride file creation', body: 'custom ride scenarios for training or entertainment' },
    { title: 'On-site services', body: 'assembly, commissioning, fine tuning, maintenance and operator training' },
    { title: 'Payload geometry analysis', body: "envelope study tailored to the customer's payload setup" },
    { title: 'Service and maintenance contracts', body: 'long-term support solutions' },
  ],
  tr: [
    { title: 'Erişim rampası', body: 'simülatöre giriş ve çıkışı kolaylaştırır' },
    { title: 'Genişletilmiş hareket kabiliyeti', body: '5 eksene kadar yükseltilebilir' },
    { title: 'Alternatif ana bilgisayar arayüzü', body: 'reflective memory gibi seçenekler' },
    { title: 'Kullanıcı ayarlı yazılım', body: 'özelleştirilebilir hareket profilleri ve parametreler' },
    { title: 'Özel hareket işaretleme', body: 'müşteri gereksinimlerine uyarlanmış algoritmalar' },
    { title: 'Hareket kayıt dosyası oluşturma', body: 'eğitim veya eğlence için özel senaryolar' },
    { title: 'Sahada hizmetler', body: 'montaj, devreye alma, ince ayar, bakım ve operatör eğitimi' },
    { title: 'Yük geometrisi analizi', body: 'müşterinin yük düzenine göre zarf çalışması' },
    { title: 'Servis ve bakım sözleşmeleri', body: 'uzun vadeli destek çözümleri' },
  ],
};

export interface Variant {
  id: string;
  name: string;
  axes: string;
  body: string;
}

export const VARIANTS: Record<Lang, Variant[]> = {
  en: [
    { id: 'ngs2', name: 'NGS-360-2', axes: '2 axes', body: 'An entry-level version of the NGS line, designed as a lower-cost option that still delivers a highly immersive experience. It focuses on the most critical axes of movement while retaining unlimited rotation, showing how the platform scales down to a more accessible price point.' },
    { id: 'ngs3', name: 'NGS-360-3', axes: '3 axes', body: 'The foundational model in the NGS product line: a three-axis motion system with unlimited rotation capability. More standard than its advanced variants yet highly capable, it is effective wherever rotational cues carry the experience.' },
    { id: 'ngs31', name: 'NGS-360-3+1', axes: '3 axes + heave', body: 'Three axes of unlimited rotation combined with a single axis of translational movement. Adding the Z axis (heave) creates a powerful sensation of flight and ground vehicle movement, more immersive than rotation alone.' },
    { id: 'ngs62', name: 'NGS-360-6+2', axes: '6DOF + 2 axes', body: 'A high-end motion simulator combining two unlimited rotation axes with a high-response six-degrees-of-freedom system, developed for highly realistic training and entertainment applications.' },
  ],
  tr: [
    { id: 'ngs2', name: 'NGS-360-2', axes: '2 eksen', body: 'NGS hattının giriş seviyesi sürümü; daha erişilebilir bir maliyetle yüksek sarmalayıcılık sunar. En kritik hareket eksenlerine odaklanır ve sınırsız dönüş özelliğini korur.' },
    { id: 'ngs3', name: 'NGS-360-3', axes: '3 eksen', body: 'NGS ürün hattının temel modeli: sınırsız dönüş kabiliyetine sahip üç eksenli hareket sistemi. Dönme işaretlerinin deneyimi taşıdığı her uygulamada etkilidir.' },
    { id: 'ngs31', name: 'NGS-360-3+1', axes: '3 eksen + heave', body: 'Üç eksende sınırsız dönüşe tek eksenli ötelenme hareketi eklenir. Z ekseni (heave) ile uçuş ve kara aracı hareketi hissi belirgin şekilde güçlenir.' },
    { id: 'ngs62', name: 'NGS-360-6+2', axes: '6DOF + 2 eksen', body: 'İki sınırsız dönüş eksenini yüksek tepkili altı serbestlik dereceli sistemle birleştiren üst segment simülatör; yüksek gerçekçilik gerektiren eğitim ve eğlence uygulamaları için geliştirilmiştir.' },
  ],
};

export const CREDENTIALS: Record<Lang, { year: string; body: string }[]> = {
  en: [
    { year: '2018', body: 'Founded in Teknopark Ankara Technology Development Zone; first NGS prototype presented in November.' },
    { year: '2019', body: "New Generation Simulator shown for the first time at the 4th Istanbul International Invention Fair, ISIF'19." },
    { year: 'Award', body: "NGS-360-3 awarded the IFIA Best National Invention Medal by the International Federation of Inventors' Associations." },
  ],
  tr: [
    { year: '2018', body: "Teknopark Ankara Teknoloji Geliştirme Bölgesi'nde kuruldu; ilk NGS prototipi Kasım ayında tanıtıldı." },
    { year: '2019', body: "Yeni Nesil Simülatör ilk kez 4. İstanbul Uluslararası Buluş Fuarı ISIF'19'da sergilendi." },
    { year: 'Ödül', body: "NGS-360-3, Uluslararası Buluşçu Dernekleri Federasyonu tarafından IFIA En İyi Ulusal Buluş Madalyası'na değer görüldü." },
  ],
};

export const DIMS: Record<Lang, { label: string; value: string }[]> = {
  en: [
    { label: 'Payload (above platform)', value: '500 kg' },
    { label: 'Approx. unit weight', value: '1800 kg' },
    { label: 'Height', value: '3100 mm' },
    { label: 'Width (X)', value: '3600 mm' },
    { label: 'Width (Y)', value: '3600 mm' },
    { label: 'Area', value: '12 m²' },
    { label: 'Footprint', value: '1800 × 1800 mm' },
  ],
  tr: [
    { label: 'Faydalı yük (platform üstü)', value: '500 kg' },
    { label: 'Yaklaşık ünite ağırlığı', value: '1800 kg' },
    { label: 'Yükseklik', value: '3100 mm' },
    { label: 'Genişlik (X)', value: '3600 mm' },
    { label: 'Genişlik (Y)', value: '3600 mm' },
    { label: 'Alan', value: '12 m²' },
    { label: 'Taban alanı', value: '1800 × 1800 mm' },
  ],
};

export const IFACES: Record<Lang, { label: string }[]> = {
  en: [
    { label: 'Electric power: 220/380 VAC, 50/60 Hz' },
    { label: '4 channel data transfer module (30 A – 380 V)' },
    { label: 'Host computer' },
    { label: 'Ethernet connection' },
    { label: 'Update rate up to 1 GHz' },
  ],
  tr: [
    { label: 'Elektrik beslemesi: 220/380 VAC, 50/60 Hz' },
    { label: '4 kanallı veri transfer modülü (30 A – 380 V)' },
    { label: 'Ana bilgisayar' },
    { label: 'Ethernet bağlantısı' },
    { label: "1 GHz'e kadar güncelleme hızı" },
  ],
};

/* Per-axis electrical draw. The axis labels follow the active language;
   the figures are language-independent. */
export const ELECTRICAL: { power: string; voltage: string }[] = [
  { power: '4600 W', voltage: '380 V – 12 A' },
  { power: '4700 W', voltage: '380 V – 12.4 A' },
  { power: '4600 W', voltage: '380 V – 12 A' },
];

/* Neutral start position the Reset button returns to. */
export const NEUTRAL_POSE: Record<AxisKey, number> = { roll: 18, pitch: 26, yaw: 12 };
