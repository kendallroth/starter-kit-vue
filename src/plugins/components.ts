import { FormReset, FormSubmit, TextField } from "#components/form";
import { ActionBar, LayoutStack } from "#components/layout";

import type { App } from "vue";

/**
 * Register globally available components
 *
 * NOTE: Global components should be defined in '@types/shims/components.d.ts' in order to
 *         utilize editor type/prop completion.
 */
export const componentsPlugin = {
  install: (app: App) => {
    // Form
    app.component("FormReset", FormReset);
    app.component("FormSubmit", FormSubmit);
    app.component("TextField", TextField);
    // Layout
    app.component("ActionBar", ActionBar);
    app.component("LayoutStack", LayoutStack);
  },
};
