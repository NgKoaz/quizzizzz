import React, { useEffect, useState } from 'react'
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/Actions/authAction';
import ProfileModal from './Profile/ProfileModal';
import { useTranslation } from 'react-i18next';
import { ENGLISH, LANGUAGE_LIST, VIETNAMESE } from '../../i18n/LanguageList';
import LanguageSelection from './LanguageSelection';

const NavigationBar = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false)

    const { t, i18n } = useTranslation();


    const handleLogout = () => {
        dispatch(userLogout())
    }


    return (
        <>
            <Navbar expand="lg" className="navbar-custom bg-body-tertiary">
                <Container>
                    <Navbar.Brand><Link className="nav-link" to="/">BKQuiz</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to={isAuth ? "/admin" : "/login"}>{t("navbar.adminNavLink")}</Link>
                            <Link className="nav-link" to={isAuth ? "/user" : "/login"}>{t("navbar.userNavLink")}</Link>
                        </Nav>
                        <Nav>
                            {isAuth ?
                                <NavDropdown className="nav-link" title={t("navbar.settingNavLink.name")} id="basic-nav-dropdown">
                                    <NavDropdown.Item><div onClick={() => setShowProfile(true)}>{t("navbar.settingNavLink.profile")}</div></NavDropdown.Item>
                                    <NavDropdown.Item><div onClick={handleLogout}>{t("navbar.settingNavLink.logOut")}</div></NavDropdown.Item>
                                </NavDropdown>
                                :
                                <div className="auth-button">
                                    <button onClick={() => navigate("/login")} className="login-button">{t("navbar.loginButton")}</button>
                                    <button onClick={() => navigate("/register")} className="signin-button">{t("navbar.registerButton")}</button>
                                </div>
                            }
                            <LanguageSelection />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ProfileModal
                show={showProfile} setShow={setShowProfile}
            />
        </>
    )
}

export default NavigationBar