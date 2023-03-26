export interface PaginationResponse<T> {
  totalCount: number;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
