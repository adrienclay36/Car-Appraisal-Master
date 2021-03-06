import React, { useState, useContext } from "react";
import SurveyItem from "./SurveyItem";
import { SurveyContext } from "../../../store/SurveyStore";
import MainWindow from "../../MainWindow";
import ReviewAnswers from "../ReviewAnswers";
import BooleanQuestions from "./BooleanQuestions";
const Survey = () => {
  const surveyContext = useContext(SurveyContext);





  return (
    <MainWindow>
      <div className="flex flex-1 justify-center items-center">
        {surveyContext.formComplete && <ReviewAnswers />}
        {surveyContext.index < 6 && !surveyContext.formComplete && (
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
        )}
        {surveyContext.index >= 6 && !surveyContext.formComplete && <BooleanQuestions/>}
      </div>
    </MainWindow>
  );
};

export default Survey;
