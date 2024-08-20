import React, { useState } from 'react'
import FormSelectCustom from './FormSelectCustom'
import QuizTable from './QuizTable'

const CreateQuiz = ({ quizList }) => {

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="creating-quiz-name-input" className="form-label">Name</label>
                <input type="text" className="form-control" id="creating-quiz-name-input" placeholder="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="creating-quiz-desc-input" className="form-label">Description</label>
                <input type="text" className="form-control" id="creating-quiz-name-input" placeholder="description" />
            </div>
            <div className="mb-3">
                <label className="form-label">Difficulty</label>
                <FormSelectCustom />
            </div>
            <div className="mb-3">
                <label htmlFor="upload-quiz-background-image" className="form-label">Upload an image</label>
                <input className="form-control" type="file" id="upload-quiz-background-image" />
            </div>
            <button className="btn btn-primary px-3">Save</button>
            <hr />
            <div className="mt-3">
                <QuizTable
                    quizList={quizList}
                />
            </div>
        </div>
    )
}

export default CreateQuiz