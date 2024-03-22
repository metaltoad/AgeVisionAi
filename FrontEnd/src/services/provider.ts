import { api } from "./api";
import { endpoints } from "./endpoints";

type ImageInfoRequestProps = {
  FileExtension: string;
  Image: string;
};

async function getImageInfo(requestData: ImageInfoRequestProps) {
  const { data } = await api.post(endpoints.getImageInfo, requestData);

  const emotionInfoTreated =
    data.Emotions[0].Type[0] + data.Emotions[0].Type.slice(1).toLowerCase();

  return {
    ...data,
    Emotion: emotionInfoTreated,
  };
}

const provider = {
  getImageInfo,
};

export { provider };
