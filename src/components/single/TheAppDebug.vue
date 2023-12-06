<script lang="ts" setup>
import {
  mdiMonitor as mdiComputer,
  mdiContentCopy as mdiCopy,
  mdiCellphone as mdiMobile,
} from "@mdi/js";
import { useClipboard, useMagicKeys, whenever } from "@vueuse/core";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

import { LanguageDialog } from "#components/dialogs";
import { useSnackbar } from "#composables/use-app-snackbar";
import { useAppTheme } from "#composables/use-app-theme";
import { useDialog } from "#composables/use-dialog";
import { useViewsTranslations } from "#composables/use-localization";
import { useStorageState } from "#composables/use-storage-state";
import { appConfig } from "#config/app";

const { mobile, name: breakpointName } = useDisplay();
const shortKeys = useMagicKeys();

const [showScreenSize, setShowScreenSize] = useStorageState(localStorage, "screen-size", {
  defaultValue: false,
  valid: (v) => v === true || v === false,
});

const debugDialog = useDialog();

const debugKeys = shortKeys["Ctrl+Shift+Alt+d"];
whenever(debugKeys, () => {
  debugDialog.toggle(!debugDialog.open.value);
});

const theme = useAppTheme();

const themeKeys = shortKeys["Ctrl+Shift+Alt+t"];
whenever(themeKeys, theme.toggleTheme);

const showLanguageDialog = ref(false);

const languageKeys = shortKeys["Ctrl+Shift+Alt+l"];
whenever(languageKeys, () => {
  showLanguageDialog.value = !showLanguageDialog.value;
});

const tDialog = useViewsTranslations({
  keyPrefix: "debugView",
});

const keyCombinations = computed<{ code: string; label: string }[]>(() => [
  { code: "Ctrl+Shift+Alt+T", label: tDialog("sections.shortcuts.items.toggleTheme") },
  { code: "Ctrl+Shift+Alt+D", label: tDialog("sections.shortcuts.items.toggleDebug") },
  { code: "Ctrl+Shift+Alt+L", label: tDialog("sections.shortcuts.items.displayLanguage") },
]);

const { notify } = useSnackbar();

const { copy, isSupported: copySupported } = useClipboard();

const handleCopy = (value: string) => {
  copy(value);
  notify(tDialog("snackbars.copied"));
};
</script>

<template>
  <template v-if="showScreenSize">
    <LayoutStack class="debug-display ma-2">
      <VChip label :prepend-icon="mobile ? mdiMobile : mdiComputer" :text="breakpointName" />
    </LayoutStack>
  </template>
  <LanguageDialog :open="showLanguageDialog" @close="showLanguageDialog = false" />

  <VDialog v-model="debugDialog.open.value" max-width="500">
    <VCard>
      <VCardTitle>{{ tDialog("title") }}</VCardTitle>
      <VCardText class="pt-0">
        <Typography class="mb-2" variant="subtitle-1">
          {{ tDialog("sections.config.title") }}
        </Typography>
        <LayoutStack align-items="center" class="mb-3" direction="row">
          {{ tDialog("sections.config.items.gitCommit") }}:
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

        <Typography class="mb-2" variant="subtitle-1">
          {{ tDialog("sections.shortcuts.title") }}
        </Typography>
        <LayoutStack class="mb-3">
          <LayoutStack
            is="Typography"
            v-for="key in keyCombinations"
            :key="key.code"
            align-items="center"
            direction="row"
            variant="body-2"
          >
            <VKbd>{{ key.code }}</VKbd>
            <div>{{ key.label }}</div>
          </LayoutStack>
        </LayoutStack>

        <Typography class="mb-2" variant="subtitle-1">
          {{ tDialog("sections.settings.title") }}
        </Typography>
        <LayoutStack>
          <VSwitch
            hide-details
            :label="tDialog('sections.settings.items.screenSize')"
            :model-value="showScreenSize"
            @update:model-value="(value) => setShowScreenSize(!!value)"
          />
        </LayoutStack>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.debug-display {
  z-index: 1005;
  position: fixed;
  bottom: 0;
  left: 0;
  margin: spacing(2);
}
</style>
