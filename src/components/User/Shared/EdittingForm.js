import { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import "./CreatingForm.scss";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { base64ToBlobUrl } from '../../../utils/fileProcessing';

const EdittingForm = (props) => {
    const {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        role, setRole,
        image, setImage,
        isEdit,
    } = props;

    const [previewImageURL, setPreviewImageURL] = useState("")
    const formRef = useRef(null);

    useEffect(() => {
        if (image && typeof image === 'string') {
            setPreviewImageURL(base64ToBlobUrl(image))
        }
    }, [image])

    const handleUpload = (e) => {
        if (e.target?.files?.[0]) {
            setImage(e.target?.files?.[0])
            setPreviewImageURL(URL.createObjectURL(e.target?.files?.[0]))
            return;
        }
        setImage(null)
        setPreviewImageURL("")
    }

    return (
        <Form id="creating-user-form" validated={false} noValidate ref={formRef}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isEdit}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose an email.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        disabled={isEdit}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        required
                        disabled={isEdit}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your confirm password.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Select role: </Form.Label>
                <select
                    className="form-select mb-2"
                    aria-label="Default select example"
                    value={role} // Step 3: Set the select's value to the state value
                    onChange={e => setRole(e.target.value)} // Step 4: Call the handler on change
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <Form.Label>Upload an image (optional)</Form.Label>
                <Form.Control type="file" onChange={handleUpload} accept=".jpg, .jpeg, .png, .gif" />
                <div className="uploading-img-container">
                    {image ?
                        <PhotoProvider>
                            <PhotoView src={previewImageURL}>
                                <img src={previewImageURL} alt="avatar" />
                            </PhotoView>
                        </PhotoProvider>

                        :
                        <span>Image Preview</span>
                    }
                </div>
            </Form.Group>
        </Form>
    );
}

export default EdittingForm;