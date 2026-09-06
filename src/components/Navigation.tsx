import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/portfolio';
import { useLocale } from '../i18n/useLocale';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToHash } from '../hooks/useSmoothScroll';
import { href as routeHref, navigate, useRoute } from '../router/router';
import { cn } from '../utils/cn';
import { LanguageSwitcher } from './LanguageSwitcher';

const SECTION_IDS = navLinks.map((l) => l.id);
/** Off the home page there is no section to highlight — a stable empty array keeps the effect quiet. */
const NO_SECTIONS: readonly string[] = [];

export function Navigation() {
  const { t, data } = useLocale();
  const { profile, socials } = data;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const route = useRoute();
  const onHome = route.name === 'home';
  const active = useActiveSection(onHome ? SECTION_IDS : NO_SECTIONS);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Lock body scroll while the mobile menu is open, close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // On the home page these are in-page anchors; anywhere else they navigate home first.
  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      history.replaceState(null, '', hash);
      scrollToHash(hash);
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        {t.nav.skip}
      </a>

      <motion.div
        className="container-x flex items-center justify-between gap-4"
        animate={{ paddingTop: scrolled ? 14 : 28, paddingBottom: scrolled ? 14 : 28 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href={routeHref('/#hero')}
          onClick={(e) => handleAnchor(e, '#hero')}
          data-cursor="link"
          aria-label={`${profile.name} — ${t.nav.backToTop}`}
          className="flex items-center gap-3 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-paper"
        >
          <span className="grid size-8 place-items-center rounded-full border border-line-strong text-[0.65rem]">
            {profile.shortName}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        {/* Desktop nav — floating glass pill */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul
            className={cn(
              'flex items-center gap-1 rounded-full border p-1 transition-all duration-500',
              scrolled ? 'border-line bg-ink/60 backdrop-blur-xl' : 'border-transparent bg-transparent',
            )}
          >
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={routeHref(`/${link.href}`)}
                    onClick={(e) => handleAnchor(e, link.href)}
                    data-cursor="link"
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative z-10 block rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300',
                      isActive ? 'text-ink' : 'text-mute hover:text-paper',
                    )}
                  >
                    {t.nav[link.key]}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-paper"
                      transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden md:flex" />
          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-paper md:hidden"
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-0 z-[-1] flex flex-col justify-end overflow-y-auto bg-ink px-6 pb-10 pt-28 md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="space-y-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={routeHref(`/${link.href}`)}
                    onClick={(e) => handleAnchor(e, link.href)}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="font-mono text-[0.65rem] tracking-[0.2em] text-mute">0{i + 1}</span>
                    <span className="text-display text-[clamp(2.2rem,10vw,4rem)] font-semibold text-paper">
                      {t.nav[link.key]}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    target={s.platform === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-meta hover:text-paper"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <LanguageSwitcher size="lg" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
