<script lang="ts" setup>
import LayoutStack, { type LayoutStackProps } from "./LayoutStack.vue";

withDefaults(
  defineProps<{
    contentProps?: Partial<LayoutStackProps>;
    title?: string;
  }>(),
  {
    contentProps: () => ({}),
    title: undefined,
  },
);
</script>

<template>
  <VCard class="app-page" elevation="4">
    <slot name="title">
      <Typography class="py-4 px-6" variant="title-1">{{ title }}</Typography>
    </slot>
    <VDivider />
    <LayoutStack class="pa-4 page-content" v-bind="contentProps">
      <slot name="default" />
    </LayoutStack>
  </VCard>
</template>

<style lang="scss" scoped>
.app-page {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex-grow: 1;
  margin: spacing(6);
  // Allow child content to manage scrolling
  overflow: hidden;
}

.page-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
  // Allow positioning children relative to page content
  position: relative;
  // Scrolling should occur only within page content (not parent page!)
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(var(--v-theme-primary), 0.6);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(var(--v-theme-primary), 0.1);
    border: 1px solid rgb(var(--v-theme-divider));
  }
}
</style>
