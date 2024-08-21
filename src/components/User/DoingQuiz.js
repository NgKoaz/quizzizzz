import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./DoingQuiz.scss"
import { getQuestionsById, getQuizById, submitQuiz } from '../../api/quizApi';
import Question from './Shared/Question';
import ControlArea from './Shared/ControlArea';
import ConfirmSubmitQuiz from './Shared/ConfirmSubmitQuiz';
import { toast } from 'react-toastify';
import ResultModal from './Shared/ResultModal';

const DoingQuiz = () => {
    const { id } = useParams();
    const [quizId, setQuizId] = useState(id);
    const [quiz, setQuiz] = useState()
    const [questionList, setQuestionList] = useState()
    const [questionIdList, setQuestionIdList] = useState()
    const [answer, setAnswer] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [showResultModal, setShowResultModal] = useState(false)
    const [corrects, setCorrects] = useState(0)
    const [total, setTotal] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [resultList, setResultList] = useState([])

    const navigate = useNavigate()

    const getQuiz = useCallback(async () => {
        const res = await getQuizById(quizId);
        setQuiz(res.DT)
    }, [quizId])

    const getQuestionList = useCallback(async () => {
        // Get question list of this quizId.
        const res = await getQuestionsById(quizId);
        setQuestionList(res?.DT);
        res?.DT && setAnswer(res?.DT.reduce((acc, question) => {
            acc[question.id] = []
            return acc;
        }, {}))

        // Create unique question id list.
        setQuestionIdList(Array.from(new Set(res?.DT?.map(item => item.id))))

    }, [quizId])

    const selectAnswer = (questionId, answerId, isChecked) => {
        if (isChecked) {
            setAnswer(preAnswer => ({
                ...preAnswer,
                [questionId]: [...(preAnswer?.[questionId] || []), answerId]
            }))
        } else {
            setAnswer(preAnswer => ({
                ...preAnswer,
                [questionId]: [...(preAnswer?.[questionId] || []).filter(id => id !== answerId)]
            }))

        }
    }

    const handleSubmitQuiz = async () => {
        const answers = Object.keys(answer).map(answerId => {
            return {
                questionId: answerId,
                userAnswerId: answer[answerId]
            }
        })
        const res = await submitQuiz(quizId, answers)
        console.log(res?.DT?.quizData);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setIsSubmitted(true)
            setCorrects(res.DT.countCorrect)
            setTotal(res.DT.countTotal)
            setShowResultModal(true)
            setResultList(res?.DT?.quizData ?? [])
        } else {
            toast.error(res.EM)
        }
    }

    useEffect(() => {
        getQuiz()
        getQuestionList()
    }, [getQuiz, getQuestionList])


    return (
        <div className="doing-quiz-page">
            <div className="d-flex justify-content-center gap-5 row">
                <div className="question-area col-md-7">
                    <div className="question-title">
                        <h2>{`${quiz?.name} (${quiz?.difficulty})`}</h2>
                    </div>

                    <Question
                        answer={answer}
                        selectAnswer={selectAnswer}
                        questionList={questionList?.filter(q => q.id === questionIdList?.[currentQuestionIndex])}
                        questionId={questionIdList?.[currentQuestionIndex]}
                        currentQuestionIndex={currentQuestionIndex}
                        isSubmitted={isSubmitted}
                        resultList={resultList}
                    />

                    <div className="button-container d-flex justify-content-center">
                        <button
                            className="btn btn-secondary"
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex && currentQuestionIndex - 1)}>
                            Previous
                        </button>
                        <button
                            className="btn btn-primary mx-3"
                            disabled={currentQuestionIndex === questionIdList?.length - 1}
                            onClick={() => setCurrentQuestionIndex((questionIdList?.length - 1 <= currentQuestionIndex) ? currentQuestionIndex : currentQuestionIndex + 1)}>
                            Next</button>

                        {!isSubmitted &&
                            <button
                                className="btn btn-warning"
                                onClick={() => setShowModal(true)}>
                                Finish
                            </button>
                        }

                        {isSubmitted &&
                            <button
                                className="btn btn-success"
                                onClick={() => navigate("/user")}>
                                Back to quiz page
                            </button>
                        }

                    </div>
                </div>

                <div className="control-area col-md-3">
                    <ControlArea
                        questionIdList={questionIdList}
                        answer={answer}
                        handleSubmitQuiz={handleSubmitQuiz}
                        currentQuestionIndex={currentQuestionIndex}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        isSubmitted={isSubmitted}
                    />
                </div>
            </div>

            <ConfirmSubmitQuiz
                show={showModal} setShow={setShowModal}
                isSubmitted={isSubmitted}
                handleSubmitQuiz={handleSubmitQuiz}
            />

            <ResultModal
                show={showResultModal} setShow={setShowResultModal}
                corrects={corrects} total={total}
            />
        </div>
    )
}

export default DoingQuiz