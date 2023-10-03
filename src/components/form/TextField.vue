<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { useField, useIsSubmitting } from "vee-validate";
import { computed, ref, toRef } from "vue";

type TextFieldProps = {
  disabled?: boolean;
  hint?: string;
  label?: string;
  name: string;
  type?: string;
  /** Initial field value */
  value?: string;
};

const props = withDefaults(defineProps<TextFieldProps>(), {
  disabled: false,
  hint: "",
  label: undefined,
  type: "text",
  value: "",
});

// Allow VeeValidate to respond to changes in name
const nameRef = toRef(props.name);

const passwordHidden = ref(true);

const {
  value: formValue,
  errorMessage: rawError,
  handleBlur,
  handleChange,
  meta,
} = useField(nameRef);

const formSubmitting = useIsSubmitting();

const error = computed(() => {
  if (!meta.touched || !rawError.value) return;
  if (typeof rawError.value === "string") return rawError.value;

  // const { key, values } = rawError.value;
  // return typeof rawError.value === "string" ? rawError.value : t(key, values);
  return "Unknown error structure";
});

const inputType = computed(() =>
  props.type === "password" && passwordHidden.value ? "password" : "text",
);
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
    color="primary"
    :disabled="disabled || formSubmitting"
    :error="Boolean(error)"
    :hint="error ?? hint"
    :label="label"
    :model-value="formValue"
    persistent-hint
    :type="inputType"
    @blur="handleBlur"
    @click:append-inner="toggleHidden"
    @update:model-value="handleChange"
  />
</template>
