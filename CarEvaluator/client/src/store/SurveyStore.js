import React, { createContext, useState, useEffect } from "react";
import { makeListData } from "../Make_valueLabels";
import { modelListData } from "../Model_valueLabels";
import axios from 'axios';
const userQuestions = [
  {
    id: "make_cat",
    question: "Who made your vehicle?",
    listData: makeListData,
    boolean: false,
    numerical: false,
  },
  {
    id: "model_cat",
    question: "What model is it?",
    listData: modelListData,
    boolean: false,
    numerical: false,
  },
  {
    id: "mileage",
    question: "What's the mileage look like right now?",
    listData: [],
    boolean: false,
    numerical: true,
  },
  {
    id: "city_mpg",
    question: "How many MPG do you get in the city?",
    listData: [],
    boolean: false,
    numerical: true,
  },
  {
    id: "highway_mpg",
    question: "And on the highway?",
    listData: [],
    boolean: false,
    numerical: true,
  },
  {
    id: "year",
    question: "What year was your vehicle made?",
    listData: [
      { value: 2000, label: "2000" },
      { value: 2001, label: "2001" },
      { value: 2002, label: "2002" },
      { value: 2003, label: "2003" },
      { value: 2004, label: "2004" },
      { value: 2005, label: "2005" },
      { value: 2006, label: "2006" },
      { value: 2007, label: "2007" },
      { value: 2008, label: "2008" },
      { value: 2009, label: "2009" },
      { value: 2010, label: "2010" },
      { value: 2011, label: "2011" },
      { value: 2012, label: "2012" },
      { value: 2013, label: "2013" },
      { value: 2014, label: "2014" },
      { value: 2015, label: "2015" },
      { value: 2016, label: "2016" },
      { value: 2017, label: "2017" },
      { value: 2018, label: "2018" },
      { value: 2019, label: "2019" },
      { value: 2020, label: "2020" },
      { value: 2021, label: "2021" },
      { value: 2022, label: "2022" },
      { value: 2023, label: "2023" },
    ],
    boolean: false,
    numerical: false,
  },
  {
    id: "Bluetooth",
    question: "Does your vehicle have bluetooth?",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: "Backup Camera",
    question: "Does your vehicle have a back up camera?",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: "Infotainment",
    question:
      "Does your vehicle have a infotainement? (Video and audio entertainment built into the dash)",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: "Screen",
    question: "Is there a screen built into your dash?",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: "Navigation",
    question: "Does your vehicle have navigation capability?",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: "Power Seat Controls",
    question:
      "Does your vehicle have power seat controls? (electronic seat controls)",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: "Rear Air Vents",
    question: "Does your vehicle have rear air vents?",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: "Bed Liner",
    question: "Does your vehicle have a bed liner? (Trucks Only)",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: "Tow Hitch",
    question: "Does your vehicle have a tow hitch? (Trucks Only)",
    listData: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    boolean: true,
    numerical: false,
  },
];

export const SurveyContext = createContext({
  questions: [],
  nextQuestion: (answer) => {},
  prevQuestion: () => {},
  selectedValues: {},
  formComplete: false,
  index: 0,
  appendBooleans: (answers) => {},
  submitForm: () => {},
  prediction: '',
  modelError: 0,
  loadingPrediction: false,
});

const SurveyContextProvider = (props) => {
  const [questions, setQuestions] = useState(userQuestions);
  const [selectedValues, setSelectedValues] = useState({});
  const [index, setIndex] = useState(0);
  const [formComplete, setFormComplete] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [modelError, setModelError] = useState(0);
  const [loadingPrediction, setLoadingPrediction] = useState(false);


  useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues]);

  const nextQuestion = (identifier, value) => {
    setSelectedValues({
      ...selectedValues,
      [identifier]: value,
    });

    setIndex(index + 1);

    
  };

  const prevQuestion = (scrollUp) => {
    setIndex(index - 1);
    if(formComplete){
      setFormComplete(false);
    }
    if(scrollUp) {
      window.scrollTo({ top: 0, behavior: 'smooth'})
    }
  };

  const appendBooleans = (answers) => {
    console.log(answers);
    setSelectedValues({
      ...selectedValues,
      ...answers
    })
    setFormComplete(true);

  };

  const submitForm = async () => {
    setLoadingPrediction(true);
    const response = await axios.post('http://localhost:5000/evaluate', selectedValues);
    if(response.data?.status === 200){
      setPrediction(response.data.prediction);
      setModelError(response.data.error);
      
    }
    setIndex(0);
    setSelectedValues({});
    setLoadingPrediction(false);
  }

  const contextValue = {
    questions,
    nextQuestion,
    prevQuestion,
    selectedValues,
    formComplete,
    index,
    appendBooleans,
    submitForm,
    prediction,
    modelError,
    loadingPrediction,
  };

  return (
    <SurveyContext.Provider value={contextValue}>
      {props.children}
    </SurveyContext.Provider>
  );
};

export default SurveyContextProvider;
