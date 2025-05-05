import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getAccessToken, getRefreshToken } from "./authApi";
import { Mutex } from "async-mutex";

// Создаем мьютекс для предотвращения гонки запросов на обновление токена
const mutex = new Mutex();

/**
 * Базовый запрос с аутентификацией через Bearer токен
 *
 * Автоматически добавляет токен из localStorage в заголовок Authorization
 */
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/`,
  credentials: "include", // Включаем куки в запросы
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Расширенный запрос с механизмом обновления токена
 *
 * Если API возвращает 401 Unauthorized, пробует автоматически обновить токен
 * с помощью refresh токена и повторить запрос. Использует mutex для предотвращения
 * одновременных запросов на обновление токена.
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Ждем, если другой запрос обновляет токен
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  // Если ошибка авторизации 401, пробуем обновить токен
  if (result.error && result.error.status === 401) {
    // Проверяем, если мьютекс свободен (чтобы только один запрос обновлял токен)
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          // Нет токена обновления - выходим
          return result;
        }

        // Отправляем запрос на обновление токена
        const refreshResult = await fetch(
          "http://localhost:8000/api/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
            credentials: "include", // Включаем куки
          },
        );

        if (refreshResult.ok) {
          // Повторяем исходный запрос
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        // Освобождаем мьютекс в любом случае
        release();
      }
    } else {
      // Ждем, пока другой запрос обновит токен
      await mutex.waitForUnlock();
      // Повторяем запрос с новым токеном
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

/**
 * Базовый API для всех запросов в приложении
 *
 * Содержит настройки авторизации, обновления токенов и тэги RTK Query
 * для кэширования и инвалидации данных.
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Delivery",
    "TransportModel",
    "PackagingType",
    "Service",
    "DeliveryStatus",
    "CargoType",
    "Report",
  ],
  endpoints: () => ({}),
});
