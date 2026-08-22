/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — ENTRY POINT
 *
 *  Where to edit:
 *   • shared.ts          — links, email, technologies, stack tags (same in every language)
 *   • portfolio.en.ts    — English text
 *   • portfolio.uk.ts    — Ukrainian text
 *   • portfolio.ru.ts    — Russian text
 *   • ../i18n/ui.ts      — interface labels (nav, section titles, buttons)
 *
 *  This file only merges them into the `PortfolioData` shape components consume.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Locale } from '../i18n/types';
import { shared, type ProjectKey, type StackKey } from './shared';
import type { About, ContactSection, Experience, PortfolioData, Profile, Project } from './types';
import { en } from './portfolio.en';
import { uk } from './portfolio.uk';
import { ru } from './portfolio.ru';

/** The translatable half of the content. Every locale file must satisfy this. */
export interface LocalizedContent {
  profile: Omit<Profile, 'shortName' | 'email'>;
  about: About;
  projects: Record<ProjectKey, Pick<Project, 'title' | 'description' | 'year' | 'category' | 'imageAlt'>>;
  stackCategories: Record<StackKey, string>;
  experience: readonly Experience[];
  contact: ContactSection;
  marquee: readonly string[];
}

function build(content: LocalizedContent): PortfolioData {
  const projectKeys = Object.keys(shared.projects) as ProjectKey[];
  const stackKeys = Object.keys(shared.stackSkills) as StackKey[];

  return {
    profile: { ...content.profile, shortName: shared.shortName, email: shared.email },
    about: content.about,
    projects: projectKeys.map((id) => ({ id, ...shared.projects[id], ...content.projects[id] })),
    stack: stackKeys.map((key) => ({ name: content.stackCategories[key], skills: shared.stackSkills[key] })),
    experience: content.experience,
    contact: content.contact,
    socials: shared.socials,
    marquee: content.marquee,
  };
}

export const portfolioByLocale: Record<Locale, PortfolioData> = {
  en: build(en),
  uk: build(uk),
  ru: build(ru),
};

export const navLinks = [
  { key: 'work', href: '#work', id: 'work' },
  { key: 'about', href: '#about', id: 'about' },
  { key: 'stack', href: '#stack', id: 'stack' },
  { key: 'testimonials', href: '#testimonials', id: 'testimonials' },
  { key: 'contact', href: '#contact', id: 'contact' },
] as const;
