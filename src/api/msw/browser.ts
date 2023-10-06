import assert from "assert";

import { rest, setupWorker, type SetupWorker } from "msw";

import { mswEndpoints } from "./endpoints";
import { getMswPath } from "./utilities";

// Map handlers to enable extracting only the ones to be used at runtime
// const headerToHandlerMap = keyBy(mswEndpoints, (endpoint) => endpoint.info.header);
const headerToHandlerMap = mswEndpoints.reduce(
  (accum, endpoint) => {
    return { ...accum, [endpoint.info.header]: endpoint };
  },
  {} as Record<string, (typeof mswEndpoints)[0]>,
);

function getHandlerRoute(method: string, path: string) {
  const routeKey = `${method} ${path}`;
  const route = headerToHandlerMap[routeKey];

  assert(route, `MSW handler for '${routeKey}' does not exist`);
  return route;
}

// Configure MSW runtime service worker with required request handlers
export const worker: SetupWorker = setupWorker(
  // Mock only the endpoints we want at runtime...
  getHandlerRoute("GET", getMswPath("/not-implemented")),
  getHandlerRoute("GET", getMswPath("/todos")),
  getHandlerRoute("GET", getMswPath("/todos/:id")),
  getHandlerRoute("DELETE", getMswPath("/todos/:id")),
  getHandlerRoute("PATCH", getMswPath("/todos/:id")),
  getHandlerRoute("POST", getMswPath("/todos")),
  // ...and pass-through for everything else.
  rest.all<null>("*", (req) => req.passthrough()),
);
