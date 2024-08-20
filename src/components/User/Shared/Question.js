import React, { useEffect, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import Answer from './Answer'
import { base64ToBlobUrl } from '../../../utils/fileProcessing'

const Question = ({ answer, selectAnswer, questionList, questionId }) => {
    const [blobUrl, setBlobUrl] = useState();

    useEffect(() => {
        if (questionList?.[0]?.image)
            setBlobUrl(base64ToBlobUrl(questionList?.[0]?.image))
        else
            setBlobUrl(null)
    }, [questionList, questionId])


    return (
        <div className="question-container">
            <div className="image-container">
                {blobUrl &&
                    <PhotoProvider>
                        <PhotoView src={blobUrl}>
                            <img className="img-in-table" src={blobUrl} alt="avatar" />
                        </PhotoView>
                    </PhotoProvider>
                }
            </div>
            <div className="mt-3">
                <h5 className="question-description">{questionList?.[0]?.description}</h5>
                <Answer
                    answer={answer}
                    selectAnswer={selectAnswer}
                    questionId={questionList?.[0]?.id}
                    answerDescriptionList={questionList?.map(q => q.answers)}
                />
            </div>
        </div>
    )
}

export default Question