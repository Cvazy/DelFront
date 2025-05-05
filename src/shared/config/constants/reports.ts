/**
 * Константы для отчётов
 */

// Типы услуг для фильтра
export const SERVICE_TYPES = [
  { value: "all", label: "Все типы" },
  { value: "До клиента", label: "До клиента" },
  { value: "Перемещение между складами", label: "Перемещение между складами" },
  { value: "Физ. лицо", label: "Физ. лицо" },
  { value: "Юр. лицо", label: "Юр. лицо" },
  { value: "Мед. товары", label: "Мед. товары" },
  { value: "Хрупкий груз", label: "Хрупкий груз" },
  { value: "Температурный режим", label: "Температурный режим" },
];

// Цвета для графиков
export const CHART_COLORS = [
  "#4dabf5",
  "#5df542",
  "#f5c242",
  "#f54242",
  "#c642f5",
  "#42f5f2",
];

// Стили для графиков
export const CHART_STYLES = {
  label: {
    fill: "#ffffff", // Белый цвет текста для темной темы
    fontWeight: "bold",
    fontSize: "12px",
    textShadow: "0px 0px 2px rgba(0, 0, 0, 0.8)", // Тень для лучшей видимости
  },
  darkPaper: {
    bgcolor: "#1e1e1e", // Темный фон
    color: "#ffffff", // Белый текст
    border: "1px solid #333333", // Тонкая рамка
  },
  chartContainer: {
    backgroundColor: "#222",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "4px",
  },
  tooltip: {
    backgroundColor: "rgba(50, 50, 50, 0.9)",
    border: "1px solid #555",
    color: "#fff",
  }
}; 