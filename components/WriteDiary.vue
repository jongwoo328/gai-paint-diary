<script setup lang="ts">
import { type GetImageRequestBody, ImageStyle, Mood } from "~/shared/types/request";

const date = ref("");
const content = ref("");
const mood = ref(Mood.Happiness);
const style = ref(ImageStyle.PixelArt);

const emit = defineEmits(["create"]);

const isValid = computed(() => {
  return date.value !== "" && content.value !== "";
});

const moodOptions = computed(() => {
  return Object.entries(Mood).map(([key, value]) => ({ key: key, value: value }));
});

const imageStyleOptions = computed(() => {
  return Object.entries(ImageStyle).map(([key, value]) => ({ key: key, value: value }));
});

const showResult = () => {
  const data: GetImageRequestBody = {
    date: date.value,
    mood: mood.value,
    style: style.value,
    diary: content.value,
  };
  emit("create", data);
};
</script>

<template>
  <div class="bg-color w-screen h-screen">
    <div class="flex flex-col space-y-1.5 p-6">
      <h1 class="text-6xl font-bold">Diary Entry</h1>
      <p class="text-3xl text-gray-500 dark:text-gray-400">Record your thoughts and experiences here.</p>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        <div class="flex justify-start items-center space-x-4">
          <div class="grid items-start gap-4">
            <label
              class="text-2xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="date"
            >
              Date
            </label>
            <input
              class="text-xl flex h-10 rounded-md border border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[200px] bg-transparent border-none"
              id="date"
              type="date"
              v-model="date"
            />
          </div>
          <div class="grid items-start gap-4">
            <label
              class="text-2xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="mood"
            >
              Mood
            </label>
            <select
              class="text-xl flex h-10 rounded-md border border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[200px] bg-transparent border-none"
              id="mood"
              v-model="mood"
            >
              <option v-for="option in moodOptions" :value="option.value">{{ option.value }}</option>
            </select>
          </div>
          <div class="grid items-start gap-4">
            <label
              class="text-2xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="mood"
            >
              Style
            </label>
            <select
              class="text-xl flex h-10 rounded-md border border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[200px] bg-transparent border-none"
              id="mood"
              v-model="style"
            >
              <option v-for="option in imageStyleOptions" :value="option.value">{{ option.value }}</option>
            </select>
          </div>
        </div>
        <div class="grid items-start gap-4">
          <label
            class="text-2xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="content"
          >
            Write
          </label>
          <textarea
            class="text-2xl flex rounded-md border border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full min-h-[400px] bg-transparent border-none"
            id="content"
            placeholder="Write your thoughts here..."
            v-model="content"
          />
        </div>
        <button
          class="text-3xl inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full bg-indigo-500 hover:bg-indigo-700"
          type="submit"
          :disabled="!isValid"
          @click="showResult"
        >
          Create Image
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.bg-color {
  @apply mx-auto space-y-6 bg-[#FFFAF0];
}

textarea {
  /* 줄눈 추가 */
  background-image: linear-gradient(to bottom, transparent, transparent 95%, #000 95%);
  background-size: 100% 20px;
  line-height: 20px; /* 배경의 줄눈과 텍스트 줄 간격을 맞추기 위함 */
}
</style>
