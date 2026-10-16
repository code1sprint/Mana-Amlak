import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle,
  Building,
  KeyRound,
  FileCheck,
  Send,
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { BrandLogo } from '@/src/components/BrandLogo';
import { Hero } from '@/src/components/Hero';
import { PropertyCard } from '@/src/components/PropertyCard';
import { TestimonialsCarousel } from '@/src/components/TestimonialsCarousel';
import { MOCK_PROPERTIES } from '@/src/data/mockProperties';
import { APP_CONFIG } from '@/src/constants/content';

import cardResidenceImage from '@/src/assets/images/card_residence_manor_1792167357090.jpg';
import penthouseElahiehImage from '@/src/assets/images/penthouse_elahieh_1792168520507.jpg';
import villaLavasanImage from '@/src/assets/images/villa_lavasan_1792168520768.jpg';
import manorNiavaranImage from '@/src/assets/images/manor_niavaran_1792168520804.jpg';

export const HomePage: React.FC = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [ownerPhone, setOwnerPhone] = useState('');
  const [estateNeighborhood, setEstateNeighborhood] = useState('نیاوران');

  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.isFeatured).slice(0, 4);

  const categories = [
    {
      title: 'عمارت‌های کوهپایه',
      desc: 'نیاوران، زعفرانیه و سعدآباد',
      count: '۱۲ اثر فعال',
      href: '/properties?neighborhood=نیاوران',
      image: manorNiavaranImage,
    },
    {
      title: 'پنت‌هاوس‌های افق',
      desc: 'الهیه، فرشته و کامرانیه',
      count: '۸ اثر فعال',
      href: '/properties?neighborhood=الهیه',
      image: penthouseElahiehImage,
    },
    {
      title: 'باغ‌ویلاهای خصوصی',
      desc: 'لواسانات، باستی و فشم',
      count: '۹ اثر فعال',
      href: '/properties?neighborhood=لواسان',
      image: villaLavasanImage,
    },
    {
      title: 'خانه‌های حیاط‌دار اصیل',
      desc: 'دروس، فرمانیه و محمودیه',
      count: '۵ اثر فعال',
      href: '/properties?neighborhood=دروس',
      image: cardResidenceImage,
    },
  ];

  const handleRegisterEstate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerPhone) return;
    setSubmissionSuccess(true);
  };

  return (
    <div className="min-h-screen bg-cream-canvas text-warm-charcoal font-body antialiased selection:bg-teal selection:text-white flex flex-col">
      {/* 1. Header with transparent-to-cream scroll effect & mobile drawer */}
      <Header />

      <main className="flex-1">
        {/* 2. Hero Slice */}
        <Hero />

        {/* 3. Categories Section with Arch Top Vault Frames */}
        <section className="py-20 lg:py-28 border-t border-warm-hairline">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-warm-hairline">
              <div>
                <span className="text-xs font-mono text-teal block mb-2">
                  گونه‌شناسی فضایی
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-bold text-warm-charcoal tracking-tight">
                  دسته‌بندی آثار بر پایه طبع زیست
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-warm-muted max-w-md">
                خانه‌هایی که بر اساس موقعیت اقلیمی، میزان نفوذ نور و ساختار کالبدی تفکیک شده‌اند.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.title}
                  to={cat.href}
                  className="group flex flex-col bg-cream-card rounded-editorial-xl border border-warm-hairline overflow-hidden hover:border-warm-muted/40 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Image with Arch top vault */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-surface rounded-t-[100px] p-2">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-t-[92px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-cream-canvas/90 backdrop-blur-sm rounded-full text-[11px] font-medium text-warm-charcoal border border-warm-hairline">
                      {cat.count}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-display font-bold text-warm-charcoal group-hover:text-teal transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-warm-muted mt-1">{cat.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-warm-hairline flex items-center justify-between text-xs text-teal font-medium">
                      <span>کاوش مجموعه</span>
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Featured Properties — brick / running-bond grid */}
        <section id="residences" className="py-20 lg:py-28 bg-cream-surface/30 border-t border-warm-hairline">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-teal mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>گزیدهٔ شاخص پاییز ۱۴۰۴</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-warm-charcoal tracking-tight">
                  فایل‌های ویژه با شناسنامه معماری
                </h2>
              </div>

              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-olive-dark hover:bg-olive-deep text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors self-start md:self-auto"
              >
                <span>مشاهده تمام ۲۴ عمارت</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Brick / running-bond grid: alternating wide ↔ narrow spans */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
              {featuredProperties.map((property, index) => {
                const brickLayout = [
                  { span: 'md:col-span-7', variant: 'wide' as const },
                  { span: 'md:col-span-5', variant: 'tall' as const },
                  { span: 'md:col-span-5', variant: 'tall' as const },
                  { span: 'md:col-span-7', variant: 'wide' as const },
                ][index];

                return (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    title={property.title}
                    subtitle={property.subtitle}
                    location={property.neighborhood}
                    area={`${property.area} متر مربع`}
                    rooms={`${property.bedrooms} خواب مستر`}
                    year={`ساخت ${property.yearBuilt}`}
                    priceLabel="ارزش کارشناسی"
                    priceValue={property.priceFormatted}
                    image={property.image}
                    badge={index === 0 ? 'اثر برگزیده فصل' : undefined}
                    variant={brickLayout.variant}
                    className={brickLayout.span}
                  />
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. Dark Olive "Why Us" Section with Big Editorial Numbers */}
        <section className="py-24 lg:py-32 bg-olive-dark text-cream-canvas border-y border-olive-deep">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            
            {/* Section Lead */}
            <div className="max-w-3xl mb-16 sm:mb-20">
              <span className="text-xs font-mono text-teal-light block mb-3">
                منشور و اصول مانا
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6 leading-tight">
                چرا خریداران و مالکان صاحب‌نام به کارگزاری مانا اعتماد می‌کنند؟
              </h2>
              <p className="text-base sm:text-lg text-cream-canvas/80 leading-relaxed font-light">
                در آشفته‌بازار ساخت‌وسازهای غیرپایدار، مانا به عنوان مرجع حقیقت‌سنجی معماری شمیرانات عمل می‌کند. هر اثری که در این مجله معرفی می‌شود، از فیلترهای فنی، حقوقی و اقلیمی عبور کرده است.
              </p>
            </div>

            {/* 4 Pillars with Huge Editorial Numerals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-olive-hairline">
              
              <div className="pt-6 md:pt-0">
                <span className="text-4xl sm:text-6xl font-display font-bold text-teal-light block mb-3 tabular-nums">
                  ۱۰۰٪
                </span>
                <h3 className="text-lg font-display font-bold mb-2">
                  شفافیت اسناد و اصالت ریشه
                </h3>
                <p className="text-xs sm:text-sm text-cream-canvas/70 leading-relaxed">
                  بررسی سه‌مرحله‌ای سوابق ثبتی و استعلامات رسمی دادگستری پیش از پذیرش فایل؛ هیچ ملکی با پرونده مبهم پذیرفته نمی‌شود.
                </p>
              </div>

              <div className="pt-6 md:pt-0 md:pr-8">
                <span className="text-4xl sm:text-6xl font-display font-bold text-teal-light block mb-3 tabular-nums">
                  ۱۲ سال
                </span>
                <h3 className="text-lg font-display font-bold mb-2">
                  تمرکز انحصاری در منطقه ۱ و لواسان
                </h3>
                <p className="text-xs sm:text-sm text-cream-canvas/70 leading-relaxed">
                  شناخت عمیق کوچه به کوچه بافت تاریخی و نوساز شمیرانات؛ اشراف کامل بر معماران و ضوابط ساخت پایدار البرز.
                </p>
              </div>

              <div className="pt-6 md:pt-0 md:pr-8">
                <span className="text-4xl sm:text-6xl font-display font-bold text-teal-light block mb-3 tabular-nums">
                  ۳ مرحله
                </span>
                <h3 className="text-lg font-display font-bold mb-2">
                  ممیزی کیفی سازه و کالبد
                </h3>
                <p className="text-xs sm:text-sm text-cream-canvas/70 leading-relaxed">
                  کارشناسی عایق‌بندی صوتی، تست تأسیسات هیدرولیک و بررسی استاندارد ورود نور طبیعی توسط تیم مهندسی مانا.
                </p>
              </div>

              <div className="pt-6 md:pt-0 md:pr-8">
                <span className="text-4xl sm:text-6xl font-display font-bold text-teal-light block mb-3 tabular-nums">
                  ۹۸٪
                </span>
                <h3 className="text-lg font-display font-bold mb-2">
                  وفاداری و ارجاع خانواده‌ها
                </h3>
                <p className="text-xs sm:text-sm text-cream-canvas/70 leading-relaxed">
                  رویکرد بدون شتاب‌زدگی و احترام به وقت طرفین؛ جلسات مذاکره در فضایی صمیمی، محرمانه و با آرامش کامل.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* 6. Testimonials Carousel (Embla Carousel RTL) */}
        <TestimonialsCarousel />

        {/* 7. Property Registration / Appraisal CTA Section */}
        <section className="py-20 lg:py-28 bg-cream-canvas border-t border-warm-hairline">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="bg-cream-surface/60 rounded-editorial-xl border border-warm-hairline p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
              
              <div className="max-w-xl">
                <span className="text-xs font-mono text-teal block mb-2">
                  سپردن و ارزش‌گذاری اثر
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-bold text-warm-charcoal mb-4 leading-tight">
                  عمارت یا ویلای خود را به کارگزاری مانا بسپارید
                </h2>
                <p className="text-sm text-warm-muted leading-relaxed mb-6">
                  اگر صاحب عمارتی اصیل یا سازه‌ای با معماری شاخص در شمیرانات و لواسان هستید، کارشناسان ما آماده تهیه شناسنامه رسمی و معرفی به جامعهٔ خریداران فرهیخته مانا هستند.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-warm-charcoal font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    <span>عکاسی ژورنالی اختصاصی</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    <span>حفظ کامل محرمانگی مالکیت</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    <span>کارشناسی قیمت منطقی</span>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="w-full lg:max-w-md bg-cream-card rounded-editorial-lg border border-warm-hairline p-6 sm:p-8 shadow-sm">
                {submissionSuccess ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-display font-bold text-warm-charcoal">
                      درخواست شما با موفقیت ثبت شد
                    </h3>
                    <p className="text-xs text-warm-muted">
                      کارشناس ارشد ارزیابی مانا ظرف ۲۴ ساعت آینده جهت بازدید اولیه با شما تماس می‌گیرد.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterEstate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-warm-charcoal mb-1">
                        شماره تماس مالک یا نماینده رسمی
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-cream-surface/50 text-warm-charcoal placeholder:text-warm-faded text-sm rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-warm-charcoal mb-1">
                        محله استقرار ملک
                      </label>
                      <select
                        value={estateNeighborhood}
                        onChange={(e) => setEstateNeighborhood(e.target.value)}
                        className="w-full px-4 py-3 bg-cream-surface/50 text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                      >
                        <option value="نیاوران">نیاوران و صاحبقرانیه</option>
                        <option value="زعفرانیه">زعفرانیه و محمودیه</option>
                        <option value="الهیه">الهیه و فرشته</option>
                        <option value="کامرانیه">کامرانیه و فرمانیه</option>
                        <option value="لواسان">لواسانات و فشم</option>
                        <option value="سایر">سایر مناطق منطقه ۱</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>درخواست ارزیابی و ثبت در مانا</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-warm-hairline bg-cream-canvas py-14">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <BrandLogo asLink={false} alt="" imgClassName="h-16 sm:h-20 w-auto" />
                <span className="text-xl sm:text-2xl font-display font-bold text-warm-charcoal">
                  {APP_CONFIG.agencyName}
                </span>
              </div>
              <p className="text-xs text-warm-muted leading-relaxed max-w-sm mb-4">
                مجله و کارگزاری معماری املاک مانا؛ کشف و واگذاری خانه‌های با اصالت، ویلاهای معاصر و عمارت‌های پایدار در شمیرانات و لواسان.
              </p>
              <span className="text-xs text-warm-faded block">
                {APP_CONFIG.officeAddress}
              </span>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm text-warm-charcoal mb-3">
                دسته‌بندی‌ها و صفحات
              </h4>
              <ul className="space-y-2 text-xs text-warm-muted">
                <li><Link to="/properties" className="hover:text-teal transition-colors">فهرست تمام فایل‌ها</Link></li>
                <li><Link to="/about" className="hover:text-teal transition-colors">روایت و داستان مانا (درباره ما)</Link></li>
                <li><Link to="/agents" className="hover:text-teal transition-colors">تیم کارشناسان و معماران</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm text-warm-charcoal mb-3">
                ارتباط با کارگزاری
              </h4>
              <ul className="space-y-2 text-xs text-warm-muted">
                <li>شماره مستقیم: {APP_CONFIG.contactPhone}</li>
                <li>رایانامه: {APP_CONFIG.contactEmail}</li>
                <li>ساعات مراجعه: ۹:۰۰ الی ۱۸:۰۰ (با هماهنگی قبلی)</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-warm-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-faded">
            <span>© ۱۴۰۴ کارگزاری و خانه معماری مانا — تمامی حقوق محفوظ است.</span>
            <span>طراحی شده بر اساس مبانی معماری گرم و اصیل</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
