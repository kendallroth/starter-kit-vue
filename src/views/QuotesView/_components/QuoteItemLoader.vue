<script lang="ts" setup>
import { getError } from "#utilities/errors";

import QuoteItem from "./QuoteItem.vue";

import type { Quote } from "#slices/quotes/types";
import type { QuoteItemProps } from "./QuoteItem.vue";

withDefaults(
  defineProps<
    Omit<QuoteItemProps, "quote"> & {
      error?: any;
      loading?: boolean;
      quote: Quote | undefined;
    }
  >(),
  {
    error: undefined,
    loading: false,
    prominent: false,
  },
);
</script>

<template>
  <VSkeletonLoader v-if="loading" class="w-100" type="text@2" />
  <VAlert v-else-if="error" class="w-100" type="error">{{ getError(error) }}</VAlert>
  <QuoteItem v-else-if="quote" hide-description :prominent="prominent" :quote="quote" />
</template>
