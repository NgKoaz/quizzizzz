import axios from "./customAxios"

const getQuestionsUrl = "/api/v1/questions-by-quiz"
const getQuestionWithAnswerUrl = "/api/v1/quiz-with-qa"
const createQuestionUrl = "/api/v1/question"
const deleteQuestionUrl = "/api/v1/question"
const updateQuestionUrl = "/api/v1/question"
const postAnswerUrl = "/api/v1/answer"
const putAnswerUrl = "/api/v1/answer"
const deleteAnswerUrl = "/api/v1/answer"


export const getQuestions = (quizId) => {
    return axios.get(getQuestionsUrl, {
        params: {
            quizId
        }
    })
}

export const getQuestionWithAnswer = (quizId) => {
    return axios.get(`${getQuestionWithAnswerUrl}/${quizId}`)
}

export const postQuestion = (quiz_id, description, questionImage) => {
    const form = new FormData();
    form.append("quiz_id", quiz_id)
    form.append("description", description)
    form.append("questionImage", questionImage)
    return axios.post(createQuestionUrl, form)
}

export const deleteQuestion = (id, quizId) => {
    return axios.delete(deleteQuestionUrl, {
        data: { id, quizId }
    })
}

export const updateQuestion = (id, quiz_id, description, questionImage) => {
    const form = new FormData()
    form.append("id", id)
    form.append("quiz_id", quiz_id)
    form.append("description", description)
    form.append("questionImage", questionImage)
    return axios.put(updateQuestionUrl, form)
}

export const postAnswer = (question_id, description, correct_answer) => {
    const form = new FormData()
    form.append("question_id", question_id)
    form.append("description", description)
    form.append("correct_answer", correct_answer)
    return axios.post(postAnswerUrl, form)
}

export const putAnswer = (question_id, answer_id, description, correct_answer) => {
    return axios.put(putAnswerUrl, {
        question_id,
        answer_id,
        description,
        correct_answer
    })
}

export const deleteAnswer = (answerId) => {
    return axios.delete(`${deleteAnswerUrl}/${answerId}`)
}

