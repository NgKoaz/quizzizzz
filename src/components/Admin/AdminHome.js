import React, { useEffect, useState } from 'react';
import { getDashboard } from '../../api/adminApi';
import "./AdminHome.scss"
import MyChart from './MyChart';
import { useTranslation } from 'react-i18next';

const AdminHome = ({ setCollapsed }) => {
    const [dashboard, setDashboard] = useState()

    const { t } = useTranslation()

    const loadDashboard = async () => {
        const res = await getDashboard()
        console.log(res.DT)
        setDashboard(res.DT)
    }

    useEffect(() => {
        loadDashboard()
    }, [])

    return (
        <div className="admin-dashboard">
            <div className="left-frame">
                <div className="child-card">
                    <div className="card-content">
                        <h3 className="card-title-custom">{t("admin.dashboard.totalUser")}</h3>
                        <span className="card-info-custom">{dashboard?.users?.total ?? 0}</span>
                    </div>
                </div>
                <div className="child-card">
                    <div className="card-content">
                        <h3 className="card-title-custom">{t("admin.dashboard.totalQuiz")}</h3>
                        <span className="card-info-custom">{dashboard?.others?.countQuiz ?? 0}</span>
                    </div>
                </div>
                <div className="child-card">
                    <div className="card-content">
                        <h3 className="card-title-custom">{t("admin.dashboard.totalQuestion")}</h3>
                        <span className="card-info-custom">{dashboard?.others?.countQuestions ?? 0}</span>
                    </div>
                </div>
                <div className="child-card">
                    <div className="card-content">
                        <h3 className="card-title-custom">{t("admin.dashboard.totalAnswer")}</h3>
                        <span className="card-info-custom">{dashboard?.others?.countAnswers ?? 0}</span>
                    </div>
                </div>
            </div>
            <div className="right-frame">
                <MyChart
                    totalUser={dashboard?.users?.total ?? 0}
                    totalQuiz={dashboard?.others?.countQuiz ?? 0}
                    totalQuestion={dashboard?.others?.countQuestions ?? 0}
                    totalAnswer={dashboard?.others?.countAnswers ?? 0}
                />
            </div>
        </div>
    );
};

export default AdminHome;