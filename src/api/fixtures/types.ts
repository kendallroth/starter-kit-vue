import type { Pagination } from "#api/types";

/** Map of entities by ID to value (entity itself) */
export type EntityMap<T> = Record<string, T>;

/** Test non-paginated fixture providing easy access to test data via multiple structures */
export interface TestFixture<Entity> {
  /** Map of entities by ID and value (for quick access) */
  entityMap: EntityMap<Entity>;
  /** List of entities (for additional list operations, etc) */
  entityList: Entity[];
  /** List of entity IDs */
  ids: Array<keyof EntityMap<Entity>>;
}

/** Test paginated fixture providing easy access to test data via multiple structures */
export interface TestPaginatedFixture<Entity> extends TestFixture<Entity> {
  pagination: Pagination;
}
