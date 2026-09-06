/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — ENTRY POINT
 *
 *  Where to edit:
 *   • shared.ts          — links, email, technologies, screenshots, stack tags
 *   • portfolio.en.ts    — English text
 *   • portfolio.uk.ts    — Ukrainian text
 *   • ../i18n/ui.ts      — interface labels (nav, section titles, buttons)
 *
 *  This file only merges them into the `PortfolioData` shape components consume.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Locale } from '../i18n/types';
import { shared, type ProjectKey, type StackKey } from './shared';
import type { About, ContactSection, Experience, PortfolioData, Profile, Project, ProjectDetail } from './types';
import { en } from './portfolio.en';
import { uk } from './portfolio.uk';

/** The translatable half of a project's page: gallery captions are keyed by the keys in shared.ts. */
export type LocalizedProjectDetail = Omit<ProjectDetail, 'gallery'> & {
  gallery: Record<string, string>;
};

/** The translatable half of the content. Every locale file must satisfy this. */
export interface LocalizedContent {
  profile: Omit<Profile, 'shortName' | 'email'>;
  about: About;
  projects: Record<
    ProjectKey,
    Pick<Project, 'title' | 'description' | 'year' | 'category' | 'imageAlt'> & { detail: LocalizedProjectDetail }
  >;
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
    projects: projectKeys.map((id) => {
      const { gallery, ...links } = shared.projects[id];
      const { detail, ...text } = content.projects[id];
      return {
        id,
        ...links,
        ...text,
        detail: {
          ...detail,
          // Pair each screenshot with its caption for the active language.
          gallery: gallery.map((shot) => ({ src: shot.src, caption: detail.gallery[shot.key] ?? '' })),
        },
      };
    }),
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
};

/** Ids of every project, in the order they are shown. */
export const projectIds = Object.keys(shared.projects) as ProjectKey[];

/**
 * Route of a project's own page. The trailing slash matches what GitHub Pages
 * serves for `dist/projects/<id>/index.html`, so no request is redirected.
 */
export function projectPath(id: string): string {
  return `/projects/${id}/`;
}

export const navLinks = [
  { key: 'work', href: '#work', id: 'work' },
  { key: 'about', href: '#about', id: 'about' },
  { key: 'stack', href: '#stack', id: 'stack' },
  { key: 'testimonials', href: '#testimonials', id: 'testimonials' },
  { key: 'contact', href: '#contact', id: 'contact' },
] as const;
