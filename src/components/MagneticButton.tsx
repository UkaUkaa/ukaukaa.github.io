import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';
import { cn } from '../utils/cn';

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  external?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
}

/**
 * Primary CTA. Magnetic on desktop pointers; a plain accessible link elsewhere.
 * The arrow nudges diagonally on hover — the one piece of motion every CTA shares.
 */
export function MagneticButton({
  href,
  children,
  variant = 'solid',
  external = false,
  className,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic(0.3);

  const base =
    'group relative inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] transition-colors duration-500 select-none';
  const variants = {
    solid: 'bg-paper text-ink hover:bg-accent',
    outline: 'border border-line-strong text-paper hover:border-paper',
    ghost: 'text-paper-2 hover:text-paper',
  } as const;

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-cursor="link"
      className={cn(base, variants[variant], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden
        size={16}
        strokeWidth={1.75}
        className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}
