export const LOCALES = ['en', 'uk', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Interface strings that live in components (not in the portfolio content). */
export interface UiStrings {
  meta: { title: string; description: string };
  nav: { work: string; about: string; stack: string; contact: string; skip: string; openMenu: string; closeMenu: string; backToTop: string; language: string };
  hero: { scroll: string; intro: string };
  sections: {
    work: { label: string; title: string; addHint: string; viewProject: string; liveDemo: string; github: string; technologies: string; imagePlaceholder: string; addImage: string };
    about: { label: string; title: string; specialties: string };
    stack: { label: string; title: string };
    experience: { label: string; title: string };
    contact: { label: string };
  };
  cursor: { view: string };
}
