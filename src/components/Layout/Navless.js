import React from 'react'
import { Outlet } from 'react-router-dom'

const Navless = () => {
    return (
        <div className="navless-page">
            <Outlet />
        </div>
    )
}

export default Navless