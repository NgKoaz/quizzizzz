import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.scss"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { loginUser } from '../../api/authApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/Actions/authAction';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await loginUser(email, password)

        if (res && res.EC === 0) {
            toast.success(res.EM)
            setEmail("")
            setPassword("")
            dispatch(userLogin(res.DT))
            navigate("/")
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="login-content">
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <div className="form-group-custom">
                        <h1>Login</h1>
                        <p>Hello, who’s this?</p>
                    </div>
                    <div className="form-group-custom">
                        <label htmlFor="email-input">Email</label>
                        <input id="email-input" type="text" placeholder="abc@gmail.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
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
                        <span><Link>Forgot password?</Link></span>
                        <button type="submit">Log in</button>
                    </div>
                </form>

                <div className="form-group-custom">
                    <span>
                        <Link to="/register">
                            Don't have an account?
                        </Link>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Login