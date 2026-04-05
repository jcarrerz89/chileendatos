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
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-500">Fuente: </span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            {sourceName}
          </a>
        </div>
        <span className="text-gray-400">
          Dato obtenido el {formatDate(acquiredAt)}
        </span>
      </div>
      {methodology && (
        <p className="mt-2 text-gray-500">{methodology}</p>
      )}
    </div>
  );
}
