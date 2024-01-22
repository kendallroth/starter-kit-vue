<script setup lang="ts">
import { mdiArrowLeft as mdiBack, mdiHome } from "@mdi/js";
import { useRouter } from "vue-router";

import { useCommonTranslations, useViewsTranslations } from "#composables/use-localization";

const router = useRouter();

const tCommon = useCommonTranslations();
const tLocal = useViewsTranslations({
  keyPrefix: "appNotFound",
});
</script>

<template>
  <VCard class="pa-6 my-auto mx-6" elevation="4">
    <LayoutStack align-items="center">
      <Typography class="mb-4 title" variant="title-1">404</Typography>
      <Typography class="mb-4" variant="title-1">{{ tLocal("title") }}</Typography>
      <Typography variant="title-2">{{ tLocal("message") }}</Typography>
      <LayoutStack class="mt-4" direction="row">
        <VBtn :prepend-icon="mdiBack" @click="router.back()">{{ tCommon("actions.back") }}</VBtn>
        <VBtn :prepend-icon="mdiHome" to="/" variant="outlined">{{ tLocal("actions.home") }}</VBtn>
      </LayoutStack>
    </LayoutStack>
  </VCard>
</template>

<style lang="scss" scoped>
.title {
  font-size: 4rem !important;
  line-height: 4rem;
}
</style>
