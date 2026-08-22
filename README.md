# Developer Portfolio

A production-ready, one-page developer portfolio designed as a premium digital experience: dark editorial layout, large typography, cinematic-but-restrained motion, custom cursor on desktop, and a fully static build that deploys to GitHub Pages automatically.

All content is placeholder data in three languages (English, Ukrainian, Russian). Edit the files under `src/data/` to make it yours.

## Stack

- **React 18 + TypeScript** (strict mode)
- **Vite 6** — build tooling, code splitting
- **Tailwind CSS 4** — design tokens defined in `src/styles/index.css`
- **Framer Motion** — reveals, magnetic buttons, cursor, nav indicator
- **Lenis** — smooth scrolling (desktop only, disabled for reduced-motion users)
- **Lucide Icons**
- Self-hosted variable fonts: Inter (display/body) + Space Grotesk (technical metadata)

No backend, no database, no SSR. The site is 100% static.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Scripts

| Command             | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR                |
| `npm run build`     | Type-check (`tsc -b`) then build to `dist/`       |
| `npm run preview`   | Serve the production build locally                |
| `npm run lint`      | Run ESLint                                        |
| `npm run typecheck` | Type-check only                                   |

## Project structure

```
.
├── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages
├── index.html                     # SEO meta, Open Graph, Twitter, JSON-LD
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png               # 1200×630 social preview (placeholder)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── components/                # Reusable UI (Navigation, Cursor, Reveal, …)
│   ├── sections/                  # Hero, Work, About, Stack, Experience, Contact
│   ├── data/
│   │   ├── types.ts               # Typed content model
│   │   ├── shared.ts              # Links, technologies (same in every language)
│   │   ├── portfolio.en.ts        # English content
│   │   ├── portfolio.uk.ts        # Ukrainian content
│   │   ├── portfolio.ru.ts        # Russian content
│   │   └── portfolio.ts           # Merges shared + localized content
│   ├── i18n/                      # Locale context, switcher strings (ui.ts)
│   ├── hooks/                     # media queries, smooth scroll, magnetic, active section
│   ├── utils/
│   ├── styles/index.css           # Tailwind + design tokens + utilities
│   ├── App.tsx
│   └── main.tsx
└── vite.config.ts
```

## Languages (EN / UK / RU)

The site is trilingual. The language is chosen in this order: `?lang=uk` query → saved choice (localStorage) → browser language → English. A switcher sits in the navigation (desktop) and in the mobile menu. `<html lang>`, `<title>` and the meta description update on switch.

Content is split into **language-independent** and **translated** files:

| File | What lives there |
| --- | --- |
| `src/data/shared.ts` | Links, email, social profiles, project technologies / GitHub / demo URLs, stack tags |
| `src/data/portfolio.en.ts` | All English text |
| `src/data/portfolio.uk.ts` | All Ukrainian text |
| `src/data/portfolio.ru.ts` | All Russian text |
| `src/i18n/ui.ts` | Interface labels (nav, section titles, buttons, SEO title/description) |

Adding a fourth language: add the code to `LOCALES` in `src/i18n/types.ts`, create `portfolio.xx.ts`, register it in `portfolioByLocale` (`src/data/portfolio.ts`) and in `ui.ts`, and add its label in `LanguageSwitcher.tsx`. TypeScript will flag anything you miss.

## Customisation

### Adding a project
1. In `src/data/shared.ts` add a key to `projects` with the technologies and links:

```ts
'my-app': {
  technologies: ['TypeScript', 'React', 'FastAPI'],
  github: 'https://github.com/USERNAME/my-app',
  liveDemo: 'https://my-app.example.com',
  image: '/projects/my-app.webp',   // put the file in public/projects/
},
```

2. In **each** of `portfolio.en.ts`, `portfolio.uk.ts`, `portfolio.ru.ts` add the same key with `title`, `description`, `year`, `category` (and optional `imageAlt`). The compiler errors until all three languages have the entry.

Leave `image` out to show the built-in placeholder. Use WebP/AVIF at ~1600px wide for a sharp 16:10 image under ~150 KB.

### Skills / stack
Tags: `stackSkills` in `shared.ts`. Category names: `stackCategories` in each language file. Adding a category key to `shared.ts` requires a name in all three language files.

### Name, bio, experience, contact
Edit `profile`, `about`, `experience`, `contact` in each language file; `shortName`, `email` and `socials` in `shared.ts`.

### Colours & fonts
Design tokens are CSS variables in `src/styles/index.css` under `@theme`. Change `--color-accent` to swap the single accent colour site-wide.

## SEO configuration

Search for `USERNAME` and `Your Name` and replace them in:

- `index.html` — title, description, keywords, author, canonical, Open Graph, Twitter, JSON-LD (`Person` + `WebSite`)
- `public/robots.txt` — sitemap URL
- `public/sitemap.xml` — site URL and `lastmod`
- `public/site.webmanifest` — app name
- `src/data/shared.ts` — social links
- `src/i18n/ui.ts` — per-language `<title>` and meta description (applied on language switch)

Replace `public/og-image.png` with your own 1200×630 image.

## Deploying to GitHub Pages

This project targets a **user site**: `https://USERNAME.github.io/`.

1. Create a repository named exactly `USERNAME.github.io` (your GitHub username, lowercase).
2. Push this project to the `main` branch.
3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` runs `.github/workflows/deploy.yml`: install → lint → build → deploy `dist/`.

`vite.config.ts` uses `base: "/"`, which is correct for a user site.
For a **project site** (`https://USERNAME.github.io/repo-name/`) change it to `base: "/repo-name/"` and update all absolute URLs in `index.html`, `robots.txt` and `sitemap.xml`.

## Performance & accessibility notes

- Custom cursor, smooth scroll and the hero dot-field are only loaded on desktop pointers and are skipped entirely under `prefers-reduced-motion`.
- Framer Motion honours the user's reduced-motion preference through `MotionConfig`.
- Images are lazy-loaded; React and Framer Motion are split into separate cached chunks.
- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`), a single `h1`, visible focus rings, skip link, and `aria-current` on the active nav item.

## License

MIT — use it for your own portfolio.
