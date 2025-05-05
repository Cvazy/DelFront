// Типы для доставок
export interface Delivery {
  id: number;
  number: string;
  transport_model: number;
  transport_model_name: string;
  departure_time: string;
  arrival_time: string;
  travel_time: number;
  distance: string | number;
  status: number;
  status_name: string;
  condition: string;
  packaging: number;
  packaging_name: string;
}

// Для создания/обновления доставки
export interface DeliveryCreate {
  number?: string;
  transport_model: number;
  departure_time: string;
  arrival_time: string;
  distance: string;
  status: number;
  condition: string;
  packaging: number;
  media?: any;
}

// Фильтры для запроса доставок
export interface DeliveryFilters {
  min_distance?: string;
  max_distance?: string;
  time_filter?: string;
}

// Типы для отчетов
export interface ReportFilters {
  start_date: string;
  end_date: string;
  report_type: string;
}

export interface ReportData {
  status_report: StatusReport[];
  transport_report: TransportReport[];
  service_report: ServiceReport[];
  date_report: DateReport[];
  summary: ReportSummary;
}

export interface StatusReport {
  status__name: string;
  count: number;
}

export interface TransportReport {
  transport_model__name: string;
  count: number;
  total_distance: number;
  avg_distance: number;
}

export interface ServiceReport {
  services__name: string;
  count: number;
}

export interface DateReport {
  day: string;
  count: number;
}

export interface ReportSummary {
  total: number;
  total_distance: number;
  avg_distance: number;
  min_distance: number;
  max_distance: number;
}

// Справочники
export interface TransportModel {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
}

export interface PackagingType {
  id: number;
  name: string;
}

// Общий тип для элементов справочников
export interface DictionaryItem {
  id: number;
  name: string;
}

// Для отображения в селекторах/пикерах
export interface PickerItem {
  label: string;
  value: any;
} 