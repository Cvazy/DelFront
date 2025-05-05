import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Grid, Divider } from '@mui/material';
import { DeliveryListItem } from '../../model/types';
import { formatDateTime, formatDuration, getStatusColor } from 'shared/lib/formatters';

interface DeliveryCardProps {
  delivery: DeliveryListItem;
  onClick?: (id: number) => void;
}

export const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery, onClick }) => {
  // Обработчик клика на карточку
  const handleClick = () => {
    if (onClick) {
      onClick(delivery.id);
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        '&:hover': { boxShadow: 3, cursor: 'pointer' } 
      }} 
      onClick={handleClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">
            Доставка №{delivery.number}
          </Typography>
          <Chip 
            label={delivery.status_name} 
            color={getStatusColor(delivery.status_name)}
            size="small"
          />
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 6', lg: 'span 6' } }}>
            <Typography variant="body2" color="text.secondary">
              Транспорт
            </Typography>
            <Typography variant="body1">
              {delivery.transport_model_name}
            </Typography>
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 6', lg: 'span 6' } }}>
            <Typography variant="body2" color="text.secondary">
              Дистанция
            </Typography>
            <Typography variant="body1">
              {delivery.distance} км
            </Typography>
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 6', lg: 'span 6' } }}>
            <Typography variant="body2" color="text.secondary">
              Отправление
            </Typography>
            <Typography variant="body1">
              {formatDateTime(delivery.departure_time)}
            </Typography>
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 6', lg: 'span 6' } }}>
            <Typography variant="body2" color="text.secondary">
              Прибытие
            </Typography>
            <Typography variant="body1">
              {formatDateTime(delivery.arrival_time)}
            </Typography>
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 6', lg: 'span 6' } }}>
            <Typography variant="body2" color="text.secondary">
              Время в пути
            </Typography>
            <Typography variant="body1">
              {formatDuration(delivery.travel_time)}
            </Typography>
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 6', lg: 'span 6' } }}>
            <Typography variant="body2" color="text.secondary">
              Упаковка
            </Typography>
            <Typography variant="body1">
              {delivery.packaging_name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 