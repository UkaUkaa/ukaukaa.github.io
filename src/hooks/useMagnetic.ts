import { useCallback, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useIsDesktopPointer, usePrefersReducedMotion } from './useMediaQuery';

/**
 * Magnetic hover: the element gently follows the cursor while hovered and springs back on leave.
 * Returns spring-driven x/y motion values plus the pointer handlers to spread onto the element.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const desktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const enabled = desktop && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 });

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      mx.set(dx * strength);
      my.set(dy * strength);
    },
    [enabled, mx, my, strength],
  );

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return { ref, x, y, onPointerMove, onPointerLeave };
}
