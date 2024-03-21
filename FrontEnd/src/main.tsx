import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Results } from "./pages/Results/Results";
import { Wrapper } from "./components/Wrapper/Wrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Wrapper>
        <Home />
      </Wrapper>
    ),
  },
  {
    path: "/results",
    element: (
      <Wrapper>
        <Results />
      </Wrapper>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
