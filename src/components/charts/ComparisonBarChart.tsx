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
}

export function ComparisonBarChart({
  data,
  unit = '',
  height = 400,
}: ComparisonBarChartProps) {
  const sorted = [...data].sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickFormatter={(v: number) =>
            unit === '%' ? `${v}%` : v.toLocaleString('es-CL')
          }
        />
        <YAxis
          type="category"
          dataKey="country"
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={false}
          axisLine={false}
          width={70}
        />
        <Tooltip
          formatter={(value) => [
            unit === '%' ? `${Number(value).toFixed(1)}%` : Number(value).toLocaleString('es-CL'),
            'Valor',
          ]}
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '13px',
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {sorted.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.isChile ? CHILE_HIGHLIGHT_COLOR : '#93c5fd'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
