import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import { revealEase as EASE } from '../utils/motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Fraction of the element that must be visible before the animation starts. */
  amount?: number;
  as?: 'div' | 'p' | 'li' | 'span' | 'figure';
}

/** Fade-and-rise on scroll. Respects prefers-reduced-motion through MotionConfig in App. */
export function Reveal({ children, className, delay = 0, amount = 0.3, as = 'div' }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}

interface LineRevealProps {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Start immediately on mount instead of when scrolled into view (for the hero). */
  immediate?: boolean;
}

/** Masked line-by-line text reveal — the editorial "curtain" effect used for display type. */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.1,
  immediate = false,
}: LineRevealProps) {
  // Observe the (unclipped) wrapper, not the translated lines: a line shifted 110% down and
  // clipped by overflow-hidden never intersects the viewport, so it would never animate in.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const show = immediate || inView;

  return (
    <span ref={ref} className={cn('block', className)}>
      {/* Screen readers get the joined sentence; the animated lines are decorative. */}
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} aria-hidden className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={cn('block will-change-transform', lineClassName)}
            initial={{ y: '110%', rotate: 2 }}
            animate={show ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
            style={{ transformOrigin: 'left bottom' }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
