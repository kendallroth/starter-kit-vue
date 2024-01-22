import type { PaginationQuery } from "@kendallroth/starter-kit-api/shared";

export type {
  Pagination,
  PaginationInput,
  PaginationQuery,
  PaginatedResult,
} from "@kendallroth/starter-kit-api/shared";

/** Vue Query args for paginated entities */
export type GetPaginatedEntitiesQueryArg = PaginationQuery;

export const DEFAULT_PAGE_SIZE = 10;
