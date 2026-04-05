import { indicatorsCollection } from '../firebase/collections';
import type { Indicator } from '../types/indicator';

export async function getIndicators(): Promise<Indicator[]> {
  const snapshot = await indicatorsCollection()
    .where('isActive', '==', true)
    .orderBy('displayOrder')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Indicator[];
}

export async function getIndicatorBySlug(slug: string): Promise<Indicator | null> {
  const snapshot = await indicatorsCollection()
    .where('slug', '==', slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  } as Indicator;
}
