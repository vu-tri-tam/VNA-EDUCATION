import React from 'react'
import {  NavLink, useRouteMatch } from 'react-router-dom'
import Logo from '../../assets/images/icon.png'
import LogoutAlert from '../common/CustomAlert';

const SideBar = () => {
    let taikhoan = useRouteMatch("/giao-vien/tai-khoan");
    let danhgia = useRouteMatch("/giao-vien/xem-danh-gia");
    let hoctap = useRouteMatch("/giao-vien/hoc-tap");

    return (
        <>
            <div id="sidebar" className="active ">      
            <div className="sidebar-wrapper active" >
                <div className="sidebar-header">
                    <div className="d-flex justify-content-between">
                        <div className="logo">
                            <a href="/">
                                <img src={Logo} alt="Logo" />
                                <small style={{fontSize: "1.1rem", marginLeft: "10px"}}>VNA EDUCATION</small>
                            </a>
                        </div>
                        <div className="toggler">
                            <div style={{cursor : "pointer"}} className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-title">Bảng điều khiển </li>

                        <NavLink to="/giao-vien/bang-tin" exact className="sidebar-item" activeClassName="active">
                            <p className='sidebar-link mb-2' >
                                <i className="bi bi-grid-fill"></i>
                                <span>Bảng tin</span>
                            </p>
                        </NavLink>
                        
                         <li className={"sidebar-item has-sub " +(danhgia ? "active":"")} style={{cursor: 'pointer'}}>
                            <p className='sidebar-link m-0'>
                            <i className="bi bi-collection-fill"></i>
                                <span>Xem đánh giá</span>
                            </p>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <NavLink to="/giao-vien/xem-danh-gia/gvbm">Xem tất cả </NavLink>
                                </li>
                                <li className="submenu-item ">
                                    <NavLink to="/giao-vien/xem-danh-gia/gvcn">Xem lớp chủ nhiệm </NavLink>
                                </li>
                            </ul>
                        </li>

                         <li className={"sidebar-item has-sub " +(hoctap ? "active":"")} style={{cursor: 'pointer'}}>
                            <p className='sidebar-link m-0'>
                            <i className="bi bi-collection-fill"></i>
                                <span>Quản lý học tập</span>
                            </p>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <NavLink to="/giao-vien/hoc-tap/lich-day">Lịch dạy</NavLink>
                                </li>
                                <li className="submenu-item ">
                                    <NavLink to="/giao-vien/hoc-tap/bang-diem">Bảng điểm</NavLink>
                                </li>
                                <li className="submenu-item ">
                                    <NavLink to="/giao-vien/hoc-tap/diem-danh">Điểm danh</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className={"sidebar-item has-sub " +(taikhoan ? "active":"")} style={{cursor: 'pointer'}}>
                            <p className='sidebar-link m-0'>
                                <i className="bi bi-person-badge-fill"></i>
                                <span>Hồ sơ cá nhân</span>
                            </p>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <NavLink to="/giao-vien/tai-khoan/thong-tin">Thông tin cá nhân</NavLink>
                                </li>
                                <li className="submenu-item ">
                                    <NavLink to="/giao-vien/tai-khoan/doi-mat-khau">Đổi mật khẩu</NavLink>
                                </li>
                                
                            </ul>
                        </li>


                        <li className="sidebar-item " style={{cursor: 'pointer'}}>
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
    )
}

export default SideBar
