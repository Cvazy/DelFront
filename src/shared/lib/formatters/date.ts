/**
 * Форматирует дату-время в строку российского формата
 */
export const formatDateTime = (dateTimeStr: string): string => {
  if (!dateTimeStr) return 'Не указано';
  
  try {
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (e) {
    return 'Неверный формат';
  }
};

/**
 * Преобразует длительность из часов в читаемый формат часы+минуты
 */
export const formatDuration = (hours: number): string => {
  if (typeof hours !== 'number') return 'Не указано';
  
  const fullHours = Math.floor(hours);
  const minutes = Math.round((hours - fullHours) * 60);
  
  return `${fullHours}ч ${minutes}м`;
}; 