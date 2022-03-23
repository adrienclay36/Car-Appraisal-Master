import React, { useContext } from 'react'
import styles from './Results.module.css';
import MainWindow from '../MainWindow';
import { SurveyContext } from '../../store/SurveyStore';

const Results = () => {
    const surveyContext = useContext(SurveyContext);


    if(surveyContext.loadingPrediction) {
        return null;
    }
    console.log(surveyContext.prediction)
   
    return (
        <MainWindow>
            <div className="flex flex-1 justify-center items-center">

                <div
                    className={`w-11/12 lg:w-2/6 md:w-2/6 bg-gray-100 border-2 rounded-md shadow-md p-10 ${styles.slideIn}`}
                >
                    <p>Our analysis shows that your car is worth <span className="font-bold">${surveyContext.prediction}</span></p>
                    {/* <p>We recommend that you consider a price range for your car between ${low} and ${high}</p> */}
                </div>
            </div>

        </MainWindow>
    )
}

export default Results