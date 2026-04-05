import { datapointsCollection, versionsCollection } from '@/lib/firebase/collections';
import type { NormalizedDataPoint } from './normalize';
import { periodIdFromDate } from './normalize';

export interface VersioningResult {
  action: 'created' | 'updated' | 'unchanged';
  periodId: string;
}

export async function writeDataPoint(
  indicatorId: string,
  point: NormalizedDataPoint
): Promise<VersioningResult> {
  const periodId = periodIdFromDate(
    point.referenceDateStart,
    point.granularity
  );

  const datapointsRef = datapointsCollection(indicatorId);
  const docRef = datapointsRef.doc(periodId);
  const existing = await docRef.get();

  if (!existing.exists) {
    await docRef.set({
      ...point,
      version: 1,
      isLatest: true,
    });
    return { action: 'created', periodId };
  }

  const currentData = existing.data()!;

  if (currentData.value === point.value) {
    await docRef.update({ acquiredAt: point.acquiredAt });
    return { action: 'unchanged', periodId };
  }

  // Value changed — archive current version, then update
  const versionsRef = versionsCollection(indicatorId, periodId);
  await versionsRef.doc(`v${currentData.version}`).set({
    value: currentData.value,
    unit: currentData.unit,
    source: currentData.source,
    sourceUrl: currentData.sourceUrl,
    acquiredAt: currentData.acquiredAt,
    version: currentData.version,
    changedReason: 'retroactive_correction',
  });

  const newVersion = (currentData.version as number) + 1;
  await docRef.update({
    ...point,
    version: newVersion,
    isLatest: true,
  });

  return { action: 'updated', periodId };
}
