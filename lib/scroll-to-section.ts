import { getNavbarOffsetPx } from '@/lib/navbar-offset';

function getSectionScrollTop(element: HTMLElement): number {
  const offset = getNavbarOffsetPx();

  return Math.max(
    0,
    element.getBoundingClientRect().top + window.scrollY - offset,
  );
}

function snapSectionBelowNavbar(element: HTMLElement): void {
  const offset = getNavbarOffsetPx();
  const drift = element.getBoundingClientRect().top - offset;

  if (Math.abs(drift) <= 1) {
    return;
  }

  window.scrollTo({ top: window.scrollY + drift });
}

export function scrollToSection(hash: string): void {
  const sectionId = hash.replace(/^#/, '');

  if (!sectionId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(sectionId);

  if (!element) {
    return;
  }

  const targetTop = getSectionScrollTop(element);

  window.scrollTo({ top: targetTop, behavior: 'smooth' });

  const finalizeScroll = () => {
    snapSectionBelowNavbar(element);
  };

  const supportsScrollEnd = 'onscrollend' in window;

  if (supportsScrollEnd) {
    window.addEventListener('scrollend', finalizeScroll, { once: true });
    return;
  }

  globalThis.setTimeout(finalizeScroll, 400);
}
