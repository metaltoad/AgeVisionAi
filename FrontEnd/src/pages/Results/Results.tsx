import { useState } from "react";
import "./Results.scss";
import { ResultsContainer } from "../../components/ResultsContainer/ResultsContainer";

export const Results = () => {
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  return (
    <div className="results">
      <div>
        <img alt="uploaded image" src="/example-image.svg" />
        <div>
          <ResultsContainer isLoadingResults={isLoadingResults} />
        </div>
      </div>
    </div>
  );
};
