import { ArrowUpRight } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';
import { LineReveal, Reveal } from '../components/Reveal';
import { MagneticButton } from '../components/MagneticButton';
import { SocialIcon } from '../components/SocialIcon';

export function Contact() {
  const { t, data } = useLocale();
  const { contact, socials, profile } = data;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-line"
    >
      {/* Single restrained accent glow anchoring the closing statement */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl [background:radial-gradient(closest-side,rgba(217,168,92,0.12),transparent)]"
      />

      <div className="container-x relative py-28 md:py-40">
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="text-meta">05</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          <span className="text-meta text-paper-2">{t.sections.contact.label}</span>
        </Reveal>

        <h2 id="contact-title" className="text-display text-[clamp(3.2rem,12.5vw,11rem)] text-paper">
          <LineReveal lines={contact.headlineLines} stagger={0.1} />
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal as="p" className="max-w-[40ch] text-[1.05rem] leading-relaxed text-paper-2 md:text-lg">
              {contact.description}
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <MagneticButton href={contact.cta.href} external={!contact.cta.href.startsWith('mailto:')}>
                {contact.cta.label}
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <ul className="divide-y divide-line border-y border-line">
              {socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target={s.platform === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="group flex items-center justify-between py-4 transition-colors duration-300 hover:text-accent"
                  >
                    <span className="flex items-center gap-4">
                      <SocialIcon platform={s.platform} size={16} className="text-mute transition-colors group-hover:text-accent" />
                      <span className="font-mono text-[0.8rem] uppercase tracking-[0.16em]">{s.label}</span>
                    </span>
                    <span className="flex items-center gap-3 text-[0.85rem] text-mute transition-colors group-hover:text-paper">
                      <span className="hidden sm:inline">
                        {s.platform === 'email' ? profile.email : s.href.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
