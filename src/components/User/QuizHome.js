import React, { useEffect, useState } from 'react'
import { getQuizById, getQuizzes } from '../../api/quizApi'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import "./QuizHome.scss"

const QuizHome = () => {
    const [quizList, setQuizList] = useState([])

    const getQuizList = async () => {
        const res = await getQuizzes();
        setQuizList(res.DT)

    }

    useEffect(() => {
        getQuizList();
    }, [])

    return (
        <div className="quiz-home-content">
            <div className="quiz-container">
                {quizList && quizList.map(q =>
                    <div key={uuidv4()} className="card" style={{ width: "18rem" }}>
                        <img src={`data:image/jpeg;base64,${q.image}`} className="card-img-top" alt="Quiz" />
                        <div className="card-body">
                            <h5 className="card-title">{q.name}</h5>
                            <p className="card-text">{q.description}</p>
                            <Link to={`/quiz/${q.id}`} className="btn btn-primary">Do quiz</Link>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default QuizHome;