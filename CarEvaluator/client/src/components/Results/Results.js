import React, { useContext, useEffect, useState } from 'react'
import styles from './Results.module.css';
import MainWindow from '../MainWindow';
import { SurveyContext } from '../../store/SurveyStore';
import axios from 'axios';
const Results = () => {
    const surveyContext = useContext(SurveyContext);
    const [prediction, setPrediction] = useState('');
    const [modelError, setModelError] = useState();
    const [low, setLow] = useState();
    const [high, setHigh] = useState();
    const [loading, setLoading] = useState(false);

    const getPredictions = async () => {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/evaluate', surveyContext.selectedValues);
        console.log(response.data)
        console.log(response.data.prediction);
        if(response.data?.status === "200"){
          setPrediction(response.data.prediction);
          setModelError(response.data.error);
          setLow(parseFloat(response.data.prediction) - response.data.error);
          setHigh(parseFloat(response.data.prediction) + response.data.error);
          
    
        }
        setLoading(false);
    }

    useEffect(() => {
        getPredictions()
        window.scrollTo({ top: 0 })
    },[])




   if(loading){
       return <MainWindow></MainWindow>
   }
   
   console.log(prediction);
    return (
        <MainWindow>
            <div className="flex flex-1 justify-center items-center">

                <div
                    className={`w-11/12 lg:w-2/6 md:w-2/6 bg-gray-100 border-2 rounded-md shadow-md p-10 ${styles.slideIn}`}
                >
                    <p className="mb-4 text-center text-lg">Our analysis shows that your car is worth <span className="font-semibold">${parseInt(prediction).toFixed(2)}</span></p>
                    <p className="text-center">We recommend that you consider a price range for your car between <span className="font-semibold">${low}</span> and <span className="font-semibold">${high}</span></p>
                </div>
            </div>

        </MainWindow>
    )
}

export default Results