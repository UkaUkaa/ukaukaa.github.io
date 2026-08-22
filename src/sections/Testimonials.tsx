import { ArrowUpRight, Star } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';
import { testimonials, testimonialsSource } from '../data/testimonials';
import { padIndex } from '../utils/format';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

export function Testimonials() {
  const { t, locale } = useLocale();
  const s = t.sections.testimonials;

  const stats = [
    { value: testimonialsSource.total.toString(), label: s.reviews },
    { value: testimonialsSource.average.toFixed(1), label: s.average },
    { value: `${testimonialsSource.successRate}%`, label: s.success },
  ];

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="container-x py-24 md:py-36">
      <SectionHeading index="04" label={s.label} title={s.title} />
      <span id="testimonials-title" className="sr-only">
        {s.label}
      </span>

      {/* Stat rail */}
      <Reveal className="mt-12 grid grid-cols-3 divide-x divide-line border-y border-line md:mt-16">
        {stats.map((st) => (
          <div key={st.label} className="px-3 py-6 first:pl-0 md:px-8 md:py-8">
            <p className="font-mono text-[clamp(1.6rem,4vw,3rem)] font-light tracking-[-0.03em] text-paper">{st.value}</p>
            <p className="mt-1 text-meta">{st.label}</p>
          </div>
        ))}
      </Reveal>

      {/* Quote grid */}
      <ul className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item, i) => (
          <Reveal
            key={item.id}
            as="li"
            amount={0.2}
            delay={(i % 3) * 0.06}
            className="group flex flex-col justify-between bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 md:p-9"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-mute-2">{padIndex(i)}</span>
                <span
                  className="flex items-center gap-1 text-accent"
                  role="img"
                  aria-label={`${s.rating}: ${item.rating} / 5`}
                >
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star
                      key={k}
                      size={11}
                      strokeWidth={1.5}
                      aria-hidden
                      className={k < item.rating ? 'fill-accent' : 'opacity-30'}
                    />
                  ))}
                </span>
              </div>
              <blockquote lang={locale} className="mt-6">
                <p className="text-[1.02rem] leading-relaxed text-paper-2 transition-colors duration-500 group-hover:text-paper">
                  <span aria-hidden className="mr-1 font-serif text-[1.6em] leading-none text-accent">“</span>
                  {item.text[locale]}
                </p>
              </blockquote>
            </div>
            <p className="mt-8 flex items-center gap-3 text-[0.85rem] text-paper">
              <span aria-hidden className="h-px w-6 bg-line-strong" />
              {item.author}
            </p>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-8 flex justify-end">
        <a
          href={testimonialsSource.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="link-underline inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-2 hover:text-paper"
        >
          {s.viewAll} {testimonialsSource.label} <ArrowUpRight size={14} strokeWidth={1.75} />
        </a>
      </Reveal>
    </section>
  );
}
