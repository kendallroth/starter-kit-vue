import { todoFixtureAll } from "#api/fixtures/entities";

import {
  createMswDeleteForId,
  createMswGetForId,
  createMswGetPagination,
  createMswPatchForId,
  createMswPost,
} from "../utilities";

import type { HttpHandler } from "msw";

export const todoMswEndpoints: HttpHandler[] = [
  createMswGetPagination("/todos", todoFixtureAll, { delay: 250 }),
  createMswGetForId("/todos/:id", todoFixtureAll, { delay: 250 }),
  createMswDeleteForId("/todos/:id", todoFixtureAll, { delay: 250 }),
  createMswPost("/todos", todoFixtureAll, { delay: 250 }),
  createMswPatchForId("/todos/:id", todoFixtureAll, { delay: 250 }),
];
