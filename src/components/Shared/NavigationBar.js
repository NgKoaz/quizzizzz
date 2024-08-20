import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/Actions/authAction';

const NavigationBar = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userLogout())
    }

    return (
        <Navbar expand="lg" className="navbar-custom bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link className="nav-link" to="/">BKQuiz</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={isAuth ? "/admin" : "/login"}>Admin</Link>
                        <Link className="nav-link" to={isAuth ? "/user" : "/login"}>User</Link>
                    </Nav>
                    <Nav>
                        {isAuth ?
                            <NavDropdown className="nav-link" title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item><div onClick={handleLogout}>Log out</div></NavDropdown.Item>
                            </NavDropdown>
                            :
                            <div className="auth-button">
                                <button onClick={() => navigate("/login")} className="login-button">Log in</button>
                                <button onClick={() => navigate("/register")} className="signin-button">Sign up</button>
                            </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar