import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, ArrowLeft, Award, Sparkles, Building2 } from 'lucide-react';
import { Header } from '@/src/components/Header';
import { AGENTS } from '@/src/data/agents';

export const AgentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-canvas text-warm-charcoal font-body antialiased selection:bg-teal selection:text-white flex flex-col">
      <Helmet>
        <title>تیم معماران و کارشناسان ارشد | املاک مانا</title>
        <meta
          name="description"
          content="مشاوران و کارگزاران املاک مانا؛ دانش‌آموختگان معماری و کارشناسان رسمی دادگستری با شناخت عمیق از بافت تاریخی و معاصر شمیرانات."
        />
      </Helmet>

      <Header />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-36 pb-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2 text-xs font-mono text-teal mb-3">
              <Sparkles className="w-4 h-4" />
              <span>هیئت کارشناسی و همراهان زیست مانا</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-warm-charcoal tracking-tight mb-4">
              معماران و مشاوران مانا
            </h1>
            <p className="text-base sm:text-lg text-warm-muted leading-relaxed font-light">
              در مانا، مشاوران صرفاً بازاریاب نیستند؛ بلکه معماران باسابقه و پژوهشگران حقوقی هستند که ارزش زیست پایدار، نور طبیعی و سلامت حقوقی خانه شما را با وسواس ارزیابی می‌کنند.
            </p>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="bg-cream-card rounded-editorial-xl border border-warm-hairline overflow-hidden flex flex-col justify-between group hover:border-warm-muted/40 transition-all duration-300 hover:shadow-xl"
              >
                <div>
                  {/* Large Portrait Image with Arch Top Vault */}
                  <Link
                    to={`/agents/${agent.id}`}
                    className="relative aspect-square w-full block overflow-hidden bg-cream-surface"
                  >
                    <img
                      src={agent.image}
                      alt={agent.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-cream-canvas/90 backdrop-blur-sm rounded-full text-xs font-medium text-warm-charcoal border border-warm-hairline">
                      {agent.experienceYears} سال سابقه تخصصی
                    </div>
                  </Link>

                  {/* Profile Content */}
                  <div className="p-6 sm:p-7">
                    <span className="text-xs font-mono text-teal block mb-1">
                      {agent.role}
                    </span>
                    <Link to={`/agents/${agent.id}`}>
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-warm-charcoal group-hover:text-teal transition-colors mb-2">
                        {agent.name}
                      </h2>
                    </Link>
                    <p className="text-xs text-warm-muted font-light mb-4 line-clamp-1">
                      {agent.title}
                    </p>

                    <p className="text-xs text-warm-muted leading-relaxed line-clamp-3 mb-6">
                      {agent.bio}
                    </p>

                    {/* Specialization List (Zero-Pill) */}
                    <div className="pt-4 border-t border-warm-hairline">
                      <span className="block text-[11px] text-warm-muted mb-2 font-medium">
                        حوزه‌های تخصصی نظارت:
                      </span>
                      <div className="flex flex-wrap gap-2 text-[11px] text-warm-charcoal">
                        {agent.specialty.map((spec, i) => (
                          <span key={spec} className="inline-flex items-center">
                            <span>{spec}</span>
                            {i < agent.specialty.length - 1 && (
                              <span className="text-warm-hairline mr-2">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 sm:p-7 pt-0">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-olive-dark hover:bg-olive-deep text-cream-canvas rounded-editorial-sm text-xs font-medium transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>تماس مستقیم</span>
                    </a>

                    <a
                      href={`https://wa.me/${agent.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-editorial-sm text-xs font-medium transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>واتساپ</span>
                    </a>
                  </div>

                  <Link
                    to={`/agents/${agent.id}`}
                    className="flex items-center justify-between w-full py-2.5 px-3 rounded-editorial-sm text-xs font-medium text-warm-charcoal hover:bg-cream-surface transition-colors border border-warm-hairline"
                  >
                    <span>مشاهده پرونده‌ها و {agent.propertyIds.length} اثر تحت نظارت</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-teal" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <footer className="border-t border-warm-hairline bg-cream-canvas py-10 text-xs text-warm-muted text-center">
        <span>© ۱۴۰۴ کارگزاری و مجله معماری مانا · هیئت کارشناسان ارشد شمیرانات</span>
      </footer>
    </div>
  );
};

export default AgentsPage;
