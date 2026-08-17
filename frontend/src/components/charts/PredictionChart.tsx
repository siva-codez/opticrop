import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PredictionChartProps {
  data: { crop: string; confidence: number }[];
}

export function PredictionChart({ data }: PredictionChartProps) {
  // Use shades of primary color for the bars
  const colors = ['#176B3A', '#2D9356', '#4CAF50', '#8BC34A', '#C5E1A5'];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            tickFormatter={(value) => `${value}%`}
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            dataKey="crop" 
            type="category" 
            stroke="#4B5563"
            fontSize={14}
            fontWeight={500}
            width={80}
          />
          <Tooltip 
            formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, 'Confidence']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Bar dataKey="confidence" radius={[0, 4, 4, 0]} barSize={32}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
