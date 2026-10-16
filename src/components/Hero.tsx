import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Compass, CalendarCheck } from 'lucide-react';
import { HERO_CONTENT } from '@/src/constants/content';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Words for word-by-word staggered animation
  const headlineLine1 = HERO_CONTENT.headlinePart1.split(' ');
  const headlineLine2 = [
    HERO_CONTENT.headlineHighlight,
    ...HERO_CONTENT.headlinePart2.split(' '),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Main 2-column Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Right Column (in RTL): Hero Text, CTAs, Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Editorial Kicker (Unboxed with subtle dot) */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-warm-muted mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 bg-teal rounded-full inline-block" />
              <span>{HERO_CONTENT.kicker}</span>
            </div>

            {/* Headline with word-by-word staggered reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-display font-extrabold text-warm-charcoal leading-[1.25] sm:leading-[1.2] lg:leading-[1.18] tracking-tight mb-6 sm:mb-8 text-balance"
            >
              <span className="inline-block">
                {headlineLine1.map((word, index) => (
                  <motion.span
                    key={`line1-${index}`}
                    variants={wordVariants}
                    className="inline-block ml-2 sm:ml-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <br className="hidden sm:inline" />
              <span className="inline-block mt-1 sm:mt-2">
                <motion.span
                  variants={wordVariants}
                  className="inline-block ml-2 sm:ml-3 text-teal underline decoration-teal/30 decoration-2 underline-offset-8"
                >
                  {HERO_CONTENT.headlineHighlight}
                </motion.span>
                {HERO_CONTENT.headlinePart2.split(' ').map((word, index) => (
                  <motion.span
                    key={`line2-${index}`}
                    variants={wordVariants}
                    className="inline-block ml-2 sm:ml-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.35, duration: 0.5 }}
              className="text-base sm:text-lg lg:text-xl text-warm-muted font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10 text-pretty"
            >
              {HERO_CONTENT.subtitle}
            </motion.p>

            {/* Two Action CTAs */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.45, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
            >
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:py-4 bg-teal hover:bg-teal-hover text-cream-canvas font-medium text-sm sm:text-base rounded-editorial-sm transition-all duration-200 active:scale-[0.99] shadow-[0_2px_12px_-4px_rgba(47,111,106,0.35)] whitespace-nowrap"
              >
                <Compass className="w-4 h-4" />
                <span>{HERO_CONTENT.primaryCta}</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Link>

              <a
                href="#advisory"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 bg-transparent hover:bg-cream-surface text-warm-charcoal border border-warm-hairline hover:border-warm-muted/40 font-medium text-sm sm:text-base rounded-editorial-sm transition-all duration-200 whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4 text-warm-muted" />
                <span>{HERO_CONTENT.secondaryCta}</span>
              </a>
            </motion.div>
          </div>

          {/* Left Column (in RTL): Large Arch-vaulted Architectural Photo */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Arch frame styling with subtle hairline border */}
              <div className="relative rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[220px] rounded-b-[28px] overflow-hidden border border-warm-hairline bg-cream-surface/70 aspect-[3/4] shadow-[0_16px_40px_-20px_rgba(31,27,22,0.12)]">
                <img
                  src={HERO_CONTENT.heroImage.src}
                  alt={HERO_CONTENT.heroImage.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
                {/* Subtle soft gradient overlay at bottom for caption contrast */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-warm-charcoal/80 via-warm-charcoal/30 to-transparent">
                  <p className="text-xs sm:text-sm text-cream-canvas/90 font-medium">
                    {HERO_CONTENT.heroImage.caption}
                  </p>
                </div>
              </div>

              {/* Decorative Subtle Stamp/Watermark element on corner */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 hidden sm:flex items-center justify-center p-3 sm:p-4 rounded-editorial-md bg-olive-dark text-cream-canvas text-xs font-display border border-olive-hairline shadow-md">
                <span className="tracking-wide">شناسنامهٔ اصالت مانا</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Small Statistics Bar Strip beneath Hero */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.55, duration: 0.6 }}
          className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-warm-hairline"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {HERO_CONTENT.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col ${
                  idx !== 0 ? 'md:pr-8 md:border-r md:border-warm-hairline' : ''
                }`}
              >
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-warm-charcoal tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-xs text-teal font-medium">
                    {stat.unit}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-warm-muted leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
