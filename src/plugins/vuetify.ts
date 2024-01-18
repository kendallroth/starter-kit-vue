import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

// Theme generated with "#00696d" at https://m3.material.io/theme-builder#/custom

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#fafdfc",
    "on-background": "#191c1c",
    primary: "#00696d",
    "on-primary": "#ffffff",
    secondary: "#4a6364",
    "on-secondary": "#ffffff",
    error: "#ba1a1a",
    "on-error": "#ffffff",
    surface: "#fbffff",
    "on-surface": "#191c1c",
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#191c1c",
    "on-background": "#e0e3e3",
    primary: "#4cd9e0",
    "on-primary": "#003739",
    secondary: "#b1cccd",
    "on-secondary": "#1b3436",
    error: "#ffb4ab",
    "on-error": "#690005",
    surface: "#262b2b",
    "on-surface": "#e0e3e3",
  },
};

export const vuetifyPlugin = createVuetify({
  blueprint: md3,
  // Customize Vuetify default props
  defaults: {
    VAlert: {
      border: true,
      // Alerts default to fill flex containers (makes no sense)
      class: "flex-grow-0 flex-shrink-0 flex-basis-auto",
      variant: "tonal",
    },
    VCheckbox: {
      color: "primary",
      persistentHint: true,
    },
    VPagination: {
      density: "compact",
      totalVisible: 5,
    },
    VProgressCircular: {
      color: "primary",
    },
    VSelect: {
      color: "primary",
      persistentHint: true,
    },
    VSwitch: {
      color: "primary",
      inset: true,
      persistentHint: true,
      style: "--v-input-control-height: unset;",
    },
    VTextField: {
      color: "primary",
      persistentHint: true,
    },
  },
  display: {
    mobileBreakpoint: "md",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  // ssr: true,
  theme: {
    defaultTheme: "light",
    themes: {
      dark: darkTheme,
      light: lightTheme,
    },
    variations: {
      colors: ["primary"],
      lighten: 2,
      darken: 2,
    },
  },
});
