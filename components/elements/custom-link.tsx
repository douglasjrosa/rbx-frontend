'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from '@/lib/content/types';
import { buildTrackingRedirectUrl } from '@/lib/analytics/tracking-redirect';
import { scrollToSection } from '@/lib/scroll-to-section';

interface CustomLinkProps {
  link: NavLink;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}

function parseHomeHash(url: string): string | null {
  if (url === '/' || url === '/#') {
    return '';
  }

  if (url.startsWith('/#')) {
    return url.slice(1);
  }

  if (url.startsWith('#')) {
    return url;
  }

  return null;
}

export default function CustomLink({
  link,
  children,
  className = '',
  onNavigate,
}: CustomLinkProps) {
  const pathname = usePathname();

  if (link.trackingCtaId) {
    return (
      <a
        href={buildTrackingRedirectUrl(link.trackingCtaId)}
        className={className}
        target={link.newTab ? '_blank' : undefined}
        rel={link.newTab ? 'noopener noreferrer' : undefined}
        onClick={onNavigate}
      >
        {children}
      </a>
    );
  }

  const homeHash = parseHomeHash(link.url);

  if (homeHash !== null) {
    const href = homeHash ? `/${homeHash}` : '/';

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === '/') {
        event.preventDefault();
        scrollToSection(homeHash);
        window.history.pushState(null, '', homeHash);
        onNavigate?.();
      }
    };

    return (
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  const isInternalLink =
    link.url.startsWith('/') && !link.url.startsWith('//');

  if (isInternalLink) {
    return (
      <Link href={link.url} className={className} onClick={onNavigate}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={link.url}
      className={className}
      target={link.newTab ? '_blank' : undefined}
      rel={link.newTab ? 'noopener noreferrer' : undefined}
      onClick={onNavigate}
    >
      {children}
    </a>
  );
}
