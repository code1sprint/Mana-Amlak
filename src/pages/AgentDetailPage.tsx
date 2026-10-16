import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  MessageCircle,
  Mail,
  GraduationCap,
  Award,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Send,
  CheckCircle,
} from 'lucide-react';
import { Header } from '@/src/components/Header';
import { PropertyCard } from '@/src/components/PropertyCard';
import { AGENTS } from '@/src/data/agents';
import { MOCK_PROPERTIES } from '@/src/data/mockProperties';

export const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inquirySent, setInquirySent] = useState(false);
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');

  const agent = AGENTS.find((a) => a.id === id) || AGENTS[0];

  const agentProperties = MOCK_PROPERTIES.filter((prop) =>
    agent.propertyIds.includes(prop.id)
  );

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone) return;
    setInquirySent(true);
  };

  return (
    <div className="min-h-screen bg-cream-canvas text-warm-charcoal font-body antialiased selection:bg-teal selection:text-white flex flex-col">
      <Helmet>
        <title>{`${agent.name} | مشاور ارشد املاک مانا`}</title>
        <meta name="description" content={`${agent.title} — ${agent.bio.slice(0, 150)}`} />
      </Helmet>

      <Header />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-36 pb-24 max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-warm-muted mb-8 pb-4 border-b border-warm-hairline">
          <Link to="/" className="hover:text-warm-charcoal transition-colors">خانه</Link>
          <span>/</span>
          <Link to="/agents" className="hover:text-warm-charcoal transition-colors">مشاوران و کارشناسان</Link>
          <span>/</span>
          <span className="text-warm-charcoal font-medium">{agent.name}</span>
        </div>

        {/* Advisor Profile Hero Card */}
        <div className="bg-cream-card rounded-editorial-xl border border-warm-hairline p-8 sm:p-12 mb-16 shadow-[0_16px_40px_-20px_rgba(31,27,22,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Large Portrait (5 cols) */}
            <div className="lg:col-span-5">
              <div className="aspect-square w-full rounded-editorial-lg overflow-hidden border border-warm-hairline bg-cream-surface shadow-md">
                <img
                  src={agent.image}
                  alt={agent.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Narrative (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-teal block mb-2">
                  {agent.role} · {agent.experienceYears} سال سابقه کارشناسی
                </span>
                
                <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-warm-charcoal mb-3">
                  {agent.name}
                </h1>

                <p className="text-sm font-medium text-warm-muted mb-6">
                  {agent.title}
                </p>

                <p className="text-sm sm:text-base text-warm-muted leading-relaxed font-normal mb-8 text-pretty">
                  {agent.bio}
                </p>

                {/* Academic & Specialty Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-warm-hairline text-xs">
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <div>
                      <span className="text-warm-faded block text-[11px]">تحصیلات و مدارج:</span>
                      <span className="font-medium text-warm-charcoal">{agent.education}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <div>
                      <span className="text-warm-faded block text-[11px]">تمرکز تخصصی:</span>
                      <span className="font-medium text-warm-charcoal">
                        {agent.specialty.join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-warm-hairline">
                <a
                  href={`tel:${agent.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-olive-dark hover:bg-olive-deep text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>تماس مستقیم ({agent.phone})</span>
                </a>

                <a
                  href={`https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
                    `سلام و درود خدمت ${agent.name}، جهت دریافت مشاوره و بررسی فایل‌های تحت نظارت شما پیام می‌دهم.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-editorial-sm text-xs font-medium transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ارتباط مستقیم در واتساپ</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Assigned Properties Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-hairline">
            <div>
              <span className="text-xs font-mono text-teal block mb-1">
                کاتالوگ تخصصی مشاور
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-charcoal">
                پرونده‌های فعال تحت نظارت {agent.name}
              </h2>
            </div>
            <span className="text-xs text-warm-muted font-mono">
              {agentProperties.length} اثر شناسنامه‌دار
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                id={prop.id}
                title={prop.title}
                subtitle={prop.subtitle}
                location={prop.neighborhood}
                area={`${prop.area} متر مربع`}
                rooms={`${prop.bedrooms} اتاق خواب`}
                year={`ساخت ${prop.yearBuilt}`}
                priceLabel={prop.transactionType === 'sale' ? 'قیمت اعلامی' : 'شرایط واگذاری'}
                priceValue={prop.priceFormatted}
                image={prop.image}
              />
            ))}
          </div>
        </section>

        {/* Direct Consultation Inquiry Form */}
        <section className="bg-cream-surface/50 rounded-editorial-xl border border-warm-hairline p-8 sm:p-12 max-w-3xl mx-auto text-center">
          <span className="text-xs font-mono text-teal block mb-2">
            جلسه خصوصی و گفتگوی محرمانه
          </span>
          <h3 className="text-2xl font-display font-bold text-warm-charcoal mb-4">
            درخواست وقت مشاوره حضوری با {agent.name}
          </h3>
          <p className="text-xs sm:text-sm text-warm-muted leading-relaxed max-w-lg mx-auto mb-8">
            جهت بررسی سوابق فنی، امکان بازدید اختصاصی و تحلیل فرصت‌های سرمایه‌گذاری یا سکونت در شمیرانات، پیام خود را ثبت فرمایید.
          </p>

          {inquirySent ? (
            <div className="p-6 bg-cream-card rounded-editorial-lg border border-warm-hairline max-w-md mx-auto space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-700 mx-auto" />
              <h4 className="font-display font-bold text-warm-charcoal text-sm">
                درخواست شما با موفقیت به {agent.name} ارجاع شد
              </h4>
              <p className="text-xs text-warm-muted">
                دفتر کارگزاری ظرف چند ساعت آینده جهت تایید وقت با شماره شما هماهنگ خواهد کرد.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="max-w-md mx-auto space-y-4 text-right">
              <div>
                <label className="block text-xs font-medium text-warm-charcoal mb-1">
                  شماره تماس همراه
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  required
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-warm-charcoal mb-1">
                  موضوع یا عمارت مورد نظر (اختیاری)
                </label>
                <textarea
                  rows={3}
                  placeholder="مثال: تمایل به مشاوره درباره خرید عمارت باغ‌سرا یا بررسی ارزش ملک شخصی در نیاوران"
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-card text-warm-charcoal text-xs rounded-editorial-sm border border-warm-border focus:border-teal focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال درخواست هماهنگی با مشاور</span>
              </button>
            </form>
          )}
        </section>

      </main>

      <footer className="border-t border-warm-hairline bg-cream-canvas py-10 text-xs text-warm-muted text-center">
        <span>© ۱۴۰۴ کارگزاری و مجله معماری مانا · دپارتمان تخصصی شمیرانات</span>
      </footer>
    </div>
  );
};

export default AgentDetailPage;
