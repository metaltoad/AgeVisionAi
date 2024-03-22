import "./infoWrapper.scss";

interface InfoWrapperInterface {
  isResultsPage?: boolean;
}

export default function InfoWrapper({
  isResultsPage = false,
}: InfoWrapperInterface) {
  return (
    <div
      className={`${
        isResultsPage
          ? "info-wrapper info-wrapper-results-page"
          : "info-wrapper"
      }`}
    >
      <span>Supported formats: png, jpeg</span>
      <span>Maximum file size: 6MB</span>
    </div>
  );
}
