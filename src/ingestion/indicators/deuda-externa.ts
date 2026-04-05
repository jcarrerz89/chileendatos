import type { IndicatorIngestion } from './types';
import { imfGovDebt } from '../sources/imf';

export const deudaExterna: IndicatorIngestion = {
  indicatorId: 'deuda-externa',
  granularity: 'annual',
  sources: [imfGovDebt],
  methodology:
    'Deuda bruta del gobierno general como porcentaje del PIB. Fuente: FMI World Economic Outlook (GGXWDG_NGDP). Incluye deuda interna y externa del gobierno central, gobiernos subnacionales y seguridad social.',
};
