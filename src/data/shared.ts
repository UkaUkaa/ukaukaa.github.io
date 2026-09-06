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
  /**
   * Per-project links, technologies and screenshots, keyed by project id
   * (the same ids appear in every locale file).
   *
   * `gallery` holds the files; the caption for each entry lives in the locale
   * files under `projects.<id>.detail.gallery.<key>`.
   */
  projects: {
    zkkbp: {
      technologies: ['Python', 'Flask', 'MongoDB', 'Jinja2', 'Gunicorn', 'Docker', 'Flask-Caching', 'Flask-Compress', 'SEO'],
      liveDemo: 'https://zkkbp.com.ua',
      image: '/projects/zkkbp.webp',
      gallery: [
        { key: 'home', src: '/projects/zkkbp/home.webp' },
        { key: 'news', src: '/projects/zkkbp/news.webp' },
        { key: 'article', src: '/projects/zkkbp/article.webp' },
        { key: 'applicants', src: '/projects/zkkbp/applicants.webp' },
        { key: 'schedule', src: '/projects/zkkbp/schedule.webp' },
      ],
    },
    autocast: {
      technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Zustand', 'Framer Motion', 'Nova Poshta API', 'Sentry', 'Playwright', 'SEO'],
      liveDemo: 'https://autocast.com.ua',
      image: '/projects/autocast.webp',
      gallery: [
        { key: 'home', src: '/projects/autocast/home.webp' },
        { key: 'shop', src: '/projects/autocast/shop.webp' },
        { key: 'product', src: '/projects/autocast/product.webp' },
        { key: 'services', src: '/projects/autocast/services.webp' },
      ],
    },
    vclub: {
      technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'next-intl', 'TanStack Query', 'Python 3.12', 'FastAPI', 'Pydantic v2', 'SQLAlchemy 2 async', 'PostgreSQL 16', 'Alembic', 'Argon2id', 'Docker Compose', 'Playwright'],
      liveDemo: 'https://vclub-dev.pp.ua/uk',
      image: '/projects/vclub/home.webp',
      gallery: [
        { key: 'home', src: '/projects/vclub/home.webp' },
        { key: 'cycle', src: '/projects/vclub/cycle.webp' },
        { key: 'features', src: '/projects/vclub/features.webp' },
        { key: 'login', src: '/projects/vclub/login.webp' },
      ],
    },
    fhradar: {
      technologies: ['Python 3.12', 'FastAPI', 'aiogram 3', 'PostgreSQL', 'Redis', 'SQLAlchemy 2 async', 'Alembic', 'React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Docker Compose', 'Nginx', 'Prometheus', 'curl_cffi', 'pytest'],
      image: '/projects/fhradar/app.webp',
      gallery: [
        { key: 'app', src: '/projects/fhradar/app.webp' },
        { key: 'bot', src: '/projects/fhradar/bot.webp' },
        { key: 'themes', src: '/projects/fhradar/themes.webp' },
      ],
    },
    djinni: {
      technologies: ['Python', 'Selenium', 'Requests', 'MongoDB', 'Pandas', 'Telegram Bot API', 'Selenoid'],
      image: '/projects/djinni.webp',
      gallery: [{ key: 'telegram', src: '/projects/djinni.webp' }],
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
