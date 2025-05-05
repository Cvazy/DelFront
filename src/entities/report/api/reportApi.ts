import { api } from 'shared/api/api';
import { ReportParams, ReportResponse } from '../model/types';

export const reportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получение отчётов по заданным параметрам
     */
    getReports: builder.query<ReportResponse, ReportParams>({
      query: (params) => {
        console.log('Отправка запроса в entities/report:', params);
        return {
          url: 'reports/delivery-reports/',
          params
        };
      },
      transformResponse: (response: unknown): ReportResponse => {
        console.log('Ответ на запрос отчетов в entities/report:', response);
        
        // Если ответ - объект и у него есть поле results (пагинированный ответ)
        if (response && typeof response === 'object') {
          const typedResponse = response as any;
          
          if ('results' in typedResponse && Array.isArray(typedResponse.results) && typedResponse.results.length > 0) {
            // Берем данные из первого элемента массива results
            console.log('Получен пагинированный ответ в entities/report, извлекаю данные из results[0]');
            return typedResponse.results[0];
          }
        }
        
        console.log('Возвращаю ответ как есть:', response);
        return response as ReportResponse;
      },
      transformErrorResponse: (error) => {
        console.error('Ошибка при получении отчетов в entities/report:', error);
        return error;
      },
      providesTags: ['Report']
    })
  }),
});

export const {
  useGetReportsQuery
} = reportApi; 