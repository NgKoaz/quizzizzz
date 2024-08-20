import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreatingForm from './CreatingForm';
import { useEffect, useState } from 'react';
import { getUsers, postUser, putUser } from '../../../api/userApi';
import { toast } from 'react-toastify';
import EdittingForm from './EdittingForm';

const EdittingModal = ({ show, setShow, currentEditUser, getUserList }) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState(currentEditUser?.role)
    const [image, setImage] = useState(null)

    useEffect(() => {
        setEmail(currentEditUser?.email)
        setUsername(currentEditUser?.username)
        setRole(currentEditUser?.role)
        setImage(currentEditUser?.image)
    }, [currentEditUser])

    const handleClose = () => {
        setEmail("")
        setUsername("")
        setRole("USER")
        setImage(null)
        setShow(false);
    }

    const handleCreateUser = async () => {
        const res = await putUser(currentEditUser.id, username, role, typeof image === "string" ? null : image)
        console.log(res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose();
        } else {
            toast.error(res.EM)
            return
        }

        getUserList();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EdittingForm
                        email={email} setEmail={setEmail}
                        username={username} setUsername={setUsername}
                        password={password} setPassword={setPassword}
                        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                        role={role} setRole={setRole}
                        image={image} setImage={setImage}
                        isEdit={true}
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

export default EdittingModal;