interface FormulaDisplayProps {
  formula: string;
  derivedFrom: string[];
}

export function FormulaDisplay({ formula, derivedFrom }: FormulaDisplayProps) {
  return (
    <div className="rounded-lg border border-amber-200/60 bg-amber-50/50 p-4">
      <div className="flex items-center gap-2">
        <svg
          className="h-4 w-4 shrink-0 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
          />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          Indicador derivado
        </span>
      </div>
      <p className="mt-2 font-mono text-sm text-amber-900">{formula}</p>
      <p className="mt-2 text-xs text-amber-600">
        Componentes: {derivedFrom.join(', ')}
      </p>
    </div>
  );
}
