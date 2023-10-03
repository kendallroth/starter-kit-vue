import type { FormContext, GenericObject, Path } from "vee-validate";

type FieldValues = GenericObject;

/**
 * Set a form server error (prevents successful submission indicator)
 *
 * Used to prevent a form from indicating successful submission when there was a caught/handled
 *   API error, which RHF ignores and would otherwise indicate as a successful submission.
 */
export const setFormServerError = (form: FormContext<FieldValues>, error: unknown) => {
  // TODO: Get actual error message from error!
  form.setFieldError("root.server", "API error occured");
};

/**
 * Disable cancel buttons when form is submitting or empty/unsubmitted
 *
 * @param form           - Form state (potentially from injected reference)
 * @param allowWhenEmpty - Allow cancelling (reset) when empty/unsubmitted (useful in dialogs, etc)
 */
export const shouldDisableCancel = (form: FormContext<FieldValues>, allowWhenEmpty = false) => {
  const isSubmittingOrValidating = form.isSubmitting.value || form.isValidating.value;

  // Some locations may allow cancelling when empty/unsubmitted (ie. dialogs)
  if (allowWhenEmpty) return isSubmittingOrValidating;

  // Must include submit count to allow resetting field after invalid submission attempt
  return isSubmittingOrValidating || (!form.meta.value.dirty && !form.submitCount.value);
};

/** Disable submit buttons when form is submitting, validating, unchanged */
export const shouldDisableSubmit = (form: FormContext<FieldValues>) => {
  // TODO: Handle intial values loading state (if possible)
  return form.isSubmitting.value || form.isValidating.value || !form.meta.value.dirty;
};

/**
 * Support strongly typing VeeValidate form field names (when using in UI, etc)
 *
 * @param   name - Field name (will be strongly typed)
 * @returns Typed field name
 *
 * @example
 * const getTypedFormField = <T extends GenericObject>(name: Path<T>) => name;
 *
 * type FormSchema = Yup.InferType<{ ... }>;
 * const getFormField = getTypedFormField<FormSchema>;
 *
 * return <Input name={getFormField("strongly.typed")} />;
 */
export const getTypedFormField = <TValues extends GenericObject>(name: Path<TValues>) => name;
