<script setup lang="ts">
import { useViewsTranslations } from "#composables/use-localization";

const tLocal = useViewsTranslations({
  keyPrefix: "welcomeView",
});
const tDebug = useViewsTranslations({
  keyPrefix: "debugView",
});
</script>

<template>
  <AppPage :title="tLocal('title')">
    <Typography variant="title-2">{{ tLocal("subtitle") }}</Typography>
    <LayoutStack direction="row">
      <VKbd>Ctrl+Shift+Alt+D</VKbd>
      <div>{{ tDebug("sections.shortcuts.items.toggleDebug") }}</div>
    </LayoutStack>
  </AppPage>
</template>

<style lang="scss" scoped></style>
