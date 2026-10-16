/**
 * Constants and text strings for the Mana Real Estate Architectural Magazine App.
 * Strict adherence to no hardcoded text in components.
 */

import heroVillaImage from '@/src/assets/images/hero_villa_arch_1792167356858.jpg';

export const APP_CONFIG = {
  agencyName: 'املاک مانا',
  agencySubtitle: 'املاک و عمارت‌های سنتی',
  city: 'شمیرانات و تهران',
  contactPhone: '۰۲۱-۲۲۰۰۳۳۴۴',
  contactEmail: 'contact@mana-arch.ir',
  officeAddress: 'تهران، زعفرانیه، خیابان آصف، عمارت مانا، پلاک ۱۸',
};

export const NAV_LINKS = [
  { label: 'فهرست عمارت‌ها', href: '/properties' },
  { label: 'سپردن و ثبت ملک', href: '/submit-property' },
  { label: 'روایت مانا (درباره ما)', href: '/about' },
  { label: 'مشاوران معماری', href: '/agents' },
  { label: 'تماس با کارگزاری', href: '/contact' },
];

export const HERO_CONTENT = {
  kicker: 'مجموعه پاییز ۱۴۰۴ — شمیرانات و لواسان',
  headlinePart1: 'معماری اصیل، برای جان‌هایی که به دنبال',
  headlineHighlight: 'آرامش و وقار',
  headlinePart2: 'می‌گردند',
  subtitle:
    'املاک مانا گزیده‌ای انحصاری از عمارت‌های اصیل، ویلاهای معاصر و فضاهای زیستی دست‌ساز در دامنه‌های البرز است؛ خانه‌هایی که با زمان پیوند خورده‌اند و روایتگر آرامش پایدارند.',
  primaryCta: 'کاوش عمارت‌های منتخب',
  secondaryCta: 'درخواست گفتگوی خصوصی',
  stats: [
    { value: '۳۴', label: 'عمارت با شناسنامه معماری', unit: 'اثر فعال' },
    { value: '۱۲', label: 'سال سابقه گزینش و کارگزاری', unit: 'سال' },
    { value: '۹۸٪', label: 'رضایت خانواده‌های مانا', unit: 'شاخص وفاداری' },
    { value: '۱۴', label: 'جایزه و افتخار ملی طراحی', unit: 'تقدیرنامه' },
  ],
  heroImage: {
    src: heroVillaImage,
    alt: 'عمارت باغ‌ویلا در شمیرانات با قوس‌های آجری دست‌چین و استخر انعکاس آب',
    caption: 'عمارت کوهپایه، زعفرانیه — معمار: استودیو مانا، متراژ ۱٬۲۵۰ متر مربع',
  },
};
