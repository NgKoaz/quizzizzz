import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const Answer = ({ answerDescriptionList, questionId, answer, selectAnswer }) => {
    return (
        <div className="answer-container">
            {answerDescriptionList && answerDescriptionList.map(a =>
                <div key={uuidv4()} className="form-check">
                    {answer?.[questionId] &&
                        <>
                            <input
                                id={`answer-check-box-${a.id}`}
                                className="form-check-input"
                                type="checkbox"
                                checked={answer?.[questionId]?.includes(a.id)}
                                onChange={(e) => selectAnswer(questionId, a.id, e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor={`answer-check-box-${a.id}`}>
                                {a.description}
                            </label>
                        </>
                    }
                </div>
            )}

        </div>
    )
}

export default Answer