import { Button, styled } from "@mui/material";

import "./ActionButtons.scss";

import convertToBase64 from "../../utils/convertToBase64";
import { provider } from "../../services/provider";
import handleCamera from "../../utils/handleCamera";
import { useAtom } from "jotai";
import {
  ageAtom,
  emotionAtom,
  imageAtom,
  isLoadingResultsAtom,
} from "../../store/mainAtom";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function CameraButton() {
  const [image, setImage] = useAtom(imageAtom);
  const [age, setAge] = useAtom(ageAtom);
  const [emotion, setEmotion] = useAtom(emotionAtom);
  const [isLoadingResults, setIsLoadingResults] = useAtom(isLoadingResultsAtom);
  const navigate = useNavigate();

  const handleUpload = async () => {
    setIsLoadingResults(true);

    const base64 = await handleCamera(setImage);

    const imageInfo = await provider.getImageInfo(
      {
        FileExtension: "png",
        Image: base64,
      },
      setAge,
      setEmotion,
      setIsLoadingResults
    );
    navigate("/results");
  };

  return (
    <Button
      onClick={handleUpload}
      className={`action-button ${isLoadingResults && "loading-button"}`}
      disabled={isLoadingResults}
      color="inherit"
    >
      <img alt="Take a picture" src="/take-a-photo-icon.svg" height={50} />
    </Button>
  );
}

export function UploadButton() {
  const navigate = useNavigate();
  const [image, setImage] = useAtom(imageAtom);
  const [age, setAge] = useAtom(ageAtom);
  const [emotion, setEmotion] = useAtom(emotionAtom);
  const [isLoadingResults, setIsLoadingResults] = useAtom(isLoadingResultsAtom);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingResults(true);
    const file = event.target.files?.[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    } else {
      return;
    }

    navigate("/results");

    const imageType = file.type.split("/")[1];

    const base64 = await convertToBase64({ File: file });
    const imageInfo = await provider.getImageInfo(
      {
        FileExtension: imageType,
        Image: base64,
      },
      setAge,
      setEmotion,
      setIsLoadingResults
    );
  };

  return (
    <Button
      className={`action-button ${isLoadingResults && "loading-button"}`}
      disabled={isLoadingResults}
      component="label"
      role={undefined}
      tabIndex={-1}
      color="inherit"
    >
      <img alt="Upload Image" src="/upload-icon.svg" height={50} />
      <VisuallyHiddenInput type="file" onChange={handleUpload} />
    </Button>
  );
}
