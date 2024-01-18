export enum ImageStyle {
  PixelArt = "픽셀아트",
  Disney3DAnimation = "디즈니 3D 애니메이션",
  OilPainting = "유화",
}

export enum Mood {
  Happiness = "행복",
  Expectation = "기대",
  Love = "사랑",
  Tranquility = "무난",
  Appreciation = "감사",
  Relief = "안도",
  Sadness = "슬픔",
  Worry = "걱정",
  Scary = "무서움",
}

export type GetImageRequestBody = {
  diary: string;
  style: ImageStyle;
  mood: Mood;
};
