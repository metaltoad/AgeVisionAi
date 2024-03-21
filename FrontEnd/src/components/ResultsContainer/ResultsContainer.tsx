import React from "react";
import { Typography } from "@mui/material";
import "./ResultsContainer.scss";

interface ResultsContainerInterface {
  isLoadingResults: boolean;
}

export const ResultsContainer = ({
  isLoadingResults,
}: ResultsContainerInterface) => {
  return (
    <React.Fragment>
      {isLoadingResults ? (
        <div>
          <div>
            <Typography>Age</Typography>
            <Typography>Emotion</Typography>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};
