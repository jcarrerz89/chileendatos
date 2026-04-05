'use client';

import { useState } from 'react';
import { formatDate, formatValue } from '@/lib/formatters';
import type { DataPointVersion } from '@/lib/types/indicator';

interface VersionHistoryProps {
  versions: DataPointVersion[];
  currentValue: number;
  unit: string;
}

export function VersionHistory({ versions, currentValue, unit }: VersionHistoryProps) {
  const [expanded, setExpanded] = useState(false);

  if (versions.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        {expanded ? 'Ocultar' : 'Ver'} historial de revisiones ({versions.length})
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between rounded bg-blue-50 px-3 py-2 text-sm">
            <span className="font-medium text-blue-800">Valor actual</span>
            <span className="font-mono text-blue-900">
              {formatValue(currentValue, unit)}
            </span>
          </div>

          {versions.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded bg-gray-50 px-3 py-2 text-sm"
            >
              <div>
                <span className="text-gray-600">v{v.version}</span>
                <span className="ml-2 text-gray-400">
                  {formatDate(v.acquiredAt)}
                </span>
                {v.changedReason && (
                  <span className="ml-2 text-xs text-amber-600">
                    ({v.changedReason === 'retroactive_correction'
                      ? 'Correccion retroactiva'
                      : 'Actualizacion de fuente'})
                  </span>
                )}
              </div>
              <span className="font-mono text-gray-700">
                {formatValue(v.value, v.unit)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
