import { api } from "shared/api/api";
import {
  DeliveryListItem,
  DeliveryDetail,
  DeliveryCreateUpdate,
  DeliveryFilters,
  StatsResponse,
} from "../model/types";

// Инжектируем эндпоинты для доставок в базовое API
export const deliveryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получение списка доставок с опциональными фильтрами
     */
    getDeliveries: builder.query<DeliveryListItem[], DeliveryFilters | void>({
      query: (filters) => {
        // Если фильтры не переданы, просто возвращаем URL
        if (!filters) return "delivery/deliveries/";

        // Формируем параметры запроса из фильтров
        const params = new URLSearchParams();
        if (filters.min_distance)
          params.append("min_distance", filters.min_distance);
        if (filters.max_distance)
          params.append("max_distance", filters.max_distance);
        if (filters.time_filter && filters.time_filter !== "all")
          params.append("time_filter", filters.time_filter);
        if (filters.status) params.append("status", filters.status.toString());
        if (filters.transport_model)
          params.append("transport_model", filters.transport_model.toString());
        if (filters.services) params.append("services", filters.services);

        console.log(
          "Отправка запроса на URL:",
          "delivery/deliveries/",
          "с параметрами:",
          Object.fromEntries(params.entries()),
        );

        return {
          url: "delivery/deliveries/",
          params: params,
        };
      },
      transformResponse: (response: unknown): DeliveryListItem[] => {
        // Добавляем отладочную информацию
        console.log("Ответ от API доставок:", response);

        // Проверяем формат ответа - всегда должен быть объект с полем results
        if (response && typeof response === "object") {
          const typedResponse = response as any;
          if (
            "results" in typedResponse &&
            Array.isArray(typedResponse.results)
          ) {
            console.log(
              "Получены данные доставок, количество:",
              typedResponse.results?.length || 0,
            );
            if (typedResponse.results.length > 0) {
              console.log("Пример первой доставки:", typedResponse.results[0]);
            }
            return typedResponse.results || [];
          }
        }

        console.warn("Ответ неизвестного формата:", response);
        return [];
      },
      transformErrorResponse: (response) => {
        console.error("Ошибка при запросе доставок:", response);
        return response;
      },
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: "Delivery" as const, id })),
              { type: "Delivery", id: "LIST" },
            ]
          : [{ type: "Delivery", id: "LIST" }],
    }),

    /**
     * Получение конкретной доставки по ID
     */
    getDeliveryById: builder.query<DeliveryDetail, number>({
      query: (id) => `delivery/deliveries/${id}/`,
      providesTags: (_, __, id) => [{ type: "Delivery", id }],
    }),

    /**
     * Создание новой доставки
     */
    createDelivery: builder.mutation<DeliveryDetail, DeliveryCreateUpdate>({
      query: (delivery) => ({
        url: "delivery/deliveries/",
        method: "POST",
        body: delivery,
      }),
      invalidatesTags: [{ type: "Delivery", id: "LIST" }],
    }),

    /**
     * Обновление существующей доставки
     */
    updateDelivery: builder.mutation<
      DeliveryDetail,
      { id: number; data: DeliveryCreateUpdate }
    >({
      query: ({ id, data }) => ({
        url: `delivery/deliveries/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Delivery", id },
        { type: "Delivery", id: "LIST" },
      ],
    }),

    /**
     * Удаление доставки
     */
    deleteDelivery: builder.mutation<void, number>({
      query: (id) => ({
        url: `delivery/deliveries/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Delivery", id: "LIST" }],
    }),

    /**
     * Отметить доставку как выполненную
     */
    markDeliveryCompleted: builder.mutation<DeliveryDetail, number>({
      query: (id) => ({
        url: `delivery/deliveries/${id}/mark_completed/`,
        method: "POST",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "Delivery", id },
        { type: "Delivery", id: "LIST" },
      ],
    }),

    /**
     * Получение статистики по доставкам
     */
    getDeliveryStats: builder.query<StatsResponse, void>({
      query: () => "delivery/deliveries/stats/",
      providesTags: ["Report"],
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
