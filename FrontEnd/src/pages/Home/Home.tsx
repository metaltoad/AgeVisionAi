import { Button, Card, CardContent, styled } from "@mui/material";
import convertToBase64 from "../../utils/convertToBase64";
import "./Home.scss";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Home = () => {
  const handleUpload = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    console.log(event.target);

    // console.log(event.target.value);
    // convertToBase64(event.target.value);
  };

  return (
    <div className="home">
      <Card className="card">
        <CardContent className="card-content">
          <div className="actions-wrapper">
            <Button
              className="action-button"
              component="label"
              role={undefined}
              tabIndex={-1}
              color="inherit"
            >
              <img alt="Upload Image" src="/upload-icon.svg" height={50} />
              <VisuallyHiddenInput type="file" onClick={handleUpload} />
            </Button>
            <Button className="action-button" color="inherit">
              <img
                alt="Take a picture"
                src="/take-a-photo-icon.svg"
                height={50}
              />
            </Button>
          </div>
          <div className="info-wrapper">
            <span>Supported formats: png, jpeg</span>
            <span>Maximum file size: 6MB</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
