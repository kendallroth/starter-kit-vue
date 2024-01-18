<script setup lang="ts">
import type { Quote } from "#slices/quotes/types";

withDefaults(
  defineProps<{
    hideDescription?: boolean;
    prominent?: boolean;
    quote: Quote;
  }>(),
  {
    hideDescription: false,
    prominent: false,
  },
);
</script>

<template>
  <VAlert
    class="quote w-100"
    :color="prominent ? 'primary' : undefined"
    :density="prominent ? 'default' : 'compact'"
    :variant="prominent ? 'tonal' : 'flat'"
  >
    <div class="quote__text">{{ quote.text }}</div>
    <div v-if="quote.description && !hideDescription" class="quote__description">
      {{ quote.description }}
    </div>
    <LayoutStack align-items="center" class="mt-1" direction="row">
      <LayoutStack align-items="center" class="quote__account mr-2" direction="row">
        <VAvatar color="secondary" size="x-small">{{ quote.account.name.charAt(0) }}</VAvatar>
        <Typography variant="subtitle-2">{{ quote.account.name }}</Typography>
      </LayoutStack>
      <VSpacer />
      <div class="quote__author">~ {{ quote.author ?? "N/A" }}</div>
    </LayoutStack>
  </VAlert>
</template>

<style lang="scss" scoped>
.quote {
  :deep(.v-alert__content) {
    display: flex;
    flex-direction: column;
  }
}

.quote__account {
  opacity: 0.7;
}

.quote__author {
  opacity: 0.8;
}
</style>
