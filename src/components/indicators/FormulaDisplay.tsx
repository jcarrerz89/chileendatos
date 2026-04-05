interface FormulaDisplayProps {
  formula: string;
  derivedFrom: string[];
}

export function FormulaDisplay({ formula, derivedFrom }: FormulaDisplayProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-medium text-amber-800">Indicador derivado</p>
      <p className="mt-1 font-mono text-sm text-amber-900">{formula}</p>
      <p className="mt-2 text-xs text-amber-600">
        Componentes: {derivedFrom.join(', ')}
      </p>
    </div>
  );
}
