import React, { useEffect, useRef, useState } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import { BsPatchMinusFill, BsPatchPlusFill } from 'react-icons/bs'
import AddingAnswer from './AddingAnswer'
import { deleteAnswer, deleteQuestion, postAnswer, postQuestion, updateQuestion } from '../../../api/questionApi'
import { toast } from 'react-toastify'
import { PhotoProvider, PhotoSlider, PhotoView } from 'react-photo-view'
import { base64ToBlobUrl } from '../../../utils/fileProcessing'

const AddingQuestion = ({ quizId, question, updateSelectedQuiz }) => {
    const [description, setDescription] = useState("")
    const [answerList, setAnswerList] = useState([])
    const [image, setImage] = useState(null)
    const [blobUrl, setBlobUrl] = useState(null)
    const formRef = useRef(null)

    useEffect(() => {
        setAnswerList(question?.answers)
        setDescription(question?.description ?? "")
        if (question?.imageFile)
            setBlobUrl(base64ToBlobUrl(question?.imageFile))
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
    }

    const removeQuestion = async () => {
        const res = await deleteQuestion(question.id, quizId)
        if (+res?.EC === 0) {
            await Promise.all(question?.answers?.map(async a => {
                await deleteAnswer(a.id)
            }))

            updateSelectedQuiz()
        } else {
            toast.error(res?.EM)
        }
    }

    const onHandleBlur = async (image) => {
        if (question.description !== description) {
            await updateQuestion(question.id, quizId, description, image)
            updateSelectedQuiz()
        }

    }

    const handleUpload = async (e) => {
        const uploadedImage = e.target.files?.[0];
        if (uploadedImage) {
            const res = await updateQuestion(question.id, quizId, description, uploadedImage)
            if (res && +res.EC === 0) {
                setImage(uploadedImage)
                setBlobUrl(URL.createObjectURL(uploadedImage))
                toast.success("Image was uploaded!")
                return;
            }
        }
        setImage(null)
        if (question?.imageFile)
            setBlobUrl(base64ToBlobUrl(question?.imageFile))
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
                    <input
                        ref={formRef}
                        onChange={handleUpload}
                        id={`upload-file-for-question-${question.id}`}
                        type="file"
                        hidden
                        accept=".jpg, .jpeg, .png, .gif"
                    />
                    <span onClick={(e) => formRef.current.click()} className="upload-image-icon-container">
                        <span className="upload-image-icon"><BiSolidImageAdd size="24" /></span><span> {blobUrl ? "1 uploaded file" : "No uploaded file"}</span>
                    </span>
                    {blobUrl &&
                        <PhotoProvider>
                            <PhotoView src={blobUrl}>
                                <span
                                    style={{ marginLeft: "10px", color: "blue", cursor: "pointer" }}
                                    onClick={e => console.log(e)}
                                >
                                    Preview
                                </span>
                            </PhotoView>
                        </PhotoProvider>
                    }
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