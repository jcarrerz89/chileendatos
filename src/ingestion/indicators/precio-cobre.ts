import type { IndicatorIngestion } from './types';
import { mindicadorCobre } from '../sources/mindicador';

export const precioCobre: IndicatorIngestion = {
  indicatorId: 'precio-cobre',
  granularity: 'daily',
  sources: [mindicadorCobre],
  methodology:
    'Precio de la libra de cobre en dolares estadounidenses, segun la Bolsa de Metales de Londres (LME). Chile es el mayor productor mundial, con ~27% de la produccion global.',
};
