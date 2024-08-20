import axios from "./customAxios"

const quizByParticipantUrl = "/api/v1/quiz-by-participant"
const assignUserUrl = "/api/v1/quiz-assign-to-user"
const getAllQuizzesUrl = "/api/v1/quiz/all"
const getQuestionList = "/api/v1/questions-by-quiz"
const getQuizUrl = "/api/v1/quiz/"
const submitQuizUrl = "/api/v1/quiz-submit"

export const getQuizzes = () => {
    return axios.get(quizByParticipantUrl)
}

export const getAllQuizzes = () => {
    return axios.get(getAllQuizzesUrl)
}

export const assignUser = (userId, quizId) => {
    return axios.post(assignUserUrl, {
        userId,
        quizId
    })
}

export const getQuestionsById = (quizId) => {
    return axios.get(getQuestionList, {
        params: {
            quizId
        }
    })
}

export const getQuizById = (quizId) => {
    return axios.get(`${getQuizUrl}${quizId}`)
}

export const submitQuiz = (quizId, answers) => {
    const data = { quizId, answers }
    return axios.post(submitQuizUrl, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

