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

/**
 * Тип для моделей транспорта
 */
export type TransportModel = DictionaryItem;

/**
 * Тип для типов упаковки
 */
export type PackagingType = DictionaryItem;

/**
 * Тип для услуг
 */
export type Service = DictionaryItem;

/**
 * Тип для статусов доставки
 */
export type DeliveryStatus = DictionaryItem;

/**
 * Тип для типов груза
 */
export type CargoType = DictionaryItem; 