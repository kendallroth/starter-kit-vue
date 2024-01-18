import { useQuery } from "@tanstack/vue-query";

import { api } from "#api/fetcher";

import type { PaginatedResult, PaginationInput } from "#api/types";
import type { Quote } from "./types";

export const quoteQueryKeys = {
  all: () => ["quotes"],
  allPaginated: (pagination?: PaginationInput) => [quoteQueryKeys.all(), pagination],
  qod: () => [quoteQueryKeys.all(), "quoteOfDay"],
} as const;

export const useQuotesQuery = ({ pagination }: { pagination?: PaginationInput }) => {
  return useQuery({
    keepPreviousData: true,
    queryFn: () =>
      api.get<PaginatedResult<Quote>>("/quote", { params: pagination }).then((r) => r.data),
    queryKey: quoteQueryKeys.allPaginated(pagination),
  });
};

export const useQuoteOfDayQuery = () => {
  return useQuery({
    keepPreviousData: true,
    queryFn: () => api.get<Quote>("/quote/qod").then((r) => r.data),
    queryKey: quoteQueryKeys.qod(),
  });
};
