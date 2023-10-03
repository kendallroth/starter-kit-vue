<script lang="ts" setup>
import assert from "assert";

import { type FormContext, FormContextKey } from "vee-validate";
import { inject } from "vue";

import { shouldDisableCancel } from "#utilities/form";

interface FormResetProps {
  /**
   * Whether form cancel is disabled (in addition to internal defaults)
   *
   * Uses `useForm` parent context to automatically set in several cases (cannot be overridden)!
   */
  disabled?: boolean;
  /**
'  * Whether form cancel should be enabled with an empty/unchanged form
   *
   * Some forms (particularly within dialogs) may wish to enable the cancel button for other purposes.
   */
  enableWhenEmpty?: boolean;
}

withDefaults(defineProps<FormResetProps>(), {
  disabled: false,
  enableWhenEmpty: false,
});

// Inject VeeValidate form context (provided by 'useForm' in parent)
const formContext = inject(FormContextKey) as unknown as FormContext;
assert(formContext, "'FormReset' likely used outside 'FormContext'!");
</script>

<template>
  <VBtn
    v-bind="$attrs"
    :disabled="shouldDisableCancel(formContext, enableWhenEmpty) || disabled"
    variant="text"
  >
    <slot name="default" />
  </VBtn>
</template>
