import { toTypedSchema } from "@vee-validate/yup";
import { type InferType, number, object, string } from "yup";

// TODO: Expand with following items:
//         - Checkbox
//         - Select field
//         - Array of nested objects
//         - Conditional validation
//         - Matching validation

/** Sample form Yup validation schema */
export const sampleFormSchema = object({
  name: string().required(),
  password: string().required(),
  email: string().email().required(),
  age: number()
    .transform((v) => Number(v))
    .min(5)
    .max(100)
    .required(),
  optional: string(),
});

/** Sample form schema type */
export type SampleForm = InferType<typeof sampleFormSchema>;

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
export const sampleFormSchemaDefaults: SampleForm = {
  age: 0,
  email: "",
  name: "",
  optional: "",
  password: "",
};
