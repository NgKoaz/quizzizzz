import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";



const Answer = ({ answerDescriptionList, questionId, answer, selectAnswer, disabled, result }) => {
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
                                disabled={disabled}
                            />
                            <label className="form-check-label" htmlFor={`answer-check-box-${a.id}`}>
                                {a.description}
                            </label>

                            {disabled && result &&
                                (result.some(r => +r === +a.id) ?
                                    <span>
                                        <TiTick style={{ marginLeft: "10px", color: "green" }} size={24} />
                                    </span>
                                    :
                                    null
                                )
                            }

                            {answer?.[questionId]?.includes(a.id) && disabled && result &&
                                (!result.some(r => +r === +a.id) ?
                                    <span>
                                        <ImCross style={{ marginLeft: "10px", color: "red" }} size={16} />
                                    </span>
                                    :
                                    null
                                )
                            }

                        </>
                    }
                </div>
            )}

        </div>
    )
}

export default Answer