import { DEFAULT_PAGE_SIZE, type GetPaginatedEntitiesQueryArg, type Pagination } from "#api/types";

import { type TestFixture, type TestPaginatedFixture } from "./types";

import type { ConditionalKeys } from "type-fest";

/**
 * Random data generator seed for reproducible seed/test data
 *
 * @example
 * faker.seed(RANDOM_DATA_SEED);
 * faker.number.int(); // Will always be the same number!
 */
export const RANDOM_DATA_SEED = 1;

/**
 * Create non-paginated test fixture from list of entities
 *
 * @param list  - Entity list
 * @param idKey - Entity key representing the ID
 */
export const getTestFixture = <T>(list: T[], idKey: ConditionalKeys<T, string>): TestFixture<T> => {
  const entityMap = list.reduce(
    (accum, item) => {
      const id = item[idKey] as string;
      return { ...accum, [id]: item };
    },
    {} as Record<string, T>,
  );

  return {
    entityMap,
    entityList: list,
    ids: list.map((item) => item[idKey]) as string[],
  };
};

/**
 * Create paginated list from list of entities
 *
 * @param list      - Entity list
 * @param queryArgs - Paginated entity query args (skip if wanting static/default pagination)
 */
export const getPaginatedList = <T>(
  list: T[],
  queryArgs?: Partial<GetPaginatedEntitiesQueryArg>,
): { data: T[]; pagination: Pagination } => {
  const { page = 1, size = DEFAULT_PAGE_SIZE } = queryArgs ?? {};
  const itemCount = list.length;
  const pageCount = Math.ceil(itemCount / size);

  const paginatedList = list.slice((page - 1) * size, page * size);
  return {
    data: paginatedList,
    pagination: {
      page,
      size,
      totalItems: itemCount,
      totalPages: pageCount,
    },
  };
};

/**
 * Create paginated test fixture from list of entities
 *
 * @param list      - Entity list
 * @param idKey     - Entity ID key (for fixture)
 * @param queryArgs - Paginated entity query args (skip if wanting static/default pagination)
 */
export const getPaginatedTestFixture = <T>(
  list: T[],
  idKey: ConditionalKeys<T, string>,
  queryArgs?: Partial<GetPaginatedEntitiesQueryArg>,
): TestPaginatedFixture<T> => {
  const { data: paginatedList, pagination } = getPaginatedList(list, queryArgs);

  const fixture = getTestFixture(paginatedList, idKey);

  return {
    ...fixture,
    pagination,
  };
};
