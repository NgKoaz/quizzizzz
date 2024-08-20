import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './User/Home'
import QuizHome from './User/QuizHome'
import AdminHome from './Admin/AdminHome.js'
import Navful from './Layout/Navful'
import AdminLayout from './Layout/AdminLayout.js'
import UserManagement from './Admin/UserManagement/UserManagement.js'
import QuizManagement from './Admin/QuizManagement/QuizManagement.js'
import Navless from './Layout/Navless.js'
import Login from './Auth/Login.js'
import Register from './Auth/Register.js'
import DoingQuiz from './User/DoingQuiz.js'

const PageRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Navful />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path='user' element={<QuizHome />} />
                <Route path="quiz">
                    <Route path=":id" element={<DoingQuiz />} />
                </Route>
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="user" element={<UserManagement />} />
                <Route path="quiz" element={<QuizManagement />} />
            </Route>

        </Routes>
    )
}

export default PageRoute