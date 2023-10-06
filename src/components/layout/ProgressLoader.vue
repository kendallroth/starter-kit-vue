<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Whether loader should expand to fill space */
    expand?: boolean;
  }>(),
  {
    expand: false,
  },
);
</script>

<template>
  <LayoutStack
    align-items="center"
    class="pa-10 mx-auto"
    :class="{ 'my-auto': expand }"
    justify-content="center"
  >
    <VProgressCircular indeterminate size="48" />
  </LayoutStack>
</template>
