<script lang="ts" setup>
import {
  mdiCircleOutline as mdiCheckEmpty,
  mdiCheckCircle as mdiCheckFilled,
  mdiCalendar as mdiDate,
  mdiDelete as mdiDelete,
} from "@mdi/js";
import { computed } from "vue";

import { formatDate } from "#utilities/date";

import type { Todo } from "#slices/todos/types";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    todo: Todo;
  }>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  (e: "delete", todo: Todo): void;
  (e: "toggle", todo: Todo, toggled: boolean): void;
}>();

const completed = computed(() => !!props.todo.completedAt);

const dueDate = computed(() => (props.todo.dueDate ? formatDate(props.todo.dueDate) : null));
</script>

<template>
  <VListItem :disabled="disabled" :value="todo">
    <template #prepend>
      <VCheckbox
        class="flex-grow-0 ml-n2"
        :false-icon="mdiCheckEmpty"
        hide-details
        :model-value="completed"
        :true-icon="mdiCheckFilled"
        @click.stop
        @update:model-value="emit('toggle', todo, !completed)"
      />
    </template>
    <template #append="{ isSelected }">
      <VBtn
        v-if="isSelected"
        color="error"
        density="compact"
        :icon="mdiDelete"
        variant="text"
        @click.stop="emit('delete', todo)"
      />
    </template>
    <template #title>
      <VListItemTitle>{{ todo.title }}</VListItemTitle>
    </template>
    <template v-if="dueDate" #subtitle>
      <VChip
        class="mt-1"
        color="secondary"
        :prepend-icon="mdiDate"
        rounded
        size="small"
        :text="dueDate"
        variant="outlined"
      />
    </template>
  </VListItem>
</template>

<style lang="scss" scoped></style>
