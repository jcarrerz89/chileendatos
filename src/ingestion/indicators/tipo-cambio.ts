import type { IndicatorIngestion } from './types';
import { mindicadorDolar } from '../sources/mindicador';

export const tipoCambio: IndicatorIngestion = {
  indicatorId: 'tipo-cambio',
  granularity: 'daily',
  sources: [mindicadorDolar],
  methodology:
    'Tipo de cambio observado del dolar estadounidense en pesos chilenos, publicado por el Banco Central de Chile. Promedio de operaciones del dia habil anterior.',
};
