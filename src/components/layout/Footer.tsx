import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Sobre el proyecto
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Chile en Datos es un dashboard publico de indicadores economicos
              con trazabilidad completa a fuentes oficiales. Cada cifra puede
              ser verificada de forma independiente.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Fuentes</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-500">
              <li>
                <a
                  href="https://si3.bcentral.cl/siete"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  Banco Central de Chile
                </a>
              </li>
              <li>
                <a
                  href="https://www.ine.gob.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  Instituto Nacional de Estadisticas
                </a>
              </li>
              <li>
                <a
                  href="https://presupuestoabierto.gob.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  DIPRES
                </a>
              </li>
              <li>
                <a
                  href="https://data.imf.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  Fondo Monetario Internacional
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Navegacion</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Indicadores
                </Link>
              </li>
              <li>
                <Link href="/comparacion" className="hover:text-gray-900">
                  Comparacion internacional
                </Link>
              </li>
              <li>
                <Link href="/metodologia" className="hover:text-gray-900">
                  Metodologia y fuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-xs text-gray-400">
              Datos provenientes de fuentes oficiales publicas.
              Cada cifra incluye enlace directo a su fuente original.
            </p>
            <p className="text-xs text-gray-400">
              Datos actualizados automaticamente cada hora.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
