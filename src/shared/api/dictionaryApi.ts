import { api } from './api';
import { PaginatedResponse } from './deliveryApi';

/**
 * Элемент справочника (общий для всех справочников)
 */
export interface DictionaryItem {
  id: number;
  name: string;
  code: string;
  description?: string;
  active: boolean;
}

// Расширяем базовый API нашими эндпоинтами для справочников
export const dictionaryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получение списка моделей транспорта
     */
    getTransportModels: builder.query<DictionaryItem[], void>({
      query: () => 'references/transport-models/',
      transformResponse: (response: DictionaryItem[] | PaginatedResponse<DictionaryItem>) => {
        if ('results' in response) {
          return response.results;
        }
        return response;
      },
      providesTags: ['TransportModel'],
    }),

    /**
     * Получение списка типов упаковки
     */
    getPackagingTypes: builder.query<DictionaryItem[], void>({
      query: () => 'references/packaging-types/',
      transformResponse: (response: DictionaryItem[] | PaginatedResponse<DictionaryItem>) => {
        if ('results' in response) {
          return response.results;
        }
        return response;
      },
      providesTags: ['PackagingType'],
    }),

    /**
     * Получение списка услуг
     */
    getServices: builder.query<DictionaryItem[], void>({
      query: () => 'references/services/',
      transformResponse: (response: DictionaryItem[] | PaginatedResponse<DictionaryItem>) => {
        if ('results' in response) {
          return response.results;
        }
        return response;
      },
      providesTags: ['Service'],
    }),

    /**
     * Получение списка статусов доставки
     */
    getDeliveryStatuses: builder.query<DictionaryItem[], void>({
      query: () => 'references/delivery-statuses/',
      transformResponse: (response: DictionaryItem[] | PaginatedResponse<DictionaryItem>) => {
        if ('results' in response) {
          return response.results;
        }
        return response;
      },
      providesTags: ['DeliveryStatus'],
    }),

    /**
     * Получение списка типов груза
     */
    getCargoTypes: builder.query<DictionaryItem[], void>({
      query: () => 'references/cargo-types/',
      transformResponse: (response: DictionaryItem[] | PaginatedResponse<DictionaryItem>) => {
        if ('results' in response) {
          return response.results;
        }
        return response;
      },
      providesTags: ['CargoType'],
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useGetTransportModelsQuery,
  useGetPackagingTypesQuery,
  useGetServicesQuery,
  useGetDeliveryStatusesQuery,
  useGetCargoTypesQuery,
} = dictionaryApi; 