import type { IndicatorIngestion } from './types';
import { mindicadorTPM } from '../sources/mindicador';

export const tpm: IndicatorIngestion = {
  indicatorId: 'tpm',
  granularity: 'monthly',
  sources: [mindicadorTPM],
  methodology:
    'Tasa de Politica Monetaria definida por el Banco Central de Chile en sus reuniones de politica monetaria (8 al ano). Es la tasa de referencia para el sistema financiero.',
};
