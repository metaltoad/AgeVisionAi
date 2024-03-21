import "./Header.scss";

import { Typography } from "@mui/material";

export const Header = () => {
  return (
    <div className="header">
      <a href="/">
        <img src="logo.svg" alt="AgeVision AI Logo" height={30} />
      </a>
      <Typography variant="h6">AgeVision AI</Typography>
    </div>
  );
};
