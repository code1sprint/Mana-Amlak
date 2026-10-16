import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/src/lib/gsap';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** Keep ScrollTrigger + Lenis on the same GSAP ticker (one RAF loop). */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    document.documentElement.classList.add('lenis-active');

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(update);
      document.documentElement.classList.remove('lenis-active');
    };
  }, [lenis]);

  return null;
}

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return null;
}

/**
 * Smooth scroll (Lenis) synced to GSAP's ticker so ScrollTrigger
 * and tweens share one RAF loop. Disabled when prefers-reduced-motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
        autoToggle: true,
      }}
    >
      <LenisGsapBridge />
      <ScrollToTopOnNavigate />
      {children}
    </ReactLenis>
  );
}

export { useLenis };
