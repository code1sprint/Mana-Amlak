import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Compass,
  ShieldCheck,
  Award,
  Sparkles,
  TreePine,
  Sun,
  FileCheck,
  Building2,
  ArrowLeft,
  Phone,
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { AGENTS } from '@/src/data/agents';
import { APP_CONFIG } from '@/src/constants/content';

import heroVillaImage from '@/src/assets/images/hero_villa_arch_1792167356858.jpg';
import cardInteriorImage from '@/src/assets/images/card_interior_detail_1792167357024.jpg';
import manorNiavaranImage from '@/src/assets/images/manor_niavaran_1792168520804.jpg';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-canvas text-warm-charcoal font-body antialiased selection:bg-teal selection:text-white flex flex-col">
      <Helmet>
        <title>درباره کارگزاری و مجله معماری مانا | داستان اصالت در شمیرانات</title>
        <meta
          name="description"
          content="داستان شکل‌گیری املاک مانا؛ روایتی از بازگشت به ریشه‌های اصیل سکونت، ارزش‌های معماری پایدار و همراهی معماران و کارشناسان رسمی دادگستری."
        />
      </Helmet>

      <Header />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-36 pb-24">
        {/* Magazine Cover Article Header */}
        <article className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2 text-xs font-mono text-teal mb-4">
              <Compass className="w-4 h-4" />
              <span>مقاله اختصاصی مانا · شماره پاییز ۱۴۰۴</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-warm-charcoal tracking-tight leading-[1.2] mb-6">
              روایت مانا؛ خانه‌ای که در آن معماری و انسان به هم می‌رسند
            </h1>

            <p className="text-lg sm:text-xl text-warm-muted leading-relaxed font-light">
              چرا در دورانی که ساختمان‌ها به کالاهای مالی زودگذر تبدیل شده‌اند، ما ایستاده‌ایم تا از «اصالت سکنا» و پناهگاه روحی خانواده‌ها دفاع کنیم؟
            </p>
          </div>

          {/* Full-bleed Editorial Hero Photography with Arch Vault */}
          <div className="relative aspect-[16/9] w-full rounded-editorial-xl overflow-hidden border border-warm-hairline mb-16 shadow-lg bg-cream-surface">
            <img
              src={manorNiavaranImage}
              alt="عمارت سنتی معاصر مانا با طاق‌های آجری و آب‌نما"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-warm-charcoal/80 via-warm-charcoal/30 to-transparent text-cream-canvas">
              <p className="text-xs sm:text-sm font-medium">
                دفتر مرکزی و خانه معماری مانا — شمیرانات، باغ آصف، پلاک ۱۸
              </p>
            </div>
          </div>

          {/* Article Columns (Disciplined Editorial Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-8 text-base sm:text-lg text-warm-muted leading-[2] font-normal space-y-6 max-w-[68ch]">
              <p className="first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:float-right first-letter:ml-3 first-letter:text-teal">
                داستان مانا از یک دلتنگی آغاز شد؛ دلتنگی برای خانه‌هایی که در کودکی در آن‌ها قد کشیدیم. خانه‌هایی با ایوان‌های پهن در دامنه‌های شمیران، بوی کاهگل خیس‌خورده پس از باران پاییزی، و حوض‌هایی که آسمان آبی را در قلب حیاط بازتاب می‌دادند. در سال‌های اخیر، تب تند ساخت‌وسازهای عجولانه و سنگ‌های صیقلی سرد، مفهوم «خانه» را تقلیل داد به انباشتی از مترمربع‌های بی‌روح.
              </p>

              <blockquote className="my-8 p-6 sm:p-8 bg-cream-surface/60 rounded-editorial-lg border-r-4 border-teal text-warm-charcoal font-display font-medium text-xl leading-relaxed">
                «ما معتقدیم خانه صرفاً چهاردیواری و سقفی برای حفظ از سرما و گرما نیست؛ خانه گسترش کالبدی روح ساکنان آن است.»
              </blockquote>

              <p>
                املاک مانا در سال ۱۳۹۰ توسط جمعی از دانش‌آموختگان معماری دانشگاه تهران و کارشناسان رسمی حوزه املاک تأسیس شد. هدف ما از روز نخست روشن بود: نه تبدیل شدن به یک بنگاه معاملات ملکی پرهیاهو، بلکه ساختن یک **«مجله و کارگزاری گزینشی»** که تنها سازه‌های دارای هویت اصیل، نورگیری علمی و سندیت حقوقی بی‌نقص را به خریداران اهل هنر و فرهنگ معرفی کند.
              </p>

              <p>
                امروز پس از بیش از یک دهه فعالیت پیوسته، کاتالوگ مانا نماینده پایدارترین و چشم‌نوازترین عمارت‌ها و ویلاهای شمیرانات و لواسانات است. هر اثری که در فهرست ما جای می‌گیرد، روزها توسط تیم فنی، آکوستیک و حقوقی ما پیمایش و ارزیابی می‌شود.
              </p>
            </div>

            {/* Sidebar Editorial Note & Detail Image */}
            <div className="lg:col-span-4 space-y-8">
              <div className="rounded-editorial-lg overflow-hidden border border-warm-hairline aspect-[4/5] bg-cream-surface shadow-sm">
                <img
                  src={cardInteriorImage}
                  alt="جزئیات مصالح ارگانیک"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-cream-card rounded-editorial-lg border border-warm-hairline p-6 text-xs text-warm-muted leading-relaxed">
                <span className="font-display font-bold text-sm text-warm-charcoal block mb-2">
                  شناسنامه گزینش مانا
                </span>
                از هر ۱۰۰ پرونده ملکی ارائه‌شده به کارگزاری مانا، تنها حدود ۶ فایل به دلیل رعایت کامل استانداردهای سازه، نور و اصالت حقوقی وارد کاتالوگ عمومی و خصوصی ما می‌شوند.
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <section className="py-16 border-t border-warm-hairline">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono text-teal block mb-2">
                اصول بنیادین
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-warm-charcoal">
                ارزش‌هایی که هرگز بر سر آن‌ها معامله نمی‌کنیم
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: TreePine,
                  title: 'پیوند با خاک و طبیعت',
                  desc: 'حضور درخت، تهویه آزاد کوهستان و امتداد فضای سبز به داخل فضاهای زیستی روزمره.',
                },
                {
                  icon: Sun,
                  title: 'محاسبه مسیر تابش نور',
                  desc: 'پرهیز از سازه‌های تاریک و محصور؛ نور طبیعی سرمایه غیرقابل جایگزین نشاط جان است.',
                },
                {
                  icon: ShieldCheck,
                  title: 'شفافیت و وسواس حقوقی',
                  desc: 'تایید اصالت سند، عدم ریشه‌های پرریسک ثبتی و استعلامات متقن توسط کارشناسان رسمی دادگستری.',
                },
                {
                  icon: Compass,
                  title: 'همراهی بدون شتاب‌زدگی',
                  desc: 'ما شما را برای تصمیم‌گیری تحت فشار زمانی قرار نمی‌دهیم؛ خرید خانه نیازمند تعمق و آرامش است.',
                },
              ].map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="p-6 bg-cream-card rounded-editorial-lg border border-warm-hairline flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-cream-surface text-teal flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-display font-bold text-warm-charcoal mb-2">
                        {val.title}
                      </h3>
                      <p className="text-xs text-warm-muted leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Advisory & Leadership Team */}
          <section className="py-16 border-t border-warm-hairline">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono text-teal block mb-2">
                  سرمایه انسانی مانا
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-bold text-warm-charcoal">
                  معماران، کارشناسان و هدایت‌گران مانا
                </h2>
              </div>
              <Link
                to="/agents"
                className="text-xs font-medium text-warm-muted hover:text-warm-charcoal flex items-center gap-1.5 transition-colors"
              >
                <span>مشاهده پروفایل کامل و راه‌های تماس</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {AGENTS.map((agent) => (
                <Link
                  key={agent.id}
                  to={`/agents/${agent.id}`}
                  className="group bg-cream-card rounded-editorial-xl border border-warm-hairline overflow-hidden hover:border-warm-muted/40 transition-all hover:shadow-lg flex flex-col"
                >
                  <div className="aspect-square w-full overflow-hidden bg-cream-surface">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-teal block mb-1">
                        {agent.role}
                      </span>
                      <h3 className="text-lg font-display font-bold text-warm-charcoal group-hover:text-teal transition-colors mb-2">
                        {agent.name}
                      </h3>
                      <p className="text-xs text-warm-muted leading-relaxed line-clamp-2">
                        {agent.bio}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-warm-hairline flex items-center justify-between text-xs text-warm-muted">
                      <span>{agent.propertyIds.length} اثر تحت نظارت</span>
                      <span className="text-teal font-medium flex items-center gap-1">
                        <span>مشاهده پرونده‌ها</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Licenses & Official Accreditations */}
          <section className="py-16 border-t border-warm-hairline">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-mono text-teal block mb-2">
                اعتبار قانونی و مجوزها
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-charcoal">
                پروانه‌های رسمی و تاییدیه‌های حاکمیتی
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  code: 'شناسه صنفی: ۱۸۴۹۲۰۳',
                  title: 'پروانه تخصصی درجه یک اتحادیه املاک',
                  org: 'اتحادیه صنف مشاوران املاک تهران (منطقه ۱)',
                },
                {
                  code: 'کد کارشناسی: ۹۸۴۲',
                  title: 'عضویت کانون کارشناسان رسمی دادگستری',
                  org: 'رشته راه و ساختمان و ارزیابی املاک',
                },
                {
                  code: 'گواهینامه: ISO 9001-2022',
                  title: 'استاندارد بین‌المللی رضایت مشتریان و کیفیت ممیزی',
                  org: 'ممیزی شده در حوزه کارگزاری‌های تخصصی ابنیه',
                },
                {
                  code: 'شماره عضویت: ۳۳۰۱',
                  title: 'عضو پیوسته انجمن مفاخر معماری ایران',
                  org: 'کمیته احیا و حفاظت از بافت معاصر شمیرانات',
                },
              ].map((lic) => (
                <div
                  key={lic.title}
                  className="p-5 rounded-editorial-lg bg-cream-surface/40 border border-warm-hairline flex flex-col justify-between"
                >
                  <div>
                    <Award className="w-6 h-6 text-teal mb-3" />
                    <span className="text-[10px] font-mono text-warm-faded block mb-1">
                      {lic.code}
                    </span>
                    <h4 className="text-sm font-display font-bold text-warm-charcoal mb-2">
                      {lic.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-warm-muted pt-3 border-t border-warm-hairline mt-2">
                    {lic.org}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-warm-hairline bg-cream-canvas py-12 text-xs text-warm-muted">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>املاک مانا — خانهٔ معماری و زیست اصیل شمیرانات</span>
          <Link to="/" className="text-teal hover:underline">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
