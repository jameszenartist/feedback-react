import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./index2.css";
import App from "./App";

//latest syntax:
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
