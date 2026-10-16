import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldAlert,
} from 'lucide-react';
import L from 'leaflet';
import { Header } from '@/src/components/Header';
import { FormField } from '@/src/components/FormField';
import { ContactFormData, ContactFormSchema, submitContactInquiry } from '@/src/api/submissions';
import { APP_CONFIG } from '@/src/constants/content';
import { useToast } from '@/src/context/ToastContext';

export const ContactPage: React.FC = () => {
  const toast = useToast();
  const [submittedTracking, setSubmittedTracking] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      subject: 'مشاوره خرید عمارت',
      message: '',
      honeypot: '', // Honeypot starts empty
    },
  });

  // Initialize office location map (Zaferanieh / Asaf)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Zaferanieh coordinates
    const map = L.map(mapContainerRef.current, {
      center: [35.8115, 51.4210],
      zoom: 15,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: 'price-marker-container',
      html: `
        <div class="price-bubble price-bubble-hovered">
          <span>دفتر مرکزی مانا</span>
        </div>
      `,
      iconSize: [110, 30],
      iconAnchor: [55, 15],
    });

    L.marker([35.8115, 51.4210], { icon })
      .addTo(map)
      .bindPopup(
        '<div style="direction:rtl; font-family:var(--font-body); padding:6px; font-size:12px;"><strong>عمارت مانا</strong><br/>خیابان آصف، پلاک ۱۸</div>'
      )
      .openPopup();

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await submitContactInquiry(data);
      setSubmittedTracking(res.trackingCode);
      toast.success(
        `پیام شما با شماره پیگیری ${res.trackingCode} ثبت شد. کارشناسان ظرف ۲ ساعت با شما تماس خواهند گرفت.`
      );
      reset();
    } catch (err: any) {
      toast.error(err.message || 'متاسفانه در ارسال پیام خطایی رخ داد.');
    }
  };

  return (
    <div className="min-h-screen bg-cream-canvas text-warm-charcoal font-body antialiased selection:bg-teal selection:text-white flex flex-col">
      <Helmet>
        <title>ارتباط با کارگزاری مانا | دفتر شمیرانات و زعفرانیه</title>
        <meta
          name="description"
          content="راه‌های ارتباط با کارشناسان و معماران مانا؛ دفتر مرکزی زعفرانیه، شماره تماس مستقیم، واتساپ و فرم هماهنگی جلسه حضوری."
        />
      </Helmet>

      <Header />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-36 pb-24 max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16">
        
        {/* Title Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono text-teal block mb-2">
            درگاه ارتباطی
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-warm-charcoal tracking-tight mb-4">
            گفتگو درباره خانه و معماری
          </h1>
          <p className="text-base sm:text-lg text-warm-muted leading-relaxed font-light">
            درهای عمارت مانا همواره به روی علاقه‌مندان به معماری بااصالت و متقاضیان سکونت پایدار در شمیرانات گشوده است.
          </p>
        </div>

        {/* 2-Column Split: Contact Info & Map (5 cols) + Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Right Column (in RTL): Contact Info Cards & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-cream-card rounded-editorial-xl border border-warm-hairline p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-display font-bold text-warm-charcoal pb-4 border-b border-warm-hairline">
                اطلاعات دفتر مرکزی
              </h2>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal shrink-0 mt-1" />
                  <div>
                    <span className="text-warm-faded block text-xs mb-0.5">نشانی کارگزاری:</span>
                    <span className="text-warm-charcoal font-medium leading-relaxed">
                      {APP_CONFIG.officeAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-teal shrink-0 mt-1" />
                  <div>
                    <span className="text-warm-faded block text-xs mb-0.5">خط تلفن مستقیم:</span>
                    <a
                      href={`tel:${APP_CONFIG.contactPhone}`}
                      className="text-warm-charcoal font-mono font-bold hover:text-teal transition-colors"
                    >
                      {APP_CONFIG.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-teal shrink-0 mt-1" />
                  <div>
                    <span className="text-warm-faded block text-xs mb-0.5">رایانامه رسمی:</span>
                    <a
                      href={`mailto:${APP_CONFIG.contactEmail}`}
                      className="text-warm-charcoal font-mono hover:text-teal transition-colors"
                    >
                      {APP_CONFIG.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-teal shrink-0 mt-1" />
                  <div>
                    <span className="text-warm-faded block text-xs mb-0.5">ساعات پذیرایی حضوری:</span>
                    <span className="text-warm-charcoal">
                      شنبه تا پنج‌شنبه: ۹:۰۰ الی ۱۸:۰۰ (با هماهنگی قبلی)
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action Button */}
              <div className="pt-4 border-t border-warm-hairline">
                <a
                  href="https://wa.me/989123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-editorial-sm text-xs font-medium transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>گفتگوی فوری در واتساپ (پاسخگویی سریع)</span>
                </a>
              </div>
            </div>

            {/* Embedded Office Map */}
            <div className="rounded-editorial-xl overflow-hidden border border-warm-hairline h-64 shadow-inner relative">
              <div ref={mapContainerRef} className="w-full h-full" />
            </div>

          </div>

          {/* Left Column (in RTL): Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-cream-card rounded-editorial-xl border border-warm-hairline p-8 sm:p-10 shadow-[0_16px_40px_-20px_rgba(31,27,22,0.08)]">
              
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-warm-charcoal mb-2">
                  ارسال پیام یا درخواست مشاوره
                </h2>
                <p className="text-xs text-warm-muted leading-relaxed">
                  فرم زیر مستقیماً به دفتر ارزیابی و ارتباطات مانا ارسال شده و ظرف حداکثر ۲ ساعت بررسی خواهد شد.
                </p>
              </div>

              {submittedTracking && (
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-editorial-md mb-6 flex items-start gap-3 text-emerald-950">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <span className="font-bold block">پیام شما با موفقیت به کارگزاری مانا تحویل گردید.</span>
                    <p className="text-emerald-800">
                      شماره پیگیری انحصاری: <strong className="font-mono text-emerald-950">{submittedTracking}</strong>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-right">
                
                {/* Honeypot Field (Hidden from real users, caught by spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp_field">لطفاً این فیلد را خالی بگذارید</label>
                  <input
                    id="hp_field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('honeypot')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="نام و نام خانوادگی شما"
                    placeholder="مثال: مهندس رادمهر"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                  />

                  <FormField
                    label="شماره تلفن همراه"
                    dir="ltr"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="پست الکترونیکی (اختیاری)"
                    type="email"
                    placeholder="name@domain.com"
                    dir="ltr"
                    {...register('email')}
                    error={errors.email?.message}
                  />

                  <div className="flex flex-col gap-1.5 text-right">
                    <label className="text-xs sm:text-sm font-medium text-warm-charcoal">
                      موضوع گفتگو
                    </label>
                    <select
                      {...register('subject')}
                      className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs sm:text-sm rounded-editorial-sm border border-warm-border focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none"
                    >
                      <option value="مشاوره خرید عمارت">مشاوره خرید عمارت و ویلا</option>
                      <option value="سپردن و فروش ملک">ارزیابی و سپردن ملک برای واگذاری</option>
                      <option value="رهن و اجاره بااصالت">رهن و اجاره املاک شاخص</option>
                      <option value="استعلام حقوقی سند">درخواست بررسی و استعلام حقوقی</option>
                      <option value="سایر موضوعات">سایر موارد و پیشنهادات</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs sm:text-sm font-medium text-warm-charcoal">
                    متن پیام یا توضیحات خواسته شما
                  </label>
                  <textarea
                    rows={4}
                    placeholder="خواسته یا مشخصات ملک مورد نظرتان را برای ما شرح دهید..."
                    {...register('message')}
                    className={`w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs sm:text-sm rounded-editorial-sm border transition-colors focus:outline-none focus:ring-1 ${
                      errors.message
                        ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                        : 'border-warm-border focus:border-teal focus:ring-teal'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-600 mt-0.5">{errors.message.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm text-sm font-medium transition-all shadow-md active:scale-98 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>در حال ارسال پیام به دفتر مانا...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ارسال پیام رسمی و محرمانه</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </main>

      <footer className="border-t border-warm-hairline bg-cream-canvas py-10 text-xs text-warm-muted text-center">
        <span>املاک مانا · دفتر مرکزی شمیرانات، زعفرانیه</span>
      </footer>
    </div>
  );
};

export default ContactPage;
