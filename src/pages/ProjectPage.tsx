import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';
import { projectPath } from '../data/portfolio';
import type { Project } from '../data/types';
import { padIndex } from '../utils/format';
import { cn } from '../utils/cn';
import { Reveal } from '../components/Reveal';
import { Link } from '../components/Link';

interface ProjectPageProps {
  id: string;
}

/** A project's own page: cover, facts, long-form description, features and screenshots. */
export function ProjectPage({ id }: ProjectPageProps) {
  const { t, data } = useLocale();
  const index = data.projects.findIndex((p) => p.id === id);
  const project = data.projects[index];

  // The router only resolves ids that exist, but a stale link should not crash the page.
  if (!project) return null;

  const { detail } = project;
  const next = data.projects[(index + 1) % data.projects.length] ?? project;
  const cover = detail.gallery[0] ?? (project.image ? { src: project.image, caption: '' } : undefined);
  const rest = detail.gallery.slice(1);

  return (
    <main id="main" className="pb-24 pt-28 md:pt-36">
      <article className="container-x">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            to="/#work"
            data-cursor="link"
            className="link-underline inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute hover:text-paper"
          >
            <ArrowLeft size={13} strokeWidth={1.75} /> {t.project.back}
          </Link>
          <span aria-hidden className="text-meta">
            /
          </span>
          <span className="text-meta">
            {t.project.breadcrumb} — {padIndex(index)}
          </span>
        </Reveal>

        <header className="mt-10 grid gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-light tracking-[-0.02em] text-mute-2">
                {padIndex(index)}
              </span>
              <span className="text-meta">
                {project.category} · {project.year}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-paper">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.14} as="p" className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-paper-2">
              {detail.tagline}
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-6">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-accent"
                >
                  {t.sections.work.liveDemo} <ArrowUpRight size={14} strokeWidth={1.75} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="link-underline inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-2 hover:text-paper"
                >
                  <Github size={14} strokeWidth={1.5} /> {t.sections.work.github}
                </a>
              )}
            </Reveal>
          </div>

          {/* Facts */}
          <Reveal delay={0.1} className="md:col-span-4 md:pl-6">
            <h2 className="text-meta text-paper-2">{t.project.details}</h2>
            <dl className="mt-5 space-y-4">
              {detail.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-3">
                  <dt className="text-meta">{fact.label}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-snug text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        {/* ── Cover ──────────────────────────────────────────────────────── */}
        {cover && (
          <Reveal as="figure" amount={0.15} className="mt-14 md:mt-20">
            <Shot src={cover.src} alt={project.imageAlt ?? project.title} priority />
            {cover.caption && <figcaption className="mt-3 text-meta">{cover.caption}</figcaption>}
          </Reveal>
        )}

        {/* ── Overview ───────────────────────────────────────────────────── */}
        <Block index="01" label={t.project.overview} className="mt-20 md:mt-28">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-5">
              {detail.overview.map((paragraph, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={i * 0.06}
                  className="mt-6 max-w-[68ch] text-[1.02rem] leading-relaxed text-paper-2 first:mt-0"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </Block>

        {/* ── Features ───────────────────────────────────────────────────── */}
        <Block index="02" label={t.project.features} className="mt-20 md:mt-28">
          <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {detail.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={(i % 3) * 0.06} amount={0.15} className="bg-ink p-6 md:p-8">
                <span className="text-meta">{padIndex(i)}</span>
                <h3 className="mt-4 text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-paper">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-paper-2">{feature.text}</p>
              </Reveal>
            ))}
          </ul>
        </Block>

        {/* ── Engineering ────────────────────────────────────────────────── */}
        <Block index="03" label={t.project.engineering} className="mt-20 md:mt-28">
          <ul>
            {detail.engineering.map((note, i) => (
              <Reveal
                as="li"
                key={note.title}
                delay={0.04}
                amount={0.2}
                className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-8"
              >
                <span className="text-meta md:col-span-1">{padIndex(i)}</span>
                <h3 className="text-[1.1rem] font-medium leading-snug tracking-[-0.02em] text-paper md:col-span-4">
                  {note.title}
                </h3>
                <p className="max-w-[64ch] text-[0.98rem] leading-relaxed text-paper-2 md:col-span-7">{note.text}</p>
              </Reveal>
            ))}
          </ul>
        </Block>

        {/* ── Screens ────────────────────────────────────────────────────── */}
        {rest.length > 0 && (
          <Block index="04" label={t.project.gallery} className="mt-20 md:mt-28">
            <div className="grid gap-10 md:grid-cols-2 md:gap-8">
              {rest.map((shot, i) => (
                <Reveal as="figure" key={shot.src} delay={(i % 2) * 0.06} amount={0.15}>
                  <a href={shot.src} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
                    <Shot src={shot.src} alt={shot.caption || project.title} />
                  </a>
                  {shot.caption && <figcaption className="mt-3 text-meta">{shot.caption}</figcaption>}
                </Reveal>
              ))}
            </div>
          </Block>
        )}

        {/* ── Stack ──────────────────────────────────────────────────────── */}
        <Block index={rest.length > 0 ? '05' : '04'} label={t.project.stack} className="mt-20 md:mt-28">
          <ul className="flex flex-wrap gap-2" aria-label={t.sections.work.technologies}>
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-4 py-2 font-mono text-[0.72rem] tracking-[0.06em] text-paper-2"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Block>

        {/* ── Next project ───────────────────────────────────────────────── */}
        <NextProject project={next} />
      </article>
    </main>
  );
}

function Block({
  index,
  label,
  className,
  children,
}: {
  index: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={className} aria-label={label}>
      <Reveal className="flex items-center gap-3 border-t border-line pt-6">
        <span className="text-meta">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <h2 className="text-meta text-paper-2">{label}</h2>
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Shot({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-ink-2">
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}

function NextProject({ project }: { project: Project }) {
  const { t } = useLocale();
  return (
    <Reveal className="mt-24 border-t border-line pt-10 md:mt-32">
      <Link
        to={projectPath(project.id)}
        data-cursor="view"
        className="group grid items-center gap-6 md:grid-cols-12"
      >
        <span className="text-meta md:col-span-3">{t.project.next}</span>
        <span
          className={cn(
            'flex items-center gap-4 text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-tight tracking-[-0.03em] text-paper',
            'transition-colors duration-500 group-hover:text-accent md:col-span-9',
          )}
        >
          {project.title}
          <ArrowRight
            size={22}
            strokeWidth={1.5}
            className="shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2"
          />
        </span>
      </Link>
    </Reveal>
  );
}
