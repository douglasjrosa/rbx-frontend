import type {
  HomePage,
  HomeProductModel,
  HomeProductModelSpec,
} from '@/lib/content/types';
import { homeSectionHref, HOME_SECTIONS } from '@/lib/home-sections';
import { mediaAsset } from '@/lib/images';

function modelImage(filename: string, alt: string): HomeProductModel['image'] {
  return mediaAsset(filename, alt, 300, 273);
}

function specs(items: HomeProductModelSpec[]): HomeProductModelSpec[] {
  return items;
}

const productModels: HomeProductModel[] = [
  {
    title: 'Caixa Super Reforçada',
    image: modelImage('caixa-super-reforcada.webp', 'Caixa super reforçada'),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 60 x 18mm' },
      {
        label: 'Revestimento',
        value: 'fechamento total em madeira maciça',
      },
      { label: 'Palete', value: 'com pé alto para paleteira' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 2500kg' },
    ]),
  },
  {
    title: 'Caixa Reforçada',
    image: modelImage('caixa-reforcada.webp', 'Caixa reforçada'),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 60 x 18mm' },
      {
        label: 'Revestimento',
        value: 'compensado de 4mm de espessura',
      },
      { label: 'Palete', value: 'com pé alto para paleteira' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 1500kg' },
    ]),
  },
  {
    title: 'Caixa Resistente',
    image: modelImage('caixa-resistente.webp', 'Caixa resistente'),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 30 x 18mm' },
      {
        label: 'Revestimento',
        value: 'compensado de 4mm de espessura',
      },
      { label: 'Palete', value: 'com pé alto para paleteira' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 1000kg' },
    ]),
  },
  {
    title: 'Caixa Estruturada',
    image: modelImage('caixa-estruturada.webp', 'Caixa estruturada'),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 60 x 18mm' },
      {
        label: 'Revestimento',
        value: 'compensado de 3mm de espessura',
      },
      { label: 'Palete', value: 'com pé alto para paleteira' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 1000kg' },
    ]),
  },
  {
    title: 'Caixa Econômica',
    image: modelImage('caixa-economica.webp', 'Caixa econômica'),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 30 x 18mm' },
      {
        label: 'Revestimento',
        value: 'compensado de 3mm de espessura',
      },
      { label: 'Palete', value: 'com pé alto para paleteira' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 900kg' },
    ]),
  },
  {
    title: 'Caixa Leve',
    image: modelImage('caixa-leve.webp', 'Caixa leve'),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 30 x 18mm' },
      {
        label: 'Revestimento',
        value: 'compensado de 3mm de espessura',
      },
      { label: 'Palete', value: 'Embalagem sem pés' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 40kg' },
    ]),
  },
  {
    title: 'Caixa Super Leve',
    image: modelImage('caixa-super-leve.webp', 'Caixa super leve'),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 30 x 18mm' },
      {
        label: 'Revestimento',
        value: 'compensado de 3mm de espessura',
      },
      { label: 'Palete', value: 'Embalagem com pés baixos' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 25kg' },
    ]),
  },
  {
    title: 'Palete Sob Medida',
    image: modelImage('palete-sob-medida.webp', 'Palete sob medida'),
    specs: specs([
      { label: 'Palete', value: 'com pé alto para paleteira' },
      {
        label: 'Fechamento',
        value: 'superior com ou sem vãos*',
      },
      { label: 'Pés', value: 'reforçados ou econômicos*' },
      { label: 'Exportação', value: 'Fumigado para Exportação' },
      {
        label: 'Indicado para',
        value: 'até 2000kg. Conforme a preferência do cliente',
      },
    ]),
  },
  {
    title: 'Engradado Reforçado',
    image: modelImage('engradado-reforcado.webp', 'Engradado reforçado'),
    specs: specs([
      {
        label: 'Estrutura',
        value: 'sarrafos de 60 x 18mm e tábuas de 100 x 18mm',
      },
      { label: 'Revestimento', value: 'sem revestimento' },
      { label: 'Palete', value: 'com pé alto para paleteira' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 2000kg' },
    ]),
  },
  {
    title: 'Engradado Resistente',
    image: modelImage('engradado-resistente.webp', 'Engradado resistente'),
    specs: specs([
      {
        label: 'Estrutura',
        value: 'sarrafos de 60 x 18mm e tábuas de 100 x 18mm',
      },
      { label: 'Revestimento', value: 'sem revestimento' },
      { label: 'Palete', value: 'com pé alto para paleteira' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 700kg' },
    ]),
  },
  {
    title: 'Engradado Econômico',
    image: modelImage(
      'engradado_economico-300x273.webp',
      'Engradado econômico',
    ),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 30 x 18mm' },
      { label: 'Revestimento', value: 'sem revestimento' },
      { label: 'Palete', value: 'com pé alto para paleteira' },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      { label: 'Indicada para', value: 'até 500kg' },
    ]),
  },
  {
    title: 'Engradado Leve',
    image: modelImage('engradado-leve.webp', 'Engradado leve'),
    specs: specs([
      { label: 'Estrutura', value: 'sarrafos de 30 x 18mm' },
      {
        label: 'Revestimento',
        value: 'Embalagem sem revestimento ou pés',
      },
      { label: 'Exportação', value: 'Fumigada para Exportação' },
      {
        label: 'Indicado para',
        value:
          'até 50kg. Adequado para reforço de embalagens de papelão',
      },
    ]),
  },
];

