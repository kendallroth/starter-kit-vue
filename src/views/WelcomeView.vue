<script setup lang="ts">
import { LayoutStack } from "#components/layout";
</script>

<template>
  <LayoutStack align-items="center" flex-grow justify-content="center">
    <VCard class="pa-2 elevation-2">
      <VCardTitle>StarterKit - Vue</VCardTitle>
      <VCardText>Welcome to the Vue StarterKit!</VCardText>
      <VCardActions>
        <VBtn disabled variant="outlined">Quit</VBtn>
        <VBtn color="primary" variant="elevated">Start</VBtn>
      </VCardActions>
    </VCard>
  </LayoutStack>
</template>
