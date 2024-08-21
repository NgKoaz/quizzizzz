import React from 'react';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaList, FaGithub, } from 'react-icons/fa';
import sidebarBg from '../../../assets/bg2.jpg';
import 'react-pro-sidebar/dist/scss/styles.scss';
import { Link } from 'react-router-dom';
import "./AdminSidebar.scss";
import { useTranslation } from 'react-i18next';


const AdminSidebar = ({ collapsed, toggled, handleToggleSidebar }) => {

    const { t } = useTranslation()

    return (
        <ProSidebar
            image={sidebarBg}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    id="admin-sidebar-title"
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Link to="/">Admin Dashboard</Link>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaTachometerAlt />}
                        suffix={<span className="badge red"></span>}
                    >
                        <Link to="/admin"></Link>{t("admin.sidebar.dashboard")}
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title={t("admin.sidebar.management.name")} icon={<FaList />}>
                        <MenuItem><Link to="/admin/user"></Link>{t("admin.sidebar.management.user")}</MenuItem>
                        <MenuItem><Link to="/admin/quiz"></Link>{t("admin.sidebar.management.quiz")}</MenuItem>

                    </SubMenu>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <Link
                        to="https://github.com/NgKoaz/quizzizzz"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            View Source
                        </span>
                    </Link>
                </div>
            </SidebarFooter>
        </ProSidebar >
    )
}

export default AdminSidebar