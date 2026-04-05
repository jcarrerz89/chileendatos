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
  { country: "Colombia", value: 1.8 },
  { country: "EE.UU.", value: 2.1 },
  { country: "Mexico", value: 1.5 },
  { country: "Brasil", value: 1.7 },
  { country: "Francia", value: 1.1 },
  { country: "Alemania", value: 0.3 },
  { country: "Japon", value: 1.0 },
];

const UNEMPLOYMENT_COMPARISON = [
  { country: "Colombia", value: 10.1 },
  { country: "Brasil", value: 7.9 },
  { country: "Chile", value: 8.5, isChile: true },
  { country: "Francia", value: 7.3 },
  { country: "Canada", value: 5.4 },
  { country: "EE.UU.", value: 3.7 },
  { country: "Mexico", value: 2.8 },
  { country: "Alemania", value: 3.1 },
  { country: "Japon", value: 2.6 },
];

export default function ComparacionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Chile en contexto internacional
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Comparacion de indicadores clave con paises OCDE y Latinoamerica.
        Chile aparece destacado en rojo.
      </p>

      <div className="mt-8 space-y-8">
        <Card>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Deuda publica (% del PIB)
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            La deuda publica de Chile es significativamente menor que la de la
            mayoria de los paises desarrollados. El promedio OCDE supera el 100%.
          </p>
          <ComparisonBarChart data={DEBT_GDP_COMPARISON} unit="%" />
          <p className="mt-2 text-xs text-gray-400">
            Fuente: FMI World Economic Outlook. Datos ilustrativos para MVP.
          </p>
        </Card>

        <Card>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Crecimiento del PIB (% anual)
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Tasa de crecimiento del PIB real comparada con economias de referencia.
          </p>
          <ComparisonBarChart data={GDP_GROWTH_COMPARISON} unit="%" />
          <p className="mt-2 text-xs text-gray-400">
            Fuente: FMI World Economic Outlook. Datos ilustrativos para MVP.
          </p>
        </Card>

        <Card>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Tasa de desempleo (%)
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Porcentaje de la fuerza laboral que busca empleo activamente.
          </p>
          <ComparisonBarChart data={UNEMPLOYMENT_COMPARISON} unit="%" />
          <p className="mt-2 text-xs text-gray-400">
            Fuente: OCDE / Banco Mundial. Datos ilustrativos para MVP.
          </p>
        </Card>
      </div>
    </div>
  );
}