function diversityImage(slug: string, alt: string) {
  return mediaAsset(`diversity/${slug}.png`, alt, 400, 300);
}

export const homePage: HomePage = {
  slug: 'home',
  shortName: 'Home',
  hero: {
    title: 'Conheça a Ribermax!',
    description:
      'Desde o início nosso único foco tem sido a fabricação de ' +
      'embalagens de madeira para equipamentos e peças em geral. ' +
      'Fundada em 1996, tem experiência no segmento de embalagens de ' +
      'médio porte para produtos volumosos e delicados. Toda a nossa ' +
      'madeira tem origem de reflorestamento.',
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
      'Garantindo Segurança e\nQualidade na sua entrega!',
  },
  highlights: {
    stats: [
      {
        value: '+ 25 Anos',
        description:
          'desenvolvendo soluções em embalagens de madeira',
      },
      {
        value: '+ 3000',
        description:
          'embalagens produzidas com muita dedicação por nossa equipe',
      },
      {
        value: '100%',
        description:
          'de personalização para solucionar a sua demanda!',
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
  cta: {
    text:
      'Na Ribermax Embalagens, não exigimos pedido mínimo e ' +
      'personalizamos suas embalagens conforme sua necessidade. Com ' +
      'nossa expertise, você obtém a embalagem ideal sem complicações.',
    button: {
      newTab: false,
      url: homeSectionHref(HOME_SECTIONS.informacoes),
      text: 'Mais informações',
    },
  },
  models: {
    title: 'Modelos Exclusivos de Embalagens',
    description:
      'Ao longo da nossa história de mais de 25 anos de mercado, ' +
      'desenvolvemos vários tipos e padrões de embalagem justamente ' +
      'para ajustar nossas caixas e engradados aos produtos específicos ' +
      'de clientes como você que precisa de algo sob medida.',
    models: productModels,
    button: {
      newTab: false,
      url: homeSectionHref(HOME_SECTIONS.contato),
      text: 'Escolher meu Modelo de Embalagem',
    },
  },
  customPackaging: {
    title: 'Não encontrou um modelo adequado para você?',
    paragraphs: [
      'Estamos sempre prontos para atender demandas especiais. Caixas ' +
        'pequenas ou grandes demais? Não importa! Estamos aqui para ' +
        'resolver o seu problema, independentemente do tamanho ou quantidade.',
      'Ajude-nos a entender como o seu produto precisa ser protegido. ' +
        'Nossa missão é encontrar a solução mais viável para garantir a ' +
        'segurança do seu produto durante o transporte e armazenamento.',
      'Vamos desenvolver juntos uma embalagem só sua. Com nossa vasta ' +
        'experiência, já testamos muitos modelos e sabemos exatamente o ' +
        'que indicar para o seu caso, seja qual for a necessidade.',
      'E se você nos surpreender com uma demanda única? Ótimo! Adoramos ' +
        'um novo desafio. Conte com a Ribermax para criar a embalagem ' +
        'perfeita, personalizada e eficiente para o seu produto.',
    ],
    button: {
      newTab: false,
      url: homeSectionHref(HOME_SECTIONS.contato),
      text: 'Criar minha Embalagem Personalizada',
    },
    image: mediaAsset(
      'caixa-madeira-fumigada-1.webp',
      'Embalagem de madeira personalizada Ribermax',
      800,
      600,
    ),
  },
  infoRows: {
    rows: [
      {
        title: 'Problemas com a transportadora?',
        paragraphs: [
          'Muitos dos nossos clientes nos procuram pela primeira vez por ' +
            'encontrar problemas com a transportadora na hora de expedir ' +
            'seus produtos.',
          'Algumas transportadoras exigem a embalagem de madeira, outras ' +
            'simplesmente não se responsabilizam pela integridade do ' +
            'produto transportado por causa da falta da embalagem...',
        ],
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
        buttonVariant: 'primary',
      },
      {
        title: 'Madeira Fumigada - Tratamento para Exportação',
        paragraphs: [
          'Outra razão pela qual somos muito procurados, é a necessidade de ' +
            'Embalagens de Madeira Fumigadas para Exportação.',
          'Ao proceder com um processo de exportação, sendo o produto pesado ' +
            'ou grande, é necessário uma embalagem forte e paletizada, mas ' +
            'também com o devido tratamento fitosanitário.',
        ],
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
    paragraphs: [
      'Desde o início nosso único foco tem sido a fabricação de embalagens ' +
        'de madeira para equipamentos e peças em geral.',
      'Fundada em 1996, tem experiência no segmento de embalagens de médio ' +
        'porte para produtos volumosos e delicados. Toda a nossa madeira ' +
        'tem origem de reflorestamento.',
    ],
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
      'Entrega em 7 dias a partir da data do pedido;',
      'Medidas 100% personalizadas, o cliente é quem define comprimento, ' +
        'largura e altura interna da caixa;',
      'Modelos Exclusivos de embalagem para diferentes necessidades;',
      'Certificado de tratamento HT para exportação;',
      'Política de descontos para clientes parceiros.',
    ],
  },
  diversity: {
    whenTitle: 'Mas afinal, quando usar Embalagens de Madeira?',
    whenItems: [
      'Quando o seu produto é GRANDE, DELICADO ou PESADO;',
      'Quando a caixa de papelão NÃO é forte o bastante;',
      'Quando a transportadora EXIGE uma boa embalagem;',
      'Quando seu produto é de ALTO VALOR e o prejuízo pode ser grande ' +
        'se quebrar;',
      'Quando o produto é para EXPORTAÇÃO ou vai para longe e NÃO pode ' +
        'correr o risco de chegar quebrado no cliente.',
    ],
    title: 'ARTIGOS TÉCNICOS SOBRE O ASSUNTO',
    paragraphs: [
      'Fabricamos embalagens de madeira para diversas situações, sob ' +
        'medida e personalizada para você.',
      'Conheça um pouco melhor sobre nossos produtos.',
    ],
    cards: [
      {
        title: 'Caixa de Madeira Fumigada para Exportação',
        description:
          'Crescem a cada dia as exportações no Brasil e com isso aumenta ' +
          'a procura por Caixa de Madeira Fumigada para Exportação.',
        link: {
          newTab: false,
          url: '/caixa-madeira-fumigada-exportacao',
          text: 'Caixa de Madeira Fumigada para Exportação',
        },
        image: diversityImage(
          'caixa-madeira-fumigada-exportacao',
          'Caixa de madeira fumigada para exportação',
        ),
      },
      {
        title: 'Caixa de Madeira Compensado',
        description:
          'Talvez você já tenha precisado decidir entre tipos diferentes ' +
          'de embalagem para o seu equipamento, máquina ou outro produto.',
        link: {
          newTab: false,
          url: '/caixa-madeira-compensado',
          text: 'Caixa de Madeira Compensado',
        },
        image: diversityImage(
          'caixa-madeira-compensado',
          'Caixa de madeira compensado',
        ),
      },
      {
        title: 'Caixas Especiais de Madeira',
        description:
          'Onde encontrar caixas especiais de madeira perfeitas para o ' +
          'meu produto? Sempre que uma indústria precisa de uma caixa mais ' +
          'resistente, inicia-se um árduo trabalho de busca.',
        link: {
          newTab: false,
          url: '/embalagens-especiais-madeira',
          text: 'Caixas Especiais de Madeira',
        },
        image: diversityImage(
          'embalagens-especiais-madeira',
          'Caixas especiais de madeira',
        ),
      },
      {
        title: 'Fábrica de Embalagens de Madeira',
        description:
          'Ribermax: a fábrica de embalagens de madeira líder de mercado ' +
          'no norte do interior paulista.',
        link: {
          newTab: false,
          url: '/fabrica-embalagens-madeira',
          text: 'Fábrica de Embalagens de Madeira',
        },
        image: diversityImage(
          'fabrica-embalagens-madeira',
          'Fábrica de embalagens de madeira',
        ),
      },
      {
        title: 'Engradado de Madeira para Transporte',
        description:
          'Saiba tudo sobre Engradado de Madeira para Transporte neste post. ' +
          'O ramo de fabricação de máquinas e equipamentos no Brasil sempre ' +
          'foi um segmento sobrevivente da nossa economia.',
        link: {
          newTab: false,
          url: '/engradado-madeira-transporte',
          text: 'Engradado de Madeira para Transporte',
        },
        image: diversityImage(
          'engradado-madeira-transporte',
          'Engradado de madeira para transporte',
        ),
      },
      {
        title: 'Engradado para Exportação',
        description:
          'Você está prestes a ficar mais bem informado sobre Engradado para ' +
          'Exportação. O mercado interno brasileiro tem sido muito hostil com ' +
          'as indústrias de máquinas e equipamentos.',
        link: {
          newTab: false,
          url: '/engradado-exportacao',
          text: 'Engradado para Exportação',
        },
        image: diversityImage(
          'engradado-exportacao',
          'Engradado para exportação',
        ),
      },
      {
        title: 'Caixa de Madeira Fumigada',
        description:
          'Na RIBERMAX EMBALAGENS você encontra caixa de madeira fumigada ' +
          'para resolver o seu problema de embalagem para exportação.',
        link: {
          newTab: false,
          url: '/caixa-madeira-fumigada',
          text: 'Caixa de Madeira Fumigada',
        },
        image: diversityImage(
          'caixa-madeira-fumigada',
          'Caixa de madeira fumigada',
        ),
      },
      {
        title: 'Caixa de Madeira Fumigada para Equipamentos',
        description:
          'Onde posso encontrar engradado de madeira para equipamentos? ' +
          'Sendo essa a sua dúvida, a resposta está aqui.',
        link: {
          newTab: false,
          url: '/engradado-madeira-equipamentos',
          text: 'Engradado de Madeira para Equipamentos',
        },
        image: diversityImage(
          'engradado-madeira-equipamentos',
          'Engradado de madeira para equipamentos',
        ),
      },
      {
        title: 'Fabricante de Embalagem de Madeira',
        description:
          'Você já precisou procurar por um fabricante de embalagem de ' +
          'madeira antes? Sabe aquela situação chata de ter um de seus ' +
          'produtos avariados durante o transporte até o cliente?',
        link: {
          newTab: false,
          url: '/fabricante-embalagem-madeira',
          text: 'Fabricante de Embalagem de Madeira',
        },
        image: diversityImage(
          'fabricante-embalagem-madeira',
          'Fabricante de embalagem de madeira',
        ),
      },
      {
        title: 'Caixa de Madeira para Equipamentos',
        description:
          'Neste artigo você saberá o que importa sobre Caixas de Madeira ' +
          'para Equipamentos. Indústrias fabricantes utilizam embalagens ' +
          'robustas e fortes para proteger seus produtos.',
        link: {
          newTab: false,
          url: '/caixas-madeira-equipamentos',
          text: 'Caixa de Madeira para Equipamentos',
        },
        image: diversityImage(
          'caixas-madeira-equipamentos',
          'Caixa de madeira para equipamentos',
        ),
      },
    ],
  },
  contact: {
    doubtsTitle: 'Ficou com Dúvidas?',
    doubtsDescription:
      'Fale com um Especialista em Embalagens de Madeira. Seja lá qual ' +
      'for o seu caso, conte com a gente, estamos prontos para te atender. ' +
      'Nossa equipe está treinada para tirar todas as suas dúvidas técnicas.',
    visitTitle: 'Faça-nos uma visita!',
    visitDescription:
      'Nossa fábrica está em Ribeirão Preto SP, no norte do estado de ' +
      'São Paulo, localização que favorece a distribuição das nossas ' +
      'embalagens para qualquer lugar do País.',
    address:
      'Rua Áustria, 585 – Vila Elisa – 14075-430 – Ribeirão Preto SP.',
  },
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
