import { reactive } from "vue";

import { DEFAULT_PAGE_SIZE, type PaginationInput } from "#api/types";

/** Pagination utilities */
export const usePagination = (args: { page?: number; size?: number } = {}) => {
  const pagination = reactive<PaginationInput>({
    page: args.page ?? 1,
    size: args.size ?? 10,
  });

  const setPage = (page: number) => {
    if (!page || page < 1) {
      pagination.page = 1;
      return;
    }

    pagination.page = page;
  };

  const setSize = (size: number) => {
    if (size <= 0) {
      pagination.size = DEFAULT_PAGE_SIZE;
      return;
    }

    pagination.size = size;
  };

  const nextPage = () => setPage(pagination.page + 1);
  const previousPage = () => setPage(pagination.page - 1);

  return {
    pagination,
    setPage,
    setSize,
    nextPage,
    previousPage,
  };
};
