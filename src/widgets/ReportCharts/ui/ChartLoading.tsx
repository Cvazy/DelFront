import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';

export const ChartLoading: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
      <Typography sx={{ ml: 2, color: '#aaa' }}>
        Загрузка отчетов...
      </Typography>
    </Box>
  );
}; 