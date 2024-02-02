<script setup lang="ts">
import ListIcon from "~/components/button/ListIcon.vue";
import HomeIcon from "~/components/button/HomeIcon.vue";
import NavigationTooltip from "~/components/NavigationTooltip.vue";
</script>

<template>
  <nav class="flex flex-row items-center justify-center p-6 gap-4">
    <NuxtLink to="/" class="relative nav-anchor p-2">
      <HomeIcon class="h-6 cursor-pointer" />
      <navigation-tooltip text="메인 화면으로 돌아가기" class="absolute opacity-0 tooltip-wrap" />
    </NuxtLink>
    <NuxtLink to="/list" class="relative nav-anchor p-2">
      <ListIcon class="h-6 cursor-pointer" />
      <navigation-tooltip text="결과 리스트 보기" class="absolute opacity-0 tooltip-wrap" />
    </NuxtLink>
  </nav>
</template>

<style scoped lang="postcss">
.nav-anchor:hover {
  .tooltip-wrap {
    opacity: 1;
  }
}
</style>
