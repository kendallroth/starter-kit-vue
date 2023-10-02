<script setup lang="ts">
import { computed } from "vue";

import { LayoutStack } from "#components/layout";
import { useViewsTranslations } from "#composables/use-localization";

const tLocal = useViewsTranslations({
  keyPrefix: "debugView",
});

const keyCombinations = computed<{ code: string; label: string }[]>(() => [
  { code: "Ctrl+Shift+Alt+T", label: tLocal("sections.shortcuts.items.toggleTheme") },
  { code: "Ctrl+Shift+Alt+D", label: tLocal("sections.shortcuts.items.toggleDebug") },
  { code: "Ctrl+Shift+Alt+L", label: tLocal("sections.shortcuts.items.displayLanguage") },
]);
</script>

<template>
  <LayoutStack align-items="center" flex-grow justify-content="center">
    <VCard class="pa-2 elevation-2">
      <VCardTitle>{{ tLocal("title") }}</VCardTitle>
      <VCardText>
        <LayoutStack>
          <LayoutStack v-for="key in keyCombinations" :key="key.code" direction="row">
            <VKbd>{{ key.code }}</VKbd>
            <div>{{ key.label }}</div>
          </LayoutStack>
        </LayoutStack>
      </VCardText>
    </VCard>
  </LayoutStack>
</template>
