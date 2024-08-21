import React, { useEffect, useState } from 'react'
import { clockString } from '../../../utils/stringUtils'

const ControlArea = ({ handleSubmitQuiz, answer, questionIdList, currentQuestionIndex, setCurrentQuestionIndex, isSubmitted }) => {
    const [duration, setDuration] = useState(10000)

    const generateClassName = (qId, qIndex) => {
        let c = "question-control-item";
        if (qIndex === currentQuestionIndex) c += " selected"
        if (answer[qId].length) c += " answered"
        return c;
    }

    useEffect(() => {
        if (isSubmitted) return;
        if (duration === 0) {
            handleSubmitQuiz();
            return;
        }
        setTimeout(() => {
            setDuration(duration && duration - 1)
        }, 1000)
    }, [duration, handleSubmitQuiz, isSubmitted])

    return (
        <>
            <div className="timer">
                {clockString(duration)}
            </div>
            <div className="question-panel">
                {questionIdList && questionIdList.map((id, index) =>
                    <div
                        key={`question-id-${id}-${index}`}
                        className={generateClassName(id, index)}
                        onClick={() => { setCurrentQuestionIndex(index) }}
                    >
                        {index + 1}
                    </div>
                )}
            </div>
        </>
    )
}

export default ControlArea