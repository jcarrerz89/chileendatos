import { Card } from "@/components/ui/Card";

const PRINCIPLES = [
  {
    title: "Trazabilidad",
    description:
      "Cada dato tiene un enlace directo a su fuente oficial. No hay cifras sin respaldo.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-3.02a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374"
        />
      </svg>
    ),
  },
  {
    title: "Versionado",
    description:
      "Cuando una fuente corrige un dato retroactivamente, guardamos ambas versiones con la fecha de cada obtencion.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Transparencia",
    description:
      "Los indicadores derivados muestran su formula y las fuentes de cada componente.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Reproducibilidad",
    description:
      "Cualquier persona puede verificar cada dato accediendo a la fuente original.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const SOURCE_TYPE_ICONS: Record<string, React.ReactNode> = {
  national: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
      />
    </svg>
  ),
  international: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  ),
  aggregator: (
    <svg
      className="h-5 w-5"
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
  ),
};

const SOURCES = [
  {
    name: "Banco Central de Chile",
    url: "https://si3.bcentral.cl/siete",
    type: "national" as const,
    description:
      "Fuente primaria de datos macroeconomicos de Chile. Provee PIB, inflacion, balanza de pagos, deuda externa, reservas internacionales, y mas.",
    indicators: ["PIB", "Inflacion (IPC)", "Deuda externa", "Balanza comercial"],
    apiUrl:
      "https://si3.bcentral.cl/estadisticas/Principal1/Web_Services/index.htm",
  },
  {
    name: "Instituto Nacional de Estadisticas (INE)",
    url: "https://www.ine.gob.cl",
    type: "national" as const,
    description:
      "Encuesta Nacional de Empleo, indices de precios, y datos demograficos. Fuente primaria de estadisticas de empleo.",
    indicators: ["Desempleo", "Salarios", "Poblacion"],
    apiUrl: "https://stat.ine.cl",
  },
  {
    name: "DIPRES (Presupuesto Abierto)",
    url: "https://presupuestoabierto.gob.cl",
    type: "national" as const,
    description:
      "Direccion de Presupuestos del Ministerio de Hacienda. Datos de ejecucion presupuestaria, ingresos y gastos fiscales.",
    indicators: ["Balance fiscal", "Ingresos fiscales", "Gasto publico"],
    apiUrl: "https://api.presupuestoabierto.gob.cl",
  },
  {
    name: "mindicador.cl",
    url: "https://mindicador.cl",
    type: "aggregator" as const,
    description:
      "API publica que consolida indicadores economicos diarios de Chile. Obtiene datos del Banco Central y otras fuentes oficiales.",
    indicators: ["IPC", "Desempleo", "IMACEC", "TPM", "Dolar"],
    apiUrl: "https://mindicador.cl/api",
  },
  {
    name: "Fondo Monetario Internacional (FMI)",
    url: "https://data.imf.org",
    type: "international" as const,
    description:
      "World Economic Outlook (WEO) con proyecciones macroeconomicas. Actualizado dos veces al ano.",
    indicators: ["PIB", "Inflacion", "Balance fiscal", "Desempleo"],
    apiUrl: "https://www.imf.org/external/datamapper/api/v1/",
  },
  {
    name: "Banco Mundial",
    url: "https://data.worldbank.org/country/chile",
    type: "international" as const,
    description:
      "Indicadores de desarrollo con series historicas largas. Util para comparaciones internacionales.",
    indicators: ["PIB", "Deuda externa", "Inflacion", "Desempleo"],
    apiUrl: "https://api.worldbank.org/v2/country/CHL",
  },
  {
    name: "OCDE",
    url: "https://data.oecd.org/chile.htm",
    type: "international" as const,
    description:
      "Datos estructurales de paises miembros. Chile es miembro desde 2010. Cobertura profunda en todos los indicadores macro.",
    indicators: ["Comparacion internacional", "Productividad", "Gasto publico"],
    apiUrl: "https://sdmx.oecd.org/public/rest/",
  },
];

export default function MetodologiaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-hero border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 className="text-headline text-gray-900">
            Metodologia y fuentes
          </h1>
          <p className="mt-3 max-w-2xl text-body-large">
            Todos los datos provienen de fuentes oficiales publicas.
            Cada cifra incluye un enlace directo a su fuente original
            para verificacion independiente.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Principles */}
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Principios de datos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="rounded-lg border border-gray-200/80 bg-white p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
                  {principle.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {principle.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {/* Sources */}
        <section>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Fuentes de datos
          </h2>

          <div className="grid gap-5 lg:grid-cols-2">
            {SOURCES.map((source) => (
              <Card key={source.name}>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    {SOURCE_TYPE_ICONS[source.type]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-link"
                        >
                          {source.name}
                        </a>
                      </h3>
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                        {source.type === "national"
                          ? "Nacional"
                          : source.type === "international"
                            ? "Internacional"
                            : "Agregador"}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      {source.description}
                    </p>
                    <div className="mt-3">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                        Indicadores
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {source.indicators.map((ind) => (
                          <span
                            key={ind}
                            className="rounded bg-gray-50 px-1.5 py-0.5 text-[11px] text-gray-500"
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
