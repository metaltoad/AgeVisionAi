import "./Header.scss";

import { Typography } from "@mui/material";

export const Header = () => {
  return (
    <div className="header">
      <img src="logo.svg" alt="AgeVision AI Logo" />
      <Typography variant="h1" component="h2">
        h1. Heading
      </Typography>
    </div>
  );
};
