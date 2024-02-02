<script setup lang="ts">
import type { DiaryListItem } from "~/types";

defineProps<{
  diary: DiaryListItem;
}>();
</script>

<template>
  <div class="diary-card hover:cursor-pointer">
    <div class="flex flex-col md:flex-row p-4">
      <nuxt-img
        alt="Product 1"
        class="object-cover aspect-1/2 w-full md:w-[30%] 2xl:w-[25%] lg:min-w-24 md:aspect-square self-center"
        :src="diary.imageUrl"
        width="400"
      />

      <div class="flex flex-col p-2 md:pl-4 overflow-hidden max-h-56 md:max-h-none w-full text-2xl">
        <div class="flex flex-row justify-between">
          <span v-text="diary.date" />
          <span v-text="diary.mood" />
        </div>
        <p class="diary-content mt-2 flex-1" v-text="diary.content" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.diary-card {
  border: 1px solid black;

  &:hover {
    border-width: 2px;
  }
}

.diary-content {
  background-image: linear-gradient(to bottom, transparent, transparent 95%, #000 95%);
  background-size: 100% 25px;
  line-height: 25px;
  white-space: pre-wrap;
  min-height: 100px;
}

@media (min-width: 768px) {
  .diary-content {
    min-height: 0;
  }
}
</style>
