<script setup lang="ts">
import SadFace from "~/components/emoji/SadFace.vue";
import Loading from "~/components/loading/Loading.vue";
import { useDiaryStore } from "~/stores/DiaryStore";
import { type GetImageRequestBody, Mood } from "~/shared/types/request";
import type { DiaryListItem } from "~/types";

const showLoading = ref(true);
const showResult = ref(false);

const diaries = useLocalStorage<DiaryListItem[]>("diaryList", []);
const diaryStore = useDiaryStore();
const { getDiary } = storeToRefs(diaryStore);
const imageResult = ref("");

onMounted(async () => {
  const request: GetImageRequestBody = {
    diary: getDiary.value.diary,
    mood: getDiary.value.mood,
    style: getDiary.value.style,
  };
  const { data } = await useFetch("/api/get-image", { method: "post", body: request });
  imageResult.value = data?.value?.data?.url ?? "FAILED";
  showLoading.value = false;
  if (imageResult.value !== "FAILED") {
    showResult.value = true;
    const newDiaryItem: DiaryListItem = {
      date: getDiary.value.date,
      mood: getDiary.value.mood,
      content: getDiary.value.diary,
      imageUrl: imageResult.value,
    };
    diaries.value.push(newDiaryItem);
  }
});

const moodTextColor = computed(() => {
  switch (getDiary.value.mood) {
    case Mood.Happiness:
      return "bg-yellow-200";
    case Mood.Love:
      return "bg-red-200";
    case Mood.Expectation:
      return "bg-green-200";
    case Mood.Tranquility:
      return "bg-purple-200";
    case Mood.Relief:
      return "bg-pink-200";
    case Mood.Appreciation:
      return "bg-orange-200";
    case Mood.Sadness:
      return "bg-blue-200";
    case Mood.Worry:
      return "bg-blue-200";
    case Mood.Scary:
      return "bg-indigo-200";
  }
});
</script>
<template>
  <div class="bg-color">
    <div v-if="showLoading" id="loading" class="flex items-center justify-center w-screen h-screen">
      <loading class="w-1/2" />
    </div>
    <div v-if="showResult">
      <div class="bg-color w-screen h-screen">
        <div class="pt-6 text-5xl font-bold text-center">📝 {{ getDiary.date }} 일기</div>
        <div class="flex flex-row items-center justify-center">
        </div>
        <div class="flex row items-center justify-center m-8">
          <nuxt-img
            alt="image"
            class="my-2 w-1/3 h-auto rounded-md px-3 py-2 border-black border-4 mr-8"
            :src="imageResult"
          />
          <div>
            <div class="text mb-10">
              <span>오늘의 감정은 &nbsp;</span>
              <span :class="moodTextColor">{{ getDiary.mood }}</span>
            </div>
            <p class="text">{{ getDiary.diary }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="imageResult === 'FAILED'" class="flex flex-col items-center justify-center w-screen h-screen">
      <sad-face class="w-1/3" />
      <div class="my-6 text-3xl text-center">API 통신을 실패했습니다! 다시 시도해주세요.</div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.text {
  @apply text-3xl mt-2;
}
</style>
