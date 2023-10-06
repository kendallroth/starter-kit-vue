import { rest } from "msw";

import { todoMswEndpoints } from "./todo";
import { getMswPath, handleNotImplemented } from "../utilities";

import type { MSWEndpoint } from "../types";

export const mswEndpoints: MSWEndpoint[] = [
  // Dummy endpoint for verifying MSW is working
  rest.get(getMswPath("/not-implemented"), handleNotImplemented),
  ...todoMswEndpoints,
];
