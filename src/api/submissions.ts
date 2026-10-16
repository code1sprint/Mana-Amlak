import { z } from 'zod';

// Contact Form Schema
export const ContactFormSchema = z.object({
  fullName: z.string().min(3, 'لطفاً نام و نام خانوادگی خود را کامل وارد کنید'),
  phone: z
    .string()
    .min(10, 'شماره همراه باید حداقل ۱۰ رقم باشد')
    .regex(/^(\+98|0)?9\d{9}$/, 'فرمت شماره همراه نامعتبر است (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'),
  email: z.string().email('آدرس ایمیل معتبر نیست').optional().or(z.literal('')),
  subject: z.string().min(2, 'لطفاً موضوع پیام را انتخاب کنید'),
  message: z.string().min(10, 'متن پیام باید حداقل ۱۰ کاراکتر باشد'),
  honeypot: z.string().max(0, 'تشخیص ارسال خودکار (اسپم)'), // Anti-spam honeypot
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// Property Registration Multi-Step Schema
export const Step1Schema = z.object({
  propertyType: z.enum(['عمارت و ویلا', 'پنت‌هاوس و اسکای‌ویلا', 'آپارتمان آرشیتکتورال', 'زمین و باغ']),
  neighborhood: z.string().min(2, 'انتخاب محله الزامی است'),
  address: z.string().min(5, 'آدرس تقریبی ملک را وارد کنید'),
  transactionType: z.enum(['خرید و فروش', 'رهن و اجاره']),
  expectedPrice: z.string().min(1, 'قیمت یا ودیعه مدنظر خود را وارد کنید'),
});

export const Step2Schema = z.object({
  area: z.coerce.number().min(50, 'متراژ باید حداقل ۵۰ متر باشد'),
  bedrooms: z.coerce.number().min(1, 'تعداد خواب حداقل ۱ عدد است'),
  bathrooms: z.coerce.number().min(1, 'تعداد سرویس حداقل ۱ عدد است'),
  parking: z.coerce.number().min(0, 'تعداد پارکینگ را وارد کنید'),
  yearBuilt: z.coerce.number().min(1350, 'سال ساخت نامعتبر است'),
  architect: z.string().optional(),
  features: z.array(z.string()).default([]),
});

export const Step3Schema = z.object({
  images: z.array(z.string()).min(1, 'حداقل یک تصویر از ملک بارگذاری نمایید'),
});

export const Step4Schema = z.object({
  ownerName: z.string().min(3, 'نام و نام خانوادگی مالک یا نماینده الزامی است'),
  ownerPhone: z
    .string()
    .regex(/^(\+98|0)?9\d{9}$/, 'فرمت شماره همراه نامعتبر است (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'),
  ownershipType: z.enum(['مالک رسمی', 'وکیل قانونی مالک', 'سازنده پروژه']),
  preferredVisitTime: z.string().min(1, 'زمان پیشنهادی برای کارشناسی حضوری را انتخاب کنید'),
  notes: z.string().optional(),
  honeypot: z.string().max(0, 'تشخیص ارسال غیرمجاز').optional(),
});

export type PropertyRegistrationData = z.infer<typeof Step1Schema> &
  z.infer<typeof Step2Schema> &
  z.infer<typeof Step3Schema> &
  z.infer<typeof Step4Schema>;

/**
 * Mock API: Submit Contact Inquiry
 */
export async function submitContactInquiry(data: ContactFormData): Promise<{ success: boolean; trackingCode: string }> {
  // Anti-spam honeypot verification
  if (data.honeypot && data.honeypot.trim() !== '') {
    throw new Error('درخواست شما به عنوان ارسال خودکار شناسایی و مسدود شد.');
  }

  // Validate with Zod
  ContactFormSchema.parse(data);

  // Simulate network latency (600ms)
  await new Promise((resolve) => setTimeout(resolve, 600));

  const trackingCode = `MANA-MSG-${Math.floor(100000 + Math.random() * 900000)}`;
  return {
    success: true,
    trackingCode,
  };
}

/**
 * Mock API: Submit Multi-Step Property Registration
 */
export async function submitPropertyRegistration(
  data: PropertyRegistrationData
): Promise<{ success: boolean; estateCode: string }> {
  if (data.honeypot && data.honeypot.trim() !== '') {
    throw new Error('درخواست شما به عنوان ارسال خودکار شناسایی و مسدود شد.');
  }

  // Simulate network latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  const estateCode = `MANA-FILE-${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    success: true,
    estateCode,
  };
}
