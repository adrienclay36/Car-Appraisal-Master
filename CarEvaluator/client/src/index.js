import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SurveyContextProvider from "./store/SurveyStore";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SurveyContextProvider>
        <App />
      </SurveyContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
