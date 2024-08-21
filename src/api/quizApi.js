import axios from "./customAxios"

const quizByParticipantUrl = "/api/v1/quiz-by-participant"
const assignUserUrl = "/api/v1/quiz-assign-to-user"
const getAllQuizzesUrl = "/api/v1/quiz/all"
const getQuestionList = "/api/v1/questions-by-quiz"
const getQuizUrl = "/api/v1/quiz/"
const submitQuizUrl = "/api/v1/quiz-submit"
const postQuizUrl = "/api/v1/quiz"
const deleteQuizUrl = "/api/v1/quiz"
const putQuizUrl = "/api/v1/quiz"

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
    const data = {
        quizId: +quizId,
        answers: answers.map(a => {
            return {
                questionId: +a.questionId,
                userAnswerId: a.userAnswerId
            }
        })
    }
    return axios.post(submitQuizUrl, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const postQuiz = (name, description, difficulty, quizImage) => {
    const form = new FormData();
    form.append("name", name)
    form.append("description", description)
    form.append("difficulty", difficulty)
    form.append("quizImage", quizImage)
    return axios.post(postQuizUrl, form)
}

export const deleteQuiz = (quizId) => {
    return axios.delete(`${deleteQuizUrl}/${quizId}`)
}

export const putQuiz = (id, description, name, difficulty, quizImage) => {
    const form = new FormData()
    form.append("id", id);
    form.append("description", description);
    form.append("name", name);
    form.append("difficulty", difficulty);
    form.append("quizImage", quizImage);
    return axios.put(putQuizUrl, form)
}