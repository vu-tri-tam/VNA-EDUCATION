import React from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import Logo from '../../assets/images/icon.png'
import LogoutAlert from "../common/CustomAlert"

const Sidebar = () => {
    let matchGV = useRouteMatch("/quan-ly/giao-vien");
    let matchHS = useRouteMatch("/quan-ly/hoc-sinh");
    let matchBT = useRouteMatch("/quan-ly/bang-tin");
    let matchQT = useRouteMatch("/quan-ly/quan-tri");
    let matchDG = useRouteMatch("/quan-ly/danh-gia");
    let matchQLLH = useRouteMatch("/quan-ly/quan-li-lich-hoc");
    let matchQLNH = useRouteMatch("/quan-ly/quan-li-nam-hoc");
    // let matchTK = useRouteMatch("/quan-ly/quan-li-thong-ke");
    let matchUS = useRouteMatch("/quan-ly/tai-khoan");
    let matchLH = useRouteMatch("/quan-ly/lop-hoc");
    let matchMH = useRouteMatch("/quan-ly/mon-hoc");

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

                            <NavLink to="/quan-ly" exact className="sidebar-item" activeClassName="active">
                                <p className='sidebar-link' >
                                    <i className="bi bi-speedometer"></i>
                                    <span>Trang chủ</span>
                                </p>
                            </NavLink>

                            <li className={"sidebar-item has-sub " + (matchGV ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-people-fill"></i>
                                    <span>Quản lý giáo viên</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <NavLink to="/quan-ly/giao-vien/danh-sach">Danh sách giáo viên</NavLink>
                                    </li>
                                    <li className="submenu-item ">
                                        <NavLink to="/quan-ly/giao-vien/them-giao-vien">Thêm giáo viên</NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className={"sidebar-item has-sub " + (matchHS ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-people-fill"></i>
                                    <span>Quản lý học sinh</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/hoc-sinh/danh-sach">Danh sách học sinh</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to='/quan-ly/hoc-sinh/them-hoc-sinh'>Thêm học sinh</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={"sidebar-item has-sub " + (matchQT ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-people-fill"></i>
                                    <span>Quản lý quản trị</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/quan-tri/danh-sach">Danh sách quản trị viên</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to='/quan-ly/quan-tri/them-quan-tri'>Thêm quản trị viên </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={"sidebar-item has-sub " + (matchLH ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-shop-window"></i>
                                    <span>Quản lý lớp học</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/lop-hoc/danh-sach">Danh sách lớp học</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to='/quan-ly/lop-hoc/them-lop-hoc'>Thêm quản lớp học </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={"sidebar-item has-sub " + (matchMH ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-book"></i>
                                    <span>Quản lý môn học</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/mon-hoc/danh-sach">Danh sách môn học</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to='/quan-ly/mon-hoc/them-mon-hoc'>Thêm môn học </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={"sidebar-item has-sub " + (matchDG ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-cloud-plus-fill"></i>
                                    <span>Quản lý đánh giá</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/danh-gia/danh-sach">Mẫu đánh giá</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/danh-gia/danh-sach-phieu-danh-gia">Phiếu đánh giá</Link>
                                    </li>
                                    {/* <li className="submenu-item ">
                                        <Link to="/quan-ly/danh-gia/cua-hoc-sinh">Đánh giá của học sinh</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/quan-ly/danh-gia/cua-phu-huynh">Đánh giá của phụ huynh</Link>
                                    </li> */}
                                </ul>
                            </li>
                            <li className={"sidebar-item has-sub " + (matchQLNH ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-cloud-plus-fill"></i>
                                    <span>Quản lý năm học</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/quan-li-nam-hoc/nam-hoc">Quản lí năm học</Link>
                                    </li>

                                    {/* <li className="submenu-item ">
                                        <Link to="/quan-ly/quan-li-nam-hoc/thu">quản lí thứ</Link>
                                    </li> */}

                                </ul>
                            </li>
                            <li className={"sidebar-item has-sub " + (matchQLLH ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-cloud-plus-fill"></i>
                                    <span>Quản lý lịch học</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/quan-li-nam-hoc/tuan-hoc">Quản lí tuần học</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/quan-li-lich-hoc">Lịch học</Link>
                                    </li>

                                    {/* <li className="submenu-item ">
                                        <Link to="/quan-ly/quan-li-lich-hoc">Lớp</Link>
                                    </li> */}

                                </ul>
                            </li>

                            {/* <li className={"sidebar-item has-sub " + (matchTK ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-table"></i>
                                    <span>Quản lý thống kê</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/bang-tin/them-bang-tin">...</Link>
                                    </li>
                                </ul>
                            </li> */}
                            <li className={"sidebar-item has-sub " + (matchBT ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'>
                                    <i className="bi bi-table"></i>
                                    <span>Quản lý bảng tin</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/bang-tin/them-bang-tin">Thêm bảng tin</Link>
                                    </li>
                                </ul>
                            </li>




                            <li className={"sidebar-item has-sub " + (matchUS ? "active" : "")} style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link m-0'>
                                    <i className="bi bi-person-badge-fill"></i>
                                    <span>Hồ sơ cá nhân</span>
                                </p>
                                <ul className="submenu ">
                                    <li className="submenu-item ">
                                        <Link to="/quan-ly/tai-khoan/doi-mat-khau">Đổi mật khẩu</Link>
                                    </li>

                                </ul>
                            </li>


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
