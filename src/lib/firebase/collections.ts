import { getAdminDb } from './admin';

export function indicatorsCollection() {
  return getAdminDb().collection('indicators');
}

export function datapointsCollection(indicatorId: string) {
  return getAdminDb()
    .collection('indicators')
    .doc(indicatorId)
    .collection('datapoints');
}

export function versionsCollection(indicatorId: string, periodId: string) {
  return getAdminDb()
    .collection('indicators')
    .doc(indicatorId)
    .collection('datapoints')
    .doc(periodId)
    .collection('versions');
}

export function ingestionLogsCollection() {
  return getAdminDb().collection('ingestion_logs');
}

export function sourcesCollection() {
  return getAdminDb().collection('sources');
}
