import React, { useContext } from "react";
import MainWindow from "../MainWindow";
import { SurveyContext } from "../../store/SurveyStore";
import { Link } from "react-router-dom";
import styles from "./Evaluator.module.css";

import Survey from "./Survey/Survey";
import ReviewAnswers from "./ReviewAnswers";
const HomePage = () => {
  const surveyContext = useContext(SurveyContext);
  return (
    <MainWindow>
      <div
        className={`container flex-col lg:flex-row md:flex-col justify-center lg:justify-start md:justify-center items-center mt-24 mb-12 ${styles.fadeIn}`}
      >
        <p
          className={`text-lg lg:text-9xl md:text-3xl font-extrabold text-white`}
        >
          Welcome.
        </p>
      </div>
      <div
        className={`container flex-col lg:flex-row md:flex-col justify-center lg:justify-end md:justify-center items-center mt-24 mb-16 text-left ${styles.fadeInTwo}`}
      >
        <p
          className={`text-lg lg:text-9xl md:text-3xl font-extrabold text-white`}
        >
          lets get you a price.
        </p>
      </div>
      <div
        className={`${styles.fadeInThree} container flex flex-1 justify-center items-center text-lg lg:text-4xl md:text-2xl text-white`}
      >
        <Link to="/evaluator">

          <p className="underline cursor-pointer">
            can i ask you a few questions about your vehicle?
          </p>
        </Link>

      </div>


    </MainWindow>
  );
};

export default HomePage;
