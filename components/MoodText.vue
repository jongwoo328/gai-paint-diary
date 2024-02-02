<script setup lang="ts">
import { Mood } from "~/shared/types/request";

const props = defineProps<{ mood: Mood }>();

const moodTextColor = computed(() => {
  const defaultClass = "font-bold px-1";
  switch (props.mood) {
    case Mood.Happiness:
      return defaultClass + " " + "bg-yellow-200";
    case Mood.Love:
      return defaultClass + " " + "bg-red-200";
    case Mood.Expectation:
      return defaultClass + " " + "bg-green-200";
    case Mood.Tranquility:
      return defaultClass + " " + "bg-purple-200";
    case Mood.Relief:
      return defaultClass + " " + "bg-pink-200";
    case Mood.Appreciation:
      return defaultClass + " " + "bg-orange-200";
    case Mood.Sadness:
      return defaultClass + " " + "bg-blue-200";
    case Mood.Worry:
      return defaultClass + " " + "bg-blue-200";
    case Mood.Scary:
      return defaultClass + " " + "bg-indigo-200";
  }
});
</script>

<template>
  <span :class="moodTextColor" v-text="mood" />
</template>

<style scoped lang="postcss"></style>
