import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndicatorBySlug } from "@/lib/queries/indicators";
import { getDataPoints } from "@/lib/queries/datapoints";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";
import { SourceAttribution } from "@/components/indicators/SourceAttribution";
import { FormulaDisplay } from "@/components/indicators/FormulaDisplay";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatValue } from "@/lib/formatters";
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

  let trendPercent: number | undefined;
  if (datapoints.length >= 2) {
    const prev = datapoints[1].value;
    const curr = datapoints[0].value;
    if (prev !== 0) {
      trendPercent = ((curr - prev) / Math.abs(prev)) * 100;
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-600">
              Inicio
            </Link>
            <span className="breadcrumb-sep" />
            <Link href="/" className="hover:text-gray-600">
              {CATEGORY_LABELS[indicator.category]}
            </Link>
            <span className="breadcrumb-sep" />
            <span className="text-gray-700">{indicator.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero: Value + Metadata */}
        <div className="mb-8">
          <Badge
            label={CATEGORY_LABELS[indicator.category]}
            color={CATEGORY_COLORS[indicator.category]}
          />
          <h1 className="mt-3 text-headline text-gray-900">
            {indicator.name}
          </h1>
          <p className="mt-2 max-w-2xl text-body">{indicator.description}</p>
        </div>

        {latest && (
          <Card className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Valor actual
                </p>
                <p className="value-display-hero mt-1">
                  {formatValue(latest.value, latest.unit)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Periodo: {latest.referenceDate}
                </p>
              </div>
              {trendPercent !== undefined && (
                <div className="flex flex-col items-end">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold ${
                      trendPercent >= 0
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <span className="text-xs">
                      {trendPercent >= 0 ? "\u25B2" : "\u25BC"}
                    </span>
                    {trendPercent >= 0 ? "+" : ""}
                    {trendPercent.toFixed(1)}% vs. periodo anterior
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Source attribution — always visible alongside data */}
        {latest && indicator.sources[0] && (
          <div className="mb-8">
            <SourceAttribution
              sourceName={indicator.sources[0].name}
              sourceUrl={latest.sourceUrl}
              acquiredAt={latest.acquiredAt}
              methodology={indicator.sources[0].methodology}
            />
          </div>
        )}

        {indicator.formula && indicator.derivedFrom && (
          <div className="mb-8">
            <FormulaDisplay
              formula={indicator.formula}
              derivedFrom={indicator.derivedFrom}
            />
          </div>
        )}

        {/* Chart */}
        {chartData.length > 0 && (
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-title text-gray-900">Serie historica</h2>
              <span className="text-caption">
                {chartData.length} periodos
              </span>
            </div>
            <TimeSeriesChart
              data={chartData}
              unit={indicator.unit}
              color={CATEGORY_COLORS[indicator.category]}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
