import React, { useState, useTransition } from 'react';
import "./AdminNav.scss";
import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { userLogout } from '../../../redux/Actions/authAction';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../Profile/ProfileModal';
import LanguageSelection from '../LanguageSelection';
import { useTranslation } from 'react-i18next';


const AdminNav = ({ toggleSidebar }) => {
    const [showProfile, setShowProfile] = useState(false)

    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleLogout = () => {
        dispatch(userLogout())
        navigate("/")
    }

    return (
        <>
            <div className="admin-navbar">
                <div className="left">
                    <i id="icon-threebar" onClick={toggleSidebar}>
                        <FaBars />
                    </i>
                </div>

                <div className="right">
                    {isAuth &&
                        <NavDropdown className="nav-link" title={t("admin.settingNavLink.name")} id="basic-nav-dropdown">
                            <NavDropdown.Item><div onClick={() => setShowProfile(true)}>{t("admin.settingNavLink.profile")}</div></NavDropdown.Item>
                            <NavDropdown.Item><div onClick={handleLogout}>{t("admin.settingNavLink.logOut")}</div></NavDropdown.Item>
                        </NavDropdown>
                    }
                    <LanguageSelection />
                </div>
            </div>
            <ProfileModal
                show={showProfile} setShow={setShowProfile}
            />

        </>
    )
}

export default AdminNav