<script lang="ts" setup>
import LayoutStack, { type LayoutStackProps } from "./LayoutStack.vue";

withDefaults(
  defineProps<{
    contentProps?: Partial<LayoutStackProps & { class: string }>;
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
      <TitleBar class="py-4 px-6" :title="title">
        <template v-if="$slots['title-append']" #title-append>
          <slot name="title-append" />
        </template>
        <slot name="title-content" />
      </TitleBar>
    </slot>
    <VDivider />

    <slot name="content-prepend" />
    <LayoutStack class="pa-4 page-content pretty-scroll" v-bind="contentProps">
      <slot name="default" />
    </LayoutStack>
    <slot name="content-append" />
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
}
</style>
