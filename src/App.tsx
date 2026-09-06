import { lazy, Suspense, useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { LocaleProvider } from './i18n/LocaleContext';
import { useLocale } from './i18n/useLocale';
import { useIsDesktopPointer, usePrefersReducedMotion } from './hooks/useMediaQuery';
import { useSmoothScroll, scrollToHash, scrollToTop } from './hooks/useSmoothScroll';
import { useRoute } from './router/router';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Work } from './sections/Work';
import { About } from './sections/About';
import { Stack } from './sections/Stack';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';
import { ProjectPage } from './pages/ProjectPage';

const CustomCursor = lazy(() =>
  import('./components/CustomCursor').then((m) => ({ default: m.CustomCursor })),
);

function Home() {
  const { data } = useLocale();
  return (
    <main id="main">
      <Hero />
      <Marquee items={data.marquee} />
      <Work />
      <About />
      <Stack />
      <Testimonials />
      <Contact />
    </main>
  );
}

function Site() {
  const { t, data } = useLocale();
  const route = useRoute();
  const desktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();

  useSmoothScroll(desktop && !reduced);

  const project = route.name === 'project' ? data.projects.find((p) => p.id === route.id) : undefined;

  // Keep <title>, description and canonical in sync with the page and the language.
  useEffect(() => {
    document.title = project ? `${project.title} — ${data.profile.name}` : t.meta.title;
    const description = project ? project.detail.tagline : t.meta.description;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `${location.origin}${location.pathname}`);
  }, [t, project, data.profile.name]);

  // A project page always opens at the top; the home page honours a deep link like /#work.
  const routeKey = route.name === 'project' ? `project:${route.id}` : 'home';
  const hash = route.name === 'home' ? route.hash : '';
  const firstRender = useRef(true);
  useEffect(() => {
    const initial = firstRender.current;
    firstRender.current = false;
    if (!hash) {
      // On the first render the browser is already where it should be; only a
      // navigation inside the app resets the scroll position.
      if (!initial) scrollToTop();
      return;
    }
    // Wait a frame so the section exists and fonts/layout have settled.
    const id = requestAnimationFrame(() => scrollToHash(hash));
    return () => cancelAnimationFrame(id);
  }, [routeKey, hash]);

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

        {route.name === 'project' ? <ProjectPage key={route.id} id={route.id} /> : <Home />}

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
