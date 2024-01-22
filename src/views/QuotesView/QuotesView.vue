<script setup lang="ts">
import {
  mdiRefresh,
  mdiMagnify as mdiSearch,
  mdiSwapVertical as mdiSort,
  mdiArrowUp as mdiSortAsc,
  mdiArrowDown as mdiSortDesc,
} from "@mdi/js";
import { refDebounced } from "@vueuse/core";
import { reactive, ref, toRef, toRefs } from "vue";

import { useViewsTranslations } from "#composables/use-localization";
import { usePagination } from "#composables/use-pagination";
import { useSort } from "#composables/use-sort";
import { useQuotesQuery } from "#slices/quotes/queries";
import { getError } from "#utilities/errors";

import { QuoteItem } from "./_components";

import type { Quote } from "#slices/quotes/types";

const tLocal = useViewsTranslations({
  keyPrefix: "quotesView",
});

const { pagination, ...paginationFuncs } = usePagination({ size: 10 });

const sortFields = [
  { key: "createdAt", labelKey: "createdAt" },
  { key: "author", labelKey: "author" },
];

const { sort, ...sortFuncs } = useSort({
  dir: "desc",
  key: sortFields[0].key,
});

const quoteSearch = ref("");
const quoteSearchDebounced = refDebounced(quoteSearch, 500, { maxWait: 1000 });

// NOTE: This approach to query args drastically simplifies usage in the 'vue-query' composable, at
//         the cost of requiring more boilerplate when using the composable. It also cannot be
//         destructured without losing reactivity (not implicitly obvious)!
const quoteQueryArgs = reactive({
  ...toRefs(pagination),
  sort: toRef(sortFuncs.apiString),
  search: toRef(quoteSearchDebounced),
});

const {
  data: quotesResponse,
  error: quotesError,
  isFetching: quotesFetching,
  isLoading: quotesLoading,
  ...quotesQuery
} = useQuotesQuery(quoteQueryArgs);

const handleSort = (sortKey: string) => {
  sortFuncs.setKey(sortKey);
  paginationFuncs.setPage(1);
};
</script>

<template>
  <AppPage :title="tLocal('title')">
    <template #title-append>
      <VBadge
        v-if="quotesResponse"
        color="secondary"
        :content="quotesResponse.pagination.totalItems"
        inline
      />
    </template>
    <template #title-content>
      <VBtn
        :disabled="quotesFetching"
        :icon="mdiRefresh"
        size="small"
        variant="text"
        @click="quotesQuery.refetch"
      />
      <VMenu location="bottom end">
        <template #activator="{ props }">
          <VBtn
            v-bind="props"
            :disabled="quotesFetching"
            :icon="mdiSort"
            size="small"
            variant="text"
          />
        </template>
        <VList class="quote-list__sort" density="compact" :disabled="quotesFetching" width="180">
          <VListItem
            v-for="item in sortFields"
            :key="item.key"
            :value="item.key"
            @click.stop="handleSort(item.key)"
          >
            <template #prepend>
              <VIcon v-if="item.key !== sort.key" />
              <VIcon v-else color="primary" :icon="sort.dir === 'asc' ? mdiSortAsc : mdiSortDesc" />
            </template>
            {{ tLocal(`list.actions.sort.fields.${item.labelKey}`) }}
          </VListItem>
        </VList>
      </VMenu>
      <VTextField
        v-model="quoteSearch"
        clearable
        density="compact"
        :disabled="quotesFetching"
        hide-details
        :prepend-inner-icon="mdiSearch"
        style="width: 200px"
        variant="outlined"
      />
    </template>

    <ProgressLoader v-if="quotesLoading" />
    <VAlert v-else-if="quotesError" class="w-100" type="error">{{ getError(quotesError) }}</VAlert>
    <VDataIterator
      v-else-if="quotesResponse"
      class="w-100"
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

    <template v-if="quotesResponse" #content-append>
      <VPagination
        v-model="pagination.page"
        :disabled="quotesFetching"
        :length="quotesResponse.pagination.totalPages"
      />
    </template>
  </AppPage>
</template>

<style lang="scss" scoped>
.quote-list__sort {
  :deep(.v-list-item__spacer) {
    width: spacing(2);
  }
}
</style>
