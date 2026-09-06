/**
 * Post-build step for GitHub Pages.
 *
 * Vite emits a single index.html, but the site now has a page per project. This
 * script writes a real HTML file for every project route — with its own title,
 * description, canonical and Open Graph tags — plus a 404.html fallback and a
 * sitemap that lists every page. The content comes from the same data files the
 * app uses, so nothing is duplicated by hand.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/** Bundles the TypeScript content files and imports them, so the SEO text has one source. */
async function loadPortfolio() {
  const result = await build({
    entryPoints: [join(root, 'src/data/portfolio.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
    define: { 'import.meta.env.BASE_URL': '"/"' },
  });
  const code = result.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

const escape = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function replaceMeta(html, { title, description, url, image, imageAlt, imageSize }) {
  const rules = [
    [/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`],
    [/(<meta name="description" content=")[\s\S]*?(")/, `$1${escape(description)}$2`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:title" content=")[\s\S]*?(")/, `$1${escape(title)}$2`],
    [/(<meta property="og:description" content=")[\s\S]*?(")/, `$1${escape(description)}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`],
    [/(<meta name="twitter:title" content=")[\s\S]*?(")/, `$1${escape(title)}$2`],
    [/(<meta name="twitter:description" content=")[\s\S]*?(")/, `$1${escape(description)}$2`],
    [/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`],
    [/(<meta property="og:image:width" content=")[^"]*(")/, `$1${imageSize[0]}$2`],
    [/(<meta property="og:image:height" content=")[^"]*(")/, `$1${imageSize[1]}$2`],
    [/(<meta property="og:image:alt" content=")[\s\S]*?(")/, `$1${escape(imageAlt)}$2`],
    [/(<meta property="og:type" content=")[^"]*(")/, `$1article$2`],
  ];
  return rules.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), html);
}

const { portfolioByLocale } = await loadPortfolio();
const template = await readFile(join(dist, 'index.html'), 'utf8');
const site = (/<link rel="canonical" href="([^"]+)"/.exec(template)?.[1] ?? 'https://ukaukaa.github.io/').replace(/\/$/, '');

const { projects, profile } = portfolioByLocale.en;
const pages = [];

for (const project of projects) {
  const url = `${site}/projects/${project.id}/`;
  const cover = project.detail.gallery[0]?.src ?? project.image;
  const html = replaceMeta(template, {
    title: `${project.title} — ${profile.name}`,
    description: project.detail.tagline,
    url,
    image: cover ? `${site}${cover}` : `${site}/og-image.png`,
    // Screenshots are captured at 1600×1000; the shared fallback card is 1200×630.
    imageSize: cover ? [1600, 1000] : [1200, 630],
    imageAlt: project.imageAlt ?? project.title,
  });
  const dir = join(dist, 'projects', project.id);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
  pages.push(url);
  console.log(`prerendered /projects/${project.id}`);
}

// Unknown deep links still boot the app, which falls back to the home page.
await writeFile(join(dist, '404.html'), template, 'utf8');

const today = new Date().toISOString().slice(0, 10);
const urls = [{ loc: `${site}/`, priority: '1.0' }, ...pages.map((loc) => ({ loc, priority: '0.8' }))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');
console.log(`sitemap: ${urls.length} urls`);
