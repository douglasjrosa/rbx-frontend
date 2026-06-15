export interface MediaAsset {
  name: string;
  alternativeText: string;
  width: number;
  height: number;
  src: string;
}

export interface NavLink {
  newTab: boolean;
  url: string;
  text: string;
}

export interface PageMetadata {
  metaTitle: string;
  metaDescription: string;
  twitterCardType?: string;
  twitterUsername?: string;
  shareImage?: MediaAsset;
}

export interface FeatureRow {
  joinNextRow: boolean;
  title: string;
  description: string;
  link: NavLink | null;
  media: MediaAsset | null;
  icon: MediaAsset | null;
}

export interface ContentSection {
  component:
    | 'sections.feature-rows-group'
    | 'sections.feature-columns-group'
    | 'sections.rich-text';
  content: string | null;
  features: FeatureRow[];
}

export interface HomeStatCard {
  value: string;
  description: string;
  variant?: 'default' | 'wood';
}

export interface HomeHighlightFeature {
  title: string;
  description: string;
  icon: MediaAsset;
}

export interface HomeHighlights {
  stats: HomeStatCard[];
  title: string;
  features: HomeHighlightFeature[];
  sideImage: MediaAsset;
}

export interface HomeInfoRow {
  title: string;
  paragraphs: string[];
  button: NavLink;
  image: MediaAsset;
  imagePosition: 'left' | 'right';
  buttonVariant: 'primary' | 'secondary';
}

export interface HomeInfoRows {
  rows: HomeInfoRow[];
}

export interface HomeAbout {
  title: string;
  description: string;
  image: MediaAsset;
}

export interface HomeDifferentials {
  image: MediaAsset;
  differentialsTitle: string;
  differentialsItems: string[];
}

export interface HomeCta {
  text: string;
  button: NavLink;
}

export interface HomeProductModelSpec {
  label: string;
  value: string;
}

export interface HomeProductModel {
  title: string;
  image: MediaAsset;
  specs: HomeProductModelSpec[];
}

export interface HomeModels {
  title: string;
  description: string;
  models: HomeProductModel[];
  button: NavLink;
}

export interface HomeCustomPackaging {
  title: string;
  paragraphs: string[];
  button: NavLink;
  image: MediaAsset;
}

export interface HomeDiversityCard {
  title: string;
  description: string;
  link: NavLink;
  image: MediaAsset;
}

export interface HomeDiversity {
  whenTitle: string;
  whenItems: string[];
  title: string;
  description: string;
  cards: HomeDiversityCard[];
}

export interface HomeContact {
  doubtsTitle: string;
  doubtsDescription: string;
  visitTitle: string;
  visitDescription: string;
  address: string;
}

export interface HomeBanner {
  title: string;
}

export interface HomeHero {
  title: string;
  description: string;
  backgroundImage: string;
  primaryButton: NavLink;
  secondaryButton: NavLink;
}

export interface HomePage {
  slug: string;
  shortName: string;
  metadata: PageMetadata;
  hero?: HomeHero;
  banner?: HomeBanner;
  highlights?: HomeHighlights;
  cta?: HomeCta;
  models?: HomeModels;
  customPackaging?: HomeCustomPackaging;
  infoRows?: HomeInfoRows;
  about?: HomeAbout;
  differentials?: HomeDifferentials;
  diversity?: HomeDiversity;
  contact?: HomeContact;
}

export interface SeoPage {
  slug: string;
  keyword: string;
  metaDescription: string;
  company: string;
  mainContent: string;
  middleContent: string;
  callToAction: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
}

export interface CookieConsentConfig {
  title: string;
  message: string;
  acceptLabel: string;
  denyLabel: string;
  policyLabel: string;
  policyUrl: string;
}

export interface SiteConfig {
  metaTitleSuffix: string;
  metadata: PageMetadata;
  cookieConsent: CookieConsentConfig;
  navbar: {
    links: NavLink[];
    button: NavLink & { type: string };
    logo: MediaAsset;
    logoLight: MediaAsset;
  };
  footer: {
    smallText: string;
    columns: { title: string; links: NavLink[] }[];
    logo: MediaAsset;
  };
  favicon: MediaAsset;
  whatsappContacts: { nome: string; fone: string }[];
  whatsappImage: MediaAsset;
  whatsappMsg: string;
}
