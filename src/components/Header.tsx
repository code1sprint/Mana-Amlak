import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_CONFIG, NAV_LINKS } from '@/src/constants/content';
import { BrandLogo } from '@/src/components/BrandLogo';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-cream-canvas/95 backdrop-blur-sm border-b border-warm-hairline shadow-[0_4px_20px_-10px_rgba(31,27,22,0.05)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-20 sm:h-24 flex items-center justify-between gap-8">
          {/* Zone 1: Brand mark + wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal rounded-editorial-sm"
          >
            <BrandLogo asLink={false} alt="" imgClassName="h-12 sm:h-14 w-auto" />
            <span className="text-lg sm:text-2xl font-display font-bold tracking-tight text-warm-charcoal whitespace-nowrap group-hover:text-teal transition-colors">
              {APP_CONFIG.agencyName}
            </span>
          </Link>

          {/* Zone 2: Desktop Navigation Links (4-5 single-line links with subtle underline) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-warm-muted">
            {NAV_LINKS.map((item) => {
              const isInternalRoute = item.href.startsWith('/');
              const isActive = location.pathname === item.href;
              return isInternalRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-teal font-semibold'
                      : 'hover:text-warm-charcoal'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-teal" />
                  )}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-1 hover:text-warm-charcoal transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${APP_CONFIG.contactPhone}`}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-cream-canvas bg-olive-dark hover:bg-olive-deep rounded-editorial-sm transition-colors whitespace-nowrap shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
              <span>تماس با کارگزاری</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-editorial-sm text-warm-charcoal hover:bg-cream-surface transition-colors focus-visible:outline-2 focus-visible:outline-teal"
              aria-label="باز کردن منوی ناوبری"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer with Smooth Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-warm-charcoal/40 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-cream-canvas p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-l border-warm-hairline"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between gap-3 pb-6 border-b border-warm-hairline">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BrandLogo asLink={false} alt="" imgClassName="h-12 w-auto" />
                    <span className="text-lg font-display font-bold text-warm-charcoal whitespace-nowrap">
                      {APP_CONFIG.agencyName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-editorial-sm text-warm-muted hover:text-warm-charcoal hover:bg-cream-surface transition-colors shrink-0"
                    aria-label="بستن منو"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation list */}
                <nav className="mt-8 flex flex-col gap-4">
                  {NAV_LINKS.map((item, idx) => {
                    const isInternalRoute = item.href.startsWith('/');
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * idx, duration: 0.3 }}
                      >
                        {isInternalRoute ? (
                          <Link
                            to={item.href}
                            className="flex items-center justify-between py-3 text-lg font-display text-warm-charcoal hover:text-teal transition-colors border-b border-warm-hairline/50"
                          >
                            <span>{item.label}</span>
                            <ArrowLeft className="w-4 h-4 text-warm-muted" />
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between py-3 text-lg font-display text-warm-charcoal hover:text-teal transition-colors border-b border-warm-hairline/50"
                          >
                            <span>{item.label}</span>
                            <ArrowLeft className="w-4 h-4 text-warm-muted" />
                          </a>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Agency Contact in Drawer */}
              <div className="pt-6 border-t border-warm-hairline space-y-4">
                <p className="text-xs text-warm-muted leading-relaxed">
                  {APP_CONFIG.officeAddress}
                </p>
                <a
                  href={`tel:${APP_CONFIG.contactPhone}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-teal hover:bg-teal-hover text-cream-canvas rounded-editorial-sm font-medium text-sm transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>گفتگو با مشاور ارشد ({APP_CONFIG.contactPhone})</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
