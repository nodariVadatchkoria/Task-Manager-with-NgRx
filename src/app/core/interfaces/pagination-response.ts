export interface PaginationResponse<T> {
  totalCount: number;
  data: T[];
  page: number;
  limit: number;
}
