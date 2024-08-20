import React, { useState } from 'react'
import FormSelectCustom from './FormSelectCustom'
import { assignUser } from '../../../api/quizApi'
import { toast } from 'react-toastify'

const AssignQuiz = ({ userList, quizList }) => {
    const [selectedUserId, setSelectedUserId] = useState(0)
    const [selectedQuizId, setSelectedQuizId] = useState(0)

    const assignQuizAndUser = async () => {
        if (selectedUserId && selectedQuizId) {
            const res = await assignUser(selectedUserId, selectedQuizId)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                setSelectedUserId(0)
                setSelectedQuizId(0)
            } else {
                toast.error(res.EM)
            }
            console.log(res)
        } else {
            toast.error("Please, select an object!")
        }
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <FormSelectCustom
                    title="Select a user:"
                    keyValueList={userList?.map(user => { return { value: user.id, title: user.email } })}
                    selected={selectedUserId}
                    setSelected={setSelectedUserId}
                />
            </div>
            <div className="col-md-6">
                <FormSelectCustom
                    title="Select a quiz:"
                    keyValueList={quizList?.map(quiz => { return { value: quiz.id, title: quiz.name } })}
                    selected={selectedQuizId}
                    setSelected={setSelectedQuizId}
                />
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-primary px-4" onClick={assignQuizAndUser}>Assign</button>
            </div>
        </div >
    )
}

export default AssignQuiz