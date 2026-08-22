import { motion } from 'framer-motion';
import { useLocale } from '../i18n/useLocale';
import { padIndex } from '../utils/format';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { revealEase } from '../utils/motion';

export function Stack() {
  const { t, data } = useLocale();
  const { stack } = data;

  return (
    <section id="stack" aria-labelledby="stack-title" className="container-x py-24 md:py-36">
      <SectionHeading index="03" label={t.sections.stack.label} title={t.sections.stack.title} />
      <span id="stack-title" className="sr-only">
        {t.sections.stack.label}
      </span>

      <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:mt-24 md:grid-cols-2 xl:grid-cols-3">
        {stack.map((category, ci) => (
          <Reveal
            key={category.name}
            amount={0.2}
            delay={(ci % 3) * 0.06}
            className="group/cat relative bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 md:p-9"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-[1.05rem] font-medium tracking-[-0.01em] text-paper">{category.name}</h3>
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-mute-2">{padIndex(ci)}</span>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${category.name} — ${t.sections.work.technologies}`}>
              {category.skills.map((skill, si) => (
                <motion.li
                  key={`${skill}-${si}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: revealEase, delay: 0.15 + si * 0.04 }}
                >
                  <span
                    data-cursor="link"
                    className="inline-block rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-paper-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-paper"
                  >
                    {skill}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
