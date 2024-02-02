import { ImageStyle, Mood } from "~/shared/types/request";
import type { DiaryItem } from "~/types/diaryItem";
// auth 스토어
export const useDiaryStore = defineStore("diary", {
  state: () => {
    return {
      diary: {
        date: "",
        diary: "",
        style: ImageStyle.PixelArt,
        mood: Mood.Happiness,
      } as DiaryItem,
    };
  },
  getters: {
    getDiary: (state): DiaryItem => state.diary,
  },
  actions: {
    setDiary(data: DiaryItem) {
      this.diary = data;
    },
  },
});
