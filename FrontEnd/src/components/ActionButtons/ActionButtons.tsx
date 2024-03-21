import { Button, styled } from "@mui/material";

import "./ActionButtons.scss";

import convertToBase64 from "../../utils/convertToBase64";
import { provider } from "../../services/provider";
import handleCamera from "../../utils/handleCamera";

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
  const handleUpload = async () => {
    const base64 = await handleCamera();

    const imageInfo = await provider.getImageInfo({
      FileExtension: "png",
      Image: base64,
    });

    console.log("image info", imageInfo);
  };

  return (
    <Button onClick={handleUpload} className="action-button" color="inherit">
      <img alt="Take a picture" src="/take-a-photo-icon.svg" height={50} />
    </Button>
  );
}

export function UploadButton() {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);

    const file = event.target.files?.[0];

    if (!file) return;

    const imageType = file.type.split("/")[1];

    const base64 = await convertToBase64({ File: file });
    const imageInfo = await provider.getImageInfo({
      FileExtension: imageType,
      Image: base64,
    });

    console.log("image info", imageInfo);
  };

  return (
    <Button
      className="action-button"
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
