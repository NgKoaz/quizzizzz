import { Tooltip } from 'bootstrap'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'

const MyChart = ({ totalUser, totalQuiz, totalQuestion, totalAnswer }) => {
    const data = [
        {
            "name": "Users",
            "user": totalUser
        },
        {
            "name": "Quizzes",
            "quiz": totalQuiz,
        },
        {
            "name": "Questions",
            "question": totalQuestion,
        },
        {
            "name": "Answers",
            "answer": totalAnswer,
        }
    ]
    return (
        <div className="chart-container">
            <BarChart width={500} height={400} data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar dataKey="user" fill="#8884d8" />
                <Bar dataKey="quiz" fill="#449fe3" />
                <Bar dataKey="question" fill="#f1b427" />
                <Bar dataKey="answer" fill="#31ff1b" />
            </BarChart >
        </div>
    )
}

export default MyChart