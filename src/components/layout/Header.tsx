import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">Chile en Datos</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/indicadores" className="hover:text-gray-900">
            Indicadores
          </Link>
          <Link href="/comparacion" className="hover:text-gray-900">
            Comparacion
          </Link>
          <Link href="/metodologia" className="hover:text-gray-900">
            Metodologia
          </Link>
        </nav>
      </div>
    </header>
  );
}
