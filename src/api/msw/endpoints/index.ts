import { http, type HttpHandler } from "msw";

import { todoMswEndpoints } from "./todo";
import { getMswPath, handleNotImplemented } from "../utilities";

export const mswEndpoints: HttpHandler[] = [
  // Dummy endpoint for verifying MSW is working
  http.get(getMswPath("/not-implemented"), handleNotImplemented),
  ...todoMswEndpoints,
];
