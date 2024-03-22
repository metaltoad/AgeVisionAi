import "./Home.scss";

import { Card, CardContent } from "@mui/material";
import { CameraButton, UploadButton } from "../../components/ActionButtons";
import { InfoWrapper } from "../../components/InfoWrapper";

export const Home = () => {
  return (
    <div className="home">
      <Card className="card">
        <CardContent className="card-content">
          <div className="actions-wrapper">
            <UploadButton />
            <CameraButton />
          </div>
          <InfoWrapper />
        </CardContent>
      </Card>
    </div>
  );
};
