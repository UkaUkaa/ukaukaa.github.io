import { Reveal } from './Reveal';
import { cn } from '../utils/cn';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  className?: string;
}

/** Editorial section header: numbered technical label on the left, statement title on the right. */
export function SectionHeading({ index, label, title, className }: SectionHeadingProps) {
  return (
    <div className={cn('grid gap-6 border-t border-line pt-6 md:grid-cols-12', className)}>
      <Reveal className="flex items-center gap-3 md:col-span-4">
        <span className="text-meta">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span className="text-meta text-paper-2">{label}</span>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-8">
        <h2 className="max-w-[18ch] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-paper">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
