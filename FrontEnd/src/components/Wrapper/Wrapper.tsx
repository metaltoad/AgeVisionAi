import { PropsWithChildren } from "react";
import "./Wrapper.scss";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="children">{children}</div>
      <Footer />
    </div>
  );
};
