export interface PagingOptions {
  page: number;
  perPage: number;
}

export interface FindResult<T> {
  totalItems: number;
  totalPage: number;
  page: number;
  perPage: number;
  items: T[];
}