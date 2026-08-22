import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLocale } from '../i18n/useLocale';

type CursorMode = 'default' | 'link' | 'view';

const SIZE: Record<CursorMode, number> = { default: 12, link: 56, view: 96 };

/**
 * Desktop-only custom cursor. Rendered only when App decides the pointer is fine and
 * motion is allowed, so mobile never pays for it. Uses mix-blend-difference so it stays
 * legible over both the dark background and the off-white CTA buttons.
 */
export function CustomCursor() {
  const { t } = useLocale();
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 600, damping: 45, mass: 0.3 });
  const y = useSpring(my, { stiffness: 600, damping: 45, mass: 0.3 });

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      const next = (target?.dataset.cursor as CursorMode | undefined) ?? 'default';
      setMode(next in SIZE ? next : 'default');
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [mx, my, visible]);

  const size = SIZE[mode];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-paper mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.5 }}
    >
      <motion.span
        className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink"
        animate={{ opacity: mode === 'view' ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {t.cursor.view}
      </motion.span>
    </motion.div>
  );
}
