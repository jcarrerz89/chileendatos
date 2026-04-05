const numberFormatter = new Intl.NumberFormat('es-CL');
const currencyFormatterCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});
const currencyFormatterUSD = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const percentFormatter = new Intl.NumberFormat('es-CL', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const dateFormatter = new Intl.DateTimeFormat('es-CL', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatCurrency(value: number, unit: string): string {
  if (unit === 'CLP') return currencyFormatterCLP.format(value);
  if (unit === 'USD') return currencyFormatterUSD.format(value);
  return `${numberFormatter.format(value)} ${unit}`;
}

export function formatPercent(value: number): string {
  return percentFormatter.format(value / 100);
}

export function formatValue(value: number, unit: string): string {
  if (unit === '%') return formatPercent(value);
  if (unit === 'CLP' || unit === 'USD') return formatCurrency(value, unit);
  return formatNumber(value);
}

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

export function formatLargeNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1)} billones`;
  }
  if (Math.abs(value) >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} mil millones`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} millones`;
  }
  return numberFormatter.format(value);
}
