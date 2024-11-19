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
        // Provide utility SCSS files to all SCSS files (including SFC templates, etc)
        // NOTE: Must avoid importing utility files to any Vuetify or main files,
        //         to avoid circular imports (compiler error with '@use')!
        additionalData(source: string, fp: string) {
          const skippedFileParts = ["vuetify", "app.scss"];
          if (skippedFileParts.some((part) => fp.includes(part))) return source;

          return `
              @use "#styles/_functions.scss" as *;
              ${source}
            `;
        },
        api: "modern-compiler",
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
