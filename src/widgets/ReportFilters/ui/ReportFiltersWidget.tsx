import React from 'react';
import { Paper, Typography, Grid, TextField, Button, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { Download } from '@mui/icons-material';
import { ReportFilters } from 'entities/report';
import { SERVICE_TYPES } from 'shared/config/constants';

interface ReportFiltersWidgetProps {
  filters: ReportFilters;
  onDateChange: (field: 'startDate' | 'endDate') => (date: Date | null) => void;
  onServiceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportClick: () => void;
}

export const ReportFiltersWidget: React.FC<ReportFiltersWidgetProps> = ({
  filters,
  onDateChange,
  onServiceChange,
  onExportClick
}) => {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Фильтры
      </Typography>
      <Grid container spacing={3}>
        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DatePicker
              label="Дата начала"
              value={filters.startDate}
              onChange={onDateChange('startDate')}
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DatePicker
              label="Дата окончания"
              value={filters.endDate}
              onChange={onDateChange('endDate')}
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
          <TextField
            select
            fullWidth
            label="Тип доставки (услуга)"
            value={filters.serviceType}
            onChange={onServiceChange}
          >
            {SERVICE_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 2' }, display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Download />}
            onClick={onExportClick}
          >
            Экспорт
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}; 