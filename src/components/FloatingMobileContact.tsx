import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Phone, MessageCircle, PlusCircle, X, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_CONFIG } from '@/src/constants/content';

export const FloatingMobileContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // If we are on property detail page or submit-property page, hide or adjust to prevent overlap with bottom action bars
  const isDetailPage = location.pathname.startsWith('/properties/') && location.pathname !== '/properties';
  if (isDetailPage) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-5 z-40 lg:hidden flex flex-col items-end gap-2.5">
      {/* Expandable Action Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5 items-end mb-1"
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/989123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 text-white rounded-full text-xs font-medium shadow-xl border border-emerald-700/50"
            >
              <span>گفتگو در واتساپ</span>
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${APP_CONFIG.contactPhone}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-olive-dark text-cream-canvas rounded-full text-xs font-medium shadow-xl border border-olive-hairline"
            >
              <span>تماس با دفتر ({APP_CONFIG.contactPhone})</span>
              <Phone className="w-4 h-4" />
            </a>

            {/* Submit Property */}
            <Link
              to="/submit-property"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 bg-teal text-cream-canvas rounded-full text-xs font-medium shadow-xl"
            >
              <span>سپردن و ثبت عمارت</span>
              <PlusCircle className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-13 h-13 rounded-full bg-teal hover:bg-teal-hover text-cream-canvas shadow-[0_8px_24px_rgba(47,111,106,0.4)] flex items-center justify-center transition-all duration-200 active:scale-95 border-2 border-cream-canvas"
        aria-label="تماس و پشتیبانی سریع"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Headphones className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
