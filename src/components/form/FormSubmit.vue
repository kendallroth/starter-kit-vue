<script lang="ts" setup>
import assert from "assert";

import { type FormContext, FormContextKey, useIsSubmitting } from "vee-validate";
import { inject } from "vue";

import { shouldDisableSubmit } from "#utilities/form";

interface FormSubmitProps {
  /**
   * Whether form submissions is disabled (in addition to internal defaults)
   *
   * Uses `useForm` parent context to automatically set in several cases (cannot be overridden)!
   */
  disabled?: boolean;
  /**
'  * Whether form is loading (in addition to internal defaults)
   *
   * Uses `useForm` parent context to automatically set while submitting (cannot be overridden)!
   */
  loading?: boolean;
}

withDefaults(defineProps<FormSubmitProps>(), {
  disabled: false,
  loading: false,
});

// Inject VeeValidate form context (provided by 'useForm' in parent)
const formContext = inject(FormContextKey) as unknown as FormContext;
assert(formContext, "'FormSubmit' likely used outside 'FormContext'!");

const formSubmitting = useIsSubmitting();
</script>

<template>
  <VBtn
    v-bind="$attrs"
    :disabled="shouldDisableSubmit(formContext) || disabled"
    :loading="formSubmitting || loading"
    type="submit"
  >
    <slot name="default" />
  </VBtn>
</template>
