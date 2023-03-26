export interface IPageOption {
  page: number;
  limit: number;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
  search?: string;
}
