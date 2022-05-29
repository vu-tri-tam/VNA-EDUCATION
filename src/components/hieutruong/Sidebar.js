import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Logo from '../../assets/images/icon.png'
import LogoutAlert from "../common/CustomAlert"

const Sidebar = () => {

    let matchDG = useRouteMatch("/hieu-truong/xem-danh-gia");
    return (
        <>
            <div id="sidebar" className="active">
                <div className="sidebar-wrapper active shadow">
                    <div className="sidebar-header">
                        <div className="d-flex justify-content-between">
                            <div className="logo">
                                <a href="/">
                                    <img src={Logo} alt="logo" />
                                    <small style={{ fontSize: "1.1rem", marginLeft: "10px" }}>VNA EDUCATION</small>
                                </a>
                            </div>
                            <div className="toggle">
                                <div style={{ cursor: "pointer" }} className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <ul className="menu">
                            <li className="sidebar-title">Bảng điều khiển </li>

                            <NavLink to="/hieu-truong" exact className="sidebar-item" activeClassName="active">
                                <p className='sidebar-link' >
                                    <i className="bi bi-speedometer"></i>
                                    <span>Trang chủ</span>
                                </p>
                            </NavLink>

                            <NavLink to="/hieu-truong/xem-danh-gia" exact className={`sidebar-item ${matchDG ? "active": ""}`} activeClassName="active">
                                <p className='sidebar-link' >
                                    <i className="bi bi-table"></i>
                                    <span>Xem đánh giá</span>
                                </p>
                            </NavLink>

                            {/* <li className={"sidebar-item has-sub " + (matchDG ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-table"></i>
                                    <span>Xem đánh giá</span>
                                </p>
                                <ul className="submenu">
                                    <li className="submenu-item ">
                                        <Link to="/hieu-truong/xem-danh-gia/gvbm">Xem GVBM</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to="/hieu-truong/xem-danh-gia/gvcn">Xem GVCN</Link>
                                    </li>
                                </ul>
                            </li> */}

                            <li className="sidebar-item " style={{ cursor: 'pointer' }}>
                                <p onClick={LogoutAlert} className='sidebar-link m-0'>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Đăng xuất</span>
                                </p>
                            </li>

                        </ul>
                    </div>
                    <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
