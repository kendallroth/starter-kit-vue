<script lang="ts" setup>
import { computed } from "vue";

import type { TypographyVariant } from "#components/typography";

type TitleBarType = "page" | "section";

interface TitleBarProps {
  title?: string;
  type?: TitleBarType;
}

const props = withDefaults(defineProps<TitleBarProps>(), {
  title: "-",
  type: "page",
});

const titleVariantMap: Record<TitleBarType, TypographyVariant> = {
  page: "title-1",
  section: "title-2",
};

const titleVariant = computed(() => titleVariantMap[props.type]);
</script>

<template>
  <ActionBar>
    <template #left>
      <slot name="title">
        <Typography :variant="titleVariant">{{ title }}</Typography>
        <slot name="title-append" />
      </slot>
    </template>
    <template #right>
      <slot name="default" />
    </template>
  </ActionBar>
</template>
