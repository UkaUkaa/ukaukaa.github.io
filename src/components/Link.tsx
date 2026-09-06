import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { href, isInternalClick, navigate } from '../router/router';

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** App path, e.g. "/projects/autocast" or "/#work". */
  to: string;
  children: ReactNode;
}

/**
 * An anchor that navigates client-side. It renders a real href, so the link is
 * crawlable, opens in a new tab with ctrl/cmd-click, and works without JS.
 */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={href(to)}
      onClick={(e) => {
        onClick?.(e);
        if (!isInternalClick(e)) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
