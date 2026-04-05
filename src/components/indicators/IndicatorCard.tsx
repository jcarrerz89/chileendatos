import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SparkLine } from '../charts/SparkLine';
import { formatValue } from '@/lib/formatters';
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  INVERSE_TREND_INDICATORS,
} from '@/lib/constants';
import type { Indicator, DataPoint } from '@/lib/types/indicator';

interface IndicatorCardProps {
  indicator: Indicator;
  latestValue: DataPoint | null;
  sparkData: { value: number }[];
  trendPercent?: number;
}

export function IndicatorCard({
  indicator,
  latestValue,
  sparkData,
  trendPercent,
}: IndicatorCardProps) {
  const categoryColor = CATEGORY_COLORS[indicator.category];

  // For indicators like unemployment or inflation, a decrease is good
  const isInverse = INVERSE_TREND_INDICATORS.has(indicator.slug);
  const trendIsPositive =
    trendPercent !== undefined
      ? isInverse
        ? trendPercent <= 0
        : trendPercent >= 0
      : undefined;

  return (
    <Link href={`/indicadores/${indicator.slug}`}>
      <Card hover>
        <div className="flex items-start justify-between gap-2">
          <Badge
            label={CATEGORY_LABELS[indicator.category]}
            color={categoryColor}
          />
          {trendPercent !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums ${
                trendIsPositive
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              <span className="text-[10px]">
                {trendPercent >= 0 ? '\u25B2' : '\u25BC'}
              </span>
              {trendPercent >= 0 ? '+' : ''}
              {trendPercent.toFixed(1)}%
            </span>
          )}
        </div>

        <h3 className="mt-3 text-sm font-medium text-gray-600">
          {indicator.name}
        </h3>

        <div className="mt-1.5">
          {latestValue ? (
            <p className="value-display">
              {formatValue(latestValue.value, latestValue.unit)}
            </p>
          ) : (
            <p className="text-lg text-gray-300">Sin datos</p>
          )}
        </div>

        {sparkData.length > 1 && (
          <div className="mt-4">
            <SparkLine data={sparkData} color={categoryColor} />
          </div>
        )}

        {latestValue && (
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
            <span className="text-[11px] text-gray-400">
              {latestValue.referenceDate}
            </span>
            <span className="text-[11px] text-gray-400">
              {latestValue.source}
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}
