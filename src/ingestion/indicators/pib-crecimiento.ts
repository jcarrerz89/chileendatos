import type { IndicatorIngestion } from './types';
import { imfGDPGrowth } from '../sources/imf';
import { wbGDPGrowth } from '../sources/worldbank';

export const pibCrecimiento: IndicatorIngestion = {
  indicatorId: 'pib-crecimiento',
  granularity: 'annual',
  sources: [imfGDPGrowth, wbGDPGrowth],
  methodology:
    'Tasa de crecimiento anual del PIB real. Fuente primaria: FMI World Economic Outlook. Fuente secundaria: Banco Mundial.',
};
