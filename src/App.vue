<script setup lang="ts">
import { useTranslation } from "i18next-vue";
import { computed, ref } from "vue";

import { TheAppBar, TheAppDebug, TheAppDrawer, TheAppSnackbar } from "#components/single";

const showMobileDrawer = ref(false);

const { i18next } = useTranslation();

const loading = computed(() => {
  return !i18next.isInitialized;
});
</script>

<template>
  <VApp>
    <TheAppBar @toggle-menu="showMobileDrawer = !showMobileDrawer" />
    <VMain>
      <template v-if="!loading">
        <TheAppDrawer :show-on-mobile="showMobileDrawer" />
        <RouterView />
        <TheAppDebug />
        <TheAppSnackbar />
      </template>
      <template v-else>
        <VProgressCircular class="ma-auto" indeterminate size="80" width="6" />
      </template>
    </VMain>
  </VApp>
</template>

<style scoped lang="scss">
.v-main {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
}
</style>
