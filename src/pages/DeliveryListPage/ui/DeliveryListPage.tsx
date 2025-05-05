import React, { useState } from 'react';
import { Container, Typography, Box, Button, IconButton } from '@mui/material';
import { Add as AddIcon, FilterList, Refresh } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGetDeliveriesQuery } from 'entities/delivery/api';
import { DeliveryFilters as DeliveryFiltersType } from 'entities/delivery/model/types';
import { useGetDeliveryStatusesQuery, useGetTransportModelsQuery } from 'entities/dictionary';
import { DeliveryList } from 'widgets/DeliveryList';
import { DeliveryFilters } from 'features/FilterDeliveries';

const DeliveryListPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<DeliveryFiltersType>({
    min_distance: '',
    max_distance: '',
    time_filter: 'all'
  });
  
  // Загружаем данные с сервера
  const { 
    data: deliveries = [], 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useGetDeliveriesQuery(filters);
  
  const { data: statuses = [] } = useGetDeliveryStatusesQuery();
  const { data: transportModels = [] } = useGetTransportModelsQuery();
  
  const handleCreateClick = () => {
    navigate('/create');
  };
  
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleRefresh = () => {
    refetch();
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Список доставок
        </Typography>
        <Box>
          <IconButton onClick={handleRefresh} sx={{ mr: 1 }} title="Обновить">
            <Refresh />
          </IconButton>
          <IconButton onClick={handleFilterToggle} sx={{ mr: 1 }} title="Фильтры">
            <FilterList />
          </IconButton>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Новая доставка
          </Button>
        </Box>
      </Box>
      
      {showFilters && (
        <DeliveryFilters
          filters={filters}
          statuses={statuses}
          transportModels={transportModels}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleRefresh}
        />
      )}
      
      <DeliveryList
        deliveries={deliveries}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};

export default DeliveryListPage; 