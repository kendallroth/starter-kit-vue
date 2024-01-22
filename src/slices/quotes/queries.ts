import {
  keepPreviousData,
  useQuery,
  // NOTE: For some reason without importing these types all MSW utilities complain...
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type UseQueryReturnType,
} from "@tanstack/vue-query";

import { api } from "#api/fetcher";

import type { PaginatedResult, PaginationInput } from "#api/types";
import type { Quote } from "./types";

export const quoteQueryKeys = {
  all: () => ["quotes"],
  allPaginated: (args: PaginationInput & { search?: string; sort?: string }) => [
    ...quoteQueryKeys.all(),
    args,
  ],
  qod: () => [...quoteQueryKeys.all(), "quoteOfDay"],
  random: () => [...quoteQueryKeys.all(), "quoteRandom"],
} as const;

export const useQuotesQuery = (args: PaginationInput & { search?: string; sort?: string }) => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => api.get<PaginatedResult<Quote>>("/quote", { params: args }).then((r) => r.data),
    queryKey: quoteQueryKeys.allPaginated(args),
  });
};

export const useQuoteOfDayQuery = () => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => api.get<Quote>("/quote/qod").then((r) => r.data),
    queryKey: quoteQueryKeys.qod(),
  });
};

export const useRandomQuoteQuery = () => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => api.get<Quote>("/quote/random").then((r) => r.data),
    queryKey: quoteQueryKeys.random(),
  });
};
