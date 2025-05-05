import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface LoginRequest {
  username: string;
  password: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

// Функции работы с токенами в cookies (более безопасно чем localStorage)
export const setAuthTokens = (tokens: TokenResponse) => {
  // Устанавливаем cookies с secure и httpOnly атрибутами
  Cookies.set('accessToken', tokens.access, { expires: 1, path: '/', sameSite: 'Strict' }); // 1 день
  Cookies.set('refreshToken', tokens.refresh, { expires: 7, path: '/', sameSite: 'Strict' }); // 7 дней
};

export const getAccessToken = () => Cookies.get('accessToken');
export const getRefreshToken = () => Cookies.get('refreshToken');

export const removeAuthTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const isAuthenticated = () => !!getAccessToken();

// Отдельный API для авторизации
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include', // Важно для работы с cookies
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'api/token/',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      // Обработчик успешного запроса
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Сохраняем токены в cookies
          setAuthTokens(data);
        } catch (error) {
          // Обработка ошибок
          console.error('Ошибка авторизации:', error);
        }
      },
    }),
    
    // Обновление токена доступа
    refreshToken: builder.mutation<{ access: string }, void>({
      query: () => ({
        url: 'api/token/refresh/',
        method: 'POST',
        body: { refresh: getRefreshToken() },
        credentials: 'include',
      }),
      // Обработчик успешного запроса
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Обновляем только токен доступа
          Cookies.set('accessToken', data.access, { expires: 1, path: '/', sameSite: 'Strict' });
        } catch (error) {
          console.error('Ошибка обновления токена:', error);
          // Если не удалось обновить токен, удаляем оба токена
          removeAuthTokens();
        }
      },
    }),
    
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'api-auth/logout/',
        method: 'POST',
        credentials: 'include',
      }),
      // При выходе удаляем токены
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Ошибка при выходе из системы:', error);
        } finally {
          // В любом случае удаляем токены при выходе
          removeAuthTokens();
        }
      },
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } = authApi; 