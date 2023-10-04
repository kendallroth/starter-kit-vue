import { useField, useFieldError, useSubmitCount } from "vee-validate";
import { computed } from "vue";

import { useCommonTranslations } from "#composables/use-localization";
import { isYupLocalizedError } from "#utilities/localization";

import type { ComputedRef, Ref } from "vue";

/**
 * Get a field's localized error message (if any)
 *
 * NOTE: Only shows errors if field is touched and form has attempted submission!
 *
 * @param fieldName - Field name (for VeeValidate)
 * @param label     - Field label (replaces `path` in localization message)
 * @returns Localized error message
 */
export const useFieldErrorMessage = (
  fieldName: Ref<string>,
  label: Ref<string | undefined>,
): ComputedRef<string | undefined> => {
  const { errorMessage: rawError, meta } = useField(fieldName);

  const submitCount = useSubmitCount();
  const fieldError = useFieldError(fieldName);
  const hasError = computed(() => fieldError.value);
  const hasAttemptedSubmitted = computed(() => submitCount.value > 0);

  const tCommon = useCommonTranslations();

  const error = computed(() => {
    // Only show errors if form has had at least one submit attempt
    if (!meta.touched || !hasError.value || !hasAttemptedSubmitted.value) return;
    if (typeof rawError.value === "string") return rawError.value;

    if (isYupLocalizedError(rawError.value)) {
      const { key, path, values = {} } = rawError.value;
      return tCommon(key, { path: label.value ?? path, ...values });
    }

    return tCommon("common:validations.unknown");
  });

  return error;
};
