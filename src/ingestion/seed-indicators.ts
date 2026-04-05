import { indicatorsCollection } from '@/lib/firebase/collections';
import type { Indicator, IndicatorCategory, Granularity } from '@/lib/types/indicator';

const INDICATOR_SEEDS: Omit<Indicator, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    slug: 'inflacion-ipc',
    name: 'Inflacion (IPC)',
    description:
      'Variacion porcentual del Indice de Precios al Consumidor. Mide el cambio en el costo de una canasta representativa de bienes y servicios que consumen los hogares.',
    unit: '%',
    category: 'precios',
    granularity: 'monthly',
    sources: [
      {
        name: 'mindicador.cl',
        url: 'https://mindicador.cl',
        methodology:
          'IPC calculado por el INE, publicado por el Banco Central. Variacion mensual.',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 1,
    isActive: true,
  },
  {
    slug: 'pib-crecimiento',
    name: 'Crecimiento del PIB',
    description:
      'Tasa de crecimiento anual del Producto Interno Bruto real. Indica la velocidad a la que crece (o decrece) la economia del pais.',
    unit: '%',
    category: 'actividad',
    granularity: 'annual',
    sources: [
      {
        name: 'Fondo Monetario Internacional',
        url: 'https://data.imf.org',
        methodology: 'World Economic Outlook (WEO). Codigo: NGDP_RPCH.',
      },
      {
        name: 'Banco Mundial',
        url: 'https://data.worldbank.org/country/chile',
        methodology: 'Codigo: NY.GDP.MKTP.KD.ZG.',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 2,
    isActive: true,
  },
  {
    slug: 'deuda-externa',
    name: 'Deuda Publica (% PIB)',
    description:
      'Deuda bruta del gobierno general como porcentaje del PIB. Incluye deuda interna y externa del gobierno central, gobiernos subnacionales y seguridad social.',
    unit: '%',
    category: 'fiscal',
    granularity: 'annual',
    sources: [
      {
        name: 'Fondo Monetario Internacional',
        url: 'https://data.imf.org',
        methodology: 'WEO. Codigo: GGXWDG_NGDP. Deuda bruta gobierno general.',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 3,
    isActive: true,
  },
  {
    slug: 'balance-fiscal',
    name: 'Balance Fiscal',
    description:
      'Diferencia entre ingresos y gastos del gobierno general como porcentaje del PIB. Valores negativos indican deficit fiscal.',
    unit: '%',
    category: 'fiscal',
    granularity: 'annual',
    sources: [
      {
        name: 'Fondo Monetario Internacional',
        url: 'https://data.imf.org',
        methodology: 'WEO. Codigo: GGXCNL_NGDP. Net lending/borrowing.',
      },
      {
        name: 'Banco Mundial',
        url: 'https://data.worldbank.org/country/chile',
        methodology: 'Codigo: GC.BAL.CASH.GD.ZS.',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 4,
    isActive: true,
  },
  {
    slug: 'desempleo',
    name: 'Tasa de Desempleo',
    description:
      'Porcentaje de la fuerza laboral que busca empleo activamente. Calculada por el INE a traves de la Encuesta Nacional de Empleo.',
    unit: '%',
    category: 'empleo',
    granularity: 'monthly',
    sources: [
      {
        name: 'mindicador.cl',
        url: 'https://mindicador.cl',
        methodology: 'INE - Encuesta Nacional de Empleo (ENE).',
      },
      {
        name: 'Banco Mundial',
        url: 'https://data.worldbank.org/country/chile',
        methodology: 'Codigo: SL.UEM.TOTL.ZS. Dato anual.',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 5,
    isActive: true,
  },
  {
    slug: 'imacec',
    name: 'Actividad Economica (IMACEC)',
    description:
      'Estimacion mensual de la variacion del PIB. Resume la produccion de bienes y servicios de toda la economia antes de que se publique el PIB trimestral.',
    unit: 'points',
    category: 'actividad',
    granularity: 'monthly',
    sources: [
      {
        name: 'mindicador.cl',
        url: 'https://mindicador.cl',
        methodology:
          'IMACEC calculado por el Banco Central de Chile. Publicado con ~6 semanas de rezago.',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 6,
    isActive: true,
  },
  {
    slug: 'tpm',
    name: 'Tasa de Politica Monetaria (TPM)',
    description:
      'Tasa de interes que define el Banco Central como referencia para el sistema financiero. Es la herramienta principal para controlar la inflacion. Cuando sube, suben los creditos.',
    unit: '%',
    category: 'monetario',
    granularity: 'monthly',
    sources: [
      {
        name: 'mindicador.cl',
        url: 'https://mindicador.cl',
        methodology:
          'TPM definida en reuniones de politica monetaria del Banco Central (8 al ano).',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 7,
    isActive: true,
  },
  {
    slug: 'tipo-cambio',
    name: 'Tipo de Cambio Dolar',
    description:
      'Precio del dolar estadounidense en pesos chilenos. Chile importa combustibles, alimentos procesados, tecnologia y vehiculos. Cuando el dolar sube, sube el costo de estos bienes.',
    unit: 'CLP',
    category: 'externo',
    granularity: 'daily',
    sources: [
      {
        name: 'mindicador.cl',
        url: 'https://mindicador.cl',
        methodology:
          'Tipo de cambio observado publicado por el Banco Central de Chile.',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 8,
    isActive: true,
  },
  {
    slug: 'precio-cobre',
    name: 'Precio del Cobre',
    description:
      'Precio de la libra de cobre en dolares (LME). Chile es el mayor productor mundial. El cobre representa ~50% de las exportaciones y es determinante en los ingresos fiscales.',
    unit: 'USD',
    category: 'externo',
    granularity: 'daily',
    sources: [
      {
        name: 'mindicador.cl',
        url: 'https://mindicador.cl',
        methodology:
          'Precio de la Bolsa de Metales de Londres (LME), publicado via Cochilco.',
      },
    ],
    derivedFrom: null,
    formula: null,
    displayOrder: 9,
    isActive: true,
  },
];

async function seed() {
  const now = new Date();
  const ref = indicatorsCollection();

  for (const indicator of INDICATOR_SEEDS) {
    const docRef = ref.doc(indicator.slug);
    const existing = await docRef.get();

    if (existing.exists) {
      console.log(`  Ya existe: ${indicator.slug}`);
      continue;
    }

    await docRef.set({
      ...indicator,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`  Creado: ${indicator.slug}`);
  }

  console.log('Seed completado.');
}

seed().catch(console.error);
