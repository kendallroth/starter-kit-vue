import { createPinia } from "pinia";
import { createApp } from "vue";

import { componentsPlugin } from "#plugins/components";
import { vuetifyPlugin } from "#plugins/vuetify";

import App from "./App.vue";
import router from "./router";

// Supports font weights 200 - 800
import "@fontsource-variable/manrope";

const app = createApp(App);

app.use(createPinia()).use(vuetifyPlugin).use(router).use(componentsPlugin);

app.mount("#app");
