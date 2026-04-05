export type Granularity = 'daily' | 'monthly' | 'quarterly' | 'annual';

export type IndicatorCategory =
  | 'fiscal'
  | 'actividad'
  | 'precios'
  | 'empleo'
  | 'externo';

export interface IndicatorSource {
  name: string;
  url: string;
  methodology: string;
}

export interface Indicator {
  id: string;
  slug: string;
  name: string;
  description: string;
  unit: string;
  category: IndicatorCategory;
  granularity: Granularity;
  sources: IndicatorSource[];
  derivedFrom: string[] | null;
  formula: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataPoint {
  id: string;
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
  version: number;
  isLatest: boolean;
}

export interface DataPointVersion {
  id: string;
  value: number;
  unit: string;
  source: string;
  sourceUrl: string;
  acquiredAt: Date;
  version: number;
  changedReason: 'retroactive_correction' | 'source_update' | null;
}
