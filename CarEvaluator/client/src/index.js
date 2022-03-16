import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SurveyContextProvider from "./store/SurveyStore";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <SurveyContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SurveyContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
