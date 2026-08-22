import { createContext } from 'react';
import type { Locale } from './types';

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);
