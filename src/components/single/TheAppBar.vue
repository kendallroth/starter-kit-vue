<script setup lang="ts">
import {
  mdiWeatherNight as mdiDark,
  mdiWeatherSunny as mdiLight,
  mdiAlertDecagram as mdiLogo,
  mdiMenu as mdiMenu,
} from "@mdi/js";
import { computed } from "vue";
import { useDisplay } from "vuetify";

import { useAppTheme } from "#composables/use-app-theme";

const emit = defineEmits<{
  (e: "toggle-menu"): void;
}>();

const appTheme = useAppTheme();
const themeIcon = computed(() => (appTheme.dark.value ? mdiDark : mdiLight));

const { mobile } = useDisplay();
</script>

<template>
  <VAppBar class="app-header px-4" color="primary">
    <VIcon :icon="mdiLogo" />
    <VAppBarTitle>StarterKit - Vue</VAppBarTitle>
    <VSpacer />
    <LayoutStack class="ml-4" direction="row">
      <VBtn density="comfortable" :icon="themeIcon" @click="appTheme.toggleTheme" />
      <VBtn v-if="mobile" density="comfortable" :icon="mdiMenu" @click="emit('toggle-menu')" />
    </LayoutStack>
  </VAppBar>
</template>

<style scoped lang="scss">
.app-header {
  .v-toolbar-title {
    flex-basis: auto;
  }
}
</style>
