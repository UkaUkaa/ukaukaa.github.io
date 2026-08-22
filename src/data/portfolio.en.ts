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
