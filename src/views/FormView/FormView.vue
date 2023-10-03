<script lang="ts" setup>
import { useForm } from "vee-validate";

import { useSnackbar } from "#composables/use-app-snackbar";
import { useCommonTranslations, useViewsTranslations } from "#composables/use-localization";
import { getTypedFormField } from "#utilities/form";

import { type SampleForm, sampleFormSchemaDefaults, sampleFormSchemaTyped } from "./schema";

const typeFieldName = getTypedFormField<SampleForm>;

const { notify, notifyError } = useSnackbar();

const tCommon = useCommonTranslations();
const tLocal = useViewsTranslations({
  keyPrefix: "formView",
});

const { handleSubmit, resetForm } = useForm<SampleForm>({
  initialValues: sampleFormSchemaDefaults,
  validationSchema: sampleFormSchemaTyped,
});

const handleFormSubmit = handleSubmit(async (data, actions) => {
  // TODO
  notify("Submitted form!");
  console.log("Submitted form", data);
});

const handleFormReset = () => {
  resetForm();
};
</script>

<template>
  <LayoutStack align-items="center" class="pa-8" flex-grow>
    <VCard min-width="400">
      <VCardTitle>{{ tLocal("title") }}</VCardTitle>
      <VCardText>
        <LayoutStack is="form" align-items="stretch" flex-grow @submit="handleFormSubmit">
          <TextField autofocus :label="tLocal('fields.name.label')" :name="typeFieldName('name')" />
          <TextField :label="tLocal('fields.email.label')" :name="typeFieldName('email')" />
          <TextField
            :label="tLocal('fields.password.label')"
            :name="typeFieldName('password')"
            type="password"
          />
          <TextField
            :label="tLocal('fields.age.label')"
            :name="typeFieldName('age')"
            type="number"
          />
          <TextField :label="tLocal('fields.optional.label')" :name="typeFieldName('optional')" />
          <ActionBar right>
            <FormReset @click="handleFormReset">
              {{ tCommon("actions.cancel") }}
            </FormReset>
            <FormSubmit>
              {{ tCommon("actions.save") }}
            </FormSubmit>
          </ActionBar>
        </LayoutStack>
      </VCardText>
    </VCard>
  </LayoutStack>
</template>

<style lang="scss" scoped></style>
