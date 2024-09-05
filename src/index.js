import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import App from "./App";
import "./assets/style/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
