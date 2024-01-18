<script setup lang="ts">
import { useViewsTranslations } from "#composables/use-localization";
import { useQuoteOfDayQuery } from "#slices/quotes/queries";

import { QuoteItem } from "./QuotesView/_components";

const tLocal = useViewsTranslations({
  keyPrefix: "welcomeView",
});
const tDebug = useViewsTranslations({
  keyPrefix: "debugView",
});

const {
  data: quoteOfDayResponse,
  error: quoteOfDayError,
  isFetching: quoteOfDayFetching,
} = useQuoteOfDayQuery();
</script>

<template>
  <AppPage :title="tLocal('title')">
    <Typography variant="title-2">{{ tLocal("subtitle") }}</Typography>
    <LayoutStack direction="row">
      <VKbd>Ctrl+Shift+Alt+D</VKbd>
      <div>{{ tDebug("sections.shortcuts.items.toggleDebug") }}</div>
    </LayoutStack>
    <div class="w-100 my-4">
      <Typography class="mb-2" variant="title-2">{{ tLocal("sections.quotes.title") }}</Typography>
      <VSkeletonLoader v-if="quoteOfDayFetching" class="w-100" type="text@2" />
      <VAlert v-else-if="quoteOfDayError" class="w-100" type="error">
        Failed to load quote of the day
      </VAlert>
      <QuoteItem
        v-else-if="quoteOfDayResponse"
        hide-description
        prominent
        :quote="quoteOfDayResponse"
      />
    </div>
  </AppPage>
</template>

<style lang="scss" scoped></style>
