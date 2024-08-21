import React, { useState } from 'react';
import IntroVideo from "../../assets/hero.mp4";
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';

const Home = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.auth.isAuth)
    const { t, i18n } = useTranslation();

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
                <h1 className="intro-title">{t("homePage.title")}</h1>
                <p className="intro-text">
                    {`${t("homePage.description")}`}<b> {t("homePage.description2")}</b>
                </p>
                <button onClick={handleClick} className="">{t("homePage.startButton")}</button>
            </div>
        </div>
    );
}

export default Home