<script setup lang="ts">
import { useDisplay } from "vuetify";

import type { Quote } from "#slices/quotes/types";

export interface QuoteItemProps {
  /** Whether quote is visually prominent */
  prominent?: boolean;
  quote: Quote;
  /** Whether quote description is shown */
  showDescription?: boolean;
}

withDefaults(defineProps<QuoteItemProps>(), {
  showDescription: false,
  prominent: false,
});

const { mobile } = useDisplay();
</script>

<template>
  <VAlert
    class="quote w-100"
    :color="prominent ? 'primary' : undefined"
    :density="prominent ? 'default' : 'compact'"
    :variant="prominent ? 'tonal' : 'flat'"
  >
    <div class="quote__text">{{ quote.text }}</div>
    <div v-if="quote.description && showDescription" class="quote__description">
      {{ quote.description }}
    </div>
    <LayoutStack
      :align-items="mobile ? undefined : 'center'"
      :direction="mobile ? 'column' : 'row'"
      :spacing="mobile ? 0 : 2"
    >
      <VChipGroup class="pa-0" density="compact">
        <VChip v-for="tag in quote.tags" :key="tag" size="x-small" :text="tag" />
      </VChipGroup>
      <Typography class="quote__author ml-auto">~ {{ quote.author ?? "N/A" }}</Typography>
    </LayoutStack>
    <LayoutStack
      :align-items="mobile ? undefined : 'center'"
      :class="{ [prominent ? 'mt-2' : 'mt-1']: true }"
      :direction="mobile ? 'column' : 'row'"
      :spacing="mobile ? 0 : 2"
    >
      <LayoutStack align-items="center" class="quote__account mr-2" direction="row">
        <VAvatar color="secondary" size="x-small">{{ quote.account.name.charAt(0) }}</VAvatar>
        <Typography variant="subtitle-2">{{ quote.account.name }}</Typography>
        <Typography v-if="!mobile" class="ml-n1" variant="subtitle-2">
          @ {{ $dayjs(quote.createdAt).format("YYYY-MMM-DD HH:mm") }}
        </Typography>
      </LayoutStack>
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
