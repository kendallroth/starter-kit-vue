<script lang="ts" setup>
import { computed } from "vue";

export type TypographyVariant =
  | "title-1"
  | "title-2"
  | "subtitle-1"
  | "subtitle-2"
  | "body-1"
  | "body-2";

interface TypographyProps {
  variant?: TypographyVariant;
}

const variantTextClassMap: Record<TypographyVariant, string> = {
  "body-1": "text-body-1",
  "body-2": "text-body2",
  "subtitle-1": "text-subtitle-1",
  "subtitle-2": "text-subtitle-2",
  "title-1": "text-h2",
  "title-2": "text-h3",
};

const props = withDefaults(defineProps<TypographyProps>(), {
  variant: "body-1",
});

const variantClass = computed(() => variantTextClassMap[props.variant]);
</script>

<template>
  <div :class="variantClass"><slot name="default" /></div>
</template>

<style lang="scss" scoped></style>
