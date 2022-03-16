import React from "react";
import MainWindow from "../MainWindow";
import { Card, Text } from "@mantine/core";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import TabButton from "../ui/TabButton";
const Evaluator = () => {
  return (
    <MainWindow>
      <div
        className={`container flex-col lg:flex-row md:flex-col justify-center lg:justify-start md:justify-center items-center mt-24 mb-12 ${styles.fadeIn}`}
      >
        <p
          className={`text-lg lg:text-9xl md:text-3xl font-extrabold text-white`}
        >
          something is... really wrong.
        </p>

        <p className="text-5xl text-center mt-12 text-white">Let's get you back to safety</p>
      <TabButton href={'/'} buttonText="Home" width="xs" />
      </div>
    </MainWindow>
  );
};

export default Evaluator;
