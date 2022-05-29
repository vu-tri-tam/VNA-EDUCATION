import React from 'react'
import { Link, NavLink, useRouteMatch } from 'react-router-dom'
import logo from '../../assets/images/icon.png'
import LogoutAlert from '../common/CustomAlert';
const SideBar = () => {
    let matchDanhGia = useRouteMatch("/phu-huynh/danh-gia/");
    let matchQuanLyHocSinh = useRouteMatch("/phu-huynh/quan-ly-hoc-sinh/");
    let matchHoSoCaNhan = useRouteMatch("/phu-huynh/ho-so-ca-nhan/");

    return (
        <>
            <div id="sidebar" className="active">
                <div className="sidebar-wrapper active">
                    <div className="sidebar-header">
                        <div className="d-flex justify-content-between">
                            <div className="logo">
                                <a href="/">
                                    <img src={logo} alt="Logo" />
                                    <small style={{ fontSize: "1.1rem", marginLeft: "10px" }}>VNA EDUCATION</small>
                                </a>
                            </div>
                            <div className="toggler">
                                <div style={{ cursor: "pointer" }} className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <ul className="menu">
                            <li className="sidebar-title">Bảng điều khiển</li>


                            <NavLink to="/phu-huynh/bang-tin" exact className="sidebar-item" activeClassName="active">
                                <p className='sidebar-link' >
                                    <i className="bi bi-grid-fill"></i>
                                    <span>Bảng tin</span>
                                </p>
                            </NavLink>


                            <li className={"sidebar-item has-sub " + (matchDanhGia ? "active" : "")}style={{ cursor: "pointer" }}  >
                                <p className='sidebar-link m-0'>
                                    <i className="bi bi-stack"></i>
                                    <span>Đánh giá</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <NavLink activeClassName='active' to="/phu-huynh/danh-gia/danh-gia-giao-vien-chu-nhiem">Giáo viên chủ nhiệm</NavLink>
                                    </li>
                                    <li className="submenu-item ">
                                        <NavLink activeClassName='active' to="/phu-huynh/danh-gia/xem-thu-hang-danh-gia">Xếp hạng đánh giá</NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className={"sidebar-item has-sub " + (matchQuanLyHocSinh ? "active" : "")} style={{ cursor: "pointer" }} >
                                <p className='sidebar-link m-0'>
                                    <i className="bi bi-stack"></i>
                                    <span>Quản lí học sinh</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/phu-huynh/quan-ly-hoc-sinh/danh-sach-hoc-sinh">Danh sách học sinh</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to="/phu-huynh/quan-ly-hoc-sinh/danh-gia-hoc-sinh">Xem đánh giá</Link>
                                    </li>
                                </ul>
                            </li>


                            <li className={"sidebar-item has-sub " + (matchHoSoCaNhan ? "active" : "")} style={{ cursor: "pointer" }} >
                                <p className='sidebar-link m-0'>
                                    <i className="bi bi-grid-1x2-fill"></i>
                                    <span>Hồ sơ cá nhân</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/phu-huynh/tai-khoan/thong-tin">Thông tin cá nhân</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to="/phu-huynh/tai-khoan/doi-mat-khau">Đổi mật khẩu</Link>
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
