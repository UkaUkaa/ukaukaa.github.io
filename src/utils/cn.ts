type ClassValue = string | false | null | undefined;

/** Tiny className joiner — avoids pulling in clsx for a one-liner. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
