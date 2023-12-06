import {
  mdiThemeLightDark as mdiAuto,
  mdiWeatherNight as mdiDark,
  mdiWeatherSunny as mdiLight,
} from "@mdi/js";
import { usePreferredDark } from "@vueuse/core";
import { computed, type ComputedRef, type Ref } from "vue";
import { watchEffect } from "vue";
import { type ThemeInstance, useTheme as useVuetifyTheme } from "vuetify";

import { useStorageState } from "./use-storage-state";

export enum AppTheme {
  AUTO = "auto",
  DARK = "dark",
  LIGHT = "light",
}

export const themeIconMap: Record<AppTheme, string> = {
  [AppTheme.AUTO]: mdiAuto,
  [AppTheme.DARK]: mdiDark,
  [AppTheme.LIGHT]: mdiLight,
};

type VuetifyTheme = ThemeInstance["current"];

interface AppThemeComposable {
  /** App theme preference (persisted) */
  appTheme: Ref<AppTheme>;
  /** Whether current theme is a dark theme (for contextual changes, etc) */
  dark: ComputedRef<boolean>;
  /** Set the app theme */
  setTheme: (theme: AppTheme) => void;
  /** Toggle theme between light/dark */
  toggleTheme: () => void;
  /** Vuetify current theme */
  vuetify: VuetifyTheme;
}

export const APP_THEME_STORAGE_KEY = "app-theme";

/**
 * App theme (persisted) with matching Vuetify theme
 *
 * NOTE: Developed manually for learning/teaching, rather than using 'vue-use' composable!
 */
export const useAppTheme = (): AppThemeComposable => {
  const vuetifyTheme = useVuetifyTheme();

  const prefersDark = usePreferredDark();

  const [storedAppTheme, setStoredAppTheme] = useStorageState(localStorage, APP_THEME_STORAGE_KEY, {
    defaultValue: AppTheme.AUTO,
    valid: (value) => Object.values(AppTheme).includes(value),
  });

  /** App theme must be either light or dark (auto is not a valid theme) */
  const appThemeFinal = computed(() =>
    storedAppTheme.value === AppTheme.AUTO
      ? prefersDark.value
        ? AppTheme.DARK
        : AppTheme.LIGHT
      : storedAppTheme.value,
  );

  const usingDark = computed(() => appThemeFinal.value === AppTheme.DARK);

  // Update global Vuetify theme when app theme is modified
  watchEffect(() => {
    vuetifyTheme.global.name.value = appThemeFinal.value;
  });

  /**
   * Toggle app theme
   *
   * NOTE: Only moves between light/dark (not auto)!
   */
  const toggleAppTheme = () => {
    let nextTheme: AppTheme;
    if (storedAppTheme.value === AppTheme.AUTO) {
      nextTheme = prefersDark.value ? AppTheme.LIGHT : AppTheme.DARK;
    } else {
      nextTheme = storedAppTheme.value === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
    }
    setStoredAppTheme(nextTheme);
  };

  return {
    appTheme: storedAppTheme,
    dark: usingDark,
    setTheme: setStoredAppTheme,
    toggleTheme: toggleAppTheme,
    vuetify: vuetifyTheme.current,
  };
};
