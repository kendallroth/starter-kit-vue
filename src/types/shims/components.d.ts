/* eslint-disable @typescript-eslint/consistent-type-imports */

/**
 * Define globally registered components in order to provide editor typings
 *
 * NOTE: Registering components via "typical" imports causes issues with circular references,
 *         so components must be imported directly from their files!
 */
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    // Form
    CheckboxField: typeof import("#components/form/CheckboxField.vue").default;
    FormReset: typeof import("#components/form/FormReset.vue").default;
    FormSubmit: typeof import("#components/form/FormSubmit.vue").default;
    SelectField: typeof import("#components/form/SelectField.vue").default;
    SwitchField: typeof import("#components/form/SwitchField.vue").default;
    TextField: typeof import("#components/form/TextField.vue").default;

    // Layout
    ActionBar: typeof import("#components/layout/ActionBar.vue").default;
    LayoutStack: typeof import("#components/layout/LayoutStack.vue").default;
  }
}

export {};
