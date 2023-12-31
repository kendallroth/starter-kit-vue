<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { useField, useIsSubmitting } from "vee-validate";
import { computed, ref, toRef } from "vue";

import { useFieldErrorMessage } from "./use-field-error-message";

type TextFieldProps = {
  disabled?: boolean;
  hint?: string;
  label?: string;
  name: string;
  type?: string;
};

const props = withDefaults(defineProps<TextFieldProps>(), {
  disabled: false,
  hint: "",
  label: undefined,
  type: "text",
});

// Allow VeeValidate to respond to changes in name/label
const nameRef = toRef(props.name);
const labelRef = toRef(props.label);

const passwordHidden = ref(true);

const { value: formValue, handleBlur, handleChange } = useField(nameRef);

const formSubmitting = useIsSubmitting();

const errorMessage = useFieldErrorMessage(nameRef, labelRef);

const inputType = computed(() => {
  if (props.type !== "password") return props.type;
  return passwordHidden.value ? "password" : "text";
});
const inputIcon = computed(() =>
  props.type === "password" ? (passwordHidden.value ? mdiEyeOff : mdiEye) : undefined,
);

const toggleHidden = () => {
  passwordHidden.value = !passwordHidden.value;
};
</script>

<template>
  <VTextField
    v-bind="$attrs"
    :append-inner-icon="inputIcon"
    :disabled="disabled || formSubmitting"
    :error="Boolean(errorMessage)"
    :hint="errorMessage ?? hint"
    :label="label"
    :model-value="formValue"
    :type="inputType"
    @blur="handleBlur"
    @click:append-inner="toggleHidden"
    @update:model-value="handleChange"
  />
</template>
