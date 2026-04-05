import { ingestionLogsCollection } from '@/lib/firebase/collections';
import type { IngestionLog } from '@/lib/types/source';

export async function createIngestionLog(
  indicatorId: string,
  source: string
): Promise<string> {
  const ref = await ingestionLogsCollection().add({
    indicatorId,
    source,
    startedAt: new Date(),
    completedAt: null,
    status: 'partial',
    pointsProcessed: 0,
    pointsUpdated: 0,
    error: null,
  } satisfies Omit<IngestionLog, 'id'>);
  return ref.id;
}

export async function completeIngestionLog(
  logId: string,
  result: {
    status: 'success' | 'error' | 'partial';
    pointsProcessed: number;
    pointsUpdated: number;
    error?: string;
  }
): Promise<void> {
  await ingestionLogsCollection().doc(logId).update({
    completedAt: new Date(),
    status: result.status,
    pointsProcessed: result.pointsProcessed,
    pointsUpdated: result.pointsUpdated,
    error: result.error ?? null,
  });
}
