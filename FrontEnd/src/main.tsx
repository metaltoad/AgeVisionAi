import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Results } from "./pages/Results/Results";
import { Wrapper } from "./components/Wrapper/Wrapper";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SnackBarProvider } from "./context/SnackbarContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackBarProvider>
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </SnackBarProvider>
  </React.StrictMode>
);
