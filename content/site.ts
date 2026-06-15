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
    smallText: '© Copyright Ribermax™ (Lei 9610 de 19/02/1998)',
    columns: [
      {
        title: 'Páginas',
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
      },
      {
        title: 'Ribeirão Preto SP',
        links: [
          {
            newTab: false,
            url: 'tel:+5516997655543',
            text: '(16) 99765-5543 Jesuilla (Comercial)',
          },
          {
            newTab: false,
            url: 'tel:+5516982550729',
            text: '(16) 98255-0729 Renato (Administrativo)',
          },
        ],
      },
      {
        title: 'São Paulo SP',
        links: [
          {
            newTab: false,
            url: 'tel:+5511982843965',
            text: '(11) 98284-3965 Cláudia (Comercial)',
          },
        ],
      },
      {
        title: 'Certificação',
        links: [
          {
            newTab: true,
            url:
              'https://www.ippc.int/largefiles/NIMF_15_2009_PTFINAL_0.pdf',
            text: 'NIMF-15 (Fumigação)',
          },
        ],
      },
    ],
    logo: mediaAsset(
      'certificacao_min.webp',
      'Marcação Fumigação NIMF-15',
      155,
      79,
    ),
  },
  favicon: mediaAsset(
    'logotipo_ribermax_45x45_min.webp',
    'Favicon Ribermax',
    45,
    45,
  ),
  whatsappContacts: [
    {
      nome: 'Jesuila - Comercial - Ribeirão Preto',
      fone: '+5516997655543',
    },
    {
      nome: 'Cláudia - Comercial - São Paulo',
      fone: '+5511982843965',
    },
    {
      nome: 'Renato - Administrativo - Ribeirão Preto',
      fone: '+5516982550729',
    },
  ],
  whatsappImage: mediaAsset(
    'logotipo_whatsapp_512x512.png',
    'WhatsApp Ribermax',
    512,
    512,
  ),
  whatsappMsg:
    'Olá, visitei o site da Ribermax e gostaria de mais informações...',
};
