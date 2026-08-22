import { useContext } from 'react';
import { LocaleContext } from './context';
import { ui } from './ui';
import { portfolioByLocale } from '../data/portfolio';
import type { PortfolioData } from '../data/types';
import type { Locale, UiStrings } from './types';

export interface LocaleApi {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Interface strings for the active language. */
  t: UiStrings;
  /** Portfolio content for the active language. */
  data: PortfolioData;
}

export function useLocale(): LocaleApi {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return { ...ctx, t: ui[ctx.locale], data: portfolioByLocale[ctx.locale] };
}
