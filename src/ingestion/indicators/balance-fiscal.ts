import type { IndicatorIngestion } from './types';
import { imfFiscalBalance } from '../sources/imf';
import { wbFiscalBalance } from '../sources/worldbank';

export const balanceFiscal: IndicatorIngestion = {
  indicatorId: 'balance-fiscal',
  granularity: 'annual',
  sources: [imfFiscalBalance, wbFiscalBalance],
  methodology:
    'Balance fiscal del gobierno general como porcentaje del PIB. Valores negativos indican deficit. Fuente primaria: FMI (GGXCNL_NGDP). Fuente secundaria: Banco Mundial.',
};
