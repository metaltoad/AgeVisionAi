import { useAtom } from "jotai";
import "./Header.scss";

import { Typography } from "@mui/material";
import { ageAtom, emotionAtom, imageAtom } from "../../store/mainAtom";

export const Header = () => {
  const [, setImage] = useAtom(imageAtom);
  const [, setAge] = useAtom(ageAtom);
  const [, setEmotion] = useAtom(emotionAtom);

  return (
    <div className="header">
      <a
        href="/"
        onClick={() => {
          setImage("");
          setAge(undefined);
          setEmotion("");
        }}
      >
        <img src="logo.svg" alt="AgeVision AI Logo" height={30} />
      </a>
      <Typography variant="h6">AgeVision AI</Typography>
    </div>
  );
};
