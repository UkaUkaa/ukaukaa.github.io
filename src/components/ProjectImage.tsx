import { ImagePlus } from 'lucide-react';
import type { Project } from '../data/types';
import { useLocale } from '../i18n/useLocale';

interface ProjectImageProps {
  project: Project;
  index: string;
}

/**
 * Renders the project image, or a designed placeholder when none is set.
 * The placeholder is intentionally quiet: thin grid, number, and an "add image" hint.
 */
export function ProjectImage({ project, index }: ProjectImageProps) {
  const { t } = useLocale();
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt ?? `${project.title} — preview`}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${project.title} — ${t.sections.work.imagePlaceholder}`}
      className="relative size-full overflow-hidden bg-ink-2 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
    >
      {/* Fine grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      {/* Radial vignette */}
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_40%,rgba(217,168,92,0.08),transparent_70%)]"
      />
      <span
        aria-hidden
        className="absolute left-6 top-6 font-mono text-[0.65rem] tracking-[0.2em] text-mute-2"
      >
        IMG / {index}
      </span>
      <span
        aria-hidden
        className="absolute right-6 top-6 font-mono text-[0.65rem] tracking-[0.2em] text-mute-2"
      >
        16 : 10
      </span>
      <div className="absolute inset-0 grid place-items-center px-8 text-center">
        <div className="flex flex-col items-center gap-3">
          {/* The "add image" hint is a reminder for the author; visitors see the quiet panel. */}
          {import.meta.env.DEV && (
            <>
              <ImagePlus size={28} strokeWidth={1} className="text-mute-2" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mute-2">
                {t.sections.work.addImage}
              </span>
            </>
          )}
          <span className="max-w-[24ch] text-[1.05rem] leading-snug text-mute">{project.title}</span>
          <span className="text-meta">{project.category}</span>
        </div>
      </div>
    </div>
  );
}
