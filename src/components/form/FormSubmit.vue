<script lang="ts" setup>
import { useFormContext } from "#composables/use-form-context";
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

const formContext = useFormContext();
</script>

<template>
  <VBtn
    v-bind="$attrs"
    :disabled="shouldDisableSubmit(formContext) || disabled"
    :loading="formContext.isSubmitting.value || loading"
    type="submit"
  >
    <slot name="default" />
  </VBtn>
</template>
