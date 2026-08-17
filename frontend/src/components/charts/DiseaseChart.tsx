import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DiseaseChartProps {
  data: { name: string; value: number }[];
}

export function DiseaseChart({ data }: DiseaseChartProps) {
  // Use OptiCrop colors
  const COLORS = ['#176B3A', '#8BC34A', '#FFA000', '#D32F2F', '#4FC3F7'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 rounded-lg shadow-md border border-border">
          <p className="font-medium text-text">{payload[0].name}</p>
          <p className="text-sm text-muted">{`Probability: ${(payload[0].value).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
