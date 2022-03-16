import React from 'react'
import { makeListData } from '../../Make_valueLabels';
import { modelListData } from '../../Model_valueLabels';
const ReviewItem = ({ question, answer, index }) => {
    let formatAnswer;
    if (answer === 0 && index > 1) {
        formatAnswer = 'No';
    } else if (answer === 1 && index > 1) {
        formatAnswer = 'Yes';
    } else if (index === 0) {
        const obj = makeListData.find(item => item.value === answer);
        formatAnswer = obj.label;
    } else if (index === 1) {
        const obj = modelListData.find(item => item.value === answer);
        formatAnswer = obj.label;
    }
    else if (index > 1) {
        formatAnswer = answer
    }
    return (
        <div className="my-4 p-4">
            <p className="mb-2 font-semibold">{question}</p>
            <p>{formatAnswer}</p>
        </div>
    )
}

export default ReviewItem