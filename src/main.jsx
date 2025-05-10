import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/styles.css";
import MetaPixel from "./components/MetaPixel";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <MetaPixel />
  <BrowserRouter>
    <App />
  </BrowserRouter>
</>
);