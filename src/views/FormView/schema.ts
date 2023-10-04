import { toTypedSchema } from "@vee-validate/yup";
import { boolean, type InferType, type Message, number, object, string } from "yup";

import { typeYupLocalizedError } from "#utilities/localization";

import type { OverrideProperties, SetOptional } from "type-fest";

// TODO: Expand with following items:
//         - Array of nested objects
//         - Conditional validation
//         - Matching validation

/** Sample form Yup validation schema */
export const sampleFormSchema = object({
  checkbox: boolean().isTrue(
    // Override default "boolean" validation error as it is not helpful
    typeYupLocalizedError({
      key: "common:validations.required",
      path: "checkbox",
    }) as unknown as Message<any>,
  ),
  hidden: string().required(),
  number: number()
    .transform((v) => Number(v))
    .min(5)
    .max(100)
    .required(),
  optional: string(),
  select: string().required(),
  switch: boolean().required(),
  text: string().required(),
});

/** Sample form schema type */
export type SampleForm = OverrideProperties<
  InferType<typeof sampleFormSchema>,
  { checkbox: boolean }
>;

/**
 * Sample form schema with transformations
 *
 * Allows VeeValidate to apply Yup schema transformations during validation/submit.
 */
export const sampleFormSchemaTyped = toTypedSchema(sampleFormSchema);

/**
 * Sample form defaults
 *
 * Can be used as form intial values or during (partial) resets.
 */
export const sampleFormSchemaDefaults: SetOptional<SampleForm, "number" | "select"> = {
  checkbox: false,
  hidden: "",
  number: undefined,
  optional: "",
  select: undefined,
  switch: false,
  text: "",
};
