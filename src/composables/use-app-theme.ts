import { usePreferredDark } from "@vueuse/core";
import { computed, type ComputedRef, type Ref } from "vue";
import { watchEffect } from "vue";
import { type ThemeInstance, useTheme as useVuetifyTheme } from "vuetify";

import { useStorageState } from "./use-storage-state";

export enum AppTheme {
  // TODO: Determine whether "auto" theme should work
  DARK = "dark",
  LIGHT = "light",
}

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
    // Default value is set by user's browser color scheme preference
    defaultValue: prefersDark.value ? AppTheme.DARK : AppTheme.LIGHT,
    valid: (value) => Object.values(AppTheme).includes(value),
  });

  watchEffect(() => {
    vuetifyTheme.global.name.value = storedAppTheme.value;
  });

  const usingDark = computed(() => storedAppTheme.value === AppTheme.DARK);

  const toggleAppTheme = () => {
    setStoredAppTheme(storedAppTheme.value === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
  };

  return {
    appTheme: storedAppTheme,
    dark: usingDark,
    setTheme: setStoredAppTheme,
    toggleTheme: toggleAppTheme,
    vuetify: vuetifyTheme.current,
  };
};
