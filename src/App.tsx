import { lazy, Suspense, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { LocaleProvider } from './i18n/LocaleContext';
import { useLocale } from './i18n/useLocale';
import { useIsDesktopPointer, usePrefersReducedMotion } from './hooks/useMediaQuery';
import { useSmoothScroll, scrollToHash } from './hooks/useSmoothScroll';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Work } from './sections/Work';
import { About } from './sections/About';
import { Stack } from './sections/Stack';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';

const CustomCursor = lazy(() =>
  import('./components/CustomCursor').then((m) => ({ default: m.CustomCursor })),
);

function Site() {
  const { t, data } = useLocale();
  const desktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();

  useSmoothScroll(desktop && !reduced);

  // Keep <title> and description in sync with the active language.
  useEffect(() => {
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [t]);

  // Deep links like /#work should land on the section after fonts/layout settle.
  useEffect(() => {
    if (!location.hash) return;
    const id = requestAnimationFrame(() => scrollToHash(location.hash));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <ScrollProgress />
        {desktop && !reduced && (
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
        )}
        <Navigation />

        <main id="main">
          <Hero />
          <Marquee items={data.marquee} />
          <Work />
          <About />
          <Stack />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Site />
    </LocaleProvider>
  );
}
