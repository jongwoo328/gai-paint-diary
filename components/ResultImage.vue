<script setup lang="ts">
const props = defineProps({
  resultImage: String,
  diary: Object,
});
</script>

<template>
  <div class="bg-color w-screen h-screen">
    <div class="pt-6 text-5xl font-bold text-center">Create Image with DALL E 3</div>
    <div class="flex flex-row items-center justify-center">
      <p class="text">{{ props.diary?.date }}, &nbsp;</p>
      <p class="text">{{ props.diary?.mood }}</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <img
        alt="Image 1"
        class="my-2 w-1/3 h-auto rounded-md px-3 py-2 border-black border-4"
        :src="props.resultImage"
      />
      <p class="text">{{ props.diary?.diary }}</p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.bg-color {
  @apply mx-auto space-y-6 bg-[#FFFAF0];
}

.text {
  @apply text-3xl mt-2;
}
</style>
