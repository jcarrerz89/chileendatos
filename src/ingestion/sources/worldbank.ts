import type { RawDataPoint } from '../core/normalize';
import type { SourceFetcher, FetchParams } from './types';

const BASE_URL = 'https://api.worldbank.org/v2/country/CHL/indicator';

interface WBResponse {
  page: number;
  pages: number;
  per_page: string;
  total: number;
}

interface WBDataItem {
  date: string;
  value: number | null;
  indicator: { id: string; value: string };
}

async function fetchWBIndicator(
  indicatorCode: string,
  unit: string,
  params: FetchParams
): Promise<RawDataPoint[]> {
  const startYear = params.startDate?.getFullYear() ?? 2000;
  const endYear = params.endDate?.getFullYear() ?? new Date().getFullYear();
  const dateRange = `${startYear}:${endYear}`;

  const url = `${BASE_URL}/${indicatorCode}?format=json&per_page=100&date=${dateRange}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`World Bank API returned ${response.status} for ${url}`);
  }

  const json = await response.json();

  // World Bank returns [metadata, data] array
  if (!Array.isArray(json) || json.length < 2 || !json[1]) {
    return [];
  }

  const data: WBDataItem[] = json[1];
  const points: RawDataPoint[] = [];

  for (const item of data) {
    if (item.value === null) continue;

    const year = parseInt(item.date, 10);
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    points.push({
      value: item.value,
      referenceDate: item.date,
      referenceDateStart: start,
      referenceDateEnd: end,
      unit,
      sourceUrl: `${BASE_URL}/${indicatorCode}?format=json&date=${item.date}`,
    });
  }

  return points;
}

// GDP current USD
export const wbGDP: SourceFetcher = {
  sourceId: 'world-bank',
  async fetch(params) {
    return fetchWBIndicator('NY.GDP.MKTP.CD', 'USD', params);
  },
};

// GDP growth annual %
export const wbGDPGrowth: SourceFetcher = {
  sourceId: 'world-bank',
  async fetch(params) {
    return fetchWBIndicator('NY.GDP.MKTP.KD.ZG', '%', params);
  },
};

// External debt stocks
export const wbExternalDebt: SourceFetcher = {
  sourceId: 'world-bank',
  async fetch(params) {
    return fetchWBIndicator('DT.DOD.DECT.CD', 'USD', params);
  },
};

// Central government debt % of GDP
export const wbGovDebtGDP: SourceFetcher = {
  sourceId: 'world-bank',
  async fetch(params) {
    return fetchWBIndicator('GC.DOD.TOTL.GD.ZS', '%', params);
  },
};

// Inflation CPI annual %
export const wbInflation: SourceFetcher = {
  sourceId: 'world-bank',
  async fetch(params) {
    return fetchWBIndicator('FP.CPI.TOTL.ZG', '%', params);
  },
};

// Unemployment rate
export const wbUnemployment: SourceFetcher = {
  sourceId: 'world-bank',
  async fetch(params) {
    return fetchWBIndicator('SL.UEM.TOTL.ZS', '%', params);
  },
};

// Cash surplus/deficit % of GDP
export const wbFiscalBalance: SourceFetcher = {
  sourceId: 'world-bank',
  async fetch(params) {
    return fetchWBIndicator('GC.BAL.CASH.GD.ZS', '%', params);
  },
};
