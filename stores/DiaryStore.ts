import { ImageStyle, Mood } from "~/shared/types/request";
import type { DiaryItem, DiaryListItem } from "~/types";

export const useDiaryStore = defineStore("diary", {
  state: () => {
    return {
      diary: {
        date: "",
        diary: "",
        style: ImageStyle.PixelArt,
        mood: Mood.Happiness,
      } as DiaryItem,
      selectedDiary: null as null | DiaryListItem,
    };
  },
  getters: {
    getDiary: (state): DiaryItem => state.diary,
    getSelectedDiary: (state) => state.selectedDiary,
  },
  actions: {
    setDiary(data: DiaryItem) {
      this.diary = data;
    },
    setSelectedDiary(data: DiaryListItem) {
      this.selectedDiary = data;
    },
    deleteSelectedDiary() {
      this.selectedDiary = null;
    },
  },
});
