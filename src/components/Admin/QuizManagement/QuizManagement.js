import React, { useEffect, useState } from 'react';
import "./QuizManagement.scss";
import AssignQuiz from './AssignQuiz';
import CreateQuiz from './CreateQuiz';
import UpdateQuiz from './UpdateQuiz';
import { getAllQuizzes } from '../../../api/quizApi';
import { getAllUsers } from '../../../api/userApi';
import { Tab, Tabs } from 'react-bootstrap';


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
            <Tabs
                defaultActiveKey="create"
                id="fill-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="create" title="Create a quiz">
                    <CreateQuiz
                        getQuizList={getQuizList}
                        quizList={quizList}
                    />
                </Tab>
                <Tab eventKey="update" title="Update a quiz">
                    <UpdateQuiz
                        quizList={quizList}
                    />
                </Tab>
                <Tab eventKey="assign" title="Assign quiz to user">
                    <AssignQuiz
                        userList={userList}
                        quizList={quizList}
                    />
                </Tab>
            </Tabs>
        </div>
    )
}

export default QuizManagement