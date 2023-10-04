<script lang="ts" setup>
import { useField, useIsSubmitting } from "vee-validate";
import { computed, toRef } from "vue";

import { useFieldErrorMessage } from "./use-field-error-message";

type CheckboxFieldProps = {
  disabled?: boolean;
  hint?: string;
  label?: string;
  name: string;
};

const props = withDefaults(defineProps<CheckboxFieldProps>(), {
  disabled: false,
  hint: "",
  label: undefined,
});

// Allow VeeValidate to respond to changes in name/label
const nameRef = toRef(props.name);
const labelRef = toRef(props.label);

const {
  value: formValue,
  handleBlur,
  handleChange,
} = useField(nameRef, undefined, {
  // Must specify checkbox type and checked/unchecked values for custom checkbox to work (see docs)
  type: "checkbox",
  checkedValue: true,
  uncheckedValue: false,
});

const formSubmitting = useIsSubmitting();

const errorMessage = useFieldErrorMessage(nameRef, labelRef);

// Checkboxes should not reserve space for errors by default (does cause popping, but is waste of space)
const hideDetails = computed(() => !errorMessage.value && !toRef(props.hint).value);
</script>

<template>
  <VCheckbox
    v-bind="$attrs"
    :disabled="disabled || formSubmitting"
    :error="Boolean(errorMessage)"
    :hide-details="hideDetails"
    :hint="errorMessage ?? hint"
    :label="label"
    :model-value="formValue"
    @blur="handleBlur"
    @update:model-value="handleChange"
  />
</template>

<style lang="scss">
.v-checkbox {
  .v-selection-control {
    // Override minimum height for checkboxes (unnecessary)
    --v-input-control-height: 0;
  }

  .v-input__details {
    padding-top: 2px;
    min-height: auto;
  }
}
</style>
