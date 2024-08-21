import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { base64ToBlobUrl } from "../../../utils/fileProcessing"
import { deleteQuiz } from '../../../api/quizApi';
import { toast } from 'react-toastify';

const QuizTable = ({ getQuizList, quizList, setUpdatedQuizId }) => {

    const handleEditQuiz = (quiz) => {
        setUpdatedQuizId(quiz.id)
    }

    const handleDeleteQuiz = async (quiz) => {
        console.log(quiz.id)
        const res = await deleteQuiz(quiz.id);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            getQuizList()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <table className="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {quizList && quizList.map(quiz =>
                    <tr key={quiz.id}>
                        <th scope="row">{quiz.id}</th>
                        <td>{quiz.name}</td>
                        <td>{quiz.description}</td>
                        <td>{quiz.difficulty}</td>
                        <td>
                            {
                                quiz.image ?
                                    <PhotoProvider>
                                        <PhotoView src={base64ToBlobUrl(quiz.image)}>
                                            <img className="img-in-table" src={base64ToBlobUrl(quiz.image)} alt="avatar" />
                                        </PhotoView>
                                    </PhotoProvider>
                                    :
                                    <>No image!</>
                            }
                        </td>
                        <td>
                            <div className="button-list">
                                <button onClick={() => handleEditQuiz(quiz)} className="btn btn-success">Edit</button>
                                <button onClick={() => handleDeleteQuiz(quiz)} className="btn btn-danger">Delete</button>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default QuizTable