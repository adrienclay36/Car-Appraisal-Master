import React, { useState } from "react";
import { Select } from "@mantine/core";
import TabButton from "../../ui/TabButton";
const SurveyItem = ({ question, listData, index, increaseIndex, goBack }) => {
  const [selectedValue, setSelectedValue] = useState();
  return (
    <div className="w-11/12 lg:w-2/6 md:w-2/6 bg-gray-100 border-2 rounded-md shadow-md p-10">
      <h1 className="text-xl font-semibold mb-4">{question}</h1>

      <Select
        label="Pick an option from the dropdown"
        required
        data={listData}
        value={selectedValue}
        onChange={setSelectedValue}
      />

     
      <div className="text-center mt-8">
        <button
          onClick={() => increaseIndex(selectedValue)}
          className={`text-center text-black bg-white w-11/12 lg:w-3/6 md:w-3/6 uppercase border-2 p-4 border-r-8 hover:text-slate-500 hover:bg-slate-100`}
        >
          Next
        </button>
      </div>

      {index > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={goBack}
            className={`text-center text-black bg-white w-11/12 lg:w-3/6 md:w-3/6 uppercase border-2 p-4 border-r-8 hover:text-slate-500 hover:bg-slate-100`}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default SurveyItem;


