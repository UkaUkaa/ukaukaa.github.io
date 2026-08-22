import { useEffect, useRef } from 'react';

const SPACING = 28;
const RADIUS = 160;
const STRENGTH = 18;

/**
 * Lightweight canvas dot grid that subtly parts around the cursor.
 * ~2 KB of logic, no libraries, paused when offscreen or hidden.
 * Only mounted on desktop pointers with motion allowed (see Hero).
 */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const gx = i * SPACING;
          const gy = j * SPACING;
          const dx = gx - mouse.x;
          const dy = gy - mouse.y;
          const dist = Math.hypot(dx, dy);
          let x = gx;
          let y = gy;
          let alpha = 0.16;
          if (dist < RADIUS) {
            const f = (1 - dist / RADIUS) ** 2;
            x += (dx / (dist || 1)) * f * STRENGTH;
            y += (dy / (dist || 1)) * f * STRENGTH;
            alpha = 0.16 + f * 0.6;
          }
          ctx.fillStyle = `rgba(242,240,235,${alpha})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry?.isIntersecting ?? false;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });

    resize();
    raf = requestAnimationFrame(draw);
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}
