<script setup lang="ts">
import { useSnackbar } from "#composables/use-app-snackbar";
import { useCommonTranslations, useViewsTranslations } from "#composables/use-localization";

const tCommon = useCommonTranslations();
const tLocal = useViewsTranslations({
  keyPrefix: "welcomeView",
});

const { notifyNotImplemented } = useSnackbar();
</script>

<template>
  <AppPage :title="tLocal('title')">
    <VCard variant="outlined">
      <VCardTitle>{{ tLocal("title") }}</VCardTitle>
      <VCardText>{{ tLocal("subtitle") }}</VCardText>
      <VCardActions>
        <VBtn disabled variant="outlined">{{ tCommon("actions.close") }}</VBtn>
        <VBtn color="primary" variant="elevated" @click="notifyNotImplemented">
          {{ tCommon("actions.confirm") }}
        </VBtn>
      </VCardActions>
    </VCard>
  </AppPage>
</template>
