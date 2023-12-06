<script setup lang="ts">
import {
  mdiViewDashboard as mdiDashboard,
  mdiFormTextbox as mdiForm,
  mdiViewList as mdiList,
  mdiCog as mdiSettings,
} from "@mdi/js";
import { computed } from "vue";
import { useDisplay } from "vuetify";

import { useCommonTranslations } from "#composables/use-localization";

defineProps<{
  /** Whether to show drawer on mobile */
  showOnMobile: boolean;
}>();

const { mobile } = useDisplay();

const tCommon = useCommonTranslations();

interface NavigationItem {
  icon?: string;
  label: string;
  to: string;
}

// TODO: Figure out why this causes max recursion warnings during HMR!
const navigationItems = computed<NavigationItem[]>(() => [
  { icon: mdiDashboard, label: tCommon("appDrawer.links.welcome"), to: "/" },
  { icon: mdiForm, label: tCommon("appDrawer.links.forms"), to: "/form" },
  { icon: mdiList, label: tCommon("appDrawer.links.todos"), to: "/todos" },
  { icon: mdiSettings, label: tCommon("appDrawer.links.settings"), to: "/settings" },
]);
</script>

<template>
  <VNavigationDrawer :model-value="mobile ? showOnMobile : true" :permanent="!mobile">
    <VList density="compact" nav>
      <VListItem
        v-for="item in navigationItems"
        :key="item.to"
        color="secondary"
        nav
        :prepend-icon="item.icon"
        :title="item.label"
        :to="item.to"
      />
    </VList>
  </VNavigationDrawer>
</template>
