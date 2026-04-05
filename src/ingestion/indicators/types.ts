import type { Granularity } from '@/lib/types/indicator';
import type { SourceFetcher } from '../sources/types';

export interface IndicatorIngestion {
  indicatorId: string;
  granularity: Granularity;
  sources: SourceFetcher[];
  methodology: string;
}
