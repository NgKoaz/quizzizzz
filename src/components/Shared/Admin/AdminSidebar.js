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
import { FaTachometerAlt, FaGem, FaList, FaGithub, } from 'react-icons/fa';
import sidebarBg from '../../../assets/bg2.jpg';
import 'react-pro-sidebar/dist/scss/styles.scss';
import { Link } from 'react-router-dom';
import "./AdminSidebar.scss";


const AdminSidebar = ({ collapsed, toggled, handleToggleSidebar }) => {
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
                        Dashboard
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>Components</MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    {/* <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title="withSuffix"
                        icon={<FaRegLaughWink />}
                    >
                        <MenuItem>submenu 1</MenuItem>
                        <MenuItem>submenu 2</MenuItem>
                        <MenuItem>submenu 3</MenuItem>
                    </SubMenu>
                    <SubMenu
                        prefix={<span className="badge gray">3</span>}
                        title="withPrefix"
                        icon={<FaHeart />}
                    >
                        <MenuItem>submenu 1</MenuItem>
                        <MenuItem>submenu 2</MenuItem>
                        <MenuItem>submenu 3</MenuItem>
                    </SubMenu> */}
                    <SubMenu title="Management" icon={<FaList />}>
                        <MenuItem><Link to="/admin/user"></Link>User Management</MenuItem>
                        <MenuItem><Link to="/admin/quiz"></Link>Quiz Management</MenuItem>
                        {/* <SubMenu title={`$submenu 3`}>
                            <MenuItem>submenu 3.1 </MenuItem>
                            <MenuItem>submenu 3.2 </MenuItem>
                            <SubMenu title={`$submenu 3.3`}>
                                <MenuItem>submenu 3.3.1 </MenuItem>
                                <MenuItem>submenu 3.3.2 </MenuItem>
                                <MenuItem>submenu 3.3.3 </MenuItem>
                            </SubMenu>
                        </SubMenu> */}
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