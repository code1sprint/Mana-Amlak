import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote, ChevronRight, ChevronLeft } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  context: string;
  year: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'در بازار املاک شمیرانات، همه از متراژ و سنگ ایتالیایی حرف می‌زنند؛ اما مانا از نور، آرامش زیست و پیوند کالبد خانه با طبیعت گفت. همراهی تیم مانا نه یک معامله، بلکه یک سلوک زیباشناختی بود.',
    author: 'دکتر هومن شریفی',
    role: 'جراح قلب و مجموعه‌دار آثار هنری',
    context: 'خریدار عمارت باغ‌سرا در نیاوران',
    year: 'پاییز ۱۴۰۲',
  },
  {
    quote:
      'آنچه مانا را متمایز می‌کند، شجاعت در گفتن نقص‌های یک سازه است. مهندس رادمنش در همان بازدید اول، نقاط ضعف نورگیری غربی را صریحاً گوشزد کرد. این شفافیت و پایبندی به اخلاق حرفه‌ای را در هیچ کارگزاری دیگری ندیدم.',
    author: 'مهندس پروانه ارجمند',
    role: 'مؤسس استودیو معماری منظر افق',
    context: 'خریدار پنت‌هاوس چشم‌انداز البرز در فرشته',
    year: 'بهار ۱۴۰۳',
  },
  {
    quote:
      'برای واگذاری باغ‌ویلای خانوادگی در لواسان، نگران حفظ حریم شخصی و اصالت حقوقی خریدار بودیم. نظارت حقوقی دکتر افشار و چینش اختصاصی مشتریان صاحب‌نام، معامله‌ای بی‌دغدغه و با وقار رقم زد.',
    author: 'فرهاد معتمدی',
    role: 'مدیر ارشد هلدینگ سرمایه‌گذاری سپهر',
    context: 'واگذارکننده ویلا‌عمارت صخره در لواسان',
    year: 'زمستان ۱۴۰۲',
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: 'rtl', loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 lg:py-28 bg-cream-surface/30 border-t border-warm-hairline overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-warm-hairline">
          <div>
            <span className="text-xs font-mono text-teal block mb-2">
              روایت همراهان و مالکان
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-warm-charcoal tracking-tight">
              تجربهٔ اعتماد در کلام خانواده‌های مانا
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              className="p-3 rounded-full border border-warm-hairline bg-cream-card hover:bg-cream-surface text-warm-charcoal transition-colors"
              aria-label="نقل‌قول قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="p-3 rounded-full border border-warm-hairline bg-cream-card hover:bg-cream-surface text-warm-charcoal transition-colors"
              aria-label="نقل‌قول بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mr-6">
            {TESTIMONIALS.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] lg:flex-[0_0_85%] xl:flex-[0_0_75%] min-w-0 pr-6"
              >
                <div className="bg-cream-card rounded-editorial-xl border border-warm-hairline p-8 sm:p-12 relative flex flex-col justify-between h-full shadow-[0_16px_36px_-24px_rgba(31,27,22,0.08)]">
                  <Quote className="w-10 h-10 text-teal/20 mb-6 shrink-0" />

                  {/* Huge Editorial Pull-Quote */}
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-warm-charcoal leading-[1.6] sm:leading-[1.7] mb-8 text-pretty">
                    «{item.quote}»
                  </blockquote>

                  {/* Author Attribution */}
                  <div className="pt-6 border-t border-warm-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-display font-bold text-base text-warm-charcoal block">
                        {item.author}
                      </span>
                      <span className="text-warm-muted">{item.role}</span>
                    </div>

                    <div className="text-right sm:text-left">
                      <span className="text-teal font-medium block">
                        {item.context}
                      </span>
                      <span className="text-warm-faded font-mono">{item.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? 'w-8 bg-teal' : 'w-2 bg-warm-hairline'
              }`}
              aria-label={`اسلاید ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
