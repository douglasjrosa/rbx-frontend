import { NAVBAR_OFFSET_PX } from '@/lib/home-sections';

export const SITE_NAVBAR_SELECTOR = '[data-site-navbar]';

export const SECTION_SCROLL_MARGIN_CLASS =
  'scroll-mt-[var(--navbar-height,72px)]';

export function getNavbarOffsetPx(): number {
  if (typeof document === 'undefined') {
    return NAVBAR_OFFSET_PX;
  }

  const navbar = document.querySelector<HTMLElement>(SITE_NAVBAR_SELECTOR);

  if (!navbar) {
    return NAVBAR_OFFSET_PX;
  }

  return Math.round(navbar.getBoundingClientRect().height);
}

export function syncNavbarHeightCssVar(heightPx?: number): void {
  if (typeof document === 'undefined') {
    return;
  }

  const height = heightPx ?? getNavbarOffsetPx();

  document.documentElement.style.setProperty(
    '--navbar-height',
    `${height}px`,
  );
}

export function getScrollMarginTop(element: HTMLElement): number {
  const parsed = Number.parseFloat(
    window.getComputedStyle(element).scrollMarginTop,
  );

  return Number.isFinite(parsed) ? parsed : 0;
}

export function getSectionAnchorTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top - getScrollMarginTop(element);
}
