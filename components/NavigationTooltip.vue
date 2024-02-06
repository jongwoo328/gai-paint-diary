<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <div class="tooltip w-max bg-white shadow-lg px-4 rounded mt-2">
    <span v-text="text" />
  </div>
</template>

<style scoped lang="postcss">
.tooltip {
  transform: translateX(calc(-50% + 0.75rem));
  transition: ease-in-out opacity 0.3s;
}
</style>
