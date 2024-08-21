import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import { Form, InputGroup, Row } from 'react-bootstrap'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import "./ProfileModal.scss"
import { base64ToBlobUrl } from '../../../utils/fileProcessing';
import { useSelector } from 'react-redux';


const ProfileModalHome = ({
    email, setEmail, username, setUsername, role, setRole,
    image, setImage, blobUrl, setBlobUrl, setIsChanged, formRef, selectedTab
}) => {

    const account = useSelector(state => state.auth.account)

    const handleUploadFile = (e) => {
        const file = e.target?.files?.[0]
        if (file) {
            setImage(file)
            setBlobUrl(URL.createObjectURL(file))
        } else {
            setImage(null)
            setBlobUrl(null)
        }
    }

    useEffect(() => {
        setEmail(account?.email)
        setRole(account?.role)
        setUsername(account?.username)
        if (account?.image && typeof account?.image === 'string')
            setBlobUrl(base64ToBlobUrl(account?.image))
        setIsChanged(false)
    }, [setEmail, setRole, setUsername, setBlobUrl, setIsChanged, account, selectedTab])

    useEffect(() => {
        if (username !== account?.username || image)
            setIsChanged(true)
    }, [username, image, setIsChanged, account])

    return (
        <div>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="username"
                            aria-describedby="inputGroupPrepend"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose an email.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomRole">
                    <Form.Label>Role</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="Role"
                            required
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            disabled
                        />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="12">
                    <Form.Label>Avatar</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="file"
                            placeholder="Role"
                            accept=".jpg, .png"
                            onChange={handleUploadFile}
                            ref={formRef}
                        />
                    </InputGroup>
                </Form.Group>
            </Row>

            <div className="mt-3 profile-modal-preview-container">
                {Boolean(blobUrl) &&
                    <PhotoProvider>
                        <PhotoView src={blobUrl}>
                            <img src={blobUrl} alt="preview" />
                        </PhotoView>
                    </PhotoProvider>
                }
                {Boolean(blobUrl) ||
                    <span>No image upload</span>
                }

            </div>
        </div>
    )
}

export default ProfileModalHome