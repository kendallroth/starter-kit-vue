// Supports font weights 200 - 800
import "@fontsource-variable/manrope";
import "./styles/app.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";

import { appConfig } from "#config/app";
import { componentsPlugin } from "#plugins/components";
import { globalPropertiesPlugin } from "#plugins/global-properties";
import { i18nPlugin } from "#plugins/i18n";
import { vueQueryPlugin } from "#plugins/vue-query";
import { vuetifyPlugin } from "#plugins/vuetify";

// NOTE: Must be imported before app root to avoid import order issues (applies Yup localization)
import "#utilities/localization/yup/locale";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// NOTE: Because this uses an conditional/async import, MSW may not be started before other requests!
//         This causes a race condition that will skip MSW for initial requests. To mitigate this, a
//         global promise is added (dev only) that will only complete when MSW finished loading! This
//         is utilized in the 'AppLoader' component to only mount the rest of the app once loaded.
//       While not the official recommendation, it is a better DX (and still only affects devs)
// Source: https://mswjs.io/docs/recipes/deferred-mounting
// Source: https://github.com/mswjs/msw/issues/73#issuecomment-601533852
if (appConfig.development) {
  window.mswReady = import("#api/msw/browser").then(({ worker }) => worker.start());
}

app
  .use(createPinia())
  .use(i18nPlugin)
  .use(vuetifyPlugin)
  .use(router)
  .use(globalPropertiesPlugin)
  .use(componentsPlugin)
  .use(vueQueryPlugin);

app.mount("#app");
