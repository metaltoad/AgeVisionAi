import "./ButtonsContainer.scss";
import { CameraButton, UploadButton } from "../ActionButtons";

export const ButtonsContainer = () => {
  return (
    <div className="buttons-container">
      <UploadButton />
      <CameraButton />
    </div>
  );
};
