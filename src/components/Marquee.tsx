interface MarqueeProps {
  items: readonly string[];
}

/** Infinite keyword strip — pure CSS animation, pauses under prefers-reduced-motion. */
export function Marquee({ items }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-mute"
          >
            {item}
            <span className="size-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
