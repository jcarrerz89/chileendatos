'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataItem {
  date: string;
  value: number;
}

interface TimeSeriesChartProps {
  data: DataItem[];
  color?: string;
  unit?: string;
  height?: number;
}

function formatAxisValue(v: number, unit: string): string {
  if (unit === '%') return `${v}%`;
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
  return v.toLocaleString('es-CL');
}

function CustomTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  unit: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0].value;
  const formatted =
    unit === '%'
      ? `${value.toFixed(1)}%`
      : value.toLocaleString('es-CL');

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{formatted}</p>
    </div>
  );
}

export function TimeSeriesChart({
  data,
  color = '#2563eb',
  unit = '',
  height = 400,
}: TimeSeriesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
        <CartesianGrid
          strokeDasharray="none"
          stroke="#f3f4f6"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          tickMargin={8}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => formatAxisValue(v, unit)}
          width={50}
          tickMargin={4}
        />
        <Tooltip
          content={<CustomTooltip unit={unit} />}
          cursor={{ stroke: '#d1d5db', strokeDasharray: '4 4' }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 4,
            fill: color,
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
