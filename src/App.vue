<script setup lang="ts">
import { ref } from "vue";

import { TheAppBar, TheAppDebug, TheAppDrawer } from "#components/single";

const showMobileDrawer = ref(false);
</script>

<template>
  <VApp>
    <TheAppBar @toggle-menu="showMobileDrawer = !showMobileDrawer" />
    <VMain>
      <TheAppDrawer :show-on-mobile="showMobileDrawer" />
      <RouterView />
      <TheAppDebug />
    </VMain>
  </VApp>
</template>

<style scoped lang="scss">
.v-main {
  display: flex;
  width: 100%;
}
</style>
