/* eslint-disable @typescript-eslint/consistent-type-imports */

/**
 * Define globally registered components in order to provide editor typings
 *
 * NOTE: Registering components via "typical" imports causes issues with circular references,
 *         so components must be imported directly from their files!
 */
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ActionBar: typeof import("#components/layout/ActionBar.vue").default;
    FormReset: typeof import("#components/form/FormReset.vue").default;
    FormSubmit: typeof import("#components/form/FormSubmit.vue").default;
    LayoutStack: typeof import("#components/layout/LayoutStack.vue").default;
    TextField: typeof import("#components/form/TextField.vue").default;
  }
}

export {};
