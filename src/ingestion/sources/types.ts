import type { RawDataPoint } from '../core/normalize';

export interface FetchParams {
  startDate?: Date;
  endDate?: Date;
}

export interface SourceFetcher {
  sourceId: string;
  fetch(params: FetchParams): Promise<RawDataPoint[]>;
}
