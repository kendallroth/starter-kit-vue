<script setup lang="ts">
import {
  mdiThemeLightDark as mdiAuto,
  mdiWeatherNight as mdiDark,
  mdiWeatherSunny as mdiLight,
} from "@mdi/js";
import { useTranslation } from "i18next-vue";
import { computed } from "vue";

import { AppTheme, useAppTheme } from "#composables/use-app-theme";
import { useViewsTranslations } from "#composables/use-localization";
import { supportedLanguages } from "#utilities/localization";

const tLocal = useViewsTranslations({
  keyPrefix: "settingsView",
});

const appTheme = useAppTheme();

const themeOptions: { props: { prependIcon: string }; title: string; value: AppTheme }[] = [
  { props: { prependIcon: mdiAuto }, title: "Auto", value: AppTheme.AUTO },
  { props: { prependIcon: mdiLight }, title: "Light", value: AppTheme.LIGHT },
  { props: { prependIcon: mdiDark }, title: "Dark", value: AppTheme.DARK },
];

const selectedThemeIcon = computed(() => {
  const theme = themeOptions.find((o) => o.value === appTheme.appTheme.value);
  if (!theme) return "";
  return theme.props.prependIcon;
});

const { i18next } = useTranslation();

const languageOptions = supportedLanguages.map((l) => ({
  title: l.label,
  value: l.code,
}));
</script>

<template>
  <AppPage :title="tLocal('title')">
    <Typography class="mb-2" variant="title-2">
      {{ tLocal("sections.personalization.title") }}
    </Typography>
    <Typography>{{ tLocal("sections.personalization.items.theme.label") }}</Typography>
    <VSelect
      class="select-field"
      hide-details
      :items="themeOptions"
      :model-value="appTheme.appTheme.value"
      :prepend-inner-icon="selectedThemeIcon"
      variant="outlined"
      @update:model-value="(value) => appTheme.setTheme(value)"
    />
    <Typography class="mt-2">
      {{ tLocal("sections.personalization.items.language.label") }}
    </Typography>
    <VSelect
      class="select-field"
      hide-details
      :items="languageOptions"
      :model-value="i18next.language"
      variant="outlined"
      @update:model-value="(value) => i18next.changeLanguage(value)"
    />
  </AppPage>
</template>

<style lang="scss" scoped>
.select-field {
  flex-grow: 0;
  min-width: 200px;

  :deep(.v-field__prepend-inner) {
    margin-right: var(--v-spacer);
  }
}
</style>
