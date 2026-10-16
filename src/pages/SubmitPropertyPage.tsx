import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Building2,
  Layers,
  Camera,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { FormField } from '@/src/components/FormField';
import {
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  submitPropertyRegistration,
} from '@/src/api/submissions';
import { useToast } from '@/src/context/ToastContext';

// Default architectural sample images for one-click testing
import sample1 from '@/src/assets/images/hero_villa_arch_1792167356858.jpg';
import sample2 from '@/src/assets/images/card_residence_manor_1792167357090.jpg';
import sample3 from '@/src/assets/images/card_interior_detail_1792167357024.jpg';

export const SubmitPropertyPage: React.FC = () => {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([sample1, sample2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccessCode, setSubmissionSuccessCode] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    // Step 1
    propertyType: 'عمارت و ویلا',
    neighborhood: 'نیاوران',
    address: '',
    transactionType: 'خرید و فروش',
    expectedPrice: '',
    // Step 2
    area: 650,
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    yearBuilt: 1402,
    architect: '',
    features: ['استخر اختصاصی', 'روف‌گاردن'],
    // Step 4
    ownerName: '',
    ownerPhone: '',
    ownershipType: 'مالک رسمی',
    preferredVisitTime: 'عصر (۱۶ الی ۱۸)',
    notes: '',
  });

  const [stepErrors, setStepErrors] = useState<{ [key: string]: string }>({});

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setStepErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newUrls: string[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newUrls.push(url);
    });

    setImages((prev) => [...prev, ...newUrls]);
    setStepErrors((prev) => ({ ...prev, images: '' }));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addSamplePhoto = (sampleUrl: string) => {
    setImages((prev) => [...prev, sampleUrl]);
    setStepErrors((prev) => ({ ...prev, images: '' }));
  };

  // Step validation
  const validateCurrentStep = (): boolean => {
    setStepErrors({});

    if (currentStep === 1) {
      const res = Step1Schema.safeParse({
        propertyType: formData.propertyType,
        neighborhood: formData.neighborhood,
        address: formData.address,
        transactionType: formData.transactionType,
        expectedPrice: formData.expectedPrice,
      });
      if (!res.success) {
        const errors: { [key: string]: string } = {};
        res.error.issues.forEach((err) => {
          if (err.path[0]) errors[String(err.path[0])] = err.message;
        });
        setStepErrors(errors);
        return false;
      }
    } else if (currentStep === 2) {
      const res = Step2Schema.safeParse({
        area: Number(formData.area),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        parking: Number(formData.parking),
        yearBuilt: Number(formData.yearBuilt),
        architect: formData.architect,
        features: formData.features,
      });
      if (!res.success) {
        const errors: { [key: string]: string } = {};
        res.error.issues.forEach((err) => {
          if (err.path[0]) errors[String(err.path[0])] = err.message;
        });
        setStepErrors(errors);
        return false;
      }
    } else if (currentStep === 3) {
      const res = Step3Schema.safeParse({ images });
      if (!res.success) {
        setStepErrors({ images: res.error.issues[0]?.message || 'حداقل یک تصویر آپلود کنید' });
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmitAll = async (e: React.FormEvent) => {
    e.preventDefault();

    const res4 = Step4Schema.safeParse({
      ownerName: formData.ownerName,
      ownerPhone: formData.ownerPhone,
      ownershipType: formData.ownershipType,
      preferredVisitTime: formData.preferredVisitTime,
      notes: formData.notes,
    });

    if (!res4.success) {
      const errors: { [key: string]: string } = {};
      res4.error.issues.forEach((err) => {
        if (err.path[0]) errors[String(err.path[0])] = err.message;
      });
      setStepErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitPropertyRegistration({
        ...(formData as any),
        images,
      });
      setSubmissionSuccessCode(result.estateCode);
      toast.success(
        `پرونده عمارت شما با شناسه ${result.estateCode} در سامانه کارشناسی مانا ثبت گردید.`
      );
    } catch (err: any) {
      toast.error(err.message || 'خطا در ثبت پرونده ملک');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'مشخصات و موقعیت', icon: Building2 },
    { number: 2, title: 'ویژگی‌های کالبدی', icon: Layers },
    { number: 3, title: 'تصاویر و مدارک', icon: Camera },
    { number: 4, title: 'اطلاعات مالک', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-cream-canvas text-warm-charcoal font-body antialiased selection:bg-teal selection:text-white flex flex-col">
      <Helmet>
        <title>سپردن و ثبت عمارت | کارگزاری و خانه معماری مانا</title>
        <meta
          name="description"
          content="فرم چندمرحله‌ای سپردن عمارت و ویلای شاخص به کارگزاری مانا؛ ارزیابی کارشناسی، عکاسی ژورنالی و معرفی به جامعه خریداران مانا."
        />
      </Helmet>

      <Header />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-36 pb-24 max-w-[1000px] mx-auto w-full px-5 sm:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-teal block mb-2">
            سامانه پذیرش پرونده‌های فاخر
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-warm-charcoal tracking-tight mb-3">
            سپردن عمارت و اثر معماری به مانا
          </h1>
          <p className="text-xs sm:text-sm text-warm-muted leading-relaxed">
            تمامی اطلاعات ارائه‌شده تحت نظارت مستقیم کمیته کارشناسی و با حفظ ۱۰۰٪ محرمانگی بررسی می‌شود.
          </p>
        </div>

        {/* Progress Bar & Steps Tabs */}
        <div className="mb-10 bg-cream-card rounded-editorial-xl border border-warm-hairline p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
            {steps.map((step) => {
              const Icon = step.icon;
              const isPassed = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div
                  key={step.number}
                  className={`flex flex-col items-center text-center p-2 rounded-editorial-sm transition-colors ${
                    isCurrent
                      ? 'bg-cream-surface/80 text-teal'
                      : isPassed
                      ? 'text-olive-dark'
                      : 'text-warm-muted/60'
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1.5 text-xs sm:text-sm font-bold transition-all ${
                      isCurrent
                        ? 'bg-teal text-cream-canvas shadow-md'
                        : isPassed
                        ? 'bg-olive-dark text-cream-canvas'
                        : 'bg-warm-hairline text-warm-muted'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                  </div>
                  <span className="text-[10px] sm:text-xs font-display font-bold truncate max-w-full">
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-warm-hairline h-1 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-teal h-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-cream-card rounded-editorial-xl border border-warm-hairline p-6 sm:p-10 shadow-[0_16px_40px_-20px_rgba(31,27,22,0.08)]">
          
          {submissionSuccessCode ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-display font-bold text-warm-charcoal">
                پرونده با موفقیت در کارگزاری مانا ثبت شد
              </h2>
              <p className="text-sm text-warm-muted max-w-md mx-auto leading-relaxed">
                کد رهگیری پرونده: <strong className="font-mono text-teal text-lg">{submissionSuccessCode}</strong>
                <br />
                کارشناس ارشد منطقه مربوطه ظرف حداکثر ۲۴ ساعت جهت هماهنگی بازدید حضوری و بررسی اسناد با شما تماس خواهد گرفت.
              </p>
              <div className="pt-6 flex justify-center gap-4">
                <Link
                  to="/"
                  className="px-6 py-3 bg-teal text-cream-canvas text-xs font-medium rounded-editorial-sm"
                >
                  بازگشت به صفحه اصلی
                </Link>
                <Link
                  to="/properties"
                  className="px-6 py-3 border border-warm-hairline text-warm-charcoal text-xs font-medium rounded-editorial-sm hover:bg-cream-surface"
                >
                  مشاهده کاتالوگ عمارت‌ها
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitAll}>
              
              {/* STEP 1: Basic Info & Location */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-display font-bold text-warm-charcoal pb-3 border-b border-warm-hairline">
                    گام ۱: مشخصات کلی و استقرار اثر
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-warm-charcoal mb-1">
                        گونه کالبدی اثر
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => updateFormData('propertyType', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                      >
                        <option value="عمارت و ویلا">عمارت و ویلا</option>
                        <option value="پنت‌هاوس و اسکای‌ویلا">پنت‌هاوس و اسکای‌ویلا</option>
                        <option value="آپارتمان آرشیتکتورال">آپارتمان آرشیتکتورال</option>
                        <option value="زمین و باغ">زمین، باغ و کلنگی بااصالت</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-warm-charcoal mb-1">
                        نوع واگذاری
                      </label>
                      <select
                        value={formData.transactionType}
                        onChange={(e) => updateFormData('transactionType', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                      >
                        <option value="خرید و فروش">خرید و فروش قطعی</option>
                        <option value="رهن و اجاره">رهن و اجاره بلندمدت</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-warm-charcoal mb-1">
                        محله استقرار
                      </label>
                      <select
                        value={formData.neighborhood}
                        onChange={(e) => updateFormData('neighborhood', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                      >
                        <option value="نیاوران">نیاوران و صاحبقرانیه</option>
                        <option value="زعفرانیه">زعفرانیه و محمودیه</option>
                        <option value="الهیه">الهیه و فرشته</option>
                        <option value="کامرانیه">کامرانیه و فرمانیه</option>
                        <option value="ولنجک">ولنجک و کوهپایه</option>
                        <option value="لواسان">لواسانات و فشم</option>
                        <option value="دروس">دروس و قلهک</option>
                        <option value="سعادت‌آباد">سعادت‌آباد و شهرک غرب</option>
                      </select>
                    </div>

                    <FormField
                      label="ارزش یا ودیعه پیشنهادی (تومان)"
                      placeholder="مثال: ۱۸۰ میلیارد تومان"
                      value={formData.expectedPrice}
                      onChange={(e) => updateFormData('expectedPrice', e.target.value)}
                      error={stepErrors.expectedPrice}
                    />
                  </div>

                  <FormField
                    label="نشانی یا حدود جغرافیایی دقیق ملک"
                    placeholder="مثال: نیاوران، خیابان یاسر، کوچه مژده، فرعی گلستان"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    error={stepErrors.address}
                  />
                </div>
              )}

              {/* STEP 2: Physical & Technical Specs */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-display font-bold text-warm-charcoal pb-3 border-b border-warm-hairline">
                    گام ۲: ابعاد کالبدی، معماری و مشخصات فنی
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <FormField
                      label="متراژ مفید زیربنا (متر مربع)"
                      type="number"
                      value={formData.area}
                      onChange={(e) => updateFormData('area', Number(e.target.value))}
                      error={stepErrors.area}
                    />

                    <FormField
                      label="تعداد اتاق خواب"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => updateFormData('bedrooms', Number(e.target.value))}
                      error={stepErrors.bedrooms}
                    />

                    <FormField
                      label="تعداد سرویس بهداشتی و حمام"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => updateFormData('bathrooms', Number(e.target.value))}
                      error={stepErrors.bathrooms}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <FormField
                      label="تعداد پارکینگ سندی"
                      type="number"
                      value={formData.parking}
                      onChange={(e) => updateFormData('parking', Number(e.target.value))}
                      error={stepErrors.parking}
                    />

                    <FormField
                      label="سال احداث (خورشیدی)"
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => updateFormData('yearBuilt', Number(e.target.value))}
                      error={stepErrors.yearBuilt}
                    />

                    <FormField
                      label="معمار یا استودیو طراح (اختیاری)"
                      placeholder="مثال: استودیو مانا یا نام مهندس"
                      value={formData.architect}
                      onChange={(e) => updateFormData('architect', e.target.value)}
                      error={stepErrors.architect}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Photos Upload & Live Previews */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-warm-hairline">
                    <h3 className="text-lg font-display font-bold text-warm-charcoal">
                      گام ۳: تصاویر و مستندات معماری
                    </h3>
                    <span className="text-xs text-warm-muted">
                      {images.length} تصویر انتخاب شده
                    </span>
                  </div>

                  {/* Dropzone Upload Box */}
                  <label className="border-2 border-dashed border-warm-border hover:border-teal rounded-editorial-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-cream-surface/30">
                    <Upload className="w-8 h-8 text-teal mb-2" />
                    <span className="text-sm font-display font-bold text-warm-charcoal">
                      تصاویر ملک را انتخاب یا به اینجا بکشید
                    </span>
                    <span className="text-xs text-warm-muted mt-1">
                      فرمت‌های مجاز: JPG, PNG, WEBP (حداکثر ۱۰ مگابایت)
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {stepErrors.images && (
                    <p className="text-xs text-red-600">{stepErrors.images}</p>
                  )}

                  {/* Quick Preset Samples for One-Click Testing */}
                  <div className="flex items-center gap-3 text-xs text-warm-muted">
                    <span>افزودن نمونه‌های آماده ژورنالی:</span>
                    <button
                      type="button"
                      onClick={() => addSamplePhoto(sample1)}
                      className="px-2.5 py-1 bg-cream-surface rounded text-warm-charcoal hover:text-teal border border-warm-hairline"
                    >
                      + ویلای طاق آجری
                    </button>
                    <button
                      type="button"
                      onClick={() => addSamplePhoto(sample2)}
                      className="px-2.5 py-1 bg-cream-surface rounded text-warm-charcoal hover:text-teal border border-warm-hairline"
                    >
                      + عمارت با حیاط
                    </button>
                    <button
                      type="button"
                      onClick={() => addSamplePhoto(sample3)}
                      className="px-2.5 py-1 bg-cream-surface rounded text-warm-charcoal hover:text-teal border border-warm-hairline"
                    >
                      + فضای داخلی
                    </button>
                  </div>

                  {/* Image Thumbnails Previews */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    {images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-editorial-md overflow-hidden border border-warm-hairline bg-cream-surface group shadow-sm"
                      >
                        <img
                          src={imgUrl}
                          alt={`پیش‌نمایش ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 p-1 bg-warm-charcoal/80 text-white rounded-full hover:bg-red-600 transition-colors shadow"
                          title="حذف تصویر"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 text-white rounded text-[10px] font-mono">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Owner Info & Final Submission */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-display font-bold text-warm-charcoal pb-3 border-b border-warm-hairline">
                    گام ۴: اطلاعات مالک و هماهنگی کارشناسی حضوری
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      label="نام و نام خانوادگی مالک یا نماینده"
                      placeholder="مثال: مهندس رادمهر"
                      value={formData.ownerName}
                      onChange={(e) => updateFormData('ownerName', e.target.value)}
                      error={stepErrors.ownerName}
                    />

                    <FormField
                      label="شماره تلفن همراه مستقیم"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      dir="ltr"
                      value={formData.ownerPhone}
                      onChange={(e) => updateFormData('ownerPhone', e.target.value)}
                      error={stepErrors.ownerPhone}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-warm-charcoal mb-1">
                        جایگاه مالکیتی
                      </label>
                      <select
                        value={formData.ownershipType}
                        onChange={(e) => updateFormData('ownershipType', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                      >
                        <option value="مالک رسمی">مالک رسمی سند</option>
                        <option value="وکیل قانونی مالک">وکیل رسمی و قانونی مالک</option>
                        <option value="سازنده پروژه">سازنده و مالک مشترک پروژه</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-warm-charcoal mb-1">
                        بازه زمانی مناسب جهت کارشناسی حضوری
                      </label>
                      <select
                        value={formData.preferredVisitTime}
                        onChange={(e) => updateFormData('preferredVisitTime', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                      >
                        <option value="صبح (۱۰ الی ۱۲)">صبح (۱۰:۰۰ الی ۱۲:۰۰)</option>
                        <option value="عصر (۱۶ الی ۱۸)">عصر (۱۶:۰۰ الی ۱۸:۰۰)</option>
                        <option value="پایان هفته">آخر هفته با هماهنگی تلفنی</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-right">
                    <label className="text-xs font-medium text-warm-charcoal">
                      یادداشت‌ها یا ویژگی‌های خاص ملک (اختیاری)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="نکاتی درباره سوابق سند، نوع چاه آب، درختان کهنسال یا وضعیت سکونت فعلی..."
                      value={formData.notes}
                      onChange={(e) => updateFormData('notes', e.target.value)}
                      className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                    />
                  </div>

                  <div className="p-4 bg-cream-surface/60 rounded-editorial-md border border-warm-hairline flex items-start gap-3 text-xs text-warm-muted">
                    <ShieldCheck className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <span>
                      با ثبت این درخواست، کارشناسان ارشد مانا نسبت به بررسی محرمانه پرونده و هماهنگی جلسه ارزیابی با شما اقدام خواهند نمود.
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="pt-8 mt-8 border-t border-warm-hairline flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 px-5 py-3 border border-warm-hairline hover:bg-cream-surface text-warm-charcoal rounded-editorial-sm text-xs font-medium transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>مرحله قبل</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors shadow-sm"
                  >
                    <span>مرحله بعد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors shadow-md active:scale-98 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>در حال ثبت نهایی پرونده...</span>
                      </div>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>ثبت رسمی و ارجاع به کارشناسی</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </main>

      <footer className="border-t border-warm-hairline bg-cream-canvas py-10 text-xs text-warm-muted text-center">
        <span>املاک مانا · سامانه رسمی پذیرش و ارزیابی عمارت‌های شمیرانات</span>
      </footer>
    </div>
  );
};

export default SubmitPropertyPage;
