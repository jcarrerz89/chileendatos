import { getIndicators } from "@/lib/queries/indicators";
import { getDataPoints } from "@/lib/queries/datapoints";
import { IndicatorCard } from "@/components/indicators/IndicatorCard";

export const revalidate = 3600;

export default async function HomePage() {
  let indicators;
  try {
    indicators = await getIndicators();
  } catch (e) {
    // Firebase not configured yet — show placeholder
    console.error('Error loading indicators:', e);
    indicators = null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chile en Datos</h1>
        <p className="mt-2 text-lg text-gray-600">
          Indicadores economicos verificables con trazabilidad completa a fuentes
          oficiales.
        </p>
      </div>

      {!indicators ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <h2 className="text-lg font-medium text-gray-900">
            Configuracion pendiente
          </h2>
          <p className="mt-2 text-gray-500">
            Configura Firebase en <code>.env.local</code> y ejecuta la ingesta
            de datos para comenzar.
          </p>
          <pre className="mt-4 inline-block rounded bg-gray-100 px-4 py-2 text-left text-sm text-gray-700">
            {`npx tsx src/ingestion/runner.ts --all --from=2020-01-01`}
          </pre>
        </div>
      ) : indicators.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <h2 className="text-lg font-medium text-gray-900">Sin datos aun</h2>
          <p className="mt-2 text-gray-500">
            Ejecuta la ingesta de datos para poblar el dashboard.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {await Promise.all(
            indicators.map(async (indicator) => {
              const datapoints = await getDataPoints(indicator.id, {
                limit: 12,
              });
              const latest = datapoints[0] ?? null;
              const sparkData = [...datapoints]
                .reverse()
                .map((dp) => ({ value: dp.value }));

              let trendPercent: number | undefined;
              if (datapoints.length >= 2) {
                const prev = datapoints[1].value;
                const curr = datapoints[0].value;
                if (prev !== 0) {
                  trendPercent = ((curr - prev) / Math.abs(prev)) * 100;
                }
              }

              return (
                <IndicatorCard
                  key={indicator.id}
                  indicator={indicator}
                  latestValue={latest}
                  sparkData={sparkData}
                  trendPercent={trendPercent}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
