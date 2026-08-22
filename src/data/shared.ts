/**
 * Language-independent values: links, email, short name, marquee keywords.
 * Edit these once; they are merged into every locale's content.
 */
import type { SocialLink } from './types';

export const shared = {
  shortName: 'YN',
  email: 'hello@example.com',
  socials: [
    { platform: 'email', label: 'Email', href: 'mailto:hello@example.com' },
    { platform: 'github', label: 'GitHub', href: 'https://github.com/USERNAME' },
    { platform: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/USERNAME' },
    { platform: 'telegram', label: 'Telegram', href: 'https://t.me/USERNAME' },
  ] satisfies readonly SocialLink[],
  /** Per-project links and technologies, keyed by project id (same ids in every locale file). */
  projects: {
    'project-01': {
      technologies: ['Technology', 'Technology', 'Technology'],
      github: 'https://github.com/USERNAME/project',
      liveDemo: 'https://example.com',
      // image: '/projects/project-01.webp',
    },
    'project-02': {
      technologies: ['Technology', 'Technology'],
      github: 'https://github.com/USERNAME/project',
    },
    'project-03': {
      technologies: ['Technology', 'Technology', 'Technology', 'Technology'],
      liveDemo: 'https://example.com',
    },
  },
  /** Stack tags are usually technology names — identical in all languages. */
  stackSkills: {
    frontend: ['Technology', 'Technology', 'Technology', 'Technology'],
    backend: ['Technology', 'Technology', 'Technology'],
    automation: ['Technology', 'Technology', 'Technology'],
    databases: ['Technology', 'Technology'],
    devops: ['Technology', 'Technology', 'Technology'],
    tools: ['Technology', 'Technology', 'Technology', 'Technology'],
  },
} as const;

export type ProjectKey = keyof typeof shared.projects;
export type StackKey = keyof typeof shared.stackSkills;
