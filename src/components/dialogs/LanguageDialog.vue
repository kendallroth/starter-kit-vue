<script lang="ts" setup>
import { mdiCheck } from "@mdi/js";
import { useTranslation } from "i18next-vue";
import { computed } from "vue";

import { useCommonTranslations } from "#composables/use-localization";
import { supportedLanguages } from "#config/localization";

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { i18next } = useTranslation();

const tCommon = useCommonTranslations();
const tLocal = useCommonTranslations({
  keyPrefix: "appLanguageDialog",
});

const hasBetaLanguages = computed(() => supportedLanguages.some((l) => l.beta));

const handleChangeLanguage = (code: string) => {
  i18next.changeLanguage(code);
};
</script>

<template>
  <VDialog
    class="ma-4"
    max-width="350"
    :model-value="open"
    width="100%"
    @update:model-value="(value) => (value ? undefined : emit('close'))"
  >
    <VCard>
      <VCardTitle>{{ tLocal("title") }}</VCardTitle>
      <VCardText class="pt-0">
        <VAlert v-if="hasBetaLanguages" class="mb-2 text-body-2" color="warning" variant="tonal">
          {{ tLocal("messages.beta") }}
        </VAlert>
        <VList class="pa-0" density="compact">
          <VListItem
            v-for="language in supportedLanguages"
            :key="language.code"
            rounded="lg"
            @click="handleChangeLanguage(language.code)"
          >
            <template #append>
              <VIcon v-if="language.code === i18next.language" color="primary" :icon="mdiCheck" />
            </template>
            <template #title>
              <VListItemTitle>
                <VBadge
                  color="warning"
                  dot
                  :model-value="!!language.beta"
                  offset-x="-12"
                  offset-y="-2"
                >
                  {{ language.label }}
                </VBadge>
              </VListItemTitle>
            </template>
          </VListItem>
        </VList>
      </VCardText>
      <VCardActions class="justify-end">
        <VBtn @click="emit('close')">{{ tCommon("actions.close") }}</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
