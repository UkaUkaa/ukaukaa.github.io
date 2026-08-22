import type { LocalizedContent } from './portfolio';

export const en: LocalizedContent = {
  profile: {
    name: 'Alexandr Filinskyi',
    kicker: 'Portfolio / 2026',
    titleLines: ['Software', 'Engineer'],
    tagline: 'Building software, automation and digital products.',
    status: 'Open to new projects',
    location: 'Ukraine',
    primaryCta: { label: 'View Work', href: '#work' },
    secondaryCta: { label: 'Contact', href: '#contact' },
  },
  about: {
    statement: 'I build software that solves real problems.',
    paragraphs: [
      'I am a full-stack engineer with 7+ years of experience. I design and ship web applications on Python (FastAPI, Flask) and React / TypeScript, build Telegram and Discord bots, write parsers and browser automation, and wire it all together with APIs, databases and Docker.',
      'I work remotely with clients and teams worldwide — from a one-line brief to a production launch, including load testing and deployment. I value clear communication, realistic deadlines and solutions that keep working after delivery.',
    ],
    specialties: ['Web Applications', 'Automation & Scripting', 'APIs & Integrations', 'Developer Tooling'],
    facts: [
      { label: 'Location', value: 'Ukraine' },
      { label: 'Experience', value: '7+ years' },
      { label: 'Work format', value: 'Remote · worldwide' },
      { label: 'Availability', value: 'Open to work' },
    ],
    team: {
      label: 'How I work',
      title: 'Solo by default. A team when it speeds things up.',
      text: 'When a project calls for it, I bring in a small trusted team I have worked with for years — frontend, backend and automation run in parallel and ship faster. Most projects I deliver myself; the team joins only where it genuinely helps.',
      modes: [
        { name: 'Solo', tag: 'Default', description: 'One point of contact, full ownership of the code and the result.' },
        { name: 'Team', tag: 'On demand', description: 'Parallel tracks for bigger scopes and tighter deadlines — same quality bar, same contact person.' },
      ],
    },
  },
  projects: {
    zkkbp: {
      title: 'ZKKBP — College Website & LMS',
      description: 'Official website of Zhytomyr Cooperative College of Business and Law, built from scratch and launched to production. Beyond the public site with news and admissions info it includes an admin panel, a student/teacher e-cabinet with schedules and grades, and a learning portal with courses. PageSpeed 90+: server-side caching, Gzip/Brotli compression, WebP images and lazy loading. SEO configured end to end — semantic markup, meta tags, sitemap and robots — so the college ranks well in search. Load-tested and stable under concurrent traffic.',
      year: '2025',
      category: 'Web Platform · LMS',
      imageAlt: 'ZKKBP college website homepage',
    },
    djinni: {
      title: 'Djinni Auto-Apply Bot',
      description: 'A Selenium bot that applies to jobs on Djinni for the client around the clock. It signs in, walks through the subscribed job feeds page by page, skips companies from a blacklist, deduplicates vacancies in MongoDB so nothing is applied to twice, and submits a cover message automatically. Every successful application lands in a Telegram bot with a link; vacancies with extra screening questions are flagged for manual review. Runs unattended on a schedule, keeps CSV logs and supports remote browsers via Selenoid.',
      year: '2024',
      category: 'Automation · Bot',
      imageAlt: 'Telegram bot feed with successful Djinni applications',
    },
    autocast: {
      title: 'Autocast — Car Audio & Electronics Store',
      description: 'Website and online store for a car audio, lighting and electronics service, built on Next.js 15 with Supabase. Full e-commerce flow: product catalog with filters and smart search, product pages with galleries, persistent cart, multi-step checkout with Nova Poshta delivery, user accounts with Google sign-in, and an admin panel for products, orders and analytics. Heavily optimised: server rendering with caching and revalidation, next/image with lazy loading, code splitting, Sentry monitoring and a Vitest + Playwright test suite. SEO done properly — per-page metadata, JSON-LD structured data, sitemap and robots.',
      year: '2026',
      category: 'E-commerce · Web Platform',
      imageAlt: 'Autocast homepage with hero section and product search',
    },
  },
  stackCategories: {
    frontend: 'Frontend',
    backend: 'Backend',
    automation: 'Automation',
    databases: 'Databases',
    devops: 'DevOps',
    tools: 'Tools & Mobile',
  },
  experience: [
    {
      id: 'exp-01',
      role: 'Your Role',
      company: 'Company / Client',
      period: '2025 — Present',
      description: 'Describe what you did, what you owned and what changed because of your work.',
      highlights: ['Highlight placeholder', 'Highlight placeholder'],
    },
    {
      id: 'exp-02',
      role: 'Your Role',
      company: 'Company / Client',
      period: '2023 — 2025',
      description: 'Describe what you did, what you owned and what changed because of your work.',
    },
    {
      id: 'exp-03',
      role: 'Your Role',
      company: 'Company / Client',
      period: '2021 — 2023',
      description: 'Describe what you did, what you owned and what changed because of your work.',
    },
  ],
  contact: {
    headlineLines: ["Let's", 'build', 'something.'],
    description: 'Have a project, an idea or a role in mind? Send a message — I usually reply within a day.',
    cta: { label: 'Start a project', href: 'mailto:Filinskyi.a@gmail.com' },
  },
  marquee: ['Software', 'Automation', 'Web Apps', 'APIs', 'Tooling', 'Integrations'],
};
