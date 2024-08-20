import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../api/userApi';
import { toast } from 'react-toastify';

const ConfirmModal = ({ title, bodyText, buttonText, currentDeleteUser, show, setShow, setCurrentPage, getUserList }) => {
    const handleClose = () => setShow(false);

    const handleConfirm = async () => {
        console.log(currentDeleteUser?.id)
        const res = await deleteUser(currentDeleteUser.id)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
        handleClose();
        setCurrentPage(1);
        getUserList();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{bodyText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        {buttonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmModal;