import {
  CALCULATOR_LAUNCH_LABEL,
  MIN_ORDER_LABEL,
} from '@/lib/seo/calculator-launch';

export const PRIORITY_SEO_SLUGS = [
  'caixa-madeira-fumigada-exportacao',
  'embalagens-madeira-ribeirao-preto',
  'empresa-caixas-madeira',
  'fabrica-caixas-madeira',
  'caixas-madeira-equipamentos',
] as const;

export type PrioritySeoSlug = (typeof PRIORITY_SEO_SLUGS)[number];

export function isPrioritySeoSlug(slug: string): slug is PrioritySeoSlug {
  return (PRIORITY_SEO_SLUGS as readonly string[]).includes(slug);
}

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoSolutionCard = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type PriorityLandingConfig = {
  slug: PrioritySeoSlug;
  heroLead: string;
  heroBullets: [string, string, string];
  faqs: SeoFaqItem[];
  stickyCtaLabel: string;
};

export const SEO_PROOF_ITEMS = [
  'Desde 1996',
  'Fábrica em Ribeirão Preto',
  'Madeira de reflorestamento',
  'Tratamento HT / NIMF-15',
  'Prazo ~7 dias',
] as const;

export const SEO_SOLUTION_CARDS: SeoSolutionCard[] = [
  {
    title: 'Caixa fechada',
    description:
      'Proteção completa para equipamentos e peças que não podem circular soltos.',
    href: '/caixas-madeira-equipamentos/',
    imageSrc: '/images/calculadora/box.webp',
    imageAlt: 'Caixa de madeira fechada sob medida',
  },
  {
    title: 'Engradado',
    description:
      'Estrutura aberta com bom custo quando a proteção lateral total não é necessária.',
    href: '/engradado-madeira/',
    imageSrc: '/images/calculadora/crate.webp',
    imageAlt: 'Engradado de madeira para transporte industrial',
  },
  {
    title: 'Palete sob medida',
    description:
      'Base dimensional para unitização e manuseio com empilhadeira.',
    href: '/fabrica-caixas-madeira/',
    imageSrc: '/images/calculadora/pallet.webp',
    imageAlt: 'Palete de madeira sob medida',
  },
  {
    title: 'Exportação HT',
    description:
      'Carimbo IPPC, tratamento térmico e certificado para embarque internacional.',
    href: '/caixa-madeira-fumigada-exportacao/',
    imageSrc: '/images/calculadora/stamp-export.webp',
    imageAlt: 'Carimbo IPPC de madeira tratada para exportação',
  },
];

