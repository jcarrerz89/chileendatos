import type { RawDataPoint } from '../core/normalize';
import type { SourceFetcher, FetchParams } from './types';

const BASE_URL = 'https://www.imf.org/external/datamapper/api/v1';

interface IMFResponse {
  values: {
    [indicatorCode: string]: {
      CHL: {
        [year: string]: number;
      };
    };
  };
}

async function fetchIMFIndicator(
  indicatorCode: string,
  unit: string,
  params: FetchParams
): Promise<RawDataPoint[]> {
  const startYear = params.startDate?.getFullYear() ?? 2000;
  const endYear = params.endDate?.getFullYear() ?? new Date().getFullYear() + 2;

  const periods = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  ).join(',');

  const url = `${BASE_URL}/${indicatorCode}/CHL?periods=${periods}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`IMF API returned ${response.status} for ${url}`);
  }

  const data: IMFResponse = await response.json();
  const yearData = data.values?.[indicatorCode]?.CHL;

  if (!yearData) return [];

  const points: RawDataPoint[] = [];

  for (const [yearStr, value] of Object.entries(yearData)) {
    const year = parseInt(yearStr, 10);
    points.push({
      value,
      referenceDate: yearStr,
      referenceDateStart: new Date(year, 0, 1),
      referenceDateEnd: new Date(year, 11, 31),
      unit,
      sourceUrl: `${BASE_URL}/${indicatorCode}/CHL?periods=${yearStr}`,
    });
  }

  return points;
}

// Real GDP growth
export const imfGDPGrowth: SourceFetcher = {
  sourceId: 'imf',
  async fetch(params) {
    return fetchIMFIndicator('NGDP_RPCH', '%', params);
  },
};

// GDP current prices (billions USD)
export const imfGDP: SourceFetcher = {
  sourceId: 'imf',
  async fetch(params) {
    const points = await fetchIMFIndicator('NGDPD', 'USD_BILLIONS', params);
    return points.map((p) => ({
      ...p,
      value: p.value * 1_000_000_000,
      unit: 'USD',
    }));
  },
};

// Inflation rate average CPI
export const imfInflation: SourceFetcher = {
  sourceId: 'imf',
  async fetch(params) {
    return fetchIMFIndicator('PCPIPCH', '%', params);
  },
};

// General government net lending/borrowing (% GDP)
export const imfFiscalBalance: SourceFetcher = {
  sourceId: 'imf',
  async fetch(params) {
    return fetchIMFIndicator('GGXCNL_NGDP', '%', params);
  },
};

// General government revenue (% GDP)
export const imfGovRevenue: SourceFetcher = {
  sourceId: 'imf',
  async fetch(params) {
    return fetchIMFIndicator('GGR_NGDP', '%', params);
  },
};

// General government expenditure (% GDP)
export const imfGovExpenditure: SourceFetcher = {
  sourceId: 'imf',
  async fetch(params) {
    return fetchIMFIndicator('GGX_NGDP', '%', params);
  },
};

// General government gross debt (% GDP)
export const imfGovDebt: SourceFetcher = {
  sourceId: 'imf',
  async fetch(params) {
    return fetchIMFIndicator('GGXWDG_NGDP', '%', params);
  },
};

// Unemployment rate
export const imfUnemployment: SourceFetcher = {
  sourceId: 'imf',
  async fetch(params) {
    return fetchIMFIndicator('LUR', '%', params);
  },
};
