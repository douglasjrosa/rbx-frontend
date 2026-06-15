import type { SiteConfig } from '@/lib/content/types';
import { homeSectionHref, HOME_SECTIONS } from '@/lib/home-sections';
import { mediaAsset } from '@/lib/images';

export const siteConfig: SiteConfig = {
  metaTitleSuffix: 'Ribermax Embalagens de Madeira',
  metadata: {
    twitterCardType: 'summary_large_image',
    metaTitle: 'Embalagens de Madeira Fumigada',
    metaDescription:
      'Caixas, Engradados, Paletes e Embalagens de Madeira Fumigada ' +
      'para Transporte e Exportação.',
    twitterUsername: '@ribermax2',
    shareImage: mediaAsset(
      'Logo_Ribermax_min.webp',
      'Logomarca Ribermax',
      1000,
      731,
    ),
  },
  cookieConsent: {
    title: 'Gerenciar o consentimento',
    message:
      'Para fornecer as melhores experiências, usamos tecnologias como ' +
      'cookies para armazenar e/ou acessar informações do dispositivo. ' +
      'O consentimento para essas tecnologias nos permitirá processar ' +
      'dados como comportamento de navegação ou IDs exclusivos neste ' +
      'site. Não consentir ou retirar o consentimento pode afetar ' +
      'negativamente certos recursos e funções.',
    acceptLabel: 'Aceitar',
    denyLabel: 'Negar',
    policyLabel: 'Política de Cookies',
    policyUrl: '/politica-de-cookies-br',
  },
  navbar: {
    links: [
      { newTab: false, url: '/', text: 'Home' },
      {
        newTab: false,
        url: homeSectionHref(HOME_SECTIONS.produtos),
        text: 'Produtos',
      },
      {
        newTab: false,
        url: homeSectionHref(HOME_SECTIONS.aribermax),
        text: 'A Ribermax',
      },
      {
        newTab: false,
        url: homeSectionHref(HOME_SECTIONS.informacoes),
        text: 'Informações',
      },
      {
        newTab: false,
        url: homeSectionHref(HOME_SECTIONS.contato),
        text: 'Contato',
      },
    ],
    button: {
      newTab: true,
      type: 'primary',
      url: 'http://ribermax.com/?page=login',
      text: 'Login',
    },
    logo: mediaAsset(
      'logomarca_h_p_min.webp',
      'Logomarca Horizontal Ribermax',
      441,
      113,
    ),
    logoLight: mediaAsset(
      'logomarca_h_p_branca.png',
      'Logomarca Horizontal Ribermax',
      441,
      113,
    ),
  },
  footer: {
    tagline: 'Acompanhe-nos em nossas redes sociais.',
    logo: mediaAsset(
      'ribermax_logo_branca.png',
      'Logomarca Ribermax Embalagens',
      192,
      132,
    ),
    socialLinks: [
      {
        name: 'Facebook',
        url:
          'https://www.facebook.com/p/Página-Ribermax-Embalagens-de-Madeira-100063817705345/',
        icon: 'facebook',
      },
      {
        name: 'LinkedIn',
        url:
          'https://www.linkedin.com/company/ribermax-ind-de-embalagens-de-madeira/',
        icon: 'linkedin',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/ribermax.com.br/',
        icon: 'instagram',
      },
    ],
    contactsTitle: 'Contatos',
    contacts: [
      {
        label: 'Daniela Medeiros - Comercial',
        email: 'contato@ribermax.com.br',
      },
      {
        label: 'Daniela Alves – Compras e Financeiro',
        email: 'financeiro.ribermax@gmail.com',
      },
      {
        label: 'Jesuilla – RH (Currículos)',
        email: 'rh@ribermax.com.br',
      },
    ],
    certificationTitle: 'Certificação',
    certificationLabel: 'NIMF-15 (Fumigação)',
    certificationUrl:
      'https://www.ippc.int/largefiles/NIMF_15_2009_PTFINAL_0.pdf',
    certificationImage: mediaAsset(
      'IPPC.webp',
      'Marca IPPC de tratamento térmico HT',
      333,
      152,
    ),
  },
  favicon: mediaAsset(
    'logotipo_ribermax_45x45_min.webp',
    'Favicon Ribermax',
    45,
    45,
  ),
  whatsappPhone: '+5516993362621',
  whatsappImage: mediaAsset(
    'logotipo_whatsapp_512x512.png',
    'WhatsApp Ribermax',
    512,
    512,
  ),
  whatsappMsg:
    'Olá DANIELA, venho pelo site da Ribermax e gostaria de informações...',
};
