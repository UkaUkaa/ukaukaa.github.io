import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './types';
import { LocaleContext } from './context';

const STORAGE_KEY = 'portfolio:locale';

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Priority: ?lang= query → saved choice → browser language → default. */
function detectLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(fromQuery)) return fromQuery;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(saved)) return saved;
  for (const lang of navigator.languages ?? [navigator.language]) {
    const short = lang.slice(0, 2).toLowerCase();
    if (isLocale(short)) return short;
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
