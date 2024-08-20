import React, { useEffect, useState } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import { BsPatchMinusFill, BsPatchPlusFill } from 'react-icons/bs'
import AddingAnswer from './AddingAnswer'
import { deleteQuestion, postAnswer, postQuestion, updateQuestion } from '../../../api/questionApi'
import { toast } from 'react-toastify'

const AddingQuestion = ({ quizId, question, updateSelectedQuiz }) => {
    const [description, setDescription] = useState("")
    const [answerList, setAnswerList] = useState([])

    useEffect(() => {
        setAnswerList(question?.answers)
        setDescription(question?.description ?? "")
    }, [question])


    const addQuestion = async (image) => {
        const res = await postQuestion(quizId, " ", image)
        if (+res?.EC !== 0) {
            toast.error(res?.EM)
            return;
        }

        const resAns = await postAnswer(res?.DT.id, " ", false)

        if (+resAns?.EC === 0) {
            updateSelectedQuiz()
        } else {
            toast.error(res?.EM)
        }
        console.log(question, res)
    }

    const removeQuestion = async () => {
        const res = await deleteQuestion(question.id, quizId)
        console.log(question, res)
        if (+res?.EC === 0) {
            updateSelectedQuiz()
        } else {
            toast.error(res?.EM)
        }
    }

    const onHandleBlur = async (image) => {
        await updateQuestion(question.id, quizId, description, image)
    }


    return (
        <div className="update-question-entry">
            <div className="mb-3 row ">
                <label className="d-block form-label">Add questions:</label>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control" placeholder="Enter a question"
                        value={description}
                        onChange={e => {
                            setDescription(e.target.value)
                        }}
                        onBlur={() => onHandleBlur(null)}
                    />
                </div>
                <div className="d-flex justify-content-center col-md-3 ">
                    <span className="upload-image-icon-container">
                        <span className="upload-image-icon"><BiSolidImageAdd size="24" /></span><span> 0 uploaded file</span>
                    </span>
                </div>
                <div className="d-flex gap-3 justify-content-center col-md-1">
                    <span className="add-question-icon" onClick={e => addQuestion(" ", null)}><BsPatchPlusFill size="24" /></span>
                    <span className="remove-question-icon" onClick={e => removeQuestion()}><BsPatchMinusFill size="24" /></span>
                </div>
            </div>

            {answerList?.map(a =>
                <AddingAnswer
                    key={`adding-answer-${a.id}`}
                    questionId={question.id}
                    answer={a}
                    updateSelectedQuiz={updateSelectedQuiz}
                    disableDeleteButton={answerList.length <= 1}
                />
            )}
        </div>
    )
}

export default AddingQuestion