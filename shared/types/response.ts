export type ServerResponse<T> = {
  data: T;
  message: string;
};

export type GetImageResponse = { url: string };
