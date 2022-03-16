import React, { useState, useContext } from "react";
import SurveyItem from "./SurveyItem";
import { SurveyContext } from "../../../store/SurveyStore";
const Survey = () => {
  const surveyContext = useContext(SurveyContext);

  

  

  return (
    <div className="flex flex-1 justify-center items-center">
      <SurveyItem
        index={surveyContext.index}
        goBack={surveyContext.prevQuestion}
        id={surveyContext.questions[surveyContext.index].id}
        increaseIndex={surveyContext.nextQuestion}
        question={surveyContext.questions[surveyContext.index].question}
        listData={surveyContext.questions[surveyContext.index].listData}
        isNumerical={surveyContext.questions[surveyContext.index].numerical}
        booleanField={surveyContext.questions[surveyContext.index].boolean}
      />
    </div>
  );
};

export default Survey;
