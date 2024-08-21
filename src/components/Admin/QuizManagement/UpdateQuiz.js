import React, { useCallback, useEffect, useState } from 'react'
import FormSelectCustom from './FormSelectCustom'
import "./UpdateQuiz.scss"
import { getQuestionWithAnswer, postAnswer, postQuestion } from '../../../api/questionApi';
import { toast } from 'react-toastify';
import AddingQuestion from './AddingQuestion';


const UpdateQuiz = ({ quizList }) => {
    const [questionList, setQuestionList] = useState([])
    const [selectedQuizId, setSelectedQuizId] = useState(0)

    const createFirstQuestion = async (quizId, aQuestion) => {
        if (aQuestion.length === 0) {
            const res = await postQuestion(quizId, " ", null)
            const resAns = await postAnswer(res?.DT.id, " ", false)
            console.log(res, resAns)
            const qData = res.DT;
            const aData = resAns.DT;
            return [
                {
                    id: qData?.id,
                    description: qData?.description,
                    imageFile: '',
                    imageName: '',
                    answers: [
                        {
                            id: aData?.id,
                            description: aData?.description,
                            isCorrect: aData?.correct_answer
                        }
                    ]
                }
            ]
        }
        return aQuestion;
    }

    const updateSelectedQuiz = useCallback(async () => {
        if (selectedQuizId === 0) return;

        const res = await getQuestionWithAnswer(selectedQuizId)
        console.log(res)
        if (!(res && res.EC === 0)) {
            toast.error(res.EM)
        }
        if (+res?.DT?.quizId === selectedQuizId) {
            console.log("Get quiz successful!")
            const arrayQuestion = await createFirstQuestion(res.DT.quizId, res.DT.qa)
            setQuestionList(arrayQuestion.sort((o1, o2) => o1.id - o2.id))
        } else {
            toast.error(res?.EM)
        }
    }, [selectedQuizId])

    useEffect(() => {
        updateSelectedQuiz()
    }, [updateSelectedQuiz])

    return (
        <div className="update-quiz-area">
            <div className="mb-3">
                <FormSelectCustom
                    title="Select a quiz"
                    keyValueList={quizList.map(q => { return { value: q.id, title: q.name } })}
                    selected={selectedQuizId}
                    setSelected={setSelectedQuizId}
                />
            </div>
            {questionList?.map((question, index) =>
                <AddingQuestion
                    key={`adding-question-${index}`}
                    quizId={selectedQuizId}
                    question={question}
                    updateSelectedQuiz={updateSelectedQuiz}
                />
            )}

            {/* <button className="btn btn-primary mt-5 px-4">Save</button> */}
        </div >
    )
}

export default UpdateQuiz