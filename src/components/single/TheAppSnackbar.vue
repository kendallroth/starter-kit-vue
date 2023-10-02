<script lang="ts" setup>
import { useSnackbar } from "#composables/use-app-snackbar";

const { snackbar } = useSnackbar();
</script>

<template>
  <VSnackbar
    :color="snackbar.type as string"
    location="bottom left"
    :model-value="snackbar.visible"
  >
    {{ snackbar.text }}
  </VSnackbar>
</template>
