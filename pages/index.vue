<script setup lang="ts">
import WriteDiary from "~/components/WriteDiary.vue";
import ResultImage from "~/components/ResultImage.vue";
import Loading from "~/components/loading/Loading.vue";
import type { GetImageRequestBody } from "~/shared/types/request";
import SadFace from "~/components/emoji/SadFace.vue";

const showLoading = ref(false);
const showResult = ref(false);

const diary = ref({});
const imageResult = ref("");

const changeScroll = (displayElement: Ref<boolean>, id: string) => {
  displayElement.value = !displayElement.value;
  nextTick(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  });
};
const createImage = async (request: GetImageRequestBody) => {
  diary.value = request;
  changeScroll(showLoading, "loading");
  const { data } = await useFetch("/api/get-image", { method: "post", body: request });
  imageResult.value = data?.value?.data?.url ?? "FAILED";
  changeScroll(showResult, "result-image");
  showLoading.value = false;
};
</script>

<!--main 화면-->
<template>
  <write-diary @create="createImage" />
  <div v-if="showLoading" id="loading" class="flex items-center justify-center w-screen h-screen">
    <loading class="w-1/2" />
  </div>
  <div v-if="showResult">
    <result-image id="result-image" :result-image="imageResult" :diary="diary" />
  </div>
  <div v-if="imageResult === 'FAILED'" class="flex flex-col items-center justify-center w-screen h-screen">
    <sad-face class="w-1/3" />
    <div class="my-6 text-3xl text-center">API 통신을 실패했습니다! 다시 시도해주세요.</div>
  </div>
</template>

<style scoped lang="postcss"></style>
