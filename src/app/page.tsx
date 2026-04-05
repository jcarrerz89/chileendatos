import { getIndicators } from "@/lib/queries/indicators";
import { getDataPoints } from "@/lib/queries/datapoints";
import { IndicatorCard } from "@/components/indicators/IndicatorCard";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { IndicatorCategory } from "@/lib/types/indicator";

export const revalidate = 3600;

export default async function HomePage() {
  let indicators;
  try {
    indicators = await getIndicators();
  } catch (e) {
    // Firebase not configured yet — show placeholder
    console.error("Error loading indicators:", e);
    indicators = null;
  }

  // Group indicators by category
  const grouped = indicators
    ? indicators.reduce(
        (acc, ind) => {
          const cat = ind.category;
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(ind);
          return acc;
        },
        {} as Record<string, typeof indicators>
      )
    : null;

  // Maintain display order for categories
  const categoryOrder: IndicatorCategory[] = [
    "actividad",
    "precios",
    "empleo",
    "fiscal",
    "externo",
  ];

  return (
    <div>
      {/* Hero */}
      <section className="section-hero border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 className="text-headline text-gray-900">
            Indicadores economicos de Chile
          </h1>
          <p className="mt-3 max-w-2xl text-body-large">
            Datos verificables con trazabilidad completa a fuentes oficiales.
            Cada cifra enlaza directamente al dato original para que cualquier
            persona pueda confirmarla.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!indicators ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Base de datos en configuracion
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              El dashboard necesita una conexion a Firebase y datos iniciales
              para mostrar los indicadores.
            </p>
            <div className="mt-6 rounded-md bg-gray-50 px-4 py-3">
              <p className="mb-1 text-xs font-medium text-gray-500">
                Paso 1: Configura las variables de entorno
              </p>
              <code className="text-xs text-gray-600">.env.local</code>
              <p className="mb-1 mt-3 text-xs font-medium text-gray-500">
                Paso 2: Ejecuta la ingesta inicial
              </p>
              <code className="text-xs text-gray-600">
                npx tsx src/ingestion/runner.ts --all --from=2020-01-01
              </code>
            </div>
          </div>
        ) : indicators.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Sin datos aun
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Ejecuta la ingesta de datos para poblar el dashboard.
            </p>
          </div>
        ) : grouped ? (
          <div className="space-y-10">
            {categoryOrder.map((category) => {
              const items = grouped[category];
              if (!items || items.length === 0) return null;

              return (
                <section key={category}>
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(async (indicator) => {
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
                          trendPercent =
                            ((curr - prev) / Math.abs(prev)) * 100;
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
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
