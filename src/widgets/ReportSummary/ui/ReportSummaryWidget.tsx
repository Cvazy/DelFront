import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { ReportSummary } from 'entities/report';

interface SummaryBoxProps {
  label: string;
  value: string | number;
  color: string;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({ label, value, color }) => (
  <Box
    sx={{
      p: 1,
      textAlign: 'center',
      bgcolor: 'rgba(255,255,255,0.05)',
      borderRadius: 1,
    }}
  >
    <Typography variant="body2" color="#aaa">
      {label}
    </Typography>
    <Typography variant="h5" color={color}>
      {value}
    </Typography>
  </Box>
);

interface ReportSummaryWidgetProps {
  summary: ReportSummary;
}

export const ReportSummaryWidget: React.FC<ReportSummaryWidgetProps> = ({
  summary
}) => {
  if (!summary) return null;
  
  return (
    <Paper
      sx={{
        p: 2,
        mb: 4,
        bgcolor: '#222',
        color: '#fff',
        border: '1px solid #444',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
        Сводная информация
      </Typography>
      <Grid container spacing={3}>
        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <SummaryBox 
            label="Всего доставок" 
            value={summary.total} 
            color="#4dabf5" 
          />
        </Grid>
        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <SummaryBox 
            label="Общая дистанция" 
            value={`${!isNaN(summary.total_distance) ? summary.total_distance.toFixed(2) : "0"} км`} 
            color="#5df542" 
          />
        </Grid>
        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <SummaryBox 
            label="Средняя дистанция" 
            value={`${!isNaN(summary.avg_distance) ? summary.avg_distance.toFixed(2) : "0"} км`} 
            color="#f5c242" 
          />
        </Grid>
        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <SummaryBox 
            label="Диапазон дистанций" 
            value={`${!isNaN(summary.min_distance) ? summary.min_distance : "0"} - ${!isNaN(summary.max_distance) ? summary.max_distance : "0"} км`}
            color="#c642f5" 
          />
        </Grid>
      </Grid>
    </Paper>
  );
}; 