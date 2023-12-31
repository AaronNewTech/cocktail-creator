import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import LoginContext from "./components/LoginContext";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <LoginContext>
      <App />
    </LoginContext>
  </BrowserRouter>
  // </React.StrictMode>
);
