import type { IndicatorIngestion } from './types';
import { mindicadorIPC } from '../sources/mindicador';

export const inflacionIPC: IndicatorIngestion = {
  indicatorId: 'inflacion-ipc',
  granularity: 'monthly',
  sources: [mindicadorIPC],
  methodology:
    'Variacion porcentual mensual del Indice de Precios al Consumidor (IPC), calculado por el INE y publicado por el Banco Central de Chile. Fuente secundaria: mindicador.cl.',
};
