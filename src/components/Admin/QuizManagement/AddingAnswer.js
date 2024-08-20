import React, { useCallback, useEffect, useState } from 'react'
import { BsDashCircleDotted, BsPlusCircleDotted } from 'react-icons/bs'
import { deleteAnswer, postAnswer, putAnswer } from '../../../api/questionApi'

const AddingAnswer = ({ questionId, answer, updateSelectedQuiz, disableDeleteButton }) => {
    const [isChecked, setIsChecked] = useState(false)
    const [description, setDescription] = useState("")
    const helo = () => {
        return description;
    }
    console.log("TAO THAY DOI ROI----------------------------", helo(), answer.description)
    useEffect(() => {
        if (answer) {
            setIsChecked(answer.isCorrect)
            setDescription(answer.description)
        }
    }, [answer])

    const addAnswer = async (description) => {
        await postAnswer(questionId, description, false)
        updateSelectedQuiz()
    }

    const removeAnswer = async () => {
        await deleteAnswer(answer.id)
        updateSelectedQuiz()
    }

    const onHandleBlur = useCallback(async () => {
        console.log("answer desc old: ", answer.description)
        console.log("answer desc new: ", description)
        console.log("answer check old: ", answer.isCorrect)
        console.log("answer check new: ", isChecked)

        if (answer.description !== description || answer.isCorrect !== isChecked) {
            await putAnswer(questionId, answer.id, description, isChecked)
        }
        updateSelectedQuiz()
    }, [answer.description, answer.isCorrect, answer.id, description, isChecked, questionId, updateSelectedQuiz])

    return (
        <div className="row my-3">
            <div className="offset-md-1 col-md-6 ">
                <div className="input-group">
                    <div className="input-group-text">
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            aria-label="Checkbox for following text input"
                            checked={isChecked}
                            onChange={e => setIsChecked(e.target.checked)}
                            onBlur={onHandleBlur}
                        />
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Text input with checkbox"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        onBlur={onHandleBlur}
                    />
                </div>
            </div>
            <div className="answer-action d-flex justify-content-center gap-3 col-md-2">
                <span className="add-answer-icon" onClick={() => addAnswer(" ")}><BsPlusCircleDotted size="24" /></span>
                {disableDeleteButton ||
                    <span className="remove-answer-icon" onClick={e => removeAnswer()}>
                        <BsDashCircleDotted size="24" />
                    </span>
                }
            </div>
        </div>
    )
}

export default AddingAnswer