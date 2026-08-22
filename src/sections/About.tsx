import { useLocale } from '../i18n/useLocale';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, LineReveal } from '../components/Reveal';
import { TeamDiagram } from '../components/TeamDiagram';
import { cn } from '../utils/cn';

export function About() {
  const { t, data } = useLocale();
  const { about } = data;

  return (
    <section id="about" aria-labelledby="about-title" className="container-x py-24 md:py-36">
      <SectionHeading index="02" label={t.sections.about.label} title={t.sections.about.title} />
      <span id="about-title" className="sr-only">
        {t.sections.about.label}
      </span>

      <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
        {/* Statement + paragraphs */}
        <div className="lg:col-span-8">
          <p className="text-[clamp(1.9rem,4.6vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.035em] text-paper">
            <LineReveal lines={[about.statement]} />
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} as="p" delay={i * 0.1} className="text-[0.98rem] leading-relaxed text-paper-2">
                {p}
              </Reveal>
            ))}
          </div>
        </div>

        {/* Facts + specialties */}
        <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-10">
          <Reveal>
            <dl className="divide-y divide-line">
              {about.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-meta">{f.label}</dt>
                  <dd className="text-right text-[0.9rem] text-paper">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <p className="text-meta mb-4">{t.sections.about.specialties}</p>
            <ul className="space-y-2.5">
              {about.specialties.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-[0.95rem] text-paper-2">
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mute-2">0{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>

      {/* Solo / Team panel */}
      <Reveal amount={0.2} className="mt-16 md:mt-24">
        <div className="relative grid overflow-hidden rounded-sm border border-line bg-ink-2 lg:grid-cols-12">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-accent" />

          {/* Diagram */}
          <div className="relative flex items-center justify-center border-b border-line p-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-12">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]"
            />
            <TeamDiagram />
          </div>

          {/* Copy + modes */}
          <div className="p-7 md:p-10 lg:col-span-8 lg:p-12">
            <p className="text-meta">{about.team.label}</p>
            <h3 className="mt-4 max-w-[24ch] text-[clamp(1.5rem,2.8vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-paper">
              {about.team.title}
            </h3>
            <p className="mt-5 max-w-[62ch] text-[0.98rem] leading-relaxed text-paper-2">{about.team.text}</p>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {about.team.modes.map((m, i) => {
                const primary = i === 0;
                return (
                  <li key={m.name} className="group/mode relative bg-ink p-5 transition-colors duration-500 hover:bg-ink-2 md:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            'grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[0.6rem]',
                            primary ? 'border-accent text-accent' : 'border-line-strong text-paper-2',
                          )}
                        >
                          {primary ? '1' : '1+N'}
                        </span>
                        <span className="text-[1.05rem] font-medium tracking-[-0.01em] text-paper">{m.name}</span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em]',
                          primary ? 'bg-accent-soft text-accent' : 'border border-line text-mute',
                        )}
                      >
                        {m.tag}
                      </span>
                    </div>
                    <p className="mt-4 text-[0.9rem] leading-relaxed text-mute transition-colors duration-500 group-hover/mode:text-paper-2">
                      {m.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
