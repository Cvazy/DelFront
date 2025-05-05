import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, MenuItem, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { DeliveryFilters as DeliveryFiltersType } from 'entities/delivery/model/types';
import { DeliveryStatus, TransportModel } from 'entities/dictionary';

interface DeliveryFiltersProps {
  filters: DeliveryFiltersType;
  statuses: DeliveryStatus[];
  transportModels: TransportModel[];
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApplyFilters: () => void;
}

export const DeliveryFilters: React.FC<DeliveryFiltersProps> = ({
  filters,
  statuses,
  transportModels,
  onFilterChange,
  onApplyFilters
}) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Фильтры
        </Typography>
        <Grid container spacing={2}>
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <TextField
              fullWidth
              label="Мин. дистанция (км)"
              name="min_distance"
              type="number"
              value={filters.min_distance || ''}
              onChange={onFilterChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <TextField
              fullWidth
              label="Макс. дистанция (км)"
              name="max_distance"
              type="number"
              value={filters.max_distance || ''}
              onChange={onFilterChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <TextField
              fullWidth
              select
              label="Время в пути"
              name="time_filter"
              value={filters.time_filter || 'all'}
              onChange={onFilterChange as any}
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="today">Сегодня</MenuItem>
              <MenuItem value="week">За неделю</MenuItem>
            </TextField>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <TextField
              fullWidth
              select
              label="Статус"
              name="status"
              value={filters.status || ''}
              onChange={onFilterChange as any}
            >
              <MenuItem value="">Все статусы</MenuItem>
              {statuses.map(status => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <TextField
              fullWidth
              select
              label="Транспорт"
              name="transport_model"
              value={filters.transport_model || ''}
              onChange={onFilterChange as any}
            >
              <MenuItem value="">Все модели</MenuItem>
              {transportModels.map(model => (
                <MenuItem key={model.id} value={model.id}>
                  {model.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' }, display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="outlined"
              startIcon={<Search />}
              fullWidth
              onClick={onApplyFilters}
              sx={{ height: '56px' }}
            >
              Применить
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 