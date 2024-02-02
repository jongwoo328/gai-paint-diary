<script setup lang="ts">
import { Mood } from "~/shared/types/request";

const props = defineProps<{ mood: Mood }>();

const moodTextColor = computed(() => {
  switch (props.mood) {
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
  <span :class="moodTextColor" v-text="mood" />
</template>

<style scoped lang="postcss"></style>
