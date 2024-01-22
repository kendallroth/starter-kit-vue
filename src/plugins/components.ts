import {
  CheckboxField,
  FormReset,
  FormSubmit,
  SelectField,
  SwitchField,
  TextField,
} from "#components/form";
import { ActionBar, AppPage, LayoutStack, ProgressLoader, TitleBar } from "#components/layout";
import { Typography } from "#components/typography";

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
    app.component("CheckboxField", CheckboxField);
    app.component("FormReset", FormReset);
    app.component("FormSubmit", FormSubmit);
    app.component("TextField", TextField);
    app.component("SwitchField", SwitchField);
    app.component("SelectField", SelectField);

    // Layout
    app.component("ActionBar", ActionBar);
    app.component("AppPage", AppPage);
    app.component("LayoutStack", LayoutStack);
    app.component("ProgressLoader", ProgressLoader);

    // Typography
    app.component("TitleBar", TitleBar);
    app.component("Typography", Typography);
  },
};
