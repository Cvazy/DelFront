import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  Box, 
  Chip,
  Stack,
  OutlinedInput,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Send, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DeliveryCreateUpdate } from 'entities/delivery/model/types';
import { 
  TransportModel, 
  PackagingType, 
  Service, 
  DeliveryStatus, 
  CargoType 
} from 'entities/dictionary/model/types';

interface CreateDeliveryFormProps {
  transportModels: TransportModel[];
  packagingTypes: PackagingType[];
  services: Service[];
  statuses: DeliveryStatus[];
  cargoTypes: CargoType[];
  onSubmit: (data: DeliveryCreateUpdate) => void;
  isLoading: boolean;
  error?: any;
}

export const CreateDeliveryForm: React.FC<CreateDeliveryFormProps> = ({
  transportModels,
  packagingTypes,
  services,
  statuses,
  cargoTypes,
  onSubmit,
  isLoading,
  error
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DeliveryCreateUpdate>({
    number: '',
    transport_model: 0,
    departure_time: new Date().toISOString(),
    arrival_time: new Date(Date.now() + 86400000).toISOString(), // +24 часа
    distance: '',
    packaging: 0,
    status: 0,
    condition: 'Исправно',
    services: []
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.number.trim()) {
      errors.number = 'Номер доставки обязателен';
    }
    
    if (!formData.transport_model) {
      errors.transport_model = 'Выберите модель транспорта';
    }
    
    if (!formData.packaging) {
      errors.packaging = 'Выберите тип упаковки';
    }
    
    if (!formData.status) {
      errors.status = 'Выберите статус доставки';
    }
    
    if (!formData.distance.trim()) {
      errors.distance = 'Укажите дистанцию';
    } else if (isNaN(Number(formData.distance))) {
      errors.distance = 'Дистанция должна быть числом';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string) => (e: any) => {
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  
  const handleDateChange = (name: string) => (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        [name]: date.toISOString()
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Создание новой доставки
        </Typography>
        
        {error && (
          <Box sx={{ mb: 3 }}>
            <Typography color="error">
              Произошла ошибка при создании доставки. Пожалуйста, проверьте данные и попробуйте снова.
            </Typography>
            {typeof error === 'object' && error.data && (
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(error.data, null, 2)}
              </pre>
            )}
          </Box>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <TextField
                fullWidth
                label="Номер доставки"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                error={!!validationErrors.number}
                helperText={validationErrors.number}
                disabled={isLoading}
              />
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <TextField
                fullWidth
                label="Дистанция (км)"
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
                error={!!validationErrors.distance}
                helperText={validationErrors.distance}
                disabled={isLoading}
              />
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <DateTimePicker
                label="Время отправления"
                value={new Date(formData.departure_time)}
                onChange={handleDateChange('departure_time')}
                disabled={isLoading}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <DateTimePicker
                label="Время прибытия"
                value={new Date(formData.arrival_time)}
                onChange={handleDateChange('arrival_time')}
                disabled={isLoading}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <FormControl fullWidth error={!!validationErrors.transport_model}>
                <InputLabel>Модель транспорта</InputLabel>
                <Select
                  value={formData.transport_model || ''}
                  onChange={handleSelectChange('transport_model')}
                  label="Модель транспорта"
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Не выбрано</em></MenuItem>
                  {transportModels.map(model => (
                    <MenuItem key={model.id} value={model.id}>
                      {model.name}
                    </MenuItem>
                  ))}
                </Select>
                {validationErrors.transport_model && (
                  <FormHelperText>{validationErrors.transport_model}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <FormControl fullWidth error={!!validationErrors.packaging}>
                <InputLabel>Тип упаковки</InputLabel>
                <Select
                  value={formData.packaging || ''}
                  onChange={handleSelectChange('packaging')}
                  label="Тип упаковки"
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Не выбрано</em></MenuItem>
                  {packagingTypes.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                {validationErrors.packaging && (
                  <FormHelperText>{validationErrors.packaging}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <FormControl fullWidth error={!!validationErrors.status}>
                <InputLabel>Статус доставки</InputLabel>
                <Select
                  value={formData.status || ''}
                  onChange={handleSelectChange('status')}
                  label="Статус доставки"
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Не выбрано</em></MenuItem>
                  {statuses.map(status => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
                {validationErrors.status && (
                  <FormHelperText>{validationErrors.status}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <FormControl fullWidth>
                <InputLabel>Состояние</InputLabel>
                <Select
                  value={formData.condition}
                  onChange={handleSelectChange('condition')}
                  label="Состояние"
                  disabled={isLoading}
                >
                  <MenuItem value="Исправно">Исправно</MenuItem>
                  <MenuItem value="Требует ремонта">Требует ремонта</MenuItem>
                  <MenuItem value="Неисправно">Неисправно</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <FormControl fullWidth>
                <InputLabel>Тип груза</InputLabel>
                <Select
                  value={formData.cargo_type || ''}
                  onChange={handleSelectChange('cargo_type')}
                  label="Тип груза"
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Не выбрано</em></MenuItem>
                  {cargoTypes.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid sx={{ gridColumn: 'span 12' }}>
              <FormControl fullWidth>
                <InputLabel>Доп. услуги</InputLabel>
                <Select
                  multiple
                  value={formData.services}
                  onChange={handleSelectChange('services')}
                  input={<OutlinedInput label="Доп. услуги" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as number[]).map((value) => {
                        const service = services.find(s => s.id === value);
                        return service ? (
                          <Chip key={value} label={service.name} />
                        ) : null;
                      })}
                    </Box>
                  )}
                  disabled={isLoading}
                >
                  {services.map(service => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid sx={{ gridColumn: 'span 12' }}>
              <TextField
                fullWidth
                label="Примечания"
                name="notes"
                value={formData.notes || ''}
                onChange={handleInputChange}
                multiline
                rows={4}
                disabled={isLoading}
              />
            </Grid>
            
            <Grid sx={{ gridColumn: 'span 12' }}>
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  startIcon={<ArrowBack />}
                  disabled={isLoading}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={isLoading ? <CircularProgress size={20} /> : <Send />}
                  disabled={isLoading}
                >
                  {isLoading ? 'Создание...' : 'Создать доставку'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}; 