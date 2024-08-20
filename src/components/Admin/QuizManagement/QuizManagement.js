import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import "./QuizManagement.scss";
import AssignQuiz from './AssignQuiz';
import CreateQuiz from './CreateQuiz';
import UpdateQuiz from './UpdateQuiz';
import { getAllQuizzes } from '../../../api/quizApi';
import { getAllUsers } from '../../../api/userApi';


const QuizManagement = () => {
    const [userList, setUserList] = useState([])
    const [quizList, setQuizList] = useState([])

    const getUserList = async () => {
        const res = await getAllUsers();
        setUserList(res?.DT?.reverse() || [])
        console.log(res.DT)
    }

    const getQuizList = async () => {
        const res = await getAllQuizzes();
        setQuizList(res?.DT?.reverse() || []);
        console.log(res.DT)

    }

    useEffect(() => {
        getUserList()
        getQuizList();
    }, [])

    return (
        <div className="quiz-management-content">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header><b>Create a quiz</b></Accordion.Header>
                    <Accordion.Body>
                        <CreateQuiz
                            quizList={quizList}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><b>Update a quiz</b></Accordion.Header>
                    <Accordion.Body>
                        <UpdateQuiz
                            quizList={quizList}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><b>Assign quiz to user</b></Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz
                            userList={userList}
                            quizList={quizList}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default QuizManagement