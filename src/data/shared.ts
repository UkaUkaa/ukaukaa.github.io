/**
 * Language-independent values: links, email, short name, marquee keywords.
 * Edit these once; they are merged into every locale's content.
 */
import type { SocialLink } from './types';

export const shared = {
  shortName: 'AF',
  email: 'Filinskyi.a@gmail.com',
  socials: [
    { platform: 'email', label: 'Email', href: 'mailto:Filinskyi.a@gmail.com' },
    { platform: 'github', label: 'GitHub', href: 'https://github.com/UkaUkaa/' },
    // { platform: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/USERNAME' },
    { platform: 'telegram', label: 'Telegram', href: 'https://t.me/ukaukaa' },
    { platform: 'freelancehunt', label: 'Freelancehunt', href: 'https://freelancehunt.com/freelancer/H3210.html' },
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
    frontend: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'TanStack Query', 'React Hook Form', 'Zod', 'Radix UI'],
    backend: ['Python', 'FastAPI', 'Flask', 'Node.js', 'Express', 'Next.js API Routes', 'REST API', 'SQLAlchemy', 'Pydantic', 'Celery', 'WebSockets', 'Jinja2', 'Nodemailer', 'C# / .NET', 'Supabase'],
    automation: ['Playwright', 'Selenium', 'Patchright', 'Requests / httpx', 'uiautomator2 / ADB', 'OpenCV', 'APScheduler', 'CrewAI / LangChain', 'Anthropic API', 'Telegram API'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'MariaDB', 'Alembic'],
    devops: ['Docker', 'Docker Compose', 'Nginx', 'Gunicorn / Uvicorn', 'GitHub Actions', 'Linux', 'Sentry'],
    tools: ['Git', 'Pytest', 'Vitest', 'Ruff / mypy', 'ESLint', 'Flutter / Dart', 'Kivy / Buildozer', 'Claude Code'],
  },
} as const;

export type ProjectKey = keyof typeof shared.projects;
export type StackKey = keyof typeof shared.stackSkills;
