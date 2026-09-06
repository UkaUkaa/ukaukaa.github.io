import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Github, Plus } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';
import { projectPath } from '../data/portfolio';
import type { Project } from '../data/types';
import { padIndex } from '../utils/format';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { ProjectImage } from '../components/ProjectImage';
import { Link } from '../components/Link';

/** How many cards the home page shows before the "show all" button. */
const VISIBLE_BY_DEFAULT = 6;
/** Tags shown on a card; the rest are folded into a "+N". */
const TAGS_ON_CARD = 4;

export function Work() {
  const { t, data } = useLocale();
  const { projects } = data;
  const [expanded, setExpanded] = useState(false);

  const collapsible = projects.length > VISIBLE_BY_DEFAULT;
  const visible = collapsible && !expanded ? projects.slice(0, VISIBLE_BY_DEFAULT) : projects;

  return (
    <section id="work" aria-labelledby="work-title" className="container-x py-24 md:py-36">
      <SectionHeading index="01" label={t.sections.work.label} title={t.sections.work.title} />
      <span id="work-title" className="sr-only">
        {t.sections.work.label}
      </span>

      <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 xl:grid-cols-3">
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </ul>

      {collapsible && (
        <Reveal className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            data-cursor="link"
            className="inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper"
          >
            <Plus
              size={14}
              strokeWidth={1.75}
              className={expanded ? 'rotate-45 transition-transform duration-300' : 'transition-transform duration-300'}
            />
            {expanded ? t.sections.work.showLess : `${t.sections.work.showAll} (${projects.length})`}
          </button>
        </Reveal>
      )}
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLocale();
  const number = padIndex(index);
  const page = projectPath(project.id);
  const tags = project.technologies.slice(0, TAGS_ON_CARD);
  const hiddenTags = project.technologies.length - tags.length;

  return (
    <Reveal as="li" delay={(index % 3) * 0.07} amount={0.2} className="group flex flex-col">
      <article aria-labelledby={`${project.id}-title`} className="flex h-full flex-col">
        {/* The whole card is one link to the project page — a single tab stop, one target. */}
        <Link to={page} data-cursor="view" aria-label={`${project.title} — ${t.sections.work.viewProject}`} className="block">
          <figure className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line">
            <ProjectImage project={project} index={number} />
            <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/30" />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink opacity-0 translate-y-2 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100">
              {t.sections.work.viewProject} <ArrowRight size={12} strokeWidth={2} />
            </div>
          </figure>

          <div className="mt-5 flex items-baseline justify-between gap-4">
            <span className="font-mono text-[0.85rem] font-light tracking-[-0.02em] text-mute-2">{number}</span>
            <span className="text-meta truncate">
              {project.category} · {project.year}
            </span>
          </div>

          <h3
            id={`${project.id}-title`}
            className="mt-3 text-[1.35rem] font-medium leading-[1.15] tracking-[-0.025em] text-paper transition-colors duration-500 group-hover:text-accent"
          >
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-[0.92rem] leading-relaxed text-paper-2">{project.detail.tagline}</p>
        </Link>

        <div className="mt-auto pt-5">
          <ul className="flex flex-wrap gap-x-3 gap-y-1.5" aria-label={t.sections.work.technologies}>
            {tags.map((tech) => (
              <li key={tech} className="text-meta">
                {tech}
              </li>
            ))}
            {hiddenTags > 0 && (
              <li className="text-meta text-mute-2" aria-label={`${hiddenTags} ${t.sections.work.technologies}`}>
                +{hiddenTags}
              </li>
            )}
          </ul>

          {(project.liveDemo || project.github) && (
            <div className="mt-4 flex flex-wrap items-center gap-5">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="link-underline inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper-2 hover:text-paper"
                >
                  {t.sections.work.liveDemo} <ArrowUpRight size={12} strokeWidth={1.75} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="link-underline inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper-2 hover:text-paper"
                >
                  <Github size={12} strokeWidth={1.5} /> {t.sections.work.github}
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
