<script setup lang="ts">
import { LayoutStack } from "#components/layout";
import { useSnackbar } from "#composables/use-app-snackbar";
import { useCommonTranslations, useViewsTranslations } from "#composables/use-localization";

const tCommon = useCommonTranslations();
const tLocal = useViewsTranslations({
  keyPrefix: "welcomeView",
});

const { notifyNotImplemented } = useSnackbar();
</script>

<template>
  <LayoutStack align-items="center" flex-grow justify-content="center">
    <VCard class="pa-2 elevation-2">
      <VCardTitle>{{ tLocal("title") }}</VCardTitle>
      <VCardText>{{ tLocal("subtitle") }}</VCardText>
      <VCardActions>
        <VBtn disabled variant="outlined">{{ tCommon("actions.close") }}</VBtn>
        <VBtn color="primary" variant="elevated" @click="notifyNotImplemented">
          {{ tCommon("actions.confirm") }}
        </VBtn>
      </VCardActions>
    </VCard>
  </LayoutStack>
</template>
