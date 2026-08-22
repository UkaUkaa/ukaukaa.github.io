import { useLocale } from '../i18n/useLocale';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, LineReveal } from '../components/Reveal';

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
        {/* Statement */}
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
    </section>
  );
}
