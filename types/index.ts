import type { Mood } from "~/shared/types/request";
import { ImageStyle } from "~/shared/types/request";

export type DiaryListItem = {
  date: string;
  mood: Mood;
  content: string;
  imageUrl: string;
};

export type DiaryItem = {
  date: string;
  diary: string;
  style: ImageStyle;
  mood: Mood;
};
