import React, { useState } from 'react';
import IntroVideo from "../../assets/hero.mp4";
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.auth.isAuth)

    const handleClick = () => {
        if (isAuth) {
            navigate("/user")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className="home-component">
            <div className="intro-video">
                <video autoPlay muted loop src={IntroVideo}></video>
            </div>
            <div className="intro-textarea">
                <h1 className="intro-title">Best quiz creation website!</h1>
                <p className="intro-text">Get more data—like signups, feedback, and anything else—with forms designed to be <strong>refreshingly different.</strong></p>
                <button onClick={handleClick} className="">Get started - it's free!</button>
            </div>
        </div>
    );
}

export default Home