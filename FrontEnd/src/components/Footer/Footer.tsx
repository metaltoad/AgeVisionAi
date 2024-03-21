import { Typography } from "@mui/material";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <Typography variant="body2">powered by</Typography>
      <a href="https://www.metaltoad.com" target="_blank">
        <img src="metaltoad.png" alt="Metal Toad Logo" height={20} />
      </a>
    </div>
  );
};
