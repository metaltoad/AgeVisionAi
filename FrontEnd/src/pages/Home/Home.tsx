import "./Home.scss";

import { Card, CardContent } from "@mui/material";
import { CameraButton, UploadButton } from "../../components/ActionButtons";

export const Home = () => {
  return (
    <div className="home">
      <Card className="card">
        <CardContent className="card-content">
          <div className="actions-wrapper">
            <UploadButton />
            <CameraButton />
          </div>
          <div className="info-wrapper">
            <span>Supported formats: png, jpeg</span>
            <br></br>
            <span>Maximum file size: 6MB</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
