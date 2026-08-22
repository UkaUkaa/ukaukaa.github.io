import { useLocale } from '../i18n/useLocale';
import { padIndex } from '../utils/format';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

export function Experience() {
  const { t, data } = useLocale();
  const { experience } = data;

  return (
    <section id="experience" aria-labelledby="experience-title" className="container-x py-24 md:py-36">
      <SectionHeading index="04" label={t.sections.experience.label} title={t.sections.experience.title} />
      <span id="experience-title" className="sr-only">
        {t.sections.experience.label}
      </span>

      <ol className="mt-16 md:mt-24">
        {experience.map((item, i) => (
          <Reveal key={item.id} as="li" amount={0.25}>
            <article
              className="group grid gap-4 border-t border-line py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10"
              aria-labelledby={`${item.id}-role`}
            >
              <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-2">
                <span className="font-mono text-[1.5rem] font-light tracking-[-0.02em] text-mute-2 transition-colors duration-500 group-hover:text-accent">
                  {padIndex(i)}
                </span>
                <span className="text-meta">{item.period}</span>
              </div>

              <div className="md:col-span-5">
                <h3 id={`${item.id}-role`} className="text-[1.4rem] font-medium tracking-[-0.02em] text-paper md:text-[1.6rem]">
                  {item.role}
                </h3>
                <p className="mt-1 text-[0.95rem] text-mute">{item.company}</p>
              </div>

              <div className="md:col-span-4">
                <p className="text-[0.95rem] leading-relaxed text-paper-2">{item.description}</p>
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {item.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-3 text-[0.88rem] text-mute">
                        <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
      <div className="border-t border-line" />
    </section>
  );
}
