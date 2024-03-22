import { useAtom } from "jotai";
import "./Results.scss";
import { ResultsContainer } from "../../components/ResultsContainer/ResultsContainer";
import { ButtonsContainer } from "../../components/ButtonsContainer/ButtonsContainer";
import { InfoWrapper } from "../../components/InfoWrapper";
import { imageAtom } from "../../store/mainAtom";

export const Results = () => {
  const [image, setImage] = useAtom(imageAtom);

  return (
    <div className="results">
      <img alt="uploaded image" src={image} />
      <div className="results-container">
        <ResultsContainer />
        <ButtonsContainer />
        <InfoWrapper isResultsPage />
      </div>
    </div>
  );
};
