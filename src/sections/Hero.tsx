import { lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';
import { useIsDesktopPointer, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { scrollToHash } from '../hooks/useSmoothScroll';
import { LineReveal } from '../components/Reveal';
import { revealEase } from '../utils/motion';
import { MagneticButton } from '../components/MagneticButton';

// Code-split: the canvas never ships to mobile bundles' critical path.
const DotField = lazy(() => import('../components/DotField').then((m) => ({ default: m.DotField })));

export function Hero() {
  const { t, data } = useLocale();
  const { profile } = data;
  const desktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const interactive = desktop && !reduced;

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 80]);
  const fade = useTransform(scrollY, [0, 400], [1, reduced ? 1 : 0]);

  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    history.replaceState(null, '', href);
    scrollToHash(href);
  };

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: revealEase, delay },
  });

  return (
    <section
      id="hero"
      aria-label={t.hero.intro}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-32 md:pb-14"
    >
      {interactive && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 [mask-image:radial-gradient(70%_70%_at_60%_40%,black,transparent)]">
            <DotField />
          </div>
        </Suspense>
      )}

      {/* Soft vignette so type always sits on a calm surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_20%_90%,rgba(10,10,11,0.9),transparent_70%)]"
      />

      <div className="container-x relative">
        {/* Top metadata row */}
        <motion.div
          {...fadeIn(0.1)}
          className="mb-10 flex flex-wrap items-center justify-between gap-4 md:mb-16"
        >
          <p className="text-meta">{profile.kicker}</p>
          <p className="flex items-center gap-2 text-meta">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.status}
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          {/* `@container` lets the title scale with its own column, not the viewport — on
              lg+ it only gets 8/12 of the width, and a vw-based size overflowed the column. */}
          <motion.div style={{ y: titleY }} className="@container lg:col-span-8">
            <motion.p {...fadeIn(0.2)} className="mb-5 text-[0.95rem] tracking-[-0.01em] text-paper-2 md:text-base">
              {profile.name}
            </motion.p>
            <h1 className="text-display text-[clamp(3.4rem,min(13.5vw,18.5cqw),11.5rem)] text-paper">
              <LineReveal lines={profile.titleLines} immediate delay={0.25} stagger={0.12} />
            </h1>
          </motion.div>

          <motion.div style={{ opacity: fade }} className="lg:col-span-4 lg:pb-3">
            <motion.p
              {...fadeIn(0.7)}
              className="max-w-[30ch] text-[1.05rem] leading-relaxed text-paper-2 md:text-lg"
            >
              {profile.tagline}
            </motion.p>
            <motion.div {...fadeIn(0.85)} className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                href={profile.primaryCta.href}
                onClick={(e) => handleCta(e, profile.primaryCta.href)}
              >
                {profile.primaryCta.label}
              </MagneticButton>
              <MagneticButton
                href={profile.secondaryCta.href}
                variant="outline"
                onClick={(e) => handleCta(e, profile.secondaryCta.href)}
              >
                {profile.secondaryCta.label}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom rail: location + scroll indicator */}
        <motion.div
          {...fadeIn(1)}
          className="mt-14 flex items-center justify-between border-t border-line pt-5 md:mt-20"
        >
          <p className="text-meta">{profile.location}</p>
          <a
            href="#work"
            onClick={(e) => handleCta(e, '#work')}
            data-cursor="link"
            className="group flex items-center gap-3 text-meta transition-colors hover:text-paper"
          >
            <span>{t.hero.scroll}</span>
            <span className="grid size-8 place-items-center overflow-hidden rounded-full border border-line-strong">
              <ArrowDown
                size={14}
                strokeWidth={1.5}
                className="animate-[bounce_2.4s_ease-in-out_infinite] motion-reduce:animate-none"
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
