import { setLocale } from "yup";

import { typeYupLocalizedError } from "./utils";

/**
 * Set custom localization dictionary for Yup (results in keys for i18next).
 *
 * NOTE: Must be executed in this file to resolve execution order issues if executing in top-level files!
 * NOTE: Only these localized Yup error messages will be localized automatically by Vuetify components;
 *         any non-standard Yup validation rules or validation in non-Vuetify components require
 *         manually setting `Yup.label()`!
 *       This is not a concern as all utilized rules should be localized anyway (for support)!
 *
 * Source: https://github.com/jquense/yup#localization-and-i18n
 */
setLocale({
  mixed: {
    default: ({ path }) =>
      typeYupLocalizedError({
        key: "common:validations.invalid",
        path,
      }),
    notType: ({ path, type }) =>
      typeYupLocalizedError({
        key: "common:validations.invalidType",
        path,
        values: { type },
      }),
    oneOf: ({ path, values }) =>
      typeYupLocalizedError({
        key: "common:validations.oneOf",
        path,
        values: { values },
      }),
    required: ({ path }) =>
      typeYupLocalizedError({
        key: "common:validations.required",
        path,
      }),
  },
  string: {
    email: ({ path }) =>
      typeYupLocalizedError({
        key: "common:validations.string.email",
        path,
      }),
    matches: ({ path }) =>
      typeYupLocalizedError({
        key: "common:validations.string.match",
        path,
      }),
    max: ({ path, max }) =>
      typeYupLocalizedError({
        key: "common:validations.string.max",
        path,
        values: { max },
      }),
    min: ({ path, min }) =>
      typeYupLocalizedError({
        key: "common:validations.string.min",
        path,
        values: { min },
      }),
    url: ({ path }) =>
      typeYupLocalizedError({
        key: "common:validations.string.url",
        path,
      }),
  },
  number: {
    max: ({ path, max }) =>
      typeYupLocalizedError({
        key: "common:validations.number.max",
        path,
        values: { max },
      }),
    min: ({ path, min }) =>
      typeYupLocalizedError({
        key: "common:validations.number.min",
        path,
        values: { min },
      }),
  },
  boolean: {},
});
