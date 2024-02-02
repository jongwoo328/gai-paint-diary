<script setup lang="ts">
import ListIcon from "~/components/button/ListIcon.vue";
import HomeIcon from "~/components/button/HomeIcon.vue";
</script>

<template>
  <div class="flex flex-row items-center justify-center p-6">
    <div class="has-tooltip">
      <span class="tooltip rounded shadow-lg p-2 bg-white -mb-8">메인화면으로 돌아가기</span>
      <HomeIcon class="w-6 mr-5" />
    </div>
    <div class="has-tooltip">
      <span class="tooltip rounded shadow-lg p-2 bg-white -mb-8">결과 리스트 보기</span>
      <span><ListIcon class="w-4" /></span>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.tooltip {
  @apply invisible absolute;
  cursor: default;
}

.has-tooltip:hover .tooltip {
  @apply visible z-auto;
  cursor: pointer;
}
</style>
