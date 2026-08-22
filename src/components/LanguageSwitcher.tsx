import { motion } from 'framer-motion';
import { LOCALES, type Locale } from '../i18n/types';
import { useLocale } from '../i18n/useLocale';
import { cn } from '../utils/cn';

const LABELS: Record<Locale, string> = { en: 'EN', uk: 'UK', ru: 'RU' };
const NAMES: Record<Locale, string> = { en: 'English', uk: 'Українська', ru: 'Русский' };

interface LanguageSwitcherProps {
  className?: string;
  /** Larger tap targets for the mobile menu. */
  size?: 'sm' | 'lg';
}

export function LanguageSwitcher({ className, size = 'sm' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn('flex items-center rounded-full border border-line p-1', className)}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={NAMES[code]}
            data-cursor="link"
            className={cn(
              'relative rounded-full font-mono uppercase tracking-[0.14em] transition-colors duration-300',
              size === 'sm' ? 'px-2.5 py-1 text-[0.62rem]' : 'px-4 py-2 text-[0.75rem]',
              active ? 'text-ink' : 'text-mute hover:text-paper',
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-active-${size}`}
                className="absolute inset-0 rounded-full bg-paper"
                transition={{ type: 'spring', stiffness: 400, damping: 36 }}
              />
            )}
            <span className="relative z-10">{LABELS[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
