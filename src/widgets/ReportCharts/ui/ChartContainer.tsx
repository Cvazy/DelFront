import React, { ReactNode } from 'react';
import { Typography, Box, Paper } from '@mui/material';

interface ChartContainerProps {
  title: string;
  hasData: boolean;
  gridSpan?: { xs: string, md: string };
  children: ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  hasData,
  gridSpan = { xs: 'span 12', md: 'span 6' },
  children
}) => {
  return (
    <Box sx={{ gridColumn: gridSpan }}>
      <Paper
        sx={{
          p: 2,
          height: 420,
          bgcolor: '#222',
          color: '#fff',
          border: '1px solid #444',
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 1, color: '#fff', fontWeight: 'bold' }}
        >
          {title} {!hasData && '(нет данных)'}
        </Typography>
        {!hasData ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: '#aaa',
            }}
          >
            Нет данных для отображения
          </Box>
        ) : children}
      </Paper>
    </Box>
  );
}; 