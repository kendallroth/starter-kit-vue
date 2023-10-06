<script setup lang="ts">
import { useTranslation } from "i18next-vue";
import { computed, onMounted, ref } from "vue";

import { TheAppBar, TheAppDebug, TheAppDrawer, TheAppSnackbar } from "#components/single";
import { appConfig } from "#config/app";

const showMobileDrawer = ref(false);

const { i18next } = useTranslation();

const loadingStatus = ref<"loading" | "error" | "ready">("loading");

onMounted(async () => {
  // Dev-specific workaround to race condition caused by conditional/async import of MSW.
  //   See 'main.ts' for more details/explanation.
  // NOTE: MSW must be ready before sending any further API requests (or they will fail)!
  if (appConfig.development && window.mswReady) {
    await window.mswReady;
  }

  // TODO: Load additional data

  loadingStatus.value = "ready";
});

const loading = computed(() => {
  return !i18next.isInitialized || loadingStatus.value === "loading";
});
</script>

<template>
  <VApp>
    <TheAppBar @toggle-menu="showMobileDrawer = !showMobileDrawer" />
    <VMain>
      <template v-if="!loading">
        <TheAppDrawer :show-on-mobile="showMobileDrawer" />
        <RouterView v-slot="{ Component, route }">
          <Transition mode="out-in" name="slide">
            <component :is="Component" :key="route.name" />
          </Transition>
        </RouterView>
        <TheAppDebug />
        <TheAppSnackbar />
      </template>
      <template v-else>
        <VProgressCircular class="ma-auto" indeterminate size="80" width="6" />
      </template>
    </VMain>
  </VApp>
</template>

<style lang="scss" scoped>
.v-main {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
}

.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

// Pages slide in from left when entering
.slide-enter-from {
  opacity: 0;
  transform: translateX(-20%);
}

// Pages slide out to left when exiting
.slide-leave-to {
  opacity: 0;
  transform: translateX(20%);
}
</style>
