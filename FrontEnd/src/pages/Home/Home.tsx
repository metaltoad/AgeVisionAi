import convertToBase64 from "../../utils/convertToBase64";
import "./Home.scss";

export const Home = () => {
  const handleUpload = (e) => {
    console.log(e.target.value);
    convertToBase64(e.target.value);
  };

  return (
    <div className="home">
      <main>
        <div className="icons-container">
          <input
            type="file"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onClick={(e) => handleUpload(e)}
            id="contained-button-file"
          />
          <label htmlFor="contained-button-file">
            <img alt="upload image" src="/upload-icon.svg" />
          </label>
          <img alt="take a photo" src="/take-a-photo-icon.svg" />
        </div>
        <div className="info-container">
          <span>Supported formats: png, jpeg</span>
          <span>Maximum file size: 3MB</span>
        </div>
      </main>
    </div>
  );
};
