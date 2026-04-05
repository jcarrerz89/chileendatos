'use client';

import { LineChart, Line, ReferenceLine, ResponsiveContainer } from 'recharts';

interface SparkLineProps {
  data: { value: number }[];
  color?: string;
  height?: number;
}

export function SparkLine({ data, color = '#2563eb', height = 40 }: SparkLineProps) {
  // Compute average for reference line
  const avg =
    data.length > 0
      ? data.reduce((sum, d) => sum + d.value, 0) / data.length
      : 0;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <ReferenceLine y={avg} stroke="#e5e7eb" strokeWidth={1} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
