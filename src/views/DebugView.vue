<script setup lang="ts">
import { LayoutStack } from "#components/layout";

const keyCombinations: { code: string; label: string }[] = [
  { code: "Ctrl+Shift+Alt+T", label: "Toggle light/dark theme" },
  { code: "Ctrl+Shift+Alt+D", label: "Toggle debug overlay" },
];
</script>

<template>
  <LayoutStack align-items="center" flex-grow justify-content="center">
    <VCard class="pa-2 elevation-2">
      <VCardTitle>Debug</VCardTitle>
      <VCardText>
        <LayoutStack>
          <LayoutStack v-for="key in keyCombinations" :key="key.code" direction="row">
            <VKbd>{{ key.code }}</VKbd>
            <div>{{ key.label }}</div>
          </LayoutStack>
        </LayoutStack>
      </VCardText>
    </VCard>
  </LayoutStack>
</template>
