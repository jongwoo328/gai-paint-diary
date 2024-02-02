<script setup lang="ts">
import type { DiaryListItem } from "~/types";
import { Mood } from "~/shared/types/request";

const diaries = useLocalStorage<DiaryListItem[]>("diaryList", [
  // 테스트를 위한 정보, 실제로는 [] 로 사용
  {
    date: "2024-02-02",
    content:
      "오늘은 금요일에 쉬는 날이다. 혼자 카페에서 노트북을 펴고 프로젝트를 진행하고 있다.\n" +
      "카페안의 사람들은 평화롭게 앉아있다.",
    imageUrl: "https://img.jongwoo.me/tools/ghost.png",
    mood: Mood.Happiness,
  },
  {
    date: "2024-02-02",
    content:
      "오늘은 금요일에 쉬는 날이다. 혼자 카페에서 노트북을 펴고 프로젝트를 진행하고 있다.\n" +
      "카페안의 사람들은 평화롭게 앉아있다.",
    imageUrl: "https://img.jongwoo.me/tools/ghost.png",
    mood: Mood.Happiness,
  },
  {
    date: "2024-02-02",
    content:
      "오늘은 금요일에 쉬는 날이다. 혼자 카페에서 노트북을 펴고 프로젝트를 진행하고 있다.\n" +
      "카페안의 사람들은 평화롭게 앉아있다.",
    imageUrl: "https://img.jongwoo.me/tools/ghost.png",
    mood: Mood.Happiness,
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 gap-4 p-4 md:p-6 mx-20 lg:mx-40 xl:mx-80 2xl:mx-96">
    <diary-list-item v-for="diary in diaries" :key="diary.imageUrl" :diary="diary" />
  </div>
</template>

<style scoped lang="postcss"></style>
