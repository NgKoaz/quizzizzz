import React, { useEffect, useRef, useState } from 'react'
import FormSelectCustom from './FormSelectCustom'
import QuizTable from './QuizTable'
import "./CreateQuiz.scss"
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { postQuiz, putQuiz } from '../../../api/quizApi'
import { toast } from 'react-toastify'
import { base64ToBlobUrl } from '../../../utils/fileProcessing'

const CreateQuiz = ({ getQuizList, quizList }) => {
    const difficultyList = [
        { value: "EASY", title: "EASY" },
        { value: "MEDIUM", title: "MEDIUM" },
        { value: "HARD", title: "HARD" },
    ]
    const fileInputRef = useRef(null);
    const [updatedQuizId, setUpdatedQuizId] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [selected, setSelected] = useState("EASY")
    const [image, setImage] = useState(null)
    const [blobUrl, setBlobUrl] = useState(null)

    useEffect(() => {
        if (updatedQuizId !== 0) {
            const res = quizList.find(q => q.id === updatedQuizId);
            console.log(res)
            if (res) {
                setName(res?.name)
                setDescription(res?.description)
                setSelected(res?.difficulty)
                if (res?.image)
                    setBlobUrl(base64ToBlobUrl(res?.image))
                return;
            }
        }
        switchToCreatedMode()
    }, [updatedQuizId, quizList])

    const handleUpload = (e) => {
        const file = e.target?.files?.[0]
        if (file) {
            setImage(file)
            setBlobUrl(URL.createObjectURL(file))
        } else {
            setImage(null)
            setBlobUrl(null)
            fileInputRef.current.value = ''
        }
    }

    const switchToCreatedMode = () => {
        setUpdatedQuizId(0)
        setName("")
        setDescription("")
        setSelected("EASY")
        setImage(null)
        setBlobUrl(null)
        fileInputRef.current.value = ''
    }

    const SaveCreatedQuiz = async () => {
        const res = await postQuiz(name, description, selected, image)
        if (res?.EC === 0) {
            toast.success(res.EM)
            setName("")
            setDescription("")
            setSelected("EASY")
            setImage(null)
            setBlobUrl(null)
            fileInputRef.current.value = ''
            getQuizList()
        } else {
            toast.error(res.EM)
        }
    }

    const updateQuiz = async () => {
        console.log("clicked")
        if (updatedQuizId) {
            const res = await putQuiz(updatedQuizId, description, name, selected, image)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                switchToCreatedMode();
                getQuizList();
            } else {
                toast.error(res.EM)
            }

        } else {
            toast.error("Something went wrong. Please reload the page!")
        }
    }

    return (
        <div>
            {(updatedQuizId !== 0) &&
                <div className="mb-3">
                    <button onClick={switchToCreatedMode} className="btn btn-success">Switch to created mode</button>
                </div>
            }
            <div className="mb-3">
                <label htmlFor="creating-quiz-name-input" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="creating-quiz-name-input"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="creating-quiz-desc-input" className="form-label">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="creating-quiz-name-input"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <FormSelectCustom
                    title="Difficulty"
                    keyValueList={difficultyList}
                    selected={selected}
                    setSelected={setSelected}
                    isNotDefault={true}
                    isString={true}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="upload-quiz-background-image" className="form-label">Upload an image</label>
                <input
                    className="form-control"
                    type="file"
                    id="upload-quiz-background-image"
                    accept=".jpg,.png"
                    onChange={handleUpload}
                    ref={fileInputRef}
                />
            </div>
            {blobUrl &&
                <div className="preview-container">
                    <PhotoProvider>
                        <PhotoView src={blobUrl}>
                            <img src={blobUrl} alt="Preview" />
                        </PhotoView>
                    </PhotoProvider>
                </div>
            }

            {(updatedQuizId !== 0) || <button onClick={() => SaveCreatedQuiz()} className="btn btn-primary px-3">Save</button>}

            {(updatedQuizId !== 0) && <button onClick={() => updateQuiz()} className="btn btn-warning px-3">Update</button>}


            <hr />
            <div className="mt-3">
                <QuizTable
                    getQuizList={getQuizList}
                    quizList={quizList}
                    setUpdatedQuizId={setUpdatedQuizId}
                />
            </div>
        </div>
    )
}

export default CreateQuiz