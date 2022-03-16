import React, { createContext, useState, useEffect} from 'react'
import * as makeListData from '../Make_valueLabels.json';
import * as modelListData from '../Model_valueLabels.json';
const userQuestions = [
  {
    id: 'make_cat',
    question: "Who made your vehicle?",
    listData: [
      {
        value: "Hyundai",
        label: "Hyundai",
      },
      { value: "Toyota", label: "Toyota" },
      { value: "Ford", label: "Ford" },
    ],
    boolean: false,
    numerical: false,
  },
  {
    id: 'model_cat',
    question: "What model is it?",
    listData: [
      {
        value: "Elantra",
        label: "Elantra",
      },
      { value: "Palisade", label: "Palisade" },
    ],
    boolean: false,
    numerical: false,
  },
  {
    id: 'mileage',
    question: 'How many miles on that bad boy?',
    listData: [],
    boolean: false,
    numerical: true,
  },
  {
    id: 'city_mpg',
    question: 'How many MPG do you get in the city?',
    listData: [],
    boolean: false,
    numerical: true,
  },
  {
    id: 'highway_mpg',
    question: 'And on the highway?',
    listData: [],
    boolean: false,
    numerical: true,
  },
  {
    id: 'Blueooth',
    question: 'Does your vehicle have bluetooth?',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'Backup Camera',
    question: 'Does your vehicle have a back up camera?',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'Infotainment',
    question: 'Does your vehicle have a infotainement? (Video and audio entertainment built into the dash)',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'Screen',
    question: 'Is there a screen built into your dash?',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'Navigation',
    question: 'Does your vehicle have navigation capability?',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'Power Seat Controls',
    question: 'Does your vehicle have power seat controls? (electronic seat controls)',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'Rear Air Vents',
    question: 'Does your vehicle have rear air vents?',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'Bed Liner',
    question: 'Does your vehicle have a bed liner? (Trucks Only)',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'Tow Hitch',
    question: 'Does your vehicle have a tow hitch? (Trucks Only)',
    listData: [
      { value: 1, label: 'Yes'},
      { value: 0, label: 'No'},
    ],
    boolean: true,
    numerical: false,
  },
  {
    id: 'year',
    question: 'What year was your vehicle made?',
    listData: [
      { value: 2000, label: '2000'},
      { value: 2001, label: '2001'},
      { value: 2002, label: '2002'},
      { value: 2003, label: '2003'},
      { value: 2004, label: '2004'},
      { value: 2005, label: '2005'},
      { value: 2006, label: '2006'},
      { value: 2007, label: '2007'},
      { value: 2008, label: '2008'},
      { value: 2009, label: '2009'},
      { value: 2010, label: '2010'},
      { value: 2011, label: '2011'},
      { value: 2012, label: '2012'},
      { value: 2013, label: '2013'},
      { value: 2014, label: '2014'},
      { value: 2015, label: '2015'},
      { value: 2016, label: '2016'},
      { value: 2017, label: '2017'},
      { value: 2018, label: '2018'},
      { value: 2019, label: '2019'},
      { value: 2020, label: '2020'},
      { value: 2021, label: '2021'},
      { value: 2022, label: '2022'},
      { value: 2023, label: '2023'},
    ],
    boolean: false,
    numerical: false,
  }
];

export const SurveyContext = createContext({
    questions: [],
    nextQuestion: (answer) => {},
    prevQuestion: () => {},
    selectedValues: {},
    index: 0,
})

const SurveyContextProvider = (props) => {
    const [questions, setQuestions] = useState(userQuestions)
    const [selectedValues, setSelectedValues] = useState({});
    const [index, setIndex] = useState(0);


    useEffect(() => {
      console.log(selectedValues);
    }, [selectedValues])


    const nextQuestion = (identifier, value) => {

      setSelectedValues({
        ...selectedValues,
        [identifier]: value,
      })

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
        selectedValues,
        index,
    }




  return (
    <SurveyContext.Provider value={contextValue}>
        {props.children}
    </SurveyContext.Provider>
  )
}

export default SurveyContextProvider

