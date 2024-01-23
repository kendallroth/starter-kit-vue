<script lang="ts" setup>
import { mdiPlusCircle as mdiAdd, mdiRefresh } from "@mdi/js";
import dayjs from "dayjs";
import { ref } from "vue";

import { useSnackbar } from "#composables/use-app-snackbar";
import { useViewsTranslations } from "#composables/use-localization";
import { usePagination } from "#composables/use-pagination";
import {
  useTodoAddMutation,
  useTodoDeleteMutation,
  useTodosQuery,
  useTodoUpdateMutation,
} from "#slices/todos/queries";
import { getError } from "#utilities/errors";

import { TodoItem } from "./_components";

import type { Todo } from "#slices/todos/types";

const tLocal = useViewsTranslations({
  keyPrefix: "todosView",
});

const { notifyError, notifySuccess } = useSnackbar();

const { pagination, ...paginationUtils } = usePagination();

const {
  data: response,
  error,
  isFetching,
  isLoading,
  ...todosQuery
} = useTodosQuery({
  pagination,
});

const todoInput = ref("");

const { isPending: addingTodo, ...todoAddMutation } = useTodoAddMutation();

const handleTodoAdd = async () => {
  // Ensure value is trimmed (and saved again as such)
  const value = todoInput.value.trim();
  todoInput.value = value;
  if (!value) return;

  try {
    await todoAddMutation.mutateAsync({ title: value });
  } catch (e) {
    notifyError(getError(e));
    return;
  }

  notifySuccess("Todo added");
};

const { ...todoUpdateMutation } = useTodoUpdateMutation();

const handleTodoUpdate = async (todo: Todo) => {
  try {
    await todoUpdateMutation.mutateAsync({
      id: todo.id,
      completedAt: todo.completedAt ? null : dayjs().toISOString(),
    });
  } catch (e) {
    notifyError(getError(e));
    return;
  }

  notifySuccess("Todo updated");
};

const selectedTodo = ref<Todo | null>(null);

const handleTodoSelection = (todos: unknown[]) => {
  if (!todos.length) {
    selectedTodo.value = null;
    return;
  }

  selectedTodo.value = todos[0] as Todo;
};

const { isPending: deletingTodo, ...todoDeleteMutation } = useTodoDeleteMutation();

const handleTodoDelete = async (todo: Todo) => {
  try {
    await todoDeleteMutation.mutateAsync(todo.id);
  } catch (e) {
    notifyError(getError(e));
    return;
  }

  selectedTodo.value = null;
  notifySuccess("Todo removed");
};
</script>

<template>
  <AppPage :title="tLocal('title')">
    <VCard class="todos-card" variant="outlined">
      <VTextField
        v-model="todoInput"
        class="ma-4 flex-grow-0"
        clearable
        density="compact"
        :disabled="isFetching || addingTodo"
        hide-details
        :label="tLocal('form.fields.todo.label')"
        single-line
        variant="outlined"
      >
        <template #prepend-inner>
          <VBtn
            color="primary"
            density="compact"
            :icon="mdiAdd"
            variant="text"
            @click="handleTodoAdd"
          />
        </template>
        <template #append>
          <VBtn density="compact" :icon="mdiRefresh" variant="text" @click="todosQuery.refetch" />
        </template>
      </VTextField>

      <ProgressLoader v-if="isLoading" expand />
      <VAlert v-if="error" class="ma-4 mt-0" text="Something went wrong" type="error" />
      <template v-else-if="response">
        <VList
          class="pretty-scroll bg-transparent py-0"
          density="compact"
          @update:selected="handleTodoSelection"
        >
          <TodoItem
            v-for="todo in response.data ?? []"
            :key="todo.id"
            :disabled="isFetching || (deletingTodo && selectedTodo?.id === todo.id)"
            :todo="todo"
            @delete="handleTodoDelete(todo)"
            @toggle="handleTodoUpdate(todo)"
          />
        </VList>
        <VPagination
          class="mt-2"
          :disabled="isFetching"
          :length="response.pagination.totalPages"
          :model-value="pagination.page"
          @update:model-value="paginationUtils.setPage"
        />
      </template>
    </VCard>
  </AppPage>
</template>

<style lang="scss" scoped>
.todos-card {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  width: 400px;
}
</style>
