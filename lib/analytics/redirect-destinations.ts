import { TRACKING_CTA } from '@/lib/analytics/tracking-cta';
import { HOME_SECTIONS, homeSectionHref } from '@/lib/home-sections';

const CAROUSEL_DESTINATIONS = [
  '/caixa-madeira-fumigada-exportacao',
  '/caixa-madeira-compensado',
  '/embalagens-especiais-madeira',
  '/fabrica-embalagens-madeira',
  '/engradado-madeira-transporte',
  '/engradado-exportacao',
  '/caixa-madeira-fumigada',
  '/engradado-madeira-equipamentos',
  '/fabricante-embalagem-madeira',
  '/caixas-madeira-equipamentos',
] as const;

const CTA_DESTINATIONS: Record<number, string> = {
  [TRACKING_CTA.HERO_PRIMARY]: homeSectionHref(HOME_SECTIONS.produtos),
  [TRACKING_CTA.HERO_SECONDARY]: homeSectionHref(HOME_SECTIONS.informacoes),
  [TRACKING_CTA.CTA_SECTION]: homeSectionHref(HOME_SECTIONS.informacoes),
  [TRACKING_CTA.MODELS_BUTTON]: homeSectionHref(HOME_SECTIONS.contato),
  [TRACKING_CTA.CUSTOM_PACKAGING]: homeSectionHref(HOME_SECTIONS.contato),
  [TRACKING_CTA.CONTACT_ROW]: homeSectionHref(HOME_SECTIONS.contato),
  [TRACKING_CTA.FUMIGATED_PAGE]: '/caixa-madeira-fumigada',
};

CAROUSEL_DESTINATIONS.forEach((destination, index) => {
  const ctaId = Math.min(
    TRACKING_CTA.CAROUSEL_FIRST + index,
    TRACKING_CTA.CAROUSEL_LAST,
  );
  CTA_DESTINATIONS[ctaId] = destination;
});

export function getRedirectDestination(ctaParam: string | null): string {
  const ctaId = Number.parseInt(ctaParam ?? '', 10);

  if (!Number.isFinite(ctaId)) {
    return '/';
  }

  return CTA_DESTINATIONS[ctaId] ?? '/';
}
