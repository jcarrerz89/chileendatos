import { formatDate } from '@/lib/formatters';

interface SourceAttributionProps {
  sourceName: string;
  sourceUrl: string;
  acquiredAt: Date;
  methodology?: string;
}

export function SourceAttribution({
  sourceName,
  sourceUrl,
  acquiredAt,
  methodology,
}: SourceAttributionProps) {
  return (
    <div className="rounded-lg border border-gray-200/80 bg-gray-50/50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 shrink-0 text-gray-400"
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
          <div>
            <span className="text-xs text-gray-400">Fuente: </span>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {sourceName}
            </a>
          </div>
        </div>
        <span className="shrink-0 text-xs text-gray-400">
          Obtenido el {formatDate(acquiredAt)}
        </span>
      </div>
      {methodology && (
        <p className="mt-2 border-t border-gray-100 pt-2 text-xs leading-relaxed text-gray-500">
          {methodology}
        </p>
      )}
    </div>
  );
}
