import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SparkLine } from '../charts/SparkLine';
import { formatValue } from '@/lib/formatters';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/constants';
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

  return (
    <Link href={`/indicadores/${indicator.slug}`}>
      <Card className="transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <Badge
              label={CATEGORY_LABELS[indicator.category]}
              color={categoryColor}
            />
            <h3 className="mt-2 font-semibold text-gray-900">
              {indicator.name}
            </h3>
          </div>
          {trendPercent !== undefined && (
            <span
              className={`text-sm font-medium ${
                trendPercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trendPercent >= 0 ? '+' : ''}
              {trendPercent.toFixed(1)}%
            </span>
          )}
        </div>

        <div className="mt-3">
          {latestValue ? (
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(latestValue.value, latestValue.unit)}
            </p>
          ) : (
            <p className="text-lg text-gray-400">Sin datos</p>
          )}
        </div>

        {sparkData.length > 1 && (
          <div className="mt-3">
            <SparkLine data={sparkData} color={categoryColor} />
          </div>
        )}

        {latestValue && (
          <p className="mt-2 text-xs text-gray-400">
            {latestValue.referenceDate} — {latestValue.source}
          </p>
        )}
      </Card>
    </Link>
  );
}
