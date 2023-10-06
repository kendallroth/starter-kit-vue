<script lang="ts" setup>
import { useForm } from "vee-validate";
import { computed } from "vue";

import { useSnackbar } from "#composables/use-app-snackbar";
import { useCommonTranslations, useViewsTranslations } from "#composables/use-localization";
import { getTypedFormField } from "#utilities/form";
import { sleep } from "#utilities/sleep";

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

const selectItems = computed(() => [
  { label: "Canada", value: "CA" },
  { label: "United States", value: "US" },
]);

const handleFormSubmit = handleSubmit(async (data, actions) => {
  await sleep(500);

  console.log("Submitted form", data);

  try {
    if (data.switch) {
      throw new Error("Invalid API simulated");
    }

    notify("Submitted form!");
    actions.resetForm();
  } catch (e) {
    // TODO: Handle parsing error message via utilities
    notifyError("Error while submitting form");
    return;
  }
});

const handleFormReset = () => {
  resetForm();
};
</script>

<template>
  <AppPage :content-props="{ alignItems: 'center' }" :title="tLocal('title')">
    <VCard min-width="400" variant="outlined">
      <VCardText>
        <LayoutStack is="form" align-items="stretch" flex-grow @submit="handleFormSubmit">
          <TextField autofocus :label="tLocal('fields.text.label')" :name="typeFieldName('text')" />
          <TextField
            :label="tLocal('fields.hidden.label')"
            :name="typeFieldName('hidden')"
            type="password"
          />
          <TextField
            :label="tLocal('fields.number.label')"
            :name="typeFieldName('number')"
            type="number"
          />
          <SelectField
            clearable
            item-title="label"
            :items="selectItems"
            :label="tLocal('fields.select.label')"
            :name="typeFieldName('select')"
          />
          <TextField :label="tLocal('fields.optional.label')" :name="typeFieldName('optional')" />
          <CheckboxField
            :label="tLocal('fields.checkbox.label')"
            :name="typeFieldName('checkbox')"
          />
          <SwitchField :label="tLocal('fields.switch.label')" :name="typeFieldName('switch')" />
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
  </AppPage>
</template>

<style lang="scss" scoped></style>
