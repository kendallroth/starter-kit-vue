<script lang="ts" setup>
import { useFormContext } from "#composables/use-form-context";
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

const formContext = useFormContext();
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
