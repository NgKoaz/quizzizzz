import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { getUsers, postUser } from '../../../api/userApi';
import { toast } from 'react-toastify';
import EdittingForm from './EdittingForm';

const CreatingModal = ({ show, setShow, setCurrentPage, getUserList }) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState(null)

    const handleClose = () => {
        setEmail("")
        setUsername("")
        setPassword("")
        setConfirmPassword("")
        setRole("USER")
        setImage(null)
        setShow(false);
    }

    const handleCreateUser = async () => {
        if (password !== confirmPassword) {
            toast.error("Confirm password is not match!")
            return;
        }
        const res = await postUser(email, username, password, role, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose();
        } else {
            toast.error(res.EM)
            return;
        }

        setCurrentPage(1)
        getUserList()
    }


    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Create a new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EdittingForm
                        email={email} setEmail={setEmail}
                        username={username} setUsername={setUsername}
                        password={password} setPassword={setPassword}
                        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                        role={role} setRole={setRole}
                        image={image} setImage={setImage}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatingModal;