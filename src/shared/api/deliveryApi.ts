import { api } from './api';

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

// Инжектируем эндпоинты для доставок в базовое API
export const deliveryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получение списка доставок с опциональными фильтрами
     */
    getDeliveries: builder.query<DeliveryListItem[], DeliveryFilters | void>({
      query: (filters) => {
        // Если фильтры не переданы, просто возвращаем URL
        if (!filters) return 'delivery/deliveries/';
        
        // Формируем параметры запроса из фильтров
        const params = new URLSearchParams();
        if (filters.min_distance) params.append('min_distance', filters.min_distance);
        if (filters.max_distance) params.append('max_distance', filters.max_distance);
        if (filters.time_filter && filters.time_filter !== 'all') params.append('time_filter', filters.time_filter);
        if (filters.status) params.append('status', filters.status.toString());
        if (filters.transport_model) params.append('transport_model', filters.transport_model.toString());
        if (filters.services) params.append('services', filters.services);

        console.log('Отправка запроса на URL:', 'delivery/deliveries/', 'с параметрами:', 
                    Object.fromEntries(params.entries()));

        return {
          url: 'delivery/deliveries/',
          params: params
        };
      },
      transformResponse: (response: unknown): DeliveryListItem[] => {
        // Добавляем отладочную информацию
        console.log('Ответ от API доставок:', response);
        
        // Проверяем различные форматы ответа
        if (Array.isArray(response)) {
          console.log('Ответ - массив, длина:', response.length);
          return response as DeliveryListItem[];
        }
        
        if (response && typeof response === 'object') {
          const typedResponse = response as PaginatedResponse<DeliveryListItem>;
          if ('results' in typedResponse && Array.isArray(typedResponse.results)) {
            console.log('Ответ - объект с results, длина:', typedResponse.results?.length || 0);
            return typedResponse.results || [];
          }
        }
        
        console.warn('Ответ неизвестного формата:', response);
        return [];
      },
      transformErrorResponse: (response) => {
        console.error('Ошибка при запросе доставок:', response);
        return response;
      },
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: 'Delivery' as const, id })),
              { type: 'Delivery', id: 'LIST' },
            ]
          : [{ type: 'Delivery', id: 'LIST' }],
    }),

    /**
     * Получение конкретной доставки по ID
     */
    getDeliveryById: builder.query<DeliveryDetail, number>({
      query: (id) => `delivery/deliveries/${id}/`,
      providesTags: (_, __, id) => [{ type: 'Delivery', id }],
    }),

    /**
     * Создание новой доставки
     */
    createDelivery: builder.mutation<DeliveryDetail, DeliveryCreateUpdate>({
      query: (delivery) => ({
        url: 'delivery/deliveries/',
        method: 'POST',
        body: delivery,
      }),
      invalidatesTags: [{ type: 'Delivery', id: 'LIST' }],
    }),

    /**
     * Обновление существующей доставки
     */
    updateDelivery: builder.mutation<DeliveryDetail, { id: number; data: DeliveryCreateUpdate }>({
      query: ({ id, data }) => ({
        url: `delivery/deliveries/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Delivery', id },
        { type: 'Delivery', id: 'LIST' },
      ],
    }),

    /**
     * Удаление доставки
     */
    deleteDelivery: builder.mutation<void, number>({
      query: (id) => ({
        url: `delivery/deliveries/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Delivery', id: 'LIST' }],
    }),

    /**
     * Отметить доставку как выполненную
     */
    markDeliveryCompleted: builder.mutation<DeliveryDetail, number>({
      query: (id) => ({
        url: `delivery/deliveries/${id}/mark_completed/`,
        method: 'POST',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Delivery', id },
        { type: 'Delivery', id: 'LIST' },
      ],
    }),

    /**
     * Получение статистики по доставкам
     */
    getDeliveryStats: builder.query<StatsResponse, void>({
      query: () => 'delivery/deliveries/stats/',
      providesTags: ['Report'],
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useGetDeliveriesQuery,
  useGetDeliveryByIdQuery,
  useCreateDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
  useMarkDeliveryCompletedMutation,
  useGetDeliveryStatsQuery,
} = deliveryApi; 