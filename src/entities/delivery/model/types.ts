/**
 * Базовый элемент доставки в списке
 */
export interface DeliveryListItem {
  id: number;
  number: string;
  transport_model: number;
  transport_model_name: string;
  departure_time: string;
  arrival_time: string;
  travel_time: number;
  distance: string;
  status: number;
  status_name: string;
  condition: string;
  packaging: number;
  packaging_name: string;
}

/**
 * Детальная информация о доставке
 */
export interface DeliveryDetail extends DeliveryListItem {
  services: number[];
  services_data: Array<{ id: number; name: string; code: string; }>;
  cargo_type?: number;
  cargo_type_name?: string;
  notes?: string;
  media_file?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Данные для создания/обновления доставки
 */
export interface DeliveryCreateUpdate {
  number: string;
  transport_model: number;
  departure_time: string;
  arrival_time: string;
  distance: string;
  packaging: number;
  status: number;
  condition: string;
  cargo_type?: number;
  notes?: string;
  services: number[];
}

/**
 * Параметры фильтрации доставок
 */
export interface DeliveryFilters {
  min_distance?: string;
  max_distance?: string;
  time_filter?: 'today' | 'week' | 'all';
  status?: number;
  transport_model?: number;
  services?: string; // comma-separated list of service IDs
}

/**
 * Статистика по доставкам
 */
export interface StatsResponse {
  total_deliveries: number;
  completed_deliveries: number;
  pending_deliveries: number;
  avg_distance: number;
}

/**
 * Ответ API с пагинацией 
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
} 