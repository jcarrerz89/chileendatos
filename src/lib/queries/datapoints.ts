import { datapointsCollection, versionsCollection } from '../firebase/collections';
import type { DataPoint, DataPointVersion } from '../types/indicator';

export async function getDataPoints(
  indicatorId: string,
  options: { limit?: number } = {}
): Promise<DataPoint[]> {
  let query = datapointsCollection(indicatorId)
    .orderBy('referenceDateStart', 'desc');

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    referenceDateStart: doc.data().referenceDateStart?.toDate(),
    referenceDateEnd: doc.data().referenceDateEnd?.toDate(),
    acquiredAt: doc.data().acquiredAt?.toDate(),
  })) as DataPoint[];
}

export async function getLatestDataPoint(
  indicatorId: string
): Promise<DataPoint | null> {
  const points = await getDataPoints(indicatorId, { limit: 1 });
  return points[0] ?? null;
}

export async function getVersions(
  indicatorId: string,
  periodId: string
): Promise<DataPointVersion[]> {
  const snapshot = await versionsCollection(indicatorId, periodId)
    .orderBy('version', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    acquiredAt: doc.data().acquiredAt?.toDate(),
  })) as DataPointVersion[];
}
