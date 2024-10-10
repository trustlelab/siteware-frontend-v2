// common.types.ts

export interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}
