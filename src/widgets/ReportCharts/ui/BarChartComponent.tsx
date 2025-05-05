import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { ChartDataItem } from 'entities/report';
import { CHART_STYLES } from 'shared/config/constants';

interface BarChartComponentProps {
  data: ChartDataItem[];
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#fff', fontSize: 11 }}
        />
        <YAxis tick={{ fill: '#fff' }} />
        <Tooltip contentStyle={CHART_STYLES.tooltip} />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#fff' }}>{value}</span>
          )}
        />
        <Bar
          dataKey="value"
          name="Количество доставок"
          fill="#4dabf5"
          label={{ position: 'top', fill: '#fff', fontSize: 11 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}; 