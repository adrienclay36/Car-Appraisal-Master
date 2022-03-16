import React from "react";
import MainWindow from "../MainWindow";
import { Card, Text } from "@mantine/core";
import styles from "./Evaluator.module.css";
import { MdDirectionsCar } from "react-icons/md";
import Survey from "./Survey/Survey";
const Evaluator = () => {
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
        <a href="#questions" rel="noreferrer">
          <p className="underline cursor-pointer">
            can i ask you a few questions about your vehicle?
          </p>
        </a>
      </div>

      <section id="questions" className="mt-60">
        <Survey/>
        </section>
    </MainWindow>
  );
};

export default Evaluator;
