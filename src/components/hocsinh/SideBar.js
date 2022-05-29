import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
// import Swal from 'sweetalert2';
import Logo from '../../assets/images/icon.png'
import LogOutAlert from '../common/CustomAlert';

const SideBar = () => {
    let taikhoan = useRouteMatch("/hoc-sinh/tai-khoan");
    let danhgia = useRouteMatch("/hoc-sinh/danh-gia");
    let hoctap = useRouteMatch("/hoc-sinh/hoc-tap");

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

                        <NavLink to="/hoc-sinh/bang-tin" exact className="sidebar-item" activeClassName="active">
                            <p className='sidebar-link mb-2' >
                                <i className="bi bi-grid-fill"></i>
                                <span>Bảng tin</span>
                            </p>
                        </NavLink>


                        <li className={"sidebar-item has-sub " +(hoctap ? "active":"")} style={{cursor: 'pointer'}}>
                            <p className='sidebar-link m-0'>
                            <i className="bi bi-collection-fill"></i>
                                <span>Quản lý học tập</span>
                            </p>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <NavLink to="/hoc-sinh/hoc-tap/lich-hoc">Lịch học</NavLink>
                                </li>
                                <li className="submenu-item ">
                                    <NavLink to="/hoc-sinh/hoc-tap/bang-diem">Bảng điểm</NavLink>
                                </li>
                                <li className="submenu-item ">
                                    <NavLink to="/hoc-sinh/hoc-tap/diem-danh">Điểm danh</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className={"sidebar-item has-sub " +(danhgia ? "active":"")} style={{cursor: 'pointer'}}>
                            <p className='sidebar-link m-0'>
                            <i className="bi bi-stack"></i>
                                <span>Đánh giá</span>
                            </p>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <NavLink to="/hoc-sinh/danh-gia/gvbm">Đánh giá GVBM</NavLink>
                                </li>
                                <li className="submenu-item ">
                                    <NavLink to="/hoc-sinh/danh-gia/gvcn">Đánh giá GVCN</NavLink>
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
                                    <NavLink to="/hoc-sinh/tai-khoan/thong-tin">Thông tin cá nhân</NavLink>
                                </li>
                                <li className="submenu-item ">
                                    <NavLink to="/hoc-sinh/tai-khoan/doi-mat-khau">Đổi mật khẩu</NavLink>
                                </li>
                            </ul>
                        </li>


                        <li className="sidebar-item " style={{cursor: 'pointer'}}>
                            <p onClick={LogOutAlert} className='sidebar-link m-0'>
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
