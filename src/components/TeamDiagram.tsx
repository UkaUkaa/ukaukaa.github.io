import { motion } from 'framer-motion';
import { revealEase } from '../utils/motion';

const CENTER = { x: 110, y: 110 };
const NODES = [
  { x: 28, y: 52 },
  { x: 192, y: 40 },
  { x: 176, y: 176 },
  { x: 40, y: 170 },
];

/** Hub-and-spoke schematic: the developer at the centre, the team joining on demand. */
export function TeamDiagram() {
  const draw = (i: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 1.1, ease: revealEase, delay: 0.3 + i * 0.12 },
  });
  const pop = (i: number) => ({
    initial: { scale: 0, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.6, ease: revealEase, delay: 0.9 + i * 0.12 },
  });

  return (
    <svg viewBox="0 0 220 220" aria-hidden className="size-full max-w-[15rem] text-paper">
      {/* Slowly rotating orbit ring */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={86}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.12}
        strokeDasharray="2 6"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
        style={{ transformOrigin: '110px 110px' }}
      />

      {/* Spokes */}
      {NODES.map((n, i) => (
        <motion.line
          key={`l-${i}`}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={n.x}
          y2={n.y}
          stroke="currentColor"
          strokeOpacity={0.28}
          strokeWidth={1}
          strokeDasharray="3 4"
          {...draw(i)}
        />
      ))}

      {/* Team nodes */}
      {NODES.map((n, i) => (
        <motion.g key={`n-${i}`} style={{ transformOrigin: `${n.x}px ${n.y}px` }} {...pop(i)}>
          <circle cx={n.x} cy={n.y} r={11} fill="var(--color-ink)" stroke="currentColor" strokeOpacity={0.35} />
          <circle cx={n.x} cy={n.y} r={3} fill="currentColor" fillOpacity={0.7} />
        </motion.g>
      ))}

      {/* Centre node (you) with a soft pulse */}
      <motion.g style={{ transformOrigin: '110px 110px' }} {...pop(-4)}>
        <circle cx={CENTER.x} cy={CENTER.y} r={26} fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth={1.25} />
        <circle cx={CENTER.x} cy={CENTER.y} r={7} fill="var(--color-accent)" />
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={26}
          fill="none"
          stroke="var(--color-accent)"
          strokeOpacity={0.5}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 2.8, ease: 'easeOut', repeat: Infinity }}
          style={{ transformOrigin: '110px 110px' }}
          className="motion-reduce:hidden"
        />
      </motion.g>
    </svg>
  );
}
