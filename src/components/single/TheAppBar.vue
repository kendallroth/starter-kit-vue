<script setup lang="ts">
import { mdiAlertDecagram as mdiLogo, mdiMenu as mdiMenu, mdiWifi as mdiNetwork } from "@mdi/js";
import { useIsFetching } from "@tanstack/vue-query";
import { computed } from "vue";
import { useDisplay } from "vuetify";

import { themeIconMap, useAppTheme } from "#composables/use-app-theme";

const emit = defineEmits<{
  (e: "toggle-menu"): void;
}>();

const { appTheme, toggleTheme } = useAppTheme();
const themeIcon = computed(() => themeIconMap[appTheme.value]);

const { mobile } = useDisplay();

const fetching = useIsFetching();
</script>

<template>
  <VAppBar class="app-header px-4" color="primary">
    <VIcon :icon="mdiLogo" />
    <VAppBarTitle>StarterKit - Vue</VAppBarTitle>
    <VSpacer />
    <LayoutStack align-items="center" class="ml-4" direction="row">
      <Transition mode="out-in" name="fade">
        <VIcon v-if="fetching" color="primary-lighten-2" :icon="mdiNetwork" />
      </Transition>
      <VBtn density="comfortable" :icon="themeIcon" @click="toggleTheme" />
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
