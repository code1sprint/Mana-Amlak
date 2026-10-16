import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, MessageCircle, Calendar, Clock, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { Advisor, BookingRequest, BookingRequestSchema } from '@/src/types/property';
import { FormField } from '@/src/components/FormField';

interface PropertyContactCardProps {
  advisor: Advisor;
  propertyTitle: string;
  propertyId: string;
  onSuccess?: () => void;
}

export const PropertyContactCard: React.FC<PropertyContactCardProps> = ({
  advisor,
  propertyTitle,
  propertyId,
  onSuccess,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingRequest>({
    resolver: zodResolver(BookingRequestSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      preferredDate: 'فردا (عصر)',
      preferredTime: '۱۶:۰۰ الی ۱۸:۰۰',
      notes: '',
    },
  });

  const onSubmit = async (data: BookingRequest) => {
    // Simulate API reservation submission delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    const refCode = `MANA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);
    setIsSubmitted(true);
    onSuccess?.();
  };

  return (
    <div className="bg-cream-card rounded-editorial-xl border border-warm-hairline p-6 sm:p-7 shadow-[0_16px_40px_-20px_rgba(31,27,22,0.08)]">
      {/* Advisor Profile Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-warm-hairline">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-warm-border shrink-0 bg-cream-surface">
          <img
            src={advisor.image}
            alt={advisor.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-mono text-teal block">
            کارگزار و معمار ناظر اثر
          </span>
          <h4 className="text-base font-display font-bold text-warm-charcoal truncate">
            {advisor.name}
          </h4>
          <p className="text-xs text-warm-muted truncate mt-0.5">{advisor.role}</p>
        </div>
      </div>

      {/* Quick Contact Buttons (Phone & WhatsApp) */}
      <div className="grid grid-cols-2 gap-3 my-5">
        <a
          href={`tel:${advisor.phone}`}
          className="flex items-center justify-center gap-2 py-3 bg-olive-dark hover:bg-olive-deep text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors shadow-sm"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>تماس مستقیم</span>
        </a>

        <a
          href={`https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(
            `سلام و درود، در خصوص هماهنگی بازدید عمارت «${propertyTitle}» با کد ${propertyId} پیام می‌دهم.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-editorial-sm text-xs font-medium transition-colors shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>ارتباط در واتساپ</span>
        </a>
      </div>

      {/* Booking Form or Success State */}
      <div className="pt-5 border-t border-warm-hairline">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-teal" />
          <h5 className="text-sm font-display font-bold text-warm-charcoal">
            درخواست هماهنگی بازدید اختصاصی
          </h5>
        </div>

        {isSubmitted ? (
          <div className="bg-cream-surface/70 rounded-editorial-md p-5 border border-warm-hairline text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
            <h6 className="text-sm font-display font-bold text-warm-charcoal">
              درخواست بازدید شما با موفقیت ثبت شد
            </h6>
            <p className="text-xs text-warm-muted leading-relaxed">
              کد پیگیری اختصاصی: <strong className="font-mono text-teal">{bookingRef}</strong>.
              مشاور ارشد ظرف کمتر از ۲ ساعت جهت تایید نهایی زمان با شما تماس خواهد گرفت.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                reset();
              }}
              className="text-xs text-teal hover:underline font-medium"
            >
              ثبت درخواست دیگر
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="نام و نام خانوادگی متقاضی"
              placeholder="مثال: دکتر آریا مهرابی"
              {...register('fullName')}
              error={errors.fullName?.message}
            />

            <FormField
              label="شماره تلفن همراه"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              dir="ltr"
              {...register('phone')}
              error={errors.phone?.message}
            />

            {/* Date Selection */}
            <div className="flex flex-col gap-1.5 text-right">
              <label className="text-xs font-medium text-warm-charcoal">
                روز پیشنهادی بازدید
              </label>
              <select
                {...register('preferredDate')}
                className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none"
              >
                <option value="فردا (صبح)">فردا — نوبت صبح</option>
                <option value="فردا (عصر)">فردا — نوبت عصر (پیشنهادی)</option>
                <option value="پس‌فردا">پس‌فردا</option>
                <option value="پایان هفته (پنجشنبه)">آخر هفته — پنجشنبه</option>
                <option value="پایان هفته (جمعه)">آخر هفته — جمعه</option>
              </select>
              {errors.preferredDate && (
                <span className="text-xs text-red-600">{errors.preferredDate.message}</span>
              )}
            </div>

            {/* Time Window */}
            <div className="flex flex-col gap-1.5 text-right">
              <label className="text-xs font-medium text-warm-charcoal">
                بازه زمانی مطلوب
              </label>
              <select
                {...register('preferredTime')}
                className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none"
              >
                <option value="۱۰:۰۰ الی ۱۲:۰۰">۱۰:۰۰ الی ۱۲:۰۰ (نور صبحگاهی)</option>
                <option value="۱۴:۰۰ الی ۱۶:۰۰">۱۴:۰۰ الی ۱۶:۰۰ (نیمروز)</option>
                <option value="۱۶:۰۰ الی ۱۸:۰۰">۱۶:۰۰ الی ۱۸:۰۰ (غروب طلایی)</option>
                <option value="۱۸:۰۰ الی ۲۰:۰۰">۱۸:۰۰ الی ۲۰:۰۰ (نورپردازی شبانه)</option>
              </select>
              {errors.preferredTime && (
                <span className="text-xs text-red-600">{errors.preferredTime.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm text-xs font-medium transition-all shadow-md active:scale-98 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>در حال هماهنگی با کارگزار...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>ثبت و ارسال درخواست بازدید محرمانه</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-warm-muted/80 text-center leading-relaxed">
              اطلاعات تماس شما نزد کارگزاری مانا به صورت کاملاً محرمانه محفوظ خواهد ماند.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
