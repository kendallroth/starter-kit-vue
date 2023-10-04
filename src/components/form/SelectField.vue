<script lang="ts" setup>
import { useField, useIsSubmitting } from "vee-validate";
import { toRef } from "vue";

import { useFieldErrorMessage } from "./use-field-error-message";

type SelectFieldProps = {
  disabled?: boolean;
  hint?: string;
  label?: string;
  name: string;
};

const props = withDefaults(defineProps<SelectFieldProps>(), {
  disabled: false,
  hint: "",
  label: undefined,
});

// Allow VeeValidate to respond to changes in name/label
const nameRef = toRef(props.name);
const labelRef = toRef(props.label);

const { value: formValue, handleBlur, handleChange } = useField(nameRef);

const formSubmitting = useIsSubmitting();

const errorMessage = useFieldErrorMessage(nameRef, labelRef);
</script>

<template>
  <VSelect
    v-bind="$attrs"
    :disabled="disabled || formSubmitting"
    :error="Boolean(errorMessage)"
    :hint="errorMessage ?? hint"
    :label="label"
    :model-value="formValue"
    @blur="handleBlur"
    @update:model-value="handleChange"
  />
</template>
