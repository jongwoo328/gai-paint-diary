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
const { getDiary, getSelectedDiary } = storeToRefs(diaryStore);

const imageResult = ref("");
const moodResult = ref<Mood>(getDiary.value.mood);
const dateResult = ref("");
const diaryResult = ref("");

onMounted(async () => {
  if (getSelectedDiary.value) {
    showLoading.value = false;
    const { content, mood, imageUrl, date } = getSelectedDiary.value;

    imageResult.value = imageUrl;
    dateResult.value = date;
    moodResult.value = mood;
    diaryResult.value = content;
    showResult.value = true;

    return;
  }

  moodResult.value = getDiary.value.mood;
  dateResult.value = getDiary.value.date;
  diaryResult.value = getDiary.value.diary;

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

onBeforeRouteLeave(() => {
  diaryStore.deleteSelectedDiary();
});
</script>
<template>
  <div v-if="showLoading" id="loading" class="flex items-center justify-center w-screen h-screen">
    <loading class="w-1/2" />
  </div>
  <div v-if="showResult">
    <div class="bg-color w-screen h-screen">
      <div class="pt-6 text-5xl font-bold text-center">📝 {{ dateResult }} 일기</div>
      <div class="flex flex-row items-center justify-center"></div>
      <div class="flex row items-center justify-center m-8">
        <nuxt-img
          alt="image"
          class="my-2 w-1/3 h-auto rounded-md px-3 py-2 border-black border-4 mr-8"
          :src="imageResult"
        />
        <div>
          <div class="text mb-10">
            <span>오늘의 감정은 &nbsp;</span>
            <mood-text :mood="moodResult" />
          </div>
          <p class="text whitespace-pre-wrap">{{ diaryResult }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="imageResult === 'FAILED'" class="flex flex-col items-center justify-center w-screen h-screen">
    <sad-face class="w-1/3" />
    <div class="my-6 text-3xl text-center">API 통신을 실패했습니다! 다시 시도해주세요.</div>
  </div>
</template>

<style scoped lang="postcss">
.text {
  @apply text-3xl mt-2;
}
</style>
