import type { IndicatorIngestion } from './types';
import { wbUnemployment } from '../sources/worldbank';

export const desempleo: IndicatorIngestion = {
  indicatorId: 'desempleo',
  granularity: 'annual',
  sources: [wbUnemployment],
  methodology:
    'Tasa de desocupacion nacional como porcentaje de la fuerza laboral. Fuente: Banco Mundial (SL.UEM.TOTL.ZS), basado en datos del INE.',
};
