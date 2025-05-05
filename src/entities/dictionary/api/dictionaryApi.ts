import { api } from "shared/api/api";
import {
  TransportModel,
  PackagingType,
  Service,
  DeliveryStatus,
  CargoType,
} from "../model/types";

// Инжектируем эндпоинты для справочников в базовое API
export const dictionaryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получение списка моделей транспорта
     */
    getTransportModels: builder.query<TransportModel[], void>({
      query: () => "references/transport-models/",
      providesTags: ["TransportModel"],
    }),

    /**
     * Получение списка типов упаковки
     */
    getPackagingTypes: builder.query<PackagingType[], void>({
      query: () => "references/packaging-types/",
      providesTags: ["PackagingType"],
    }),

    /**
     * Получение списка услуг
     */
    getServices: builder.query<Service[], void>({
      query: () => "references/services/",
      providesTags: ["Service"],
    }),

    /**
     * Получение списка статусов доставки
     */
    getDeliveryStatuses: builder.query<DeliveryStatus[], void>({
      query: () => "references/delivery-statuses/",
      providesTags: ["DeliveryStatus"],
    }),

    /**
     * Получение списка типов груза
     */
    getCargoTypes: builder.query<CargoType[], void>({
      query: () => "references/cargo-types/",
      providesTags: ["CargoType"],
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
