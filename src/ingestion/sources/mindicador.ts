import type { RawDataPoint } from '../core/normalize';
import type { SourceFetcher, FetchParams } from './types';

const BASE_URL = 'https://mindicador.cl/api';

interface MindicadorResponse {
  serie: Array<{
    fecha: string;
    valor: number;
  }>;
}

type MindicadorIndicator = 'uf' | 'ivp' | 'dolar' | 'euro' | 'ipc' | 'utm' | 'imacec' | 'tpm' | 'desempleo' | 'bitcoin' | 'libra_cobre';

function buildUrl(indicator: MindicadorIndicator, year?: number): string {
  if (year) return `${BASE_URL}/${indicator}/${year}`;
  return `${BASE_URL}/${indicator}`;
}

async function fetchIndicator(
  indicator: MindicadorIndicator,
  unit: string,
  params: FetchParams
): Promise<RawDataPoint[]> {
  const startYear = params.startDate?.getFullYear() ?? new Date().getFullYear();
  const endYear = params.endDate?.getFullYear() ?? new Date().getFullYear();
  const points: RawDataPoint[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const url = buildUrl(indicator, year);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`mindicador.cl returned ${response.status} for ${url}`);
    }

    const data: MindicadorResponse = await response.json();

    for (const item of data.serie) {
      const date = new Date(item.fecha);

      if (params.startDate && date < params.startDate) continue;
      if (params.endDate && date > params.endDate) continue;

      points.push({
        value: item.valor,
        referenceDate: date.toISOString().split('T')[0],
        referenceDateStart: date,
        referenceDateEnd: date,
        unit,
        sourceUrl: `${BASE_URL}/${indicator}/${year}`,
      });
    }
  }

  return points;
}

export const mindicadorIPC: SourceFetcher = {
  sourceId: 'mindicador',
  async fetch(params) {
    return fetchIndicator('ipc', '%', params);
  },
};

export const mindicadorDesempleo: SourceFetcher = {
  sourceId: 'mindicador',
  async fetch(params) {
    return fetchIndicator('desempleo', '%', params);
  },
};

export const mindicadorIMACEC: SourceFetcher = {
  sourceId: 'mindicador',
  async fetch(params) {
    return fetchIndicator('imacec', 'points', params);
  },
};

export const mindicadorDolar: SourceFetcher = {
  sourceId: 'mindicador',
  async fetch(params) {
    return fetchIndicator('dolar', 'CLP', params);
  },
};

export const mindicadorTPM: SourceFetcher = {
  sourceId: 'mindicador',
  async fetch(params) {
    return fetchIndicator('tpm', '%', params);
  },
};

export const mindicadorCobre: SourceFetcher = {
  sourceId: 'mindicador',
  async fetch(params) {
    return fetchIndicator('libra_cobre', 'USD', params);
  },
};
