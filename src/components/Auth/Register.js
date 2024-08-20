import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import "./Register.scss";
import { registerUser } from '../../api/authApi';
import { toast } from 'react-toastify';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const handleRegister = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Confirm password is not match!");
            return;
        }
        const res = await registerUser(email, username, password);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setEmail("")
            setUsername("")
            setPassword("")
            setConfirmPassword("")
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="register-content">
            <div className="register-form">
                <form onSubmit={handleRegister}>
                    <div className="form-group-custom">
                        <h1>Register</h1>
                        <p>Hello, who’s this?</p>
                    </div>
                    <div className="form-group-custom">
                        <label htmlFor="email-input">Email</label>
                        <input id="email-input" type="text" placeholder="abc@gmail.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div className="form-group-custom">
                        <label htmlFor="username-input">Username</label>
                        <input id="username-input" type="text" placeholder="abc" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </div>

                    <div className="form-group-custom">
                        <label htmlFor="password-input">Password</label>
                        <div className="password-form">
                            <input
                                id="password-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <span onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <IoEyeOff />
                                    :
                                    <IoEye />
                                }
                            </span>
                        </div>
                    </div>

                    <div className="form-group-custom">
                        <label htmlFor="confirm-password-input">Confirm password</label>
                        <div className="password-form">
                            <input
                                id="confirm-password-input"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="At least 6 characters"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ?
                                    <IoEyeOff />
                                    :
                                    <IoEye />
                                }
                            </span>
                        </div>
                    </div>

                    <div className="form-group-custom">
                        <span><Link>Forgot password?</Link></span>

                        <button type="submit">Register</button>
                    </div>


                    <div className="form-group-custom">
                        <span>
                            <Link to="/login">
                                Already had an account?
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register