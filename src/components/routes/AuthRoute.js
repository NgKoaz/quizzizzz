import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoute = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default AuthRoute