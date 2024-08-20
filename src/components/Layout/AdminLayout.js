import React, { useState } from 'react';
import AdminSidebar from '../Shared/Admin/AdminSidebar';
import { Outlet } from 'react-router-dom';
import './AdminLayout.scss';
import AdminNav from '../Shared/Admin/AdminNav';

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <div className="admin-page">
            <div className="admin-sidebar">
                <AdminSidebar
                    collapsed={collapsed}
                />
            </div>
            <div className="admin-body">
                <AdminNav toggleSidebar={toggleSidebar} />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout