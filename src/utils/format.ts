/** "1" -> "01" — used for editorial numbering of projects and timeline entries. */
export function padIndex(index: number): string {
  return String(index + 1).padStart(2, '0');
}
