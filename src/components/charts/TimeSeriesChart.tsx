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

export function TimeSeriesChart({
  data,
  color = '#2563eb',
  unit = '',
  height = 400,
}: TimeSeriesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) =>
            unit === '%' ? `${v}%` : v.toLocaleString('es-CL')
          }
        />
        <Tooltip
          formatter={(value) => [
            unit === '%' ? `${Number(value).toFixed(1)}%` : Number(value).toLocaleString('es-CL'),
            'Valor',
          ]}
          labelFormatter={(label) => `Periodo: ${label}`}
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '13px',
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3, fill: color }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
