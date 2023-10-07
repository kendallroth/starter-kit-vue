import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import { api } from "#api/fetcher";

import type { PaginatedResponse, Pagination } from "#api/types";
import type { Todo } from "./types";
import type { SetRequired } from "type-fest";

export const todoQueryKeys = {
  all: ["todos"],
  allPaginated: (pagination?: Pagination) => [todoQueryKeys.all, pagination],
} as const;

export const useTodosQuery = ({ pagination }: { pagination?: Pagination }) => {
  return useQuery({
    keepPreviousData: true,
    queryFn: () =>
      api.get<PaginatedResponse<Todo>>("/todos", { params: pagination }).then((r) => r.data),
    queryKey: todoQueryKeys.allPaginated(pagination),
  });
};

export const useTodoAddMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: Partial<Todo>) =>
      api.post<Todo>(`/todos`, todo).then((r) => {
        // DEBUG: Currently disabling to avoid implying that MSW route actually adds anything...
        throw new Error("Not updating in MSW");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });
};

export const useTodoUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: SetRequired<Partial<Todo>, "id">) =>
      api.patch<Todo>(`/todos/${todo.id}`, todo).then((r) => {
        // DEBUG: Currently disabling to avoid implying that MSW route actually updates anything...
        throw new Error("Not updating in MSW");
      }),
    // TODO: Optimistically update todo (must account for pagination)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });
};

export const useTodoDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete<Todo>(`/todos/${id}`).then((r) => {
        // DEBUG: Currently disabling to avoid implying that MSW route actually deletes anything...
        throw new Error("Not deleting in MSW");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });
};
