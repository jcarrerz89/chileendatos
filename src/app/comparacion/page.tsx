import { Card } from "@/components/ui/Card";
import { ComparisonBarChart } from "@/components/charts/ComparisonBarChart";

// Static comparison data for MVP — will be replaced with dynamic OECD data
const DEBT_GDP_COMPARISON = [
  { country: "Japon", value: 255.2 },
  { country: "Italia", value: 144.4 },
  { country: "EE.UU.", value: 123.3 },
  { country: "Francia", value: 111.6 },
  { country: "Canada", value: 106.4 },
  { country: "Reino Unido", value: 101.9 },
  { country: "Espana", value: 107.7 },
  { country: "Brasil", value: 87.3 },
  { country: "Alemania", value: 66.3 },
  { country: "Mexico", value: 53.8 },
  { country: "Colombia", value: 52.1 },
  { country: "Chile", value: 38.9, isChile: true },
  { country: "Peru", value: 33.9 },
];

const GDP_GROWTH_COMPARISON = [
  { country: "Peru", value: 2.7 },
  { country: "Chile", value: 2.3, isChile: true },
  { country: "EE.UU.", value: 2.1 },
  { country: "Colombia", value: 1.8 },
  { country: "Brasil", value: 1.7 },
  { country: "Mexico", value: 1.5 },
  { country: "Francia", value: 1.1 },
  { country: "Japon", value: 1.0 },
  { country: "Alemania", value: 0.3 },
];

const UNEMPLOYMENT_COMPARISON = [
  { country: "Colombia", value: 10.1 },
  { country: "Chile", value: 8.5, isChile: true },
  { country: "Brasil", value: 7.9 },
  { country: "Francia", value: 7.3 },
  { country: "Canada", value: 5.4 },
  { country: "EE.UU.", value: 3.7 },
  { country: "Alemania", value: 3.1 },
  { country: "Mexico", value: 2.8 },
  { country: "Japon", value: 2.6 },
];

function computeOCDEAverage(data: { value: number }[]): number {
  const sum = data.reduce((acc, d) => acc + d.value, 0);
  return Math.round((sum / data.length) * 10) / 10;
}

export default function ComparacionPage() {
  const debtAvg = computeOCDEAverage(DEBT_GDP_COMPARISON);
  const gdpAvg = computeOCDEAverage(GDP_GROWTH_COMPARISON);
  const unemplAvg = computeOCDEAverage(UNEMPLOYMENT_COMPARISON);

  return (
    <div>
      {/* Hero */}
      <section className="section-hero border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 className="text-headline text-gray-900">
            Chile en contexto internacional
          </h1>
          <p className="mt-3 max-w-2xl text-body-large">
            Comparar con otros paises permite dimensionar las cifras.
            Un mismo numero puede ser excelente o preocupante dependiendo
            del contexto regional y global.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Chile aparece destacado en cada grafico. Los datos corresponden a
            las ultimas cifras disponibles del FMI y la OCDE.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <Card>
            <div className="mb-6">
              <h2 className="text-title text-gray-900">
                Deuda publica (% del PIB)
              </h2>
              <p className="mt-1 text-body">
                La deuda publica de Chile es significativamente menor que la de
                la mayoria de los paises desarrollados.
              </p>
              <p className="mt-2 text-xs font-medium text-gray-400">
                Promedio del grupo: {debtAvg}%
              </p>
            </div>
            <ComparisonBarChart
              data={DEBT_GDP_COMPARISON}
              unit="%"
              referenceValue={debtAvg}
              referenceLabel="Promedio"
            />
            <p className="mt-4 text-caption">
              Fuente: FMI World Economic Outlook. Datos ilustrativos para MVP.
            </p>
          </Card>

          <Card>
            <div className="mb-6">
              <h2 className="text-title text-gray-900">
                Crecimiento del PIB (% anual)
              </h2>
              <p className="mt-1 text-body">
                Tasa de crecimiento del PIB real comparada con economias de
                referencia en America Latina y la OCDE.
              </p>
              <p className="mt-2 text-xs font-medium text-gray-400">
                Promedio del grupo: {gdpAvg}%
              </p>
            </div>
            <ComparisonBarChart
              data={GDP_GROWTH_COMPARISON}
              unit="%"
              referenceValue={gdpAvg}
              referenceLabel="Promedio"
            />
            <p className="mt-4 text-caption">
              Fuente: FMI World Economic Outlook. Datos ilustrativos para MVP.
            </p>
          </Card>

          <Card>
            <div className="mb-6">
              <h2 className="text-title text-gray-900">
                Tasa de desempleo (%)
              </h2>
              <p className="mt-1 text-body">
                Porcentaje de la fuerza laboral que busca empleo activamente.
                Un valor menor indica mayor participacion del mercado laboral.
              </p>
              <p className="mt-2 text-xs font-medium text-gray-400">
                Promedio del grupo: {unemplAvg}%
              </p>
            </div>
            <ComparisonBarChart
              data={UNEMPLOYMENT_COMPARISON}
              unit="%"
              referenceValue={unemplAvg}
              referenceLabel="Promedio"
            />
            <p className="mt-4 text-caption">
              Fuente: OCDE / Banco Mundial. Datos ilustrativos para MVP.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
