import React from 'react';
import { Container, Typography, CircularProgress, Alert, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DeliveryCard } from 'entities/delivery/ui/DeliveryCard';
import { DeliveryListItem } from 'entities/delivery/model/types';

interface DeliveryListProps {
  deliveries: DeliveryListItem[];
  isLoading: boolean;
  isError: boolean;
  error?: any;
  onRefresh: () => void;
}

export const DeliveryList: React.FC<DeliveryListProps> = ({
  deliveries,
  isLoading,
  isError,
  error,
  onRefresh
}) => {
  const navigate = useNavigate();
  
  const handleDeliveryClick = (id: number) => {
    navigate(`/delivery/${id}`);
  };
  
  // Компонент для отображения состояния загрузки
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // Компонент для отображения ошибки
  if (isError) {
    return (
      <Alert 
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={onRefresh}>
            Обновить
          </Button>
        }
      >
        Ошибка при загрузке доставок. Проверьте подключение или попробуйте позже.
        {error && typeof error === 'object' && 'data' in error && (
          <Typography variant="caption" display="block">
            {JSON.stringify(error.data)}
          </Typography>
        )}
      </Alert>
    );
  }
  
  // Если нет данных
  if (deliveries.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Доставки не найдены. Попробуйте изменить фильтры или создайте новую доставку.
        </Typography>
      </Box>
    );
  }
  
  // Рендер списка доставок
  return (
    <Box sx={{ mt: 2 }}>
      {deliveries.map((delivery) => (
        <DeliveryCard
          key={delivery.id}
          delivery={delivery}
          onClick={handleDeliveryClick}
        />
      ))}
    </Box>
  );
}; 