import { notFound } from "next/navigation";
import { getIndicatorBySlug } from "@/lib/queries/indicators";
import { getDataPoints } from "@/lib/queries/datapoints";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";
import { SourceAttribution } from "@/components/indicators/SourceAttribution";
import { FormulaDisplay } from "@/components/indicators/FormulaDisplay";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatValue, formatDate } from "@/lib/formatters";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IndicatorPage({ params }: PageProps) {
  const { slug } = await params;
  const indicator = await getIndicatorBySlug(slug);

  if (!indicator) notFound();

  const datapoints = await getDataPoints(indicator.id, { limit: 120 });
  const latest = datapoints[0];

  const chartData = [...datapoints].reverse().map((dp) => ({
    date: dp.referenceDate,
    value: dp.value,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Badge
          label={CATEGORY_LABELS[indicator.category]}
          color={CATEGORY_COLORS[indicator.category]}
        />
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {indicator.name}
        </h1>
        <p className="mt-2 text-gray-600">{indicator.description}</p>
      </div>

      {latest && (
        <Card className="mb-6">
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-gray-900">
              {formatValue(latest.value, latest.unit)}
            </span>
            <span className="text-gray-500">
              {latest.referenceDate}
            </span>
          </div>
        </Card>
      )}

      {indicator.formula && indicator.derivedFrom && (
        <div className="mb-6">
          <FormulaDisplay
            formula={indicator.formula}
            derivedFrom={indicator.derivedFrom}
          />
        </div>
      )}

      {chartData.length > 0 && (
        <Card className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Serie historica
          </h2>
          <TimeSeriesChart
            data={chartData}
            unit={indicator.unit}
            color={CATEGORY_COLORS[indicator.category]}
          />
        </Card>
      )}

      {latest && indicator.sources[0] && (
        <SourceAttribution
          sourceName={indicator.sources[0].name}
          sourceUrl={latest.sourceUrl}
          acquiredAt={latest.acquiredAt}
          methodology={indicator.sources[0].methodology}
        />
      )}
    </div>
  );
}
