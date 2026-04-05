export interface Source {
  id: string;
  name: string;
  baseUrl: string;
  authRequired: boolean;
  lastSuccessfulFetch: Date | null;
  status: 'active' | 'degraded' | 'down';
}

export interface IngestionLog {
  id: string;
  indicatorId: string;
  source: string;
  startedAt: Date;
  completedAt: Date | null;
  status: 'success' | 'error' | 'partial';
  pointsProcessed: number;
  pointsUpdated: number;
  error: string | null;
}
