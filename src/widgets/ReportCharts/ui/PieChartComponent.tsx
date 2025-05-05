import React from 'react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import { ChartDataItem } from 'entities/report';
import { CHART_COLORS, CHART_STYLES } from 'shared/config/constants';

interface PieChartComponentProps {
  data: ChartDataItem[];
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  // Custom label renderer для круговых диаграмм
  const renderCustomizedLabel = ({ name, percent }: any) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <ResponsiveContainer width="100%" height="85%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={CHART_STYLES.tooltip} />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#fff' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}; 