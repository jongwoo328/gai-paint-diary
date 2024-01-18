import OpenAI from "openai";
import { Chat } from "openai/resources";
import { ImageStyle, Mood } from "~/shared/types/request";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default class OpenAiService {
  private static getImagePromptMessages: Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "당신은 DALL·E 모델의 프롬프트를 작성하는 AI 입니다.\n" +
        "당신의 목적은 사용자가 작성한 일기를 묘사하는 이미지를 생성하는 DALL·E 프롬프트를 제공하는 것입니다.\n" +
        "당신이 받는 입력에는 일기 내용, 생성하고자 하는 이미지의 스타일, 그리고 느꼈던 감정이 포함되어 있습니다.\n" +
        "당신은 일기 내용 중에서 일기를 대표할 수 있는 이미지로 사용될 부분을 선택하고 해당 부분을 잘 묘사할 수 있는 프롬프트를 생성하면 됩니다.\n" +
        "당신은 일기 전체 내용이 아니라 일부분을 묘사하는 이미지를 생성하기 위한 프롬프트를 작성합니다.\n" +
        "이미지는 나눠진 장면이 아니라 하나의 장면으로 생성되어야 합니다.",
    },
    {
      role: "user",
      content:
        // eslint-disable-next-line max-len
        "일기 내용 : 오랜만에 오후에 친구를 만났다. 친구와 카페에 가서 많은 이야기를 나눴다. 친구는 아이스 커피를 시켰고, 나는 크림이 올라간 커피와 작은 쿠키도 함께 주문했다. 조명이 적절하게 비춰서 잔이 반짝였다. 이야기를 나눈 후 같이 저녁을먹고 헤어졌다. \n" +
        "이미지 스타일 : 디즈니 3D 애니메이션 \n" +
        "감정 : 행복",
    },
    {
      role: "assistant",
      content:
        // eslint-disable-next-line max-len
        "디즈니 3D 애니메이션 스타일로 그린, 따뜻하고 아늑한 카페 내부의 장면. 카페는 밝고 편안한 분위기를 풍기며, 두 명의 친구가 대화를 나누고 있는 모습이 중심으로 그려진다. 한 명은 얼음이 든 투명한 음료를 들고 있으며, 이 음료는 빛을 받아 반짝이는 모습이 강조되어야 한다. 다른 친구는 크림이 풍성하게 얹힌 음료를 들고 있으며, 이 음료는 부드러운 구름 같은 느낌을 주어야 한다. 테이블 위에는 작고 귀여운 '미니 쿠키'들이 놓여 있으며, 쿠키들은 달콤하고 바삭한 질감을 느낄 수 있도록 세밀하게 표현된다. 배경에는 카페의 따뜻한 조명과 장식이 포함되어야 하며, 전체적으로 따뜻하고 친근한 분위기를 강조하는 디즈니 3D 애니메이션 스타일의 이미지.",
    },
  ];

  private static generateGetImagePromptMessages(
    diary: string,
    style: ImageStyle,
    mood: Mood,
  ): Chat.ChatCompletionMessageParam[] {
    return [
      ...this.getImagePromptMessages,
      {
        role: "user",
        content: `일기 내용 : ${diary}\n이미지 스타일 : ${style}\n감정 : ${mood}`,
      },
    ];
  }

  public static async getImageFromDiary(diary: string, style: ImageStyle, mood: Mood): Promise<{ url: string }> {
    const imagePrompt = await this.getImagePromptFromDiary(diary, style, mood);
    const imageResponse = await openai.images.generate({ prompt: imagePrompt, model: "dall-e-3", n: 1 });

    return { url: imageResponse.data[0].url as string };
  }

  private static async getImagePromptFromDiary(diary: string, style: ImageStyle, mood: Mood): Promise<string> {
    const response = await openai.chat.completions.create({
      model: "gpt-4-0613",
      messages: this.generateGetImagePromptMessages(diary, style, mood),
    });

    return response.choices[0].message.content as string;
  }
}
