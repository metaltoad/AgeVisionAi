import { useState } from "react";
import "./Results.scss";
import { ResultsContainer } from "../../components/ResultsContainer/ResultsContainer";
import { ButtonsContainer } from "../../components/ButtonsContainer/ButtonsContainer";
import { InfoWrapper } from "../../components/InfoWrapper";

export const Results = () => {
  const [isLoadingResults, setIsLoadingResults] = useState(true);

  return (
    <div className="results">
      <img alt="uploaded image" src="/example-image.svg" />
      <div className="results-container">
        <ResultsContainer isLoadingResults={isLoadingResults} />
        <ButtonsContainer isLoadingResults={isLoadingResults} />
        <InfoWrapper isResultsPage />
      </div>
    </div>
  );
};
