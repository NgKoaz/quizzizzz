import React from 'react';
import "./AdminNav.scss";
import { FaBars } from "react-icons/fa6";


const AdminNav = ({ toggleSidebar }) => {
    return (
        <div className="admin-navbar">
            <i id="icon-threebar" onClick={toggleSidebar}><FaBars /></i>
        </div>
    )
}

export default AdminNav