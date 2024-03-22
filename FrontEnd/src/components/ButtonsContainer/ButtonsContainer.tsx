import "./ButtonsContainer.scss";
import { CameraButton, UploadButton } from "../ActionButtons";

interface ButtonsContainerInterface {
  isLoadingResults: boolean;
}

export const ButtonsContainer = ({
  isLoadingResults,
}: ButtonsContainerInterface) => {
  return (
    <div className="buttons-container">
      <UploadButton isLoadingResults={isLoadingResults} />
      <CameraButton isLoadingResults={isLoadingResults} />
    </div>
  );
};