export const PRIORITY_LANDINGS: Record<PrioritySeoSlug, PriorityLandingConfig> =
  {
    'caixa-madeira-fumigada-exportacao': {
      slug: 'caixa-madeira-fumigada-exportacao',
      heroLead:
        'Caixas e engradados com tratamento HT (NIMF-15), carimbo IPPC e ' +
        'certificado — sob medida para máquinas e peças que vão ao exterior.',
      heroBullets: [
        'HT alinhado à NIMF-15 (não confunda com brometo)',
        'Carimbo em laterais + certificado para a documentação',
        'Medidas internas definidas por você',
      ],
      stickyCtaLabel: 'Orçar caixa para exportação',
      faqs: [
        {
          question: 'Preciso de caixa fumigada ou de tratamento HT?',
          answer:
            'Para a maioria das exportações, o que importa é atender à NIMF-15. ' +
            'Hoje isso costuma significar tratamento térmico HT, mesmo que a ' +
            'busca no Google use “fumigada”.',
        },
        {
          question: 'O que significa 56 °C / 30 min?',
          answer:
            'É o perfil térmico de referência do tratamento HT: o núcleo da ' +
            'madeira deve atingir pelo menos 56 °C e permanecer nesse nível ' +
            'por no mínimo 30 minutos, conforme a norma.',
        },
        {
          question: 'O que aparece no carimbo IPPC?',
          answer:
            'A marcação típica inclui o símbolo IPPC, o código do país (BR), ' +
            'o número de registro da unidade tratadora, o método (HT) e a ' +
            'unidade federativa. Aplicamos o carimbo em laterais da embalagem.',
        },
        {
          question: 'Tem pedido mínimo?',
          answer:
            `Sim. Trabalhamos com pedido mínimo de ${MIN_ORDER_LABEL}.`,
        },
        {
          question: 'Qual o prazo?',
          answer:
            'Trabalhamos com entrega em cerca de 7 dias a partir da data do ' +
            'pedido, conforme o projeto e a demanda do período.',
        },
      ],
    },
    'embalagens-madeira-ribeirao-preto': {
      slug: 'embalagens-madeira-ribeirao-preto',
      heroLead:
        'Fábrica própria na Vila Elisa: caixas e engradados sob medida para ' +
        'indústria do interior paulista e envios para outras regiões.',
      heroBullets: [
        'Rua Áustria, 585 – Vila Elisa – Ribeirão Preto/SP',
        'Visita técnica e retirada com mais agilidade',
        'HT para exportação quando o destino exigir',
      ],
      stickyCtaLabel: 'Orçar em Ribeirão Preto',
      faqs: [
        {
          question: 'A Ribermax fica em Ribeirão Preto?',
          answer:
            'Sim. Fábrica na Rua Áustria, 585 – Vila Elisa – CEP 14075-430 – ' +
            'Ribeirão Preto/SP.',
        },
        {
          question: 'Vocês só atendem a região?',
          answer:
            'Não. A base é Ribeirão Preto, mas enviamos embalagens para outras ' +
            'regiões conforme o projeto.',
        },
        {
          question: 'Como peço orçamento hoje?',
          answer:
            'Pelo WhatsApp ou e-mail comercial, com medidas, peso aproximado e ' +
            'fotos se possível. Em ' +
            `${CALCULATOR_LAUNCH_LABEL} lançamos a calculadora online no site.`,
        },
        {
          question: 'Tem pedido mínimo?',
          answer:
            `Sim. Pedido mínimo de ${MIN_ORDER_LABEL}.`,
        },
        {
          question: 'Fazem caixa para exportação?',
          answer:
            'Sim, com tratamento HT e certificado. Veja a página de caixa de ' +
            'madeira fumigada para exportação.',
        },
      ],
    },
    'empresa-caixas-madeira': {
      slug: 'empresa-caixas-madeira',
      heroLead:
        'Fabricante desde 1996 com foco exclusivo em embalagens de madeira ' +
        'para equipamentos e peças — projeto, produção e entrega alinhados ' +
        'ao seu embarque.',
      heroBullets: [
        'Produção própria em Ribeirão Preto',
        'Caixa, engradado ou solução combinada',
        'Atendimento B2B com prazo de referência ~7 dias',
      ],
      stickyCtaLabel: 'Falar com a Ribermax',
      faqs: [
        {
          question: 'Desde quando a Ribermax existe?',
          answer:
            'Desde 1996, com foco exclusivo em embalagens de madeira para ' +
            'equipamentos e peças.',
        },
        {
          question: 'Vocês vendem só caixa fechada?',
          answer:
            'Não. Fabricamos caixas e engradados, conforme o nível de ' +
            'proteção e o custo-benefício do projeto.',
        },
        {
          question: 'Tem pedido mínimo?',
          answer:
            `Sim. Pedido mínimo de ${MIN_ORDER_LABEL}.`,
        },
        {
          question: 'Atendem exportação?',
          answer:
            'Sim. Para cargas internacionais, trabalhamos com tratamento HT ' +
            'e certificado.',
        },
        {
          question: 'Onde fica a empresa?',
          answer:
            'Rua Áustria, 585 – Vila Elisa – Ribeirão Preto/SP – CEP 14075-430.',
        },
      ],
    },
    'fabrica-caixas-madeira': {
      slug: 'fabrica-caixas-madeira',
      heroLead:
        'Compre direto de quem corta e monta: caixas e engradados sob medida, ' +
        'do econômico ao reforçado, com madeira de reflorestamento.',
      heroBullets: [
        'Modelos alinhados ao peso e à proteção necessária',
        'Medidas internas definidas pelo cliente',
        'Fluxo HT quando houver exportação',
      ],
      stickyCtaLabel: 'Orçar na fábrica',
      faqs: [
        {
          question: 'A fábrica fica onde?',
          answer:
            'Em Ribeirão Preto/SP (Vila Elisa). Atendimento local e envios ' +
            'para outras praças.',
        },
        {
          question: 'Fabricam só caixa ou também engradado?',
          answer:
            'Os dois. A escolha depende do nível de proteção necessário.',
        },
        {
          question: 'Quais modelos existem?',
          answer:
            'Da linha econômica à reforçada (caixa ou engradado), conforme ' +
            'peso, tamanho e manuseio. Indicamos o modelo na cotação.',
        },
        {
          question: 'Tem pedido mínimo?',
          answer:
            `Sim. Pedido mínimo de ${MIN_ORDER_LABEL}.`,
        },
        {
          question: 'Dá para exportar com a embalagem de vocês?',
          answer:
            'Sim, com tratamento HT, carimbo e certificado.',
        },
      ],
    },
    'caixas-madeira-equipamentos': {
      slug: 'caixas-madeira-equipamentos',
      heroLead:
        'Embalagem estrutural para máquinas e dispositivos industriais: ' +
        'medidas internas certas, apoio interno quando preciso e opção de ' +
        'engradado quando a proteção aberta basta.',
      heroBullets: [
        'Projeto a partir do peso e dos pontos frágeis',
        'Adequada a empilhadeira e içamento',
        'Exportação com HT quando o destino exigir',
      ],
      stickyCtaLabel: 'Orçar caixa para equipamento',
      faqs: [
        {
          question: 'Caixa ou engradado para o meu equipamento?',
          answer:
            'Caixa fechada protege mais contra impacto e intempéries. ' +
            'Engradado pode reduzir custo quando a estrutura aberta é ' +
            'suficiente. Comparamos os dois na cotação.',
        },
        {
          question: 'O que vocês precisam para orçar?',
          answer:
            'Medidas do equipamento (ou da caixa), peso aproximado, fotos, ' +
            'como será manuseado (empilhadeira, içamento) e o destino ' +
            '(interno ou exportação).',
        },
        {
          question: 'Dá para fixar o equipamento dentro da caixa?',
          answer:
            'Sim — o projeto pode prever apoio e restrição de movimento ' +
            'conforme o item, definido antes da produção.',
        },
        {
          question: 'Tem pedido mínimo?',
          answer:
            `Sim. Pedido mínimo de ${MIN_ORDER_LABEL}.`,
        },
        {
          question: 'Qual o prazo médio?',
          answer:
            'Cerca de 7 dias após o pedido, conforme o projeto e a fila de ' +
            'produção.',
        },
      ],
    },
  };
