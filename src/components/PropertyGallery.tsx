import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Maximize2, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      // In RTL: ArrowRight usually means go back (previous), ArrowLeft means advance (next)
      if (e.key === 'ArrowLeft') goToNext();
      if (e.key === 'ArrowRight') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToNext, goToPrev]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;

    // Swipe threshold 45px
    if (diff > 45) {
      // Swiped right
      goToPrev();
    } else if (diff < -45) {
      // Swiped left
      goToNext();
    }
    touchStartXRef.current = null;
  };

  const bentoImages = images.slice(0, 5);

  return (
    <>
      {/* Bento Grid Layout (Magazine style asymmetric frames) */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3 sm:gap-4 relative">
        
        {/* Main Hero Shot (Col 1-7 in desktop) */}
        <div
          onClick={() => openLightbox(0)}
          className="md:col-span-2 lg:col-span-7 aspect-[4/3] lg:aspect-[16/11] rounded-editorial-xl overflow-hidden cursor-pointer group relative border border-warm-hairline bg-cream-surface shadow-sm"
        >
          <img
            src={bentoImages[0]}
            alt={`${title} - نمای اصلی`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-warm-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="p-3 bg-cream-card/90 rounded-full text-warm-charcoal shadow-lg backdrop-blur-sm">
              <Maximize2 className="w-5 h-5 text-teal" />
            </span>
          </div>
        </div>

        {/* Secondary Stack (Col 8-12 in desktop, 2x2 grid) */}
        <div className="md:col-span-2 lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
          {bentoImages.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx + 1)}
              className="aspect-square rounded-editorial-lg overflow-hidden cursor-pointer group relative border border-warm-hairline bg-cream-surface"
            >
              <img
                src={img}
                alt={`${title} - نما ${idx + 2}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-warm-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 bg-cream-card/90 rounded-full text-warm-charcoal shadow-md backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4 text-teal" />
                </span>
              </div>

              {/* Show total count button on last cell */}
              {idx === 3 && (
                <div className="absolute inset-0 bg-warm-charcoal/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-cream-canvas p-2 text-center group-hover:bg-warm-charcoal/70 transition-colors">
                  <Camera className="w-5 h-5 mb-1 text-teal-light" />
                  <span className="text-xs font-display font-bold">
                    مشاهده تمام {images.length} تصویر
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-warm-charcoal/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Lightbox Topbar */}
            <div className="flex items-center justify-between text-cream-canvas py-2 border-b border-white/10">
              <div>
                <span className="text-sm font-display font-bold block">{title}</span>
                <span className="text-xs text-cream-canvas/60 tabular-nums">
                  تصویر {currentIndex + 1} از {images.length}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-cream-canvas transition-colors"
                aria-label="بستن گالری"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Main Image & Navigation Arrows */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button
                type="button"
                onClick={goToPrev}
                className="absolute right-2 sm:right-6 z-10 p-3 sm:p-4 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
                aria-label="تصویر قبلی"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={images[currentIndex]}
                alt={`${title} - نمای بزرگ`}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] max-w-full object-contain rounded-editorial-md shadow-2xl select-none"
              />

              <button
                type="button"
                onClick={goToNext}
                className="absolute left-2 sm:left-6 z-10 p-3 sm:p-4 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
                aria-label="تصویر بعدی"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Bottom Thumbnails Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-14 h-14 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                    idx === currentIndex
                      ? 'border-teal scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt="پیش‌نمایش"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
