import type { IndicatorIngestion } from './types';
import { inflacionIPC } from './inflacion-ipc';
import { pibCrecimiento } from './pib-crecimiento';
import { deudaExterna } from './deuda-externa';
import { balanceFiscal } from './balance-fiscal';
import { desempleo } from './desempleo';

export const INDICATORS: Record<string, IndicatorIngestion> = {
  'inflacion-ipc': inflacionIPC,
  'pib-crecimiento': pibCrecimiento,
  'deuda-externa': deudaExterna,
  'balance-fiscal': balanceFiscal,
  desempleo: desempleo,
};

export function getIndicatorIngestion(id: string): IndicatorIngestion | undefined {
  return INDICATORS[id];
}

export function getAllIndicatorIds(): string[] {
  return Object.keys(INDICATORS);
}
