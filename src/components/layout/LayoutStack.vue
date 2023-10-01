<script lang="ts" setup>
import { computed } from "vue";

type FlexAlignment =
  | "center"
  | "flex-start"
  | "flex-end"
  | "stretch"
  | "space-between"
  | "space-around";

type LayoutStackProps = {
  alignItems?: FlexAlignment;
  direction?: "row" | "column";
  flexGrow?: boolean;
  flexWrap?: boolean;
  /** Custom component type (ie. 'form') */
  is?: string;
  justifyContent?: FlexAlignment;
  /** Spacing between items (4px increments) */
  spacing?: number;
};

const props = withDefaults(defineProps<LayoutStackProps>(), {
  alignItems: "flex-start",
  direction: "column",
  flexGrow: false,
  flexWrap: false,
  is: "div",
  justifyContent: "flex-start",
  spacing: 2,
});

const flexGrowValue = computed(() => (props.flexGrow ? 1 : 0));
const flexWrapValue = computed(() => (props.flexWrap ? "wrap" : "nowrap"));
</script>

<template>
  <component :is="is" class="layout-stack" :class="{ 'is-row': direction === 'row' }">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.layout-stack {
  display: flex;
  flex-grow: v-bind(flexGrowValue);
  flex-direction: v-bind(direction);
  flex-wrap: v-bind(flexWrapValue);
  align-items: v-bind(alignItems);
  justify-content: v-bind(justifyContent);
  gap: calc(v-bind(spacing) * 4px);
}
</style>
