<script setup lang="ts">
import { mdiRefresh } from "@mdi/js";

import { useViewsTranslations } from "#composables/use-localization";
import { useQuoteOfDayQuery, useRandomQuoteQuery } from "#slices/quotes/queries";

import { QuoteItemLoader } from "./QuotesView/_components";

const tLocal = useViewsTranslations({
  keyPrefix: "welcomeView",
});
const tDebug = useViewsTranslations({
  keyPrefix: "debugView",
});

const {
  data: quoteOfDayResponse,
  error: quoteOfDayError,
  isLoading: quoteOfDayLoading,
} = useQuoteOfDayQuery();

const {
  data: randomQuoteResponse,
  error: randomQuoteError,
  isFetching: randomQuoteFetching,
  ...randomQuoteQuery
} = useRandomQuoteQuery();
</script>

<template>
  <AppPage :title="tLocal('title')">
    <TitleBar :title="tLocal('subtitle')" type="section" />
    <LayoutStack direction="row">
      <VKbd>Ctrl+Shift+Alt+D</VKbd>
      <div>{{ tDebug("sections.shortcuts.items.toggleDebug") }}</div>
    </LayoutStack>
    <div class="w-100 my-4">
      <TitleBar class="mb-2" :title="tLocal('sections.quoteOfTheDay.title')" type="section" />
      <QuoteItemLoader
        :error="quoteOfDayError"
        :loading="quoteOfDayLoading"
        prominent
        :quote="quoteOfDayResponse"
      />
      <TitleBar class="mb-2 mt-4" :title="tLocal('sections.randomQuote.title')" type="section">
        <VBtn
          :disabled="randomQuoteFetching"
          :icon="mdiRefresh"
          size="small"
          variant="text"
          @click="randomQuoteQuery.refetch"
        />
      </TitleBar>
      <QuoteItemLoader
        :error="randomQuoteError"
        :loading="randomQuoteFetching"
        :quote="randomQuoteResponse"
      />
    </div>
  </AppPage>
</template>

<style lang="scss" scoped></style>
