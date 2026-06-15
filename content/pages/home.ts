import type { HomePage } from '@/lib/content/types';
import { homeSectionHref, HOME_SECTIONS } from '@/lib/home-sections';
import { mediaAsset } from '@/lib/images';

export const homePage: HomePage = {
  slug: 'home',
  shortName: 'Home',
  hero: {
    title: 'Conheça a Ribermax!',
    description:
      'Atuamos desde 1996, especializados na fabricação de ' +
      'embalagens de madeira para transporte de produtos grandes ' +
      'e delicados. Nossa matéria-prima é proveniente de florestas ' +
      'de REFLORESTAMENTO.',
    backgroundImage: '/images/Capa_Ribermax.png',
    primaryButton: {
      newTab: false,
      url: homeSectionHref(HOME_SECTIONS.produtos),
      text: 'Conheça nossos produtos',
    },
    secondaryButton: {
      newTab: false,
      url: homeSectionHref(HOME_SECTIONS.informacoes),
      text: 'Mais informações',
    },
  },
  banner: {
    title:
      'Garanta Segurança e\nQualidade na sua Entrega.',
  },
  highlights: {
    stats: [
      {
        value: 'Há 30 Anos',
        description:
          'desenvolvendo soluções em embalagens de madeira',
      },
      {
        value: '+ 45.000',
        description:
          'embalagens já produzidas com muita dedicação por nossa equipe',
      },
      {
        value: '100%',
        description:
          'de soluções sob medida para os nossos clientes!',
        variant: 'wood',
      },
    ],
    title: 'Embalagens ideais para você',
    features: [
      {
        title: 'Análise da sua Demanda',
        description:
          'Analisamos minuciosamente suas necessidades para oferecer ' +
          'a melhor embalagem para você.',
        icon: mediaAsset(
          'Prancheta-1.png',
          'Análise da sua demanda',
          500,
          500,
        ),
      },
      {
        title: 'Apresentação das Melhores Opções',
        description:
          'Após a análise, apresentamos as melhores opções do nosso ' +
          'catálogo, proporcionando segurança e eficiência no transporte ' +
          'e armazenamento.',
        icon: mediaAsset(
          'Prancheta-2.png',
          'Apresentação das melhores opções',
          500,
          500,
        ),
      },
      {
        title: 'Personalização Sob Medida',
        description:
          'Se precisar de um modelo personalizado, a Ribermax ' +
          'Embalagens está pronta para criar a solução perfeita para você!',
        icon: mediaAsset(
          'Prancheta-3.png',
          'Personalização sob medida',
          500,
          500,
        ),
      },
    ],
    sideImage: mediaAsset(
      'caixa_nov.png',
      'Embalagens de madeira Ribermax',
      840,
      896,
    ),
  },
  infoRows: {
    rows: [
      {
        title: 'Problemas com a transportadora?',
        description:
          'Muitos dos nossos clientes nos procuram pela primeira vez por ' +
          'encontrar problemas com a transportadora na hora de expedir seus ' +
          'produtos. Algumas transportadoras exigem a embalagem de madeira, ' +
          'outras simplesmente não se responsabilizam pela integridade do ' +
          'produto transportado por causa da falta da embalagem...',
        button: {
          newTab: false,
          url: homeSectionHref(HOME_SECTIONS.contato),
          text: 'Entre em Contato',
        },
        image: mediaAsset(
          'caminhao_novo.png',
          'Caminhão transportando embalagens de madeira',
          1024,
          495,
        ),
        imagePosition: 'right',
        buttonVariant: 'secondary',
      },
      {
        title: 'Madeira Fumigada - Tratamento para Exportação',
        description:
          'Outra razão pela qual somos muito procurados, é a necessidade de ' +
          'Embalagens de Madeira Fumigadas para Exportação. Ao proceder com ' +
          'um processo de exportação, sendo o produto pesado ou grande, é ' +
          'necessário uma embalagem forte e paletizada, mas também com o ' +
          'devido tratamento fitosanitário.',
        button: {
          newTab: false,
          url: '/caixa-madeira-fumigada',
          text: 'Embalagens Fumigadas',
        },
        image: mediaAsset(
          'madeira-fumigada-exportacao.png',
          'Carimbo de madeira fumigada para exportação',
          500,
          350,
        ),
        imagePosition: 'left',
        buttonVariant: 'primary',
      },
    ],
  },
  about: {
    title: 'Ribermax Embalagens de Madeira Fumigada',
    description:
      'Desde o início nosso único foco tem sido a fabricação de embalagens ' +
      'de madeira para equipamentos e peças em geral. Fundada em 1996, tem ' +
      'experiência no segmento de embalagens de médio porte para produtos ' +
      'volumosos e delicados. Toda a nossa madeira tem origem de ' +
      'reflorestamento.',
    image: mediaAsset(
      'ribermax_fabrica.png',
      'Fábrica Ribermax em Ribeirão Preto',
      800,
      500,
    ),
  },
  differentials: {
    image: mediaAsset(
      'diferenciais.png',
      'Madeira para embalagens Ribermax',
      800,
      600,
    ),
    differentialsTitle: 'Nossos Diferenciais',
    differentialsItems: [
      'Sem pedido mínimo. Produzimos uma única caixa se o cliente precisar;',
      'Rapidez na fabricação. Entregamos em apenas 24h dependendo do pedido;',
      'Medidas 100% personalizadas, o cliente é quem define comprimento, ' +
        'largura e altura interna da caixa;',
      'Vários modelos de embalagem para diferentes necessidades;',
      'Certificado de tratamento HT para exportação;',
      'Política de descontos para clientes parceiros.',
    ],
    whenTitle: 'Mas afinal, quando usar Embalagens de Madeira?',
    whenItems: [
      'Quando o seu produto é grande, delicado ou pesado;',
      'Quando a caixa de papelão não é forte o bastante;',
      'Quando a transportadora exige uma boa embalagem.',
    ],
  },
  contactSections: [
    {
      component: 'sections.feature-columns-group',
      content: null,
      features: [
        {
          joinNextRow: false,
          title: 'Ribeirão Preto SP',
          description:
            '**Jesuilla (Comercial):** (16) 99765-5543\n\n' +
            '**Renato (Administrativo):** (16) 98255-0729',
          link: null,
          media: null,
          icon: mediaAsset(
            'logotipo_ribermax_45x45_min.webp',
            'Ribermax Ribeirão Preto',
            45,
            45,
          ),
        },
        {
          joinNextRow: false,
          title: 'São Paulo SP',
          description: '**Cláudia (Comercial):** (11) 98284-3965',
          link: null,
          media: null,
          icon: mediaAsset(
            'logotipo_ribermax_45x45_min.webp',
            'Ribermax São Paulo',
            45,
            45,
          ),
        },
        {
          joinNextRow: false,
          title: 'WhatsApp',
          description:
            'Clique no botão verde no canto inferior direito da ' +
            'tela para falar conosco pelo WhatsApp.',
          link: null,
          media: null,
          icon: mediaAsset(
            'logotipo_whatsapp_512x512.png',
            'WhatsApp',
            512,
            512,
          ),
        },
      ],
    },
    {
      component: 'sections.rich-text',
      content:
        '## Horário de Atendimento\n\n' +
        'Segunda a sexta-feira, das 8h às 18h.\n\n' +
        'Solicite orçamento para embalagens de madeira sob medida ' +
        'com certificação para exportação quando necessário.',
      features: [],
    },
  ],
  metadata: {
    metaTitle: 'Embalagens de Madeira Fumigada',
    metaDescription:
      'Conheça a Ribermax: soluções em embalagens de madeira ' +
      'personalizadas para transporte e armazenamento seguro.',
    shareImage: mediaAsset(
      'Logo_Ribermax_min.webp',
      'Logomarca Ribermax',
      1000,
      731,
    ),
  },
};
