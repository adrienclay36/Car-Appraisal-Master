import React, { useContext } from 'react'
import { SurveyContext } from '../../store/SurveyStore'
import styles from './ReviewAnswers.module.css';
import { useNavigate } from 'react-router-dom';
import ReviewItem from './ReviewItem';
const ReviewAnswers = () => {
  const surveyContext = useContext(SurveyContext);
  const navigate = useNavigate();
  const submitFormHandler = () => {
    navigate("/results");
  }
  return (
    <div className="flex flex-1 justify-center items-center">

      <div
        className={`w-11/12 lg:w-2/6 md:w-2/6 bg-gray-100 border-2 rounded-md shadow-md p-10 ${styles.slideIn}`}
      >
        <h1 className="text-xl font-semibold mb-4 text-center">Review Your Answers</h1>
        {surveyContext.questions.map((question, index) => (
          <ReviewItem key={question.question} question={question.question} answer={surveyContext.selectedValues[question.id]} index={index}/>
        ))}
        <div className="flex flex-1 w-full justify-between mt-8">
          <button
            onClick={() => surveyContext.prevQuestion(true)}
            className={`text-center text-black bg-white w-11/12 lg:w-2/6 md:w-2/6 uppercase border-2 p-4 border-r-8 hover:text-slate-500 hover:bg-slate-100`}
          >
            Go Back
          </button>
          <button
          onClick={submitFormHandler}
            className={`text-center text-black bg-white w-11/12 lg:w-2/6 md:w-2/6 uppercase border-2 p-4 border-r-8 hover:text-slate-500 hover:bg-slate-100`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewAnswers