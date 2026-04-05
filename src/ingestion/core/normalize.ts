import type { Granularity } from '@/lib/types/indicator';

export interface RawDataPoint {
  value: number;
  referenceDate: string;
  referenceDateStart: Date;
  referenceDateEnd: Date;
  unit: string;
  sourceUrl: string;
}

export interface NormalizedDataPoint {
  value: number;
  unit: string;
  referenceDate: string;
  referenceDateStart: Date;
  referenceDateEnd: Date;
  granularity: Granularity;
  source: string;
  sourceUrl: string;
  methodology: string;
  acquiredAt: Date;
}

export function normalize(
  raw: RawDataPoint,
  meta: {
    granularity: Granularity;
    source: string;
    methodology: string;
  }
): NormalizedDataPoint {
  return {
    value: raw.value,
    unit: raw.unit,
    referenceDate: raw.referenceDate,
    referenceDateStart: raw.referenceDateStart,
    referenceDateEnd: raw.referenceDateEnd,
    granularity: meta.granularity,
    source: meta.source,
    sourceUrl: raw.sourceUrl,
    methodology: meta.methodology,
    acquiredAt: new Date(),
  };
}

export function periodIdFromDate(date: Date, granularity: Granularity): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  switch (granularity) {
    case 'daily':
      return `${year}-${month}-${day}`;
    case 'monthly':
      return `${year}-${month}`;
    case 'quarterly': {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      return `${year}-Q${quarter}`;
    }
    case 'annual':
      return `${year}`;
  }
}
