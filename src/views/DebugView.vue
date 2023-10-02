<script setup lang="ts">
import { mdiContentCopy as mdiCopy } from "@mdi/js";
import { useClipboard } from "@vueuse/core";
import { computed } from "vue";

import { LayoutStack } from "#components/layout";
import { useSnackbar } from "#composables/use-app-snackbar";
import { useViewsTranslations } from "#composables/use-localization";
import { appConfig } from "#config/app";

const tLocal = useViewsTranslations({
  keyPrefix: "debugView",
});

const keyCombinations = computed<{ code: string; label: string }[]>(() => [
  { code: "Ctrl+Shift+Alt+T", label: tLocal("sections.shortcuts.items.toggleTheme") },
  { code: "Ctrl+Shift+Alt+D", label: tLocal("sections.shortcuts.items.toggleDebug") },
  { code: "Ctrl+Shift+Alt+L", label: tLocal("sections.shortcuts.items.displayLanguage") },
]);

const { notify } = useSnackbar();

const { copy, isSupported: copySupported } = useClipboard();

const handleCopy = (value: string) => {
  copy(value);
  notify(tLocal("snackbars.copied"));
};
</script>

<template>
  <LayoutStack align-items="center" flex-grow justify-content="center">
    <VCard class="pa-2 elevation-2">
      <VCardTitle>{{ tLocal("title") }}</VCardTitle>
      <VCardText>
        <div class="mb-2 text-subtitle-1">{{ tLocal("sections.config.title") }}</div>
        <LayoutStack align-items="center" class="mb-3" direction="row">
          {{ tLocal("sections.config.items.gitCommit") }}
          <VKbd>{{ appConfig.commitSha ?? "N/A" }}</VKbd>
          <VBtn
            v-if="copySupported"
            density="comfortable"
            :icon="mdiCopy"
            size="small"
            variant="text"
            @click="handleCopy(appConfig.commitSha ?? 'N/A')"
          />
        </LayoutStack>

        <div class="mb-2 text-subtitle-1">{{ tLocal("sections.shortcuts.title") }}</div>
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
