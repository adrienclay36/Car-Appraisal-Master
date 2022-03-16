import React, { useState } from "react";
import SurveyItem from "./SurveyItem";
const Survey = () => {
  const [index, setIndex] = useState(0);
  const [selectedValue, setSelectedValues] = useState([]);

  const increaseIndex = (value) => {
    setSelectedValues(prevValues => {
      return [...prevValues, value];
    })
    if(index !== questions.length - 1) {

      setIndex(index + 1);
    }
  }

  const goBack = () => {
    setIndex(index - 1);
  }

  return <div className="flex flex-1 justify-center items-center">

          <SurveyItem index={index} goBack={goBack} key={questions[index].question} increaseIndex={increaseIndex} question={questions[index].question} listData={questions[index].listData} />
   
      </div>;
};

export default Survey;
const questions = [
  {
    question: "Who made the thing?",
    listData: [
      {
        value: "Hyundai",
        label: "Hyundai",
      },
      { value: "Toyota", label: "Toyota" },
      { value: "Ford", label: "Ford" },
    ],
  },
  {
    question: "What model is it?",
    listData: [
      {
        value: "Elantra",
        label: "Elantra",
      },
      { value: "Palisade", label: "Palisade" },

    ],
  },
];