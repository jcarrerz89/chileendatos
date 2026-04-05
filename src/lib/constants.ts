import type { IndicatorCategory } from './types/indicator';

export const CATEGORY_LABELS: Record<IndicatorCategory, string> = {
  fiscal: 'Fiscal',
  actividad: 'Actividad Economica',
  precios: 'Precios',
  empleo: 'Empleo',
  externo: 'Sector Externo',
};

export const CATEGORY_COLORS: Record<IndicatorCategory, string> = {
  fiscal: '#2563eb',
  actividad: '#059669',
  precios: '#d97706',
  empleo: '#7c3aed',
  externo: '#dc2626',
};

export const CHART_COLORS = [
  '#2563eb', // blue
  '#dc2626', // red (Chile)
  '#059669', // green
  '#d97706', // amber
  '#7c3aed', // violet
  '#0891b2', // cyan
  '#e11d48', // rose
  '#4f46e5', // indigo
];

export const CHILE_HIGHLIGHT_COLOR = '#D52B1E';

// Indicators where a decrease is positive (good) for the economy
// Used to invert trend color logic: green when down, red when up
export const INVERSE_TREND_INDICATORS = new Set([
  'desempleo',
  'inflacion',
  'ipc',
  'deuda-publica',
  'deuda-externa',
]);

export const SOURCE_IDS = {
  BCCH: 'bcch',
  MINDICADOR: 'mindicador',
  DIPRES: 'dipres',
  INE: 'ine',
  IMF: 'imf',
  WORLD_BANK: 'world-bank',
  OECD: 'oecd',
} as const;
