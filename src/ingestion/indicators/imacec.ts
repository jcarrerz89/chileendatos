import type { IndicatorIngestion } from './types';
import { mindicadorIMACEC } from '../sources/mindicador';

export const imacec: IndicatorIngestion = {
  indicatorId: 'imacec',
  granularity: 'monthly',
  sources: [mindicadorIMACEC],
  methodology:
    'Indicador Mensual de Actividad Economica. Estimacion mensual de la variacion del PIB, calculado por el Banco Central de Chile. Publicado con aproximadamente 6 semanas de rezago.',
};
