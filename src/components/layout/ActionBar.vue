<script lang="ts" setup>
interface ActionBarProps {
  /** Whether actions are left-aligned */
  left?: boolean;
  /** Whether actions are right-aligned */
  right?: boolean;
  /** Spacing in left/right action bars */
  spacing?: number;
}

withDefaults(defineProps<ActionBarProps>(), {
  left: false,
  right: false,
  spacing: 2,
});
</script>

<template>
  <div class="action-bar">
    <LayoutStack v-if="$slots.left || left" align-items="center" direction="row" :spacing="spacing">
      <slot v-if="$slots.left" name="left" />
      <template v-else-if="left">
        <slot />
      </template>
    </LayoutStack>
    <LayoutStack
      v-if="$slots.right || right"
      align-items="center"
      class="ml-auto"
      direction="row"
      :spacing="spacing"
    >
      <slot v-if="$slots.right" name="right" />
      <template v-else-if="right">
        <slot />
      </template>
    </LayoutStack>
  </div>
</template>

<style lang="scss" scoped>
.action-bar {
  display: flex;
  width: 100%;
}
</style>
