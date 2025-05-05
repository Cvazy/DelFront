/**
 * Возвращает цвет для чипа статуса доставки
 */
export const getStatusColor = (status: string): 'success' | 'warning' | 'default' | 'error' | 'info' | 'primary' | 'secondary' => {
  if (status === 'Проведено') return 'success';
  if (status === 'В пути') return 'warning';
  if (status === 'Отменено') return 'error';
  if (status === 'Ожидает') return 'info';
  return 'default';
}; 