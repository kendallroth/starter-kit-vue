/** API pagination information */
export interface ApiPaginationMeta {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

/** Response with paginated data and meta information */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: ApiPaginationMeta;
}

/** Pagination app input/state */
export interface Pagination {
  page: number;
  size: number;
}

/** Vue Query args for paginated entities */
export interface GetPaginatedEntitiesQueryArg extends Pagination {
  sort?: string;
}

export const DEFAULT_PAGE_SIZE = 10;
