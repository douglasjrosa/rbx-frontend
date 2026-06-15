export const HOME_SECTIONS = {
  hero: 'home-hero',
  produtos: 'produtos',
  aribermax: 'aribermax',
  informacoes: 'informacoes',
  contato: 'contato',
} as const;

export type HomeSectionId =
  (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS];

import { getNavbarOffsetPx } from '@/lib/navbar-offset';

const SECTION_ACTIVE_TOLERANCE_PX = 1;

export const NAVBAR_OFFSET_PX = 72;

export const NAV_SCROLL_SECTIONS = [
  { id: HOME_SECTIONS.hero, hash: '' },
  { id: HOME_SECTIONS.produtos, hash: `#${HOME_SECTIONS.produtos}` },
  { id: HOME_SECTIONS.aribermax, hash: `#${HOME_SECTIONS.aribermax}` },
  { id: HOME_SECTIONS.informacoes, hash: `#${HOME_SECTIONS.informacoes}` },
  { id: HOME_SECTIONS.contato, hash: `#${HOME_SECTIONS.contato}` },
] as const;

export function getActiveHomeSectionHash(): string {
  let activeHash: string = NAV_SCROLL_SECTIONS[0].hash;
  const navbarOffset = getNavbarOffsetPx();
  const activationLine = navbarOffset + SECTION_ACTIVE_TOLERANCE_PX;

  for (const section of NAV_SCROLL_SECTIONS) {
    const element = document.getElementById(section.id);

    if (!element) {
      continue;
    }

    if (element.getBoundingClientRect().top <= activationLine) {
      activeHash = section.hash;
    }
  }

  return activeHash;
}

export function homeSectionHref(sectionId: HomeSectionId): string {
  return `/#${sectionId}`;
}
