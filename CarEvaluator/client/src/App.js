import "./App.css";
import React, { useEffect, useState } from "react";
import HomePage from "./components/Evaluator/HomePage";
import { Routes, Route } from "react-router-dom";
import Survey from "./components/Evaluator/Survey/Survey";
import NotFound from "./components/404/NotFound";
import Results from "./components/Results/Results";
import About from "./components/About/About";
import axios from "axios";
import MainWindow from "./components/MainWindow";
import { Loader } from "@mantine/core";
function App() {
  const [loadingServer, setLoadingServer] = useState(false);
  const [serverError, setServerError] = useState(false);

  const startServer = async () => {
    setLoadingServer(true);
    const response = await axios.get("https://pricepoint-server.herokuapp.com/");
    if (response.data.status === 200) {
      setLoadingServer(false);
    }
  };
  
  useEffect(() => {
    startServer();
  } ,[])
  
  if (loadingServer) {
    return (
      <div
        className={`bg-gradient-to-b from-slate-300 to-slate-500 w-screen h-screen overflow-scroll scrollHide flex-1 justify-center items-center`}
      >
        <div className="mt-60 flex flex-1 flex-col justify-center items-center">
        <Loader color="blue" size="xl"/>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`bg-gradient-to-b from-slate-300 to-slate-500 w-screen h-screen overflow-scroll scrollHide`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evaluator" element={<Survey />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
