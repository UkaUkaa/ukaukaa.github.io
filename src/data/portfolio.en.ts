import type { LocalizedContent } from './portfolio';

export const en: LocalizedContent = {
  profile: {
    name: 'Your Name',
    kicker: 'Portfolio / 2026',
    titleLines: ['Software', 'Engineer'],
    tagline: 'Building software, automation and digital products.',
    status: 'Open to new projects',
    location: 'Your City, Country',
    primaryCta: { label: 'View Work', href: '#work' },
    secondaryCta: { label: 'Contact', href: '#contact' },
  },
  about: {
    statement: 'I build software that solves real problems.',
    paragraphs: [
      'Short description goes here. Two or three sentences about what you do, how you work and what kind of problems you enjoy solving.',
      'Second paragraph placeholder. Mention your focus areas, the type of teams or clients you work with, and what you are looking for next.',
    ],
    specialties: ['Web Applications', 'Automation & Scripting', 'APIs & Integrations', 'Developer Tooling'],
    facts: [
      { label: 'Location', value: 'Your City, Country' },
      { label: 'Experience', value: 'X+ years' },
      { label: 'Focus', value: 'Your focus area' },
      { label: 'Availability', value: 'Open to work' },
    ],
  },
  projects: {
    'project-01': {
      title: 'Your Project',
      description: 'Project description goes here. What problem it solves, who it is for and what made it interesting to build.',
      year: '2026',
      category: 'Web Application',
    },
    'project-02': {
      title: 'Your Project',
      description: 'Project description goes here. Keep it short, concrete and outcome-oriented.',
      year: '2026',
      category: 'Automation',
    },
    'project-03': {
      title: 'Your Project',
      description: 'Project description goes here. Replace this entry or add more — the layout adapts automatically.',
      year: '2025',
      category: 'API / Backend',
    },
  },
  stackCategories: {
    frontend: 'Frontend',
    backend: 'Backend',
    automation: 'Automation',
    databases: 'Databases',
    devops: 'DevOps',
    tools: 'Tools',
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
    cta: { label: 'Start a project', href: 'mailto:hello@example.com' },
  },
  marquee: ['Software', 'Automation', 'Web Apps', 'APIs', 'Tooling', 'Integrations'],
};
