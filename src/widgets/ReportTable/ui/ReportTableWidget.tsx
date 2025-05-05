import React from 'react';
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from '@mui/material';
import { DeliveryListItem } from 'entities/delivery/model/types';
import { formatDateTime } from 'shared/lib/formatters';

interface ReportTableWidgetProps {
  deliveries: DeliveryListItem[];
  order: 'asc' | 'desc';
  orderBy: string;
  onSort: (property: string) => void;
}

export const ReportTableWidget: React.FC<ReportTableWidgetProps> = ({
  deliveries,
  order,
  orderBy,
  onSort
}) => {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Список доставок
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'number'}
                  direction={orderBy === 'number' ? order : 'asc'}
                  onClick={() => onSort('number')}
                >
                  Номер
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'model'}
                  direction={orderBy === 'model' ? order : 'asc'}
                  onClick={() => onSort('model')}
                >
                  Модель
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'departureTime'}
                  direction={orderBy === 'departureTime' ? order : 'asc'}
                  onClick={() => onSort('departureTime')}
                >
                  Дата отправки
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'distance'}
                  direction={orderBy === 'distance' ? order : 'asc'}
                  onClick={() => onSort('distance')}
                >
                  Дистанция (км)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'condition'}
                  direction={orderBy === 'condition' ? order : 'asc'}
                  onClick={() => onSort('condition')}
                >
                  Состояние
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => onSort('status')}
                >
                  Статус
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'packaging'}
                  direction={orderBy === 'packaging' ? order : 'asc'}
                  onClick={() => onSort('packaging')}
                >
                  Упаковка
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Показываем данные, если они есть */}
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>
                  {delivery.number} [ID: {delivery.id}]
                </TableCell>
                <TableCell>{delivery.transport_model_name}</TableCell>
                <TableCell>
                  {formatDateTime(delivery.departure_time || '')}
                </TableCell>
                <TableCell>{delivery.distance}</TableCell>
                <TableCell>{delivery.condition}</TableCell>
                <TableCell>{delivery.status_name}</TableCell>
                <TableCell>{delivery.packaging_name}</TableCell>
              </TableRow>
            ))}
            {/* Если нет данных, рендерим пустую строку */}
            {deliveries.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Загрузка данных...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}; 