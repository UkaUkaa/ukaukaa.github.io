import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

/** Scrolls to an anchor target, honouring Lenis when active and native scroll otherwise. */
export function scrollToHash(hash: string): void {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Mounts Lenis smooth scrolling. Disabled for reduced-motion users and on coarse pointers
 * where native momentum scrolling is the better experience.
 */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}
