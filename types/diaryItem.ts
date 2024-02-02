import { ImageStyle, Mood } from "~/shared/types/request";

export interface DiaryItem {
  date?: string;
  diary: string;
  style: ImageStyle;
  mood: Mood;
}
