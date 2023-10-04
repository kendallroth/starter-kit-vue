<script lang="ts" setup>
import { useField, useIsSubmitting } from "vee-validate";
import { computed, toRef } from "vue";

import { useFieldErrorMessage } from "./use-field-error-message";

type SwitchFieldProps = {
  disabled?: boolean;
  hint?: string;
  label?: string;
  name: string;
};

const props = withDefaults(defineProps<SwitchFieldProps>(), {
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
  // Technically switches are a form of checkbox, and such must specify checkbox type and
  //   checked/unchecked values for custom checkbox to work (see docs).
  type: "checkbox",
  checkedValue: true,
  uncheckedValue: false,
});

const formSubmitting = useIsSubmitting();

const errorMessage = useFieldErrorMessage(nameRef, labelRef);

// Switches should not reserve space for errors by default (does cause popping, but is waste of space)
const hideDetails = computed(() => !errorMessage.value && !toRef(props.hint).value);
</script>

<template>
  <VSwitch
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

<style lang="scss"></style>
