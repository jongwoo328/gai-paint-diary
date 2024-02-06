<script setup lang="ts">
import type { DiaryListItem } from "~/types";
import { useDiaryStore } from "~/stores/DiaryStore";

const { setSelectedDiary } = useDiaryStore();

const diaries = useLocalStorage<DiaryListItem[]>("diaryList", []);

const onClickItem = (diary: DiaryListItem) => {
  setSelectedDiary(diary);
  return navigateTo("/result");
};
</script>

<template>
  <div class="grid grid-cols-1 gap-4 p-4 md:p-6 mx-20 lg:mx-40 xl:mx-80 2xl:mx-96">
    <diary-list-item v-for="diary in diaries" :key="diary.imageUrl" :diary="diary" @click="onClickItem(diary)" />
  </div>
</template>

<style scoped lang="postcss"></style>
