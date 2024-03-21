import { api } from "./api";
import { endpoints } from "./endpoints";

type ImageInfoRequestProps = {
  FileExtension: string;
  Image: string;
};

type ImageInfoResponseProps = {
  Age?: number;
};

async function getImageInfo(props: ImageInfoRequestProps) {
  const { data } = await api.post(endpoints.getImageInfo, props);

  return data as ImageInfoResponseProps;
}

const provider = {
  getImageInfo,
};

export { provider };
