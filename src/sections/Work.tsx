import { ArrowUpRight, Github, Plus } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';
import type { Project } from '../data/types';
import { padIndex } from '../utils/format';
import { cn } from '../utils/cn';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { ProjectImage } from '../components/ProjectImage';

export function Work() {
  const { t, data } = useLocale();
  const { projects } = data;

  return (
    <section id="work" aria-labelledby="work-title" className="container-x py-24 md:py-36">
      <SectionHeading index="01" label={t.sections.work.label} title={t.sections.work.title} />
      <span id="work-title" className="sr-only">
        {t.sections.work.label}
      </span>

      <div className="mt-16 md:mt-24">
        {projects.map((project, i) => (
          <ProjectBlock key={project.id} project={project} index={i} />
        ))}

        {/* Empty-state hint — remove once you have added your real projects */}
        <Reveal className="border-t border-line pt-8">
          <div className="flex items-center gap-4 text-meta">
            <Plus size={14} strokeWidth={1.5} />
            <span>
              {t.sections.work.addHint} <code className="text-paper-2">src/data/</code>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const { t } = useLocale();
  const number = padIndex(index);
  const flipped = index % 2 === 1;
  const primaryHref = project.liveDemo ?? project.github;

  return (
    <article
      className="group grid gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16 lg:py-20"
      aria-labelledby={`${project.id}-title`}
    >
      {/* Image */}
      <Reveal
        as="figure"
        amount={0.2}
        className={cn('md:col-span-7', flipped ? 'md:order-2 md:col-start-6' : 'md:order-1')}
      >
        <a
          href={primaryHref ?? '#work'}
          target={primaryHref ? '_blank' : undefined}
          rel="noopener noreferrer"
          data-cursor="view"
          aria-label={`${project.title} — ${t.sections.work.viewProject}`}
          className="relative block aspect-[16/10] overflow-hidden rounded-sm border border-line"
        >
          <ProjectImage project={project} index={number} />
          {/* Hover overlay + CTA */}
          <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/30" />
          <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink opacity-0 translate-y-2 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100">
            {t.sections.work.viewProject} <ArrowUpRight size={12} strokeWidth={2} />
          </div>
        </a>
      </Reveal>

      {/* Text */}
      <div
        className={cn(
          'flex flex-col justify-between md:col-span-5',
          flipped ? 'md:order-1 md:col-start-1 md:pr-6' : 'md:order-2 md:pl-6',
        )}
      >
        <div>
          <Reveal className="flex items-center justify-between">
            <span className="font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-light tracking-[-0.02em] text-mute-2">
              {number}
            </span>
            <span className="text-meta">
              {project.category} · {project.year}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h3
              id={`${project.id}-title`}
              className="mt-6 text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1] tracking-[-0.035em] text-paper transition-colors duration-500 group-hover:text-accent"
            >
              {project.title}
            </h3>
          </Reveal>

          <Reveal delay={0.14} as="p" className="mt-5 max-w-[42ch] text-[0.98rem] leading-relaxed text-paper-2">
            {project.description}
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label={t.sections.work.technologies}>
              {project.technologies.map((tech, ti) => (
                <li key={`${tech}-${ti}`} className="text-meta">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.26} className="mt-8 flex flex-wrap items-center gap-6">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="link-underline inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper"
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
    </article>
  );
}
