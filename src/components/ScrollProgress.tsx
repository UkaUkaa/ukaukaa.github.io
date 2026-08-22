import { motion, useScroll, useSpring } from 'framer-motion';

/** 1px reading-progress line pinned to the top edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[70] h-px w-full origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
