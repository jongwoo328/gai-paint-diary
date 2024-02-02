import type { Mood } from "~/shared/types/request";

export type DiaryListItem = {
  date: string;
  mood: Mood;
  content: string;
  imageUrl: string;
};
