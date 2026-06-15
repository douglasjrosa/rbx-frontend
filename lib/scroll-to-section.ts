import { NAVBAR_OFFSET_PX } from '@/lib/home-sections';

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

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    NAVBAR_OFFSET_PX;

  window.scrollTo({ top, behavior: 'smooth' });
}
