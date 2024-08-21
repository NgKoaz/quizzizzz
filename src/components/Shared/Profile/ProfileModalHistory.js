import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getHistory } from '../../../api/profileApi'
import { dateFormat } from '../../../utils/stringUtils'

const ProfileModalHistory = () => {
    const [historyQuizList, setHistoryQuizList] = useState([])

    const getHistoryQuizList = async () => {
        const res = await getHistory()
        setHistoryQuizList(res?.DT?.data ?? [])
    }

    useEffect(() => {
        getHistoryQuizList()
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Quiz Id</th>
                    <th>Quiz Name</th>
                    <th>Result</th>
                    <th>Created Date</th>
                </tr>
            </thead>
            <tbody>
                {historyQuizList &&
                    historyQuizList.map(hq =>
                        <tr>
                            <td>{hq?.id}</td>
                            <td>{hq?.quizHistory?.id}</td>
                            <td>{hq?.quizHistory?.name}</td>
                            <td>{`${hq?.total_correct}/${hq?.total_questions}`}</td>
                            <td>{dateFormat(hq?.createdAt)}</td>
                        </tr>
                    )}
            </tbody>
        </Table>
    )
}

export default ProfileModalHistory