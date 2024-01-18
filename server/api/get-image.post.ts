import { GetImageRequestBody, ImageStyle, Mood } from "~/shared/types/request";
import OpenAiService from "~/server/service/OpenAiService";
import { GetImageResponse, ServerResponse } from "~/shared/types/response";
import { isPlainObject } from "~/server/util/validation";

function validateBody(body: unknown): body is GetImageRequestBody {
  if (!isPlainObject(body)) {
    return false;
  }
  return (
    typeof body["diary"] === "string" &&
    body["diary"].length > 0 &&
    Object.values(ImageStyle).includes(body["style"] as ImageStyle) &&
    Object.values(Mood).includes(body["mood"] as Mood)
  );
}

export default defineEventHandler(async (event): Promise<ServerResponse<null | GetImageResponse>> => {
  const body: unknown = await readBody(event);

  if (!validateBody(body)) {
    event.node.res.statusCode = 400;
    return {
      data: null,
      message: "잘못된 형식입니다.",
    };
  }

  const { diary, style } = body;
  const imageData = await OpenAiService.getImageFromDiary(diary, style);
  return {
    data: imageData,
    message: "성공",
  };
});
