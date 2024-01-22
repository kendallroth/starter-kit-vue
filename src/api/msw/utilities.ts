import { faker } from "@faker-js/faker";
import {
  // NOTE: For some reason without importing these types all MSW utilities complain...
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type DefaultBodyType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type MockedRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type MockedResponse,
  type ResponseComposition,
  rest,
  type RestContext,
  type RestRequest,
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
export const handleNotImplemented = (
  _req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) => res(ctx.delay(), ctx.status(500), ctx.text("Mock not implemented"));

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
  return rest.get<undefined, EmptyPathParams, T[]>(getMswPath(path), (_req, res, ctx) => {
    return res(ctx.delay(args?.delay ?? 0), ctx.json(fixture.entityList));
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
  return rest.get<undefined, EmptyPathParams, PaginatedResult<T>>(
    getMswPath(path),
    (req, res, ctx) => {
      const page = req.url.searchParams.get("page");
      const size = req.url.searchParams.get("size");
      const { data: paginatedList, pagination } = getPaginatedList(fixture.entityList, {
        page: page ? parseInt(page, 10) : undefined,
        size: size ? parseInt(size, 10) : undefined,
      });

      return res(
        ctx.delay(args?.delay ?? 0),
        ctx.json({
          data: paginatedList,
          pagination,
        }),
      );
    },
  );
};

/** Generic MSW handler for `POST /entity` endpoints */
export const createMswPost = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return rest.post<undefined>(getMswPath(path), async (req, res, ctx) => {
    const body = await req.json();

    const delay = ctx.delay(args?.delay ?? 0);
    return res(delay, ctx.json({ ...body, id: faker.string.uuid() }));
  });
};

/** Generic MSW handler for `GET /entity/{id}` endpoints */
export const createMswGetForId = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return rest.get<undefined, { id: string }, T>(getMswPath(path), (req, res, ctx) => {
    const { id } = req.params;

    const entity = fixture.entityMap[id];
    const delay = ctx.delay(args?.delay ?? 0);
    return entity ? res(delay, ctx.json(entity)) : res(delay, ctx.status(404));
  });
};

/** Generic MSW handler for `PATCH /entity/{id}` endpoints */
export const createMswPatchForId = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return rest.patch<undefined, { id: string }, T>(getMswPath(path), async (req, res, ctx) => {
    const { id } = req.params;
    const patch = await req.json();

    const entity = fixture.entityMap[id];
    const delay = ctx.delay(args?.delay ?? 0);
    return entity
      ? res(
          delay,
          ctx.json({
            // Simulates patching close enough for MSW purposes...
            ...entity,
            ...patch,
          }),
        )
      : res(delay, ctx.status(404));
  });
};

/** Generic MSW handler for `DELETE /entity/{id}` endpoints */
export const createMswDeleteForId = <T extends object>(
  path: string,
  fixture: TestFixture<T>,
  args?: MswConfig,
) => {
  return rest.delete<undefined, { id: string }, T>(getMswPath(path), (req, res, ctx) => {
    const { id } = req.params;

    const entity = fixture.entityMap[id];
    const delay = ctx.delay(args?.delay ?? 0);
    return entity ? res(delay, ctx.json(entity)) : res(delay, ctx.status(404));
  });
};
