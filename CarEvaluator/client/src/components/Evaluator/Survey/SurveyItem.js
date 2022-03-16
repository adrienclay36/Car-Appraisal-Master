import React, { useState, useContext } from "react";
import { NumberInput, Select } from "@mantine/core";
import TabButton from "../../ui/TabButton";
import styles from './SurveyItem.module.css';
import { SurveyContext } from "../../../store/SurveyStore";
const SurveyItem = ({ id, question, listData, index, increaseIndex, goBack, isNumerical, booleanField }) => {
  const surveyContext = useContext(SurveyContext);
  const [error, setError] = useState(false);
  const [selectedValue, setSelectedValue] = useState(surveyContext.selectedValues[id] || null);

  const setValueAndClear = () => {
    if (selectedValue || selectedValue === 0) {
      increaseIndex(id, selectedValue, question);
      setError(false);
    } else {
      setError(true);
    }
    setSelectedValue(null);
    if(isNumerical) {
      setSelectedValue(0);
    }
  }

  const onValueChangeHandler = (value) => {
    setSelectedValue(value);
    if (error) {
      setError(false);
    }
  }
  const goBackAndClear = () => {
    setSelectedValue(null)
    if (isNumerical) {
      setSelectedValue(0);
    }
    goBack();
  }

  return (
    <div
      className={`w-11/12 lg:w-2/6 md:w-2/6 bg-gray-100 border-2 rounded-md shadow-md p-10 ${styles.slideIn}`}
    >
      <h1 className="text-xl font-semibold mb-4">{question}</h1>

      {!isNumerical && <Select
        label="Pick an option from the dropdown"
        searchable={!booleanField}
        clearable
        required
        
        data={listData}
        error={error && "You must select an option from the dropdown menu."}
        value={selectedValue}
        onChange={onValueChangeHandler}
      />}

      {isNumerical && <NumberInput value={selectedValue} onChange={onValueChangeHandler} label="Enter a number" min={0} />}

      <div className="flex flex-1 w-full justify-between mt-8">
        <button
          disabled={index === 0}

          onClick={goBackAndClear}
          className={`text-center text-black bg-white w-11/12 lg:w-2/6 md:w-2/6 uppercase border-2 p-4 border-r-8 hover:text-slate-500 hover:bg-slate-100`}
        >
          Go Back
        </button>
        <button
          onClick={setValueAndClear}
          className={`text-center text-black bg-white w-11/12 lg:w-2/6 md:w-2/6 uppercase border-2 p-4 border-r-8 hover:text-slate-500 hover:bg-slate-100`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SurveyItem;
