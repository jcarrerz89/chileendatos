import Link from 'next/link';

export function Header() {
  return (
    <header className="top-accent border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Chile en Datos
          </span>
          <span className="text-xs text-gray-400">
            Economia verificable
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            Inicio
          </Link>
          <Link
            href="/comparacion"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            Comparacion
          </Link>
          <Link
            href="/metodologia"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            Metodologia
          </Link>
        </nav>
      </div>
    </header>
  );
}
