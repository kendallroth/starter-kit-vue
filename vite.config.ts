import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { configDefaults, defineConfig } from "vitest/config";

/** Get path to file for Vite alias */
const getAliasPath = (filepath: string) =>
  fileURLToPath(new URL(`./src/${filepath}`, import.meta.url));

export default defineConfig({
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
      "#components": getAliasPath("components"),
      "#composables": getAliasPath("composables"),
      "#plugins": getAliasPath("plugins"),
      "#src": getAliasPath(""),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/*"],
    root: getAliasPath("./"),
  },
});
