import { useEffect, useState } from 'react';

/**
 * Tracks which section currently occupies the middle of the viewport.
 * Uses a single IntersectionObserver with a centred rootMargin band.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    // Off the home page there is nothing to track — clear the highlight instead of
    // leaving the last section marked as current.
    if (elements.length === 0) {
      setActive('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
