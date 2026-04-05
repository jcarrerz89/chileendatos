'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparkLineProps {
  data: { value: number }[];
  color?: string;
  height?: number;
}

export function SparkLine({ data, color = '#2563eb', height = 40 }: SparkLineProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
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
