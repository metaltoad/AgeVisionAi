import { useAtom } from "jotai";
import "./Results.scss";
import { ResultsContainer } from "../../components/ResultsContainer/ResultsContainer";
import { ButtonsContainer } from "../../components/ButtonsContainer/ButtonsContainer";
import { InfoWrapper } from "../../components/InfoWrapper";
import { imageAtom } from "../../store/mainAtom";
import { useMemo } from "react";
import HideImageIcon from "@mui/icons-material/HideImage";
import { Typography } from "@mui/material";

export const Results = () => {
  const [image] = useAtom(imageAtom);

  const hasNoImage = useMemo(() => {
    return image === "";
  }, [image]);

  return (
    <div className="results">
      <div className="img-wrapper">
        <img alt="uploaded image" src={image || "/example-image.svg"} />
        {hasNoImage && (
          <div className="no-image">
            <Typography variant="h6">No image</Typography>
            <HideImageIcon className="no-image-icon" />
          </div>
        )}
      </div>
      <div className="results-container">
        <ResultsContainer />
        <div className="upload-container">
          <ButtonsContainer />
          <InfoWrapper isResultsPage />
        </div>
      </div>
    </div>
  );
};
