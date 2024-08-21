import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmSubmitQuiz = ({ show, setShow, handleSubmitQuiz }) => {
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to submit this quiz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        handleSubmitQuiz()
                    }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmSubmitQuiz;