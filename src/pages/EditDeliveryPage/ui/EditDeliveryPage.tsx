import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, Grid, Paper, TextField, 
  MenuItem, FormControl, FormControlLabel, RadioGroup, Radio,
  InputLabel, Select, Chip, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, CircularProgress, Alert
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack, Save, Delete, Check } from '@mui/icons-material';
import { 
  useGetDeliveryByIdQuery,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
  useMarkDeliveryCompletedMutation,
  useGetTransportModelsQuery,
  useGetPackagingTypesQuery,
  useGetServicesQuery,
  useGetDeliveryStatusesQuery,
  useGetCargoTypesQuery
} from 'shared/api';
import { format, parseISO } from 'date-fns';

const EditDeliveryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id, 10) : 0;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Загружаем данные с сервера
  const { data: delivery, isLoading: isLoadingDelivery, isError: isDeliveryError } = 
    useGetDeliveryByIdQuery(numericId, { skip: !numericId });
  
  // Загружаем справочники
  const { data: transportModels = [], isLoading: isLoadingModels } = useGetTransportModelsQuery();
  const { data: packagingTypes = [], isLoading: isLoadingPackaging } = useGetPackagingTypesQuery();
  const { data: services = [], isLoading: isLoadingServices } = useGetServicesQuery();
  const { data: statuses = [], isLoading: isLoadingStatuses } = useGetDeliveryStatusesQuery();
  const { data: cargoTypes = [], isLoading: isLoadingCargoTypes } = useGetCargoTypesQuery();
  
  // API мутации
  const [updateDelivery, { isLoading: isUpdating }] = useUpdateDeliveryMutation();
  const [deleteDelivery, { isLoading: isDeleting }] = useDeleteDeliveryMutation();
  const [markCompleted, { isLoading: isMarking }] = useMarkDeliveryCompletedMutation();
  
  // Состояние формы
  const [deliveryData, setDeliveryData] = useState({
    number: '',
    transport_model: 0,
    departure_time: new Date(),
    arrival_time: new Date(Date.now() + 2 * 60 * 60 * 1000),
    distance: '',
    packaging: 0,
    cargo_type: 0,
    status: 0,
    condition: 'Исправно',
    notes: '',
    services: [] as number[],
  });
  
  // Состояние ошибок
  const [error, setError] = useState('');
  
  // Заполняем форму данными доставки
  useEffect(() => {
    if (delivery) {
      console.log('Loaded delivery:', delivery);
      setDeliveryData({
        number: delivery.number,
        transport_model: delivery.transport_model,
        departure_time: parseISO(delivery.departure_time),
        arrival_time: parseISO(delivery.arrival_time),
        distance: delivery.distance,
        packaging: delivery.packaging,
        cargo_type: delivery.cargo_type || 0,
        status: delivery.status,
        condition: delivery.condition,
        notes: delivery.notes || '',
        services: delivery.services || [],
      });
    }
  }, [delivery]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryData({
      ...deliveryData,
      [name]: value
    });
  };
  
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setDeliveryData({
      ...deliveryData,
      [name]: value
    });
  };
  
  const handleDateChange = (name: string) => (date: Date | null) => {
    if (date) {
      setDeliveryData({
        ...deliveryData,
        [name]: date
      });
    }
  };
  
  const calculateTravelTime = () => {
    const startTime = deliveryData.departure_time.getTime();
    const endTime = deliveryData.arrival_time.getTime();
    const diffMs = endTime - startTime;
    
    if (diffMs < 0) return '0ч 0м';
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}ч ${minutes}м`;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!numericId) {
        throw new Error('ID доставки не указан');
      }
      
      // Форматируем даты для API
      const formattedData = {
        ...deliveryData,
        departure_time: format(deliveryData.departure_time, "yyyy-MM-dd'T'HH:mm:ss"),
        arrival_time: format(deliveryData.arrival_time, "yyyy-MM-dd'T'HH:mm:ss"),
      };
      
      console.log('Отправка данных:', { id: numericId, data: formattedData });
      
      // Отправляем данные на сервер
      await updateDelivery({ id: numericId, data: formattedData }).unwrap();
      
      // Переходим на список доставок
      navigate('/');
    } catch (err) {
      console.error('Ошибка при обновлении доставки:', err);
      setError('Не удалось обновить доставку. Проверьте данные и попробуйте снова.');
    }
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  const handleComplete = async () => {
    setError('');
    try {
      if (!numericId) {
        throw new Error('ID доставки не указан');
      }
      
      // Отправляем запрос на отметку доставки как завершенной
      await markCompleted(numericId).unwrap();
      
      // Переходим на список доставок
      navigate('/');
    } catch (err) {
      console.error('Ошибка при отметке доставки как завершенной:', err);
      setError('Не удалось отметить доставку как завершенную.');
    }
  };
  
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    setError('');
    try {
      if (!numericId) {
        throw new Error('ID доставки не указан');
      }
      
      // Отправляем запрос на удаление
      await deleteDelivery(numericId).unwrap();
      
      setDeleteDialogOpen(false);
      // Переходим на список доставок
      navigate('/');
    } catch (err) {
      console.error('Ошибка при удалении доставки:', err);
      setError('Не удалось удалить доставку.');
      setDeleteDialogOpen(false);
    }
  };
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  
  const isLoading = isLoadingDelivery || 
                    isLoadingModels || 
                    isLoadingPackaging || 
                    isLoadingServices || 
                    isLoadingStatuses ||
                    isLoadingCargoTypes;
  
  // Если данные загружаются, показываем спиннер
  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }
  
  // Если доставка не найдена
  if (isDeliveryError || !delivery) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">
          Доставка не найдена. Возможно, она была удалена.
        </Typography>
        <Button onClick={handleBack} sx={{ mt: 2 }}>
          Вернуться к списку
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ mr: 2 }}>
          Назад
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Редактирование доставки
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<Delete />}
            onClick={handleDeleteClick}
          >
            Удалить
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<Check />}
            onClick={handleComplete}
            disabled={isMarking || delivery.status === statuses.find(s => s.name === 'Проведено')?.id}
          >
            {isMarking ? <CircularProgress size={24} color="inherit" /> : 'Провести'}
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Модель и номер */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Модель транспорта</InputLabel>
                <Select
                  name="transport_model"
                  value={deliveryData.transport_model}
                  label="Модель транспорта"
                  onChange={handleSelectChange}
                  required
                >
                  {transportModels.map(model => (
                    <MenuItem key={model.id} value={model.id}>
                      {model.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Номер"
                name="number"
                value={deliveryData.number}
                onChange={handleInputChange}
                required
                placeholder="Например: REX-123"
              />
            </Grid>
            
            {/* Время в пути */}
            <Grid size={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Время в пути
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                <DateTimePicker
                  label="Дата и время отправки"
                  value={deliveryData.departure_time}
                  onChange={handleDateChange('departure_time')}
                  ampm={false}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                <DateTimePicker
                  label="Дата и время доставки"
                  value={deliveryData.arrival_time}
                  onChange={handleDateChange('arrival_time')}
                  ampm={false}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
              <Typography variant="body1" sx={{ textAlign: 'center', pt: 2 }}>
                {calculateTravelTime()}
              </Typography>
            </Grid>
            
            {/* Дистанция */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Дистанция (км)"
                name="distance"
                type="number"
                value={deliveryData.distance}
                onChange={handleInputChange}
                required
                InputProps={{ inputProps: { min: 0, step: 0.1 } }}
              />
            </Grid>
            
            {/* Тип груза */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Тип груза</InputLabel>
                <Select
                  name="cargo_type"
                  value={deliveryData.cargo_type}
                  label="Тип груза"
                  onChange={handleSelectChange}
                >
                  {cargoTypes.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Упаковка и статус */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Упаковка</InputLabel>
                <Select
                  name="packaging"
                  value={deliveryData.packaging}
                  label="Упаковка"
                  onChange={handleSelectChange}
                  required
                >
                  {packagingTypes.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  name="status"
                  value={deliveryData.status}
                  label="Статус"
                  onChange={handleSelectChange}
                  required
                >
                  {statuses.map(status => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Услуги */}
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Услуги</InputLabel>
                <Select
                  multiple
                  name="services"
                  value={deliveryData.services}
                  label="Услуги"
                  onChange={handleSelectChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as number[]).map((value) => (
                        <Chip 
                          key={value} 
                          label={services.find(service => service.id === value)?.name || value} 
                        />
                      ))}
                    </Box>
                  )}
                >
                  {services.map(service => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Состояние */}
            <Grid size={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Состояние
                </Typography>
                <RadioGroup
                  row
                  name="condition"
                  value={deliveryData.condition}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="Исправно" control={<Radio />} label="Исправно" />
                  <FormControlLabel value="Неисправно" control={<Radio />} label="Неисправно" />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            {/* Примечания */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Примечания"
                name="notes"
                value={deliveryData.notes}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
            
            {/* Кнопки действий */}
            <Grid size={12} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  startIcon={<Save />}
                  disabled={isUpdating}
                >
                  {isUpdating ? <CircularProgress size={24} /> : 'Сохранить'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Удаление доставки</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить эту доставку? Это действие невозможно отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Отмена</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : 'Удалить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditDeliveryPage; 