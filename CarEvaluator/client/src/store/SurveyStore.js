import React, { createContext, useState, useEffect} from 'react'

const userQuestions = [
  {
    question: "Who made your vehicle?",
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

export const SurveyContext = createContext({
    questions: [],
    nextQuestion: (answer) => {},
    prevQuestion: () => {},
    index: 0,
})

const SurveyContextProvider = (props) => {
    const [questions, setQuestions] = useState(userQuestions)
    const [selectedValues, setSelectedValues] = useState([]);
    const [index, setIndex] = useState(0);


    const nextQuestion = (value) => {

      setSelectedValues((prevValues) => {
        return [...prevValues, value];
      });
      if (index !== questions.length - 1) {
        setIndex(index + 1);
      }
    };

    const prevQuestion = () => {
      setIndex(index - 1);
    };

    const contextValue = {
        questions,
        nextQuestion,
        prevQuestion,
        index,
    }




  return (
    <SurveyContext.Provider value={contextValue}>
        {props.children}
    </SurveyContext.Provider>
  )
}

export default SurveyContextProvider

