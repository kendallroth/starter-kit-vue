import type { DefaultBodyType, MockedRequest, RestHandler } from "msw";

/**
 * Empty path params type for MSW mocks
 *
 * @example
 * rest.get<undefined, EmptyPathParams, ReturnType>("/path", (req, res, ctx) => { .. });
 */
export type EmptyPathParams = Record<string, never>;

export type MSWEndpoint = RestHandler<MockedRequest<DefaultBodyType>>;
