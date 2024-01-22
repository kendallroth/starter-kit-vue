import { faker } from "@faker-js/faker";
import {
  delay,
  http,
  // NOTE: For some reason without importing these types all MSW utilities complain...
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type HttpHandler,
  HttpResponse,
  type HttpResponseResolver,
} from "msw";

import { getPaginatedList } from "#api/fixtures/utilities";
import { type PaginatedResult } from "#api/types";

import { type EmptyPathParams } from "./types";

import type { TestFixture } from "#api/fixtures/types";

interface MswConfig {
  /** Optional delay for response */
  delay?: number;
}

/** Create MSW URL path (based on localhost) */
export const getMswPath = (path: string) => `http://localhost:3001${path}`;

/** MSW handler for routes that are not implemented (throws error) */
export const handleNotImplemented: HttpResponseResolver = async () => {
  await delay(250);
  return HttpResponse.json({ message: "Mock not implemented" }, { status: 500 });
};

/**
 *  Generic MSW handler for non-paginated `GET /entity` endpoints
 *
 * @param path    - MSW path
 * @param fixture - Entity fixture (unpaginated)
 * @param args    - Assorted arguments
 */
export const createMswGetAll = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return http.get<EmptyPathParams, undefined, T[]>(getMswPath(path), async () => {
    await delay(args?.delay ?? 0);
    return HttpResponse.json(fixture.entityList);
  });
};

/**
 *  Generic MSW handler for paginated `GET /entity` endpoints
 *
 * NOTE: Simulates pagination!
 *
 * @param path    - MSW path
 * @param fixture - Entity fixture (unpaginated)
 * @param args    - Assorted arguments
 */
export const createMswGetPagination = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return http.get<EmptyPathParams, undefined, PaginatedResult<T>>(
    getMswPath(path),
    async ({ request }) => {
      const url = new URL(request.url);
      const page = url.searchParams.get("page");
      const size = url.searchParams.get("size");
      const { data: paginatedList, pagination } = getPaginatedList(fixture.entityList, {
        page: page ? parseInt(page, 10) : undefined,
        size: size ? parseInt(size, 10) : undefined,
      });

      await delay(args?.delay ?? 0);
      return HttpResponse.json({
        data: paginatedList,
        pagination,
      });
    },
  );
};

/** Generic MSW handler for `POST /entity` endpoints */
export const createMswPost = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return http.post(getMswPath(path), async ({ request }) => {
    const body = (await request.json()) as T;

    await delay(args?.delay ?? 0);
    return HttpResponse.json({ ...body, id: faker.string.uuid() });
  });
};

/** Generic MSW handler for `GET /entity/{id}` endpoints */
export const createMswGetForId = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return http.get<{ id: string }, undefined, T | null>(getMswPath(path), async ({ params }) => {
    const { id } = params;

    const entity = fixture.entityMap[id];
    await delay(args?.delay ?? 0);
    return entity ? HttpResponse.json(entity) : HttpResponse.json(null, { status: 404 });
  });
};

/** Generic MSW handler for `PATCH /entity/{id}` endpoints */
export const createMswPatchForId = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return http.patch<{ id: string }, undefined, T | null>(
    getMswPath(path),
    async ({ request, params }) => {
      const { id } = params;
      const patch = (await request.json()) as unknown as T;

      const entity = fixture.entityMap[id];
      await delay(args?.delay ?? 0);

      return entity
        ? HttpResponse.json({
            // Simulates patching close enough for MSW purposes...
            ...entity,
            ...patch,
          })
        : HttpResponse.json(null, { status: 404 });
    },
  );
};

/** Generic MSW handler for `DELETE /entity/{id}` endpoints */
export const createMswDeleteForId = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return http.delete<{ id: string }, undefined, T | null>(getMswPath(path), async ({ params }) => {
    const { id } = params;

    const entity = fixture.entityMap[id];
    await delay(args?.delay ?? 0);
    return entity ? HttpResponse.json(entity) : HttpResponse.json(null, { status: 404 });
  });
};
