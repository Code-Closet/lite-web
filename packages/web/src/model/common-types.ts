export type JSONObject<T = any> = { [key: string]: T };

export interface Page {
  pageable: JSONObject;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: JSONObject;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Model {
  id?: string;
  financialEntityId: string;
  insertTimestamp?: string;
  insertUser?: string;
  updateTimestamp?: string;
  updateUser?: string;
  status?: string;
}

export interface BatchLoad extends Page {
  content: Batch[];
}

export interface Batch extends Model {
  batchType: string;
  description: string;
  totalSuccess: number;
  totalFailed: number;
  totalRecords: number;
  totalAmount: number;
}
