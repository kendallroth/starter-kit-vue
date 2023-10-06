import { todoFixtureAll } from "#api/fixtures/entities";

import {
  createMswDeleteForId,
  createMswGetForId,
  createMswGetPagination,
  createMswPatchForId,
  createMswPost,
} from "../utilities";

import type { MSWEndpoint } from "../types";

export const todoMswEndpoints: MSWEndpoint[] = [
  createMswGetPagination("/todos", todoFixtureAll, { delay: 250 }),
  createMswGetForId("/todos/:id", todoFixtureAll, { delay: 250 }),
  createMswDeleteForId("/todos/:id", todoFixtureAll, { delay: 250 }),
  createMswPost("/todos", todoFixtureAll, { delay: 250 }),
  createMswPatchForId("/todos/:id", todoFixtureAll, { delay: 250 }),
];
