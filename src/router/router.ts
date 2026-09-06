import { useMemo, useSyncExternalStore } from 'react';
import { projectIds } from '../data/portfolio';

/** The two kinds of page this site has. */
export type Route = { name: 'home'; hash: string } | { name: 'project'; id: string };

/** Vite's base, without the trailing slash ("" for a root deployment). */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const NAVIGATE_EVENT = 'portfolio:navigate';
const isBrowser = typeof window !== 'undefined';

/** Prefixes an app path with the deployment base, so links work under a sub-path too. */
export function href(path: string): string {
  return `${BASE}${path}`;
}

export function parseRoute(pathname: string, hash: string): Route {
  const path = pathname.slice(BASE.length).replace(/\/+$/, '') || '/';
  const id = /^\/projects\/([A-Za-z0-9_-]+)$/.exec(path)?.[1];
  if (id && (projectIds as readonly string[]).includes(id)) {
    return { name: 'project', id };
  }
  return { name: 'home', hash };
}

/** Client-side navigation. External and hash-only targets are left to the browser. */
export function navigate(to: string, options: { replace?: boolean } = {}): void {
  const url = href(to);
  if (options.replace) history.replaceState(null, '', url);
  else history.pushState(null, '', url);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

// A primitive snapshot keeps useSyncExternalStore from looping on a fresh object.
function getSnapshot(): string {
  return `${window.location.pathname}${window.location.hash}`;
}

function getServerSnapshot(): string {
  return '/';
}

export function useRoute(): Route {
  const location = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => {
    const hashIndex = location.indexOf('#');
    const pathname = hashIndex === -1 ? location : location.slice(0, hashIndex);
    const hash = hashIndex === -1 ? '' : location.slice(hashIndex);
    return parseRoute(pathname, hash);
  }, [location]);
}

/** True for clicks the router should handle itself (plain left click, same tab). */
export function isInternalClick(event: React.MouseEvent): boolean {
  if (!isBrowser) return false;
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}
