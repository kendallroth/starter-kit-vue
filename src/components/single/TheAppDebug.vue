<script lang="ts" setup>
import { mdiMonitor as mdiComputer, mdiCellphone as mdiMobile } from "@mdi/js";
import { useMagicKeys, whenever } from "@vueuse/core";
import { ref } from "vue";
import { useDisplay } from "vuetify";

import { LanguageDialog } from "#components/dialogs";
import { useAppTheme } from "#composables/use-app-theme";
import { useStorageState } from "#composables/use-storage-state";

const { mobile, name: breakpointName } = useDisplay();
const shortKeys = useMagicKeys();

const [showDebug, setShowDebug] = useStorageState(localStorage, "debug", {
  defaultValue: false,
  valid: (v) => v === true || v === false,
});

const debugKeys = shortKeys["Ctrl+Shift+Alt+d"];
whenever(debugKeys, () => {
  setShowDebug(!showDebug.value);
});

const theme = useAppTheme();

const themeKeys = shortKeys["Ctrl+Shift+Alt+t"];
whenever(themeKeys, theme.toggleTheme);

const showLanguageDialog = ref(false);

const languageKeys = shortKeys["Ctrl+Shift+Alt+l"];
whenever(languageKeys, () => {
  showLanguageDialog.value = !showLanguageDialog.value;
});
</script>

<template>
  <template v-if="showDebug">
    <LayoutStack class="debug-display ma-2">
      <VChip label :prepend-icon="mobile ? mdiMobile : mdiComputer" :text="breakpointName" />
    </LayoutStack>
  </template>
  <LanguageDialog :open="showLanguageDialog" @close="showLanguageDialog = false" />
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
