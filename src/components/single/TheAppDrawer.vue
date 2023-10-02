<script setup lang="ts">
import { mdiViewDashboard as mdiDashboard, mdiBug as mdiDebug } from "@mdi/js";
import { useDisplay } from "vuetify";

defineProps<{
  /** Whether to show drawer on mobile */
  showOnMobile: boolean;
}>();

const { mobile } = useDisplay();

interface NavigationItem {
  icon?: string;
  label: string;
  to: string;
}

const navigationItems: NavigationItem[] = [
  { icon: mdiDashboard, label: "Welcome", to: "/" },
  { icon: mdiDebug, label: "Debug", to: "/debug" },
];
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
