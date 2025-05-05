import { api } from "./api";

/**
 * Отчет по статусам доставок
 */
export interface StatusReport {
  status__name: string;
  count: number;
}

/**
 * Отчет по моделям транспорта
 */
export interface TransportReport {
  transport_model__name: string;
  count: number;
  total_distance: number;
  avg_distance: number;
}

/**
 * Отчет по услугам
 */
export interface ServiceReport {
  services__name: string;
  count: number;
}

/**
 * Отчет по датам
 */
export interface DateReport {
  day?: string;
  week?: string;
  month?: string;
  count: number;
}

/**
 * Сводная информация по отчету
 */
export interface ReportSummary {
  total: number;
  total_distance: number;
  avg_distance: number;
  min_distance: number;
  max_distance: number;
}

/**
 * Полный отчет по доставкам
 */
export interface ReportResponse {
  status_report: StatusReport[];
  transport_report: TransportReport[];
  service_report: ServiceReport[];
  date_report: DateReport[];
  summary: ReportSummary;
}

/**
 * Параметры для запроса отчетов
 */
export interface ReportParams {
  start_date?: string; // в формате YYYY-MM-DD
  end_date?: string; // в формате YYYY-MM-DD
  report_type?: "daily" | "weekly" | "monthly";
}

// Инжектируем API для отчетов
export const reportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получение отчетов по доставкам
     */
    getReports: builder.query<ReportResponse, ReportParams | void>({
      query: (params) => {
        if (!params) {
          console.log(
            "Отправка запроса на URL: reports/delivery-reports/ без параметров",
          );
          return "reports/delivery-reports/";
        }

        const queryParams = new URLSearchParams();
        if (params.start_date)
          queryParams.append("start_date", params.start_date);
        if (params.end_date) queryParams.append("end_date", params.end_date);
        if (params.report_type)
          queryParams.append("report_type", params.report_type);

        console.log(
          "Отправка запроса на URL: reports/delivery-reports/ с параметрами:",
          Object.fromEntries(queryParams.entries()),
        );

        return {
          url: "reports/delivery-reports/",
          params: queryParams,
        };
      },
      transformResponse: (response: unknown): ReportResponse => {
        console.log("Ответ от API отчетов:", response);

        // Проверяем пагинированный ответ
        if (response && typeof response === "object") {
          const typedResponse = response as any;
          if (
            "results" in typedResponse &&
            Array.isArray(typedResponse.results) &&
            typedResponse.results.length > 0
          ) {
            console.log(
              "Получен пагинированный ответ, беру данные из results[0]",
            );
            return typedResponse.results[0];
          }
        }

        console.log("Возвращаю ответ как есть:", response);
        return response as ReportResponse;
      },
      transformErrorResponse: (response) => {
        console.error("Ошибка при запросе отчетов:", response);

        // Дополнительная обработка ошибок для улучшения отладки
        if (
          response.status === 400 &&
          response.data &&
          typeof response.data === "object" &&
          "error" in response.data &&
          typeof response.data.error === "string" &&
          response.data.error.includes(
            "module 'django.utils.timezone' has no attribute 'utc'",
          )
        ) {
          // Можно добавить дополнительную информацию в ответ
          return {
            ...response,
            data: {
              ...response.data,
              userMessage:
                "Ошибка в коде сервера. Пожалуйста, сообщите разработчику о проблеме с django.utils.timezone.utc.",
              developerHint:
                "Замените django.utils.timezone.utc на datetime.timezone.utc в коде Python на бэкенде.",
            },
          };
        }

        return response;
      },
      providesTags: ["Report"],
    }),
  }),
});

// Экспортируем хуки
export const { useGetReportsQuery } = reportApi;
