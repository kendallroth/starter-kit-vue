<script setup lang="ts">
import { mdiWeatherNight as mdiDark, mdiWeatherSunny as mdiLight } from "@mdi/js";
import { computed } from "vue";

import { useAppTheme } from "#composables/use-app-theme";

const appTheme = useAppTheme();

const themeIcon = computed(() => (appTheme.dark.value ? mdiDark : mdiLight));
</script>

<template>
  <VApp>
    <VAppBar color="primary">
      <VAppBarTitle>StarterKit - Vue</VAppBarTitle>
      <VSpacer />
      <LayoutStack class="mx-4">
        <VBtn density="comfortable" :icon="themeIcon" @click="appTheme.toggleTheme" />
      </LayoutStack>
    </VAppBar>
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<style scoped lang="scss">
.v-main {
  display: flex;
  width: 100%;
}
</style>
