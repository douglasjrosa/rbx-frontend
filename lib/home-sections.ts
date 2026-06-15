export const HOME_SECTIONS = {
  hero: 'home-hero',
  produtos: 'produtos',
  aribermax: 'aribermax',
  informacoes: 'informacoes',
  contato: 'contato',
} as const;

export type HomeSectionId =
  (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS];

export const NAVBAR_OFFSET_PX = 72;

export function homeSectionHref(sectionId: HomeSectionId): string {
  return `/#${sectionId}`;
}
