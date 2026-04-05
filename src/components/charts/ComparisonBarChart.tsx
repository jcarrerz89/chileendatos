'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  LabelList,
} from 'recharts';
import { CHILE_HIGHLIGHT_COLOR } from '@/lib/constants';

interface ComparisonItem {
  country: string;
  value: number;
  isChile?: boolean;
}

interface ComparisonBarChartProps {
  data: ComparisonItem[];
  unit?: string;
  height?: number;
  referenceValue?: number;
  referenceLabel?: string;
}

function CustomTooltip({
  active,
  payload,
  unit,
}: {
  active?: boolean;
  payload?: Array<{ payload: ComparisonItem; value: number }>;
  unit: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0].payload;
  const value = payload[0].value;
  const formatted =
    unit === '%' ? `${value.toFixed(1)}%` : value.toLocaleString('es-CL');

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-gray-900">{item.country}</p>
      <p className="text-sm font-bold text-gray-900">{formatted}</p>
    </div>
  );
}

export function ComparisonBarChart({
  data,
  unit = '',
  height = 400,
  referenceValue,
  referenceLabel,
}: ComparisonBarChartProps) {
  const sorted = [...data].sort((a, b) => b.value - a.value);

  const barColor = '#cbd5e1';
  const chileColor = CHILE_HIGHLIGHT_COLOR;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 4, right: 60, left: 4, bottom: 4 }}
      >
        <CartesianGrid
          strokeDasharray="none"
          stroke="#f3f4f6"
          horizontal={false}
        />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(v: number) =>
            unit === '%' ? `${v}%` : v.toLocaleString('es-CL')
          }
        />
        <YAxis
          type="category"
          dataKey="country"
          tick={{ fontSize: 12, fill: '#4b5563' }}
          tickLine={false}
          axisLine={false}
          width={85}
        />
        <Tooltip
          content={<CustomTooltip unit={unit} />}
          cursor={{ fill: '#f9fafb' }}
        />
        {referenceValue !== undefined && (
          <ReferenceLine
            x={referenceValue}
            stroke="#6b7280"
            strokeDasharray="4 4"
            strokeWidth={1}
            label={{
              value: referenceLabel || '',
              position: 'top',
              fontSize: 10,
              fill: '#6b7280',
            }}
          />
        )}
        <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={22}>
          {sorted.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.isChile ? chileColor : barColor}
            />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            fontSize={11}
            fill="#6b7280"
            formatter={(v: unknown) => {
              const n = Number(v);
              if (isNaN(n)) return String(v);
              return unit === '%' ? `${n.toFixed(1)}%` : n.toLocaleString('es-CL');
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
