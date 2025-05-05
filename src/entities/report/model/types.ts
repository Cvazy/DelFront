/**
 * Базовые типы для отчётов
 */

// Элемент данных графика
export interface ChartDataItem {
  name: string;
  value: number;
}

// Фильтры для отчёта
export interface ReportFilters {
  startDate: Date;
  endDate: Date;
  serviceType: string;
}

// Параметры запроса отчёта
export interface ReportParams {
  start_date: string;
  end_date: string;
  report_type: 'daily' | 'weekly' | 'monthly';
}

// Сводная информация отчёта
export interface ReportSummary {
  total: number;
  total_distance: number;
  avg_distance: number;
  min_distance: number;
  max_distance: number;
}

// Ответ API с отчётами
export interface ReportResponse {
  summary?: ReportSummary;
  transport_report?: ChartDataItem[];
  status_report?: ChartDataItem[];
  service_report?: ChartDataItem[];
  distance_report?: ChartDataItem[];
}

// Локальные отчёты, сгенерированные на фронтенде
export interface FallbackReportData {
  transportReport: ChartDataItem[];
  statusReport: ChartDataItem[];
  serviceReport: ChartDataItem[];
  distanceReport: ChartDataItem[];
} 