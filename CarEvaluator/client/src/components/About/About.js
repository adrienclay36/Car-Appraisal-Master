import React from "react";
import MainWindow from "../MainWindow";
import styles from "./About.module.css";
const About = () => {
  return (
    <MainWindow>
      <div className="flex flex-1 justify-center items-center">
        <div
          className={`w-11/12 lg:w-2/6 md:w-2/6 bg-gray-100 border-2 rounded-md shadow-md p-10 ${styles.slideIn} text-center`}
        >
          <h1 className="text-lg lg:text-2xl md:text-xl text-center mb-4">
            From Scraping To Training
          </h1>

          <p className="text-gray-500 text-lg mb-6">
            React.js &sdot; XGBoost &sdot; Flask
          </p>

          <p className="mb-4">
            This app utilizes data scraped from Carvana with BeautifulSoup4 and
            Selenium. This data was then cleaned and used as training data for
            an XGBRegressor model.
          </p>

          <p>
            You can check out the full GitHub repository{" "}
            <a
              className="text-blue-700 hover:underline"
              href="https://github.com/adrienclay36/Car-Appraisal-Master"
              rel="noreferrer"
              target="_blank"
            >
              here
            </a>
          </p>

          <p>
            You can find my personal website{" "}
            <a
              className="text-blue-700 hover:underline"
              href="https://www.adrienclay.co/"
              rel="noreferrer"
              target="_blank"
            >
              here
            </a>
          </p>
        </div>
      </div>
    </MainWindow>
  );
};

export default About;
