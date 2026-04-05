import { Card } from "@/components/ui/Card";

const SOURCES = [
  {
    name: "Banco Central de Chile",
    url: "https://si3.bcentral.cl/siete",
    description:
      "Fuente primaria de datos macroeconomicos de Chile. Provee PIB, inflacion, balanza de pagos, deuda externa, reservas internacionales, y mas.",
    indicators: ["PIB", "Inflacion (IPC)", "Deuda externa", "Balanza comercial"],
    apiUrl: "https://si3.bcentral.cl/estadisticas/Principal1/Web_Services/index.htm",
  },
  {
    name: "mindicador.cl",
    url: "https://mindicador.cl",
    description:
      "API publica que consolida indicadores economicos diarios de Chile. Obtiene datos del Banco Central y otras fuentes oficiales.",
    indicators: ["IPC", "Desempleo", "IMACEC", "TPM", "Dolar"],
    apiUrl: "https://mindicador.cl/api",
  },
  {
    name: "DIPRES (Presupuesto Abierto)",
    url: "https://presupuestoabierto.gob.cl",
    description:
      "Direccion de Presupuestos del Ministerio de Hacienda. Datos de ejecucion presupuestaria, ingresos y gastos fiscales.",
    indicators: ["Balance fiscal", "Ingresos fiscales", "Gasto publico"],
    apiUrl: "https://api.presupuestoabierto.gob.cl",
  },
  {
    name: "Instituto Nacional de Estadisticas (INE)",
    url: "https://www.ine.gob.cl",
    description:
      "Encuesta Nacional de Empleo, indices de precios, y datos demograficos. Fuente primaria de estadisticas de empleo.",
    indicators: ["Desempleo", "Salarios", "Poblacion"],
    apiUrl: "https://stat.ine.cl",
  },
  {
    name: "Fondo Monetario Internacional (FMI)",
    url: "https://data.imf.org",
    description:
      "World Economic Outlook (WEO) con proyecciones macroeconomicas. Actualizado dos veces al ano.",
    indicators: ["PIB", "Inflacion", "Balance fiscal", "Desempleo"],
    apiUrl: "https://www.imf.org/external/datamapper/api/v1/",
  },
  {
    name: "Banco Mundial",
    url: "https://data.worldbank.org/country/chile",
    description:
      "Indicadores de desarrollo con series historicas largas. Util para comparaciones internacionales.",
    indicators: ["PIB", "Deuda externa", "Inflacion", "Desempleo"],
    apiUrl: "https://api.worldbank.org/v2/country/CHL",
  },
  {
    name: "OCDE",
    url: "https://data.oecd.org/chile.htm",
    description:
      "Datos estructurales de paises miembros. Chile es miembro desde 2010. Cobertura profunda en todos los indicadores macro.",
    indicators: ["Comparacion internacional", "Productividad", "Gasto publico"],
    apiUrl: "https://sdmx.oecd.org/public/rest/",
  },
];

export default function MetodologiaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Metodologia y fuentes</h1>
      <p className="mt-2 text-lg text-gray-600">
        Todos los datos de Chile en Datos provienen de fuentes oficiales publicas.
        Cada cifra incluye un enlace directo a su fuente original.
      </p>

      <div className="mt-8 space-y-4">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900">
            Principios de datos
          </h2>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>
              <strong>Trazabilidad:</strong> cada dato tiene un enlace directo a
              su fuente oficial.
            </li>
            <li>
              <strong>Versionado:</strong> cuando una fuente corrige un dato
              retroactivamente, guardamos ambas versiones con la fecha de cada
              obtencion.
            </li>
            <li>
              <strong>Transparencia:</strong> los indicadores derivados muestran
              su formula y las fuentes de cada componente.
            </li>
            <li>
              <strong>Reproducibilidad:</strong> cualquier persona puede verificar
              cada dato accediendo a la fuente original.
            </li>
          </ul>
        </Card>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-gray-900">Fuentes de datos</h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {SOURCES.map((source) => (
          <Card key={source.name}>
            <h3 className="text-lg font-semibold text-gray-900">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                {source.name}
              </a>
            </h3>
            <p className="mt-2 text-sm text-gray-600">{source.description}</p>
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500">
                Indicadores que usamos:
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {source.indicators.map((ind) => (
                  <span
                    key={ind}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={source.apiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-blue-500 hover:underline"
            >
              API / Datos abiertos
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
