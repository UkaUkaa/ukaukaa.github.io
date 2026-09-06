export type SocialPlatform = 'github' | 'linkedin' | 'telegram' | 'email' | 'twitter' | 'website' | 'freelancehunt';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface Profile {
  /** Full name shown in the hero, footer and structured data. */
  name: string;
  /** Short label used in the navigation logo (e.g. initials). */
  shortName: string;
  /** Professional title, split into lines for the hero display type. */
  titleLines: readonly string[];
  /** One-sentence positioning statement under the hero title. */
  tagline: string;
  /** Short technical label shown above the name (e.g. "Portfolio / 2026"). */
  kicker: string;
  /** Availability / status line shown in the hero metadata. */
  status: string;
  location: string;
  email: string;
  /** Hero call-to-action labels. */
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface About {
  /** Big statement line. */
  statement: string;
  paragraphs: readonly string[];
  specialties: readonly string[];
  /** Small metadata facts shown beside the text. */
  facts: readonly { label: string; value: string }[];
  /** "Solo / Team" panel: how the work gets staffed. */
  team: {
    label: string;
    title: string;
    text: string;
    modes: readonly { name: string; tag: string; description: string }[];
  };
}

/** One screenshot on a project page: the file plus its localized caption. */
export interface ProjectShot {
  src: string;
  caption: string;
}

/** A single capability of the product, shown as a numbered card on the project page. */
export interface ProjectFeature {
  title: string;
  text: string;
}

/** Everything that only the dedicated /projects/<id> page shows. */
export interface ProjectDetail {
  /** One sentence under the title — what the product is, in plain words. */
  tagline: string;
  /** Long-form paragraphs: the problem, the solution, what shipped. */
  overview: readonly string[];
  /** Facts column: role, timeline, scope, status… */
  facts: readonly { label: string; value: string }[];
  /** What the product does. */
  features: readonly ProjectFeature[];
  /** Engineering notes — the interesting technical decisions. */
  engineering: readonly ProjectFeature[];
  /** Screenshots, in the order they should be shown. */
  gallery: readonly ProjectShot[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  category: string;
  technologies: readonly string[];
  /** Path to an image under /public (e.g. "/projects/my-app.webp"). Leave empty for the placeholder. */
  image?: string;
  imageAlt?: string;
  github?: string;
  liveDemo?: string;
  /** Content of the project's own page. */
  detail: ProjectDetail;
}

export interface SkillCategory {
  name: string;
  skills: readonly string[];
}

export type Skill = string;

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: readonly string[];
}

export interface ContactSection {
  headlineLines: readonly string[];
  description: string;
  cta: { label: string; href: string };
}

export interface PortfolioData {
  profile: Profile;
  about: About;
  projects: readonly Project[];
  stack: readonly SkillCategory[];
  experience: readonly Experience[];
  contact: ContactSection;
  socials: readonly SocialLink[];
  /** Keywords shown in the marquee strip between sections. */
  marquee: readonly string[];
}
