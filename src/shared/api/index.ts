import { api } from './api';

// Эндпоинты и типы для доставок
export * from './deliveryApi';

// Эндпоинты и типы для справочников
export * from './dictionaryApi';

// Эндпоинты и типы для отчетов
export * from './reportApi';

// Авторизация
export * from './authApi';

// Экспорт базового API для store
export { api };

// Типы данных
export type { DictionaryItem } from './dictionaryApi';
export type { 
  DeliveryListItem, 
  DeliveryDetail, 
  DeliveryCreateUpdate, 
  DeliveryFilters, 
  StatsResponse 
} from './deliveryApi';
export type { 
  StatusReport, 
  TransportReport,
  ServiceReport, 
  DateReport, 
  ReportSummary, 
  ReportResponse, 
  ReportParams 
} from './reportApi'; 