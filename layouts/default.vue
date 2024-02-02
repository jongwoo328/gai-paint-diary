<script setup lang="ts"></script>

<template>
  <div class="bg-color min-h-screen">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.bg-color {
  @apply mx-auto space-y-6 bg-[#FFFAF0];
}

* {
  font-family: "soul-pentastic-epilogue-regular", sans-serif;
}
</style>
