import React from 'react'
import NavigationBar from '../Shared/NavigationBar'
import { Outlet } from 'react-router-dom'

const Navful = () => {
    return (
        <div className="navful-page">
            <div className="navful-navbar">
                <NavigationBar />
            </div>
            <div className="navful-content">
                <Outlet />
            </div>
        </div>
    )
}

export default Navful   