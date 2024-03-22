import { SetStateAction } from "jotai";
import { api } from "./api";
import { endpoints } from "./endpoints";
import { SetAtom } from "../interfaces/SetAtom";

type ImageInfoRequestProps = {
  FileExtension: string;
  Image: string;
};

async function getImageInfo(
  requestData: ImageInfoRequestProps,
  setAge: SetAtom<[SetStateAction<number | undefined>], void>,
  setEmotion: SetAtom<[SetStateAction<string>], void>,
  setIsLoadingResults: SetAtom<[SetStateAction<boolean>], void>
) {
  const { data } = await api.post(endpoints.getImageInfo, requestData);

  const emotionInfoTreated =
    data.Emotions[0].Type[0] + data.Emotions[0].Type.slice(1).toLowerCase();

  setAge(data.Age);
  setEmotion(emotionInfoTreated);
  setIsLoadingResults(false);
}

const provider = {
  getImageInfo,
};

export { provider };
