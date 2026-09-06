import { ArrowUp } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';
import { scrollToTop } from '../hooks/useSmoothScroll';
import { SocialIcon } from './SocialIcon';

export function Footer() {
  const { t, data } = useLocale();
  const { profile, socials } = data;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-10 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[1.05rem] font-medium text-paper">{profile.name}</p>
          <p className="mt-1 text-meta">{profile.titleLines.join(' ')}</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {socials.map((s) => (
            <li key={s.platform}>
              <a
                href={s.href}
                target={s.platform === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                data-cursor="link"
                className="link-underline inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-2 transition-colors hover:text-paper"
              >
                <SocialIcon platform={s.platform} size={14} />
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
          <p className="text-meta">© {year} {profile.name}</p>
          <button
            type="button"
            onClick={() => scrollToTop()}
            data-cursor="link"
            aria-label={t.nav.backToTop}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-paper transition-colors hover:border-paper"
          >
            <ArrowUp size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
