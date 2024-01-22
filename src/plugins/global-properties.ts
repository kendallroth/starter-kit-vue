import dayjs from "dayjs";

import type { App } from "vue";

/**
 * Register globally available properties
 *
 * NOTE: Global properties should be defined in '#types/shims/global-properties.d.ts' in order to
 *         utilize editor type/prop completion.
 */
export const globalPropertiesPlugin = {
  install: (app: App) => {
    app.config.globalProperties.$dayjs = dayjs;
  },
};
