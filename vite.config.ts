/// <reference types="vitest" />

import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vuetify from "vite-plugin-vuetify";
import { defaultExclude } from "vitest/config";

/** Get path to file for Vite alias */
export const getAliasPath = (filepath: string) =>
  fileURLToPath(new URL(`./src/${filepath}`, import.meta.url));

export default defineConfig({
  // NOTE: Define uses static text replacement in builds, and should ONLY be used for constants!
  // Source: https://vitejs.dev/config/shared-options.html#define
  define: {
    // 'process' must be defined for 'assert' polyfill
    "process.env": {},
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Some SCSS files (vars, mixins, etc) should automatically be imported in all SCSS
        //   files and Vue template blocks to reduce common SCSS imports.
        // NOTE: While `@use` is preferred to `@import`, it must come before any other SCSS!
        additionalData(source: string, fp: string) {
          // Avoid importing utility files within any Vuetify SCSS
          if (fp.includes("vuetify")) return source;

          return `
              @use "#styles/_functions.scss" as *;
              ${source}
            `;
        },
      },
    },
  },
  plugins: [
    vue(),
    // Customize Vuetify plugin: https://www.npmjs.com/package/vite-plugin-vuetify
    vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/vuetify-settings.scss",
      },
    }),
  ],
  resolve: {
    alias: {
      "#api": getAliasPath("api"),
      "#components": getAliasPath("components"),
      "#config": getAliasPath("config"),
      "#composables": getAliasPath("composables"),
      "#plugins": getAliasPath("plugins"),
      "#slices": getAliasPath("slices"),
      "#styles": getAliasPath("styles"),
      "#types": getAliasPath("types"),
      "#utilities": getAliasPath("utilities"),
      // Suggest root 'src/' path last (prefer other aliases)
      "#src": getAliasPath(""),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  test: {
    environment: "jsdom",
    exclude: [...defaultExclude, "e2e/*"],
    root: getAliasPath("./"),
  },
});
