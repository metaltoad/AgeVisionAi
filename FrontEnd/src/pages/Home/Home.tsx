import "./Home.scss";

export const Home = () => {
  return (
    <div className="home">
      <main>
        <div className="icons-container">
          <input
            type="file"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
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
