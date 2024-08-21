import React, { useEffect, useRef, useState } from 'react'
import { Tabs, Button, Modal, Tab } from 'react-bootstrap'
import ProfileModalHome from './ProfileModalHome';
import ProfileModalPassword from './ProfileModalPassword';
import ProfileModalHistory from './ProfileModalHistory';
import { changePassword, putProfile } from '../../../api/profileApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { changeProfile } from '../../../redux/Actions/authAction';
import { convertImageToBase64 } from '../../../utils/fileProcessing';

const ProfileModal = ({ show, setShow }) => {
    const profileTab = "profile";
    const passwordTab = "password";
    const historyTab = "history";
    const tabs = {
        profile: profileTab,
        password: passwordTab,
        history: historyTab,
    }


    // Profile
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null)
    const [blobUrl, setBlobUrl] = useState(null)
    const formRef = useRef(null)

    // Password
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Common
    const [selectedTab, setSelectedTab] = useState("profile");
    const [isChanged, setIsChanged] = useState(false)
    const dispatch = useDispatch()


    const handleClose = () => setShow(false);

    const updateProfile = async () => {
        const res = await putProfile(username, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setIsChanged(false)
            if (image) {
                dispatch(changeProfile({ username, image: (await convertImageToBase64(image)).split(",")[1] }))
            } else {
                dispatch(changeProfile({ username }))
            }
            setImage(null)
            formRef.current.value = ''
        } else {
            toast.error(res.EM)
        }
    }

    const updatePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Your confirm password is not match.")
            return;
        }
        const res = await changePassword(oldPassword, newPassword)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setIsChanged(false)
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } else {
            toast.error(res.EM)
        }
    }

    useEffect(() => {
        setIsChanged(false)
    }, [selectedTab])

    return (
        <div className="profile-modal">
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey={selectedTab}
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        fill
                        onSelect={(key) => setSelectedTab(key)}
                    >
                        <Tab eventKey={profileTab} title="Profile">
                            <ProfileModalHome
                                email={email} setEmail={setEmail}
                                username={username} setUsername={setUsername}
                                role={role} setRole={setRole}
                                image={image} setImage={setImage}
                                blobUrl={blobUrl} setBlobUrl={setBlobUrl}
                                setIsChanged={setIsChanged}
                                formRef={formRef}
                                selectedTab={selectedTab}
                            />
                        </Tab>
                        <Tab eventKey={passwordTab} title="Password">
                            <ProfileModalPassword
                                oldPassword={oldPassword} setOldPassword={setOldPassword}
                                newPassword={newPassword} setNewPassword={setNewPassword}
                                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                                setIsChanged={setIsChanged}
                                selectedTab={selectedTab}
                            />
                        </Tab>
                        <Tab eventKey={historyTab} title="History">
                            <ProfileModalHistory

                            />
                        </Tab>
                    </Tabs>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="px-4 me-2" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        isChanged && tabs[selectedTab] === profileTab &&
                        <Button className="px-4" variant="primary" onClick={updateProfile}>
                            Apply
                        </Button>
                    }
                    {
                        isChanged && tabs[selectedTab] === passwordTab &&
                        <Button className="px-4" variant="primary" onClick={() => updatePassword()}>
                            Apply
                        </Button>
                    }

                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default ProfileModal