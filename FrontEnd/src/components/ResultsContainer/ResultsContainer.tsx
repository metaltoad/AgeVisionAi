import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import "./ResultsContainer.scss";
import ProgressBar from "../ProgressBar/ProgressBar";

interface ResultsContainerInterface {
  isLoadingResults: boolean;
}

export const ResultsContainer = ({
  isLoadingResults,
}: ResultsContainerInterface) => {
  return (
    <React.Fragment>
      {isLoadingResults ? (
        <Card className="results-card">
          <CardContent className="results-card-content">
            <div className="age-emotion-container">
              <Typography>Age</Typography>
              <Typography>Emotion</Typography>
            </div>
            <ProgressBar value={50} />
          </CardContent>
        </Card>
      ) : (
        <Card className="results-card">
          <CardContent className="results-card-content">
            <div className="age-emotion-container">
              <div>
                <Typography>Age</Typography>
                <Typography variant="h4">25</Typography>
              </div>
              <div>
                <Typography>Emotion</Typography>
                <Typography variant="h4">52%</Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};
