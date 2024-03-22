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
import { useSnackBar } from "../../context/SnackbarContext";

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

const ERROR_MESSAGE =
  "An error has ocurred. Please check the supported formats and maximum file size before trying again.";

export function CameraButton() {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const [, setImage] = useAtom(imageAtom);
  const [, setAge] = useAtom(ageAtom);
  const [, setEmotion] = useAtom(emotionAtom);
  const [isLoadingResults, setIsLoadingResults] = useAtom(isLoadingResultsAtom);

  const handleUpload = async () => {
    try {
      setIsLoadingResults(true);

      const base64 = await handleCamera(setImage);

      const { Age, Emotion } = await provider.getImageInfo({
        FileExtension: "png",
        Image: base64,
      });

      setAge(Age);
      setEmotion(Emotion);
      navigate("/results");
    } catch {
      showSnackBar(ERROR_MESSAGE, "error");
      setImage("");
      setAge(undefined);
      setEmotion("");
    } finally {
      setIsLoadingResults(false);
    }
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
  const { showSnackBar } = useSnackBar();
  const [, setImage] = useAtom(imageAtom);
  const [, setAge] = useAtom(ageAtom);
  const [, setEmotion] = useAtom(emotionAtom);
  const [isLoadingResults, setIsLoadingResults] = useAtom(isLoadingResultsAtom);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
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
      const { Age, Emotion } = await provider.getImageInfo({
        FileExtension: imageType,
        Image: base64,
      });

      setAge(Age);
      setEmotion(Emotion);
    } catch {
      showSnackBar(ERROR_MESSAGE, "error");
      setImage("");
      setAge(undefined);
      setEmotion("");
    } finally {
      setIsLoadingResults(false);
    }
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
