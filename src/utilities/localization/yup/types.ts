/**
 * Localization config for Yup validation error
 *
 * Assume that the key maps into the following tokenized error message:
 *   `{{path}} must be at least {{min}} characters`
 *
 * Then the final error message will be:
 *   `Field must be at least 2 characters`
 *
 * @source: https://github.com/react-hook-form/react-hook-form/discussions/3808#discussioncomment-261851
 * @source: https://github.com/nareshbhatia/form-examples/blob/main/checkout-form-rhf/src/models/ValidationError.ts
 *
 * @example
 * {
 *   key: "common:validations.stringMin",
 *   path: "field",
 *   values: { min: 2 } // Optional
 * }
 */
export interface YupLocalizedError {
  /** Key in translation files */
  key: string;
  /**
   * Yup validation field name (Yup locale `path`)
   *
   * NOTE: Typically this name/label is overridden in the Vuetify component by the component's label;
   *         however, in cases where a label is either not included or errors are displayed other
   *         than Vuetify components, the field `path` should be used as a fallback. This does
   *         require a `Yup.label()` call in the schema to avoid using the "object path".
   */
  path: string;
  /**
   * Yup message interpolation values
   *
   * Values are passed to localization, and can be used for showing validation values in localization
   *   message (ie. `minLength`, etc).
   */
  values?: {
    [key: string]: unknown;
  };
}
