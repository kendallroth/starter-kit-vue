<script setup lang="ts">
import { mdiRefresh } from "@mdi/js";

import { useViewsTranslations } from "#composables/use-localization";
import { usePagination } from "#composables/use-pagination";
import { useQuotesQuery } from "#slices/quotes/queries";

import { QuoteItem } from "./_components";

import type { Quote } from "#slices/quotes/types";

const tLocal = useViewsTranslations({
  keyPrefix: "quotesView",
});

const { pagination, ...paginationUtils } = usePagination({ size: 10 });

const {
  data: quotesResponse,
  error: quotesError,
  isFetching: quotesFetching,
  isLoading: quotesLoading,
  ...quotesQuery
} = useQuotesQuery({
  pagination,
});
</script>

<template>
  <AppPage>
    <template #title>
      <LayoutStack align-items="center" class="py-4 px-6" direction="row">
        <Typography variant="title-1">{{ tLocal("title") }}</Typography>
        <VSpacer />
        <VBadge
          v-if="quotesResponse"
          color="secondary"
          :content="quotesResponse.pagination.totalItems"
          inline
        />
        <VBtn
          :disabled="quotesFetching"
          :icon="mdiRefresh"
          size="small"
          variant="text"
          @click="quotesQuery.refetch"
        />
      </LayoutStack>
    </template>
    <ProgressLoader v-if="quotesLoading" />
    <VDataIterator
      v-else-if="quotesResponse"
      :items="quotesResponse.data ?? []"
      :items-per-page="-1"
      :page="pagination.page"
    >
      <template #default="{ items }">
        <LayoutStack>
          <QuoteItem
            v-for="item in items"
            :key="(item.raw as Quote).id"
            hide-description
            :quote="item.raw as Quote"
          />
        </LayoutStack>
      </template>
    </VDataIterator>

    <template v-if="quotesResponse" #post-content>
      <VPagination
        v-model="pagination.page"
        :disabled="quotesFetching"
        :length="quotesResponse.pagination.totalPages"
      />
    </template>
  </AppPage>
</template>

<style lang="scss" scoped></style>
