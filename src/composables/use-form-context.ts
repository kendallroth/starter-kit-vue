import assert from "assert";

import { type FormContext, FormContextKey } from "vee-validate";
import { inject } from "vue";

/**
 * Expose VeeValidate form context
 *
 * NOTE: Hopefully a workaround until VeeValidate exposes a similar hook.
 */
export const useFormContext = () => {
  const formContext = inject<FormContext | undefined>(FormContextKey);
  assert(formContext, "'FormSubmit' likely used outside 'FormContext'!");
  return formContext;
};
