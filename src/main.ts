// Supports font weights 200 - 800
import "@fontsource-variable/manrope";
import "./styles/app.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";

import { componentsPlugin } from "#plugins/components";
import { i18nPlugin } from "#plugins/i18n";
import { vuetifyPlugin } from "#plugins/vuetify";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia()).use(i18nPlugin).use(vuetifyPlugin).use(router).use(componentsPlugin);

app.mount("#app");
