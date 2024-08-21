import React, { useEffect } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap'

const ProfileModalPassword = ({
    oldPassword, setOldPassword, newPassword, setNewPassword,
    confirmPassword, setConfirmPassword, setIsChanged, selectedTab
}) => {

    useEffect(() => {
        if (oldPassword && newPassword && confirmPassword) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
    }, [oldPassword, newPassword, confirmPassword, setIsChanged])

    useEffect(() => {
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }, [selectedTab, setOldPassword, setNewPassword, setConfirmPassword])

    return (
        <div>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Old password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="Old Password"
                            aria-describedby="inputGroupPrepend"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label>New password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="New Password"
                            aria-describedby="inputGroupPrepend"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
            </Row>
        </div>
    )
}

export default ProfileModalPassword