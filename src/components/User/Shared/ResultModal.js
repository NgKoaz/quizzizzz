import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const ResultModal = ({ show, setShow, corrects, total }) => {
    const handleClose = () => setShow(false);
    const navigate = useNavigate()


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Number of correct answer is: <b>{corrects}</b>
                    </div>
                    <div>
                        Number of question is: <b>{total}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => navigate("/user")}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ResultModal;