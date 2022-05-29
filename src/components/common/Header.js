import React, {  useEffect } from 'react'
import { useState } from 'react'
import {  NavLink, useLocation } from 'react-router-dom'
import NguoiDungApi from '../../api/NguoiDungApi'
import { getIdUser } from '../../auth/AuthFun'
import LogoutAlert from './CustomAlert'
import { Link } from 'react-router-dom'
import { AxiosDG } from '../hocsinh/ThongBaoDG'

const Header = ({match}) => {
    const [studentInfo, setstudentInfo] = useState(null)
    const [listDanhGia, setlistDanhGia] = useState(null)
    const pm = useLocation()

    useEffect(() => {
        const idUser = getIdUser()
        const getStudenInfo = async (id) => {
            let user = await NguoiDungApi.getUserById(id)
            setstudentInfo(user.data)
        }
        getStudenInfo(idUser)
    }, [])


    useEffect(() => {
        const getDGChuaLam = async () => {
            if (match === "hoc-sinh") {
                let res = await AxiosDG()
                setlistDanhGia(res);
            }
        }
        getDGChuaLam()
    }, [pm.pathname, match])


    return (
        <header >
                <nav className="navbar navbar-expand navbar-light px-0" style={{paddingTop: 0}} >
                    <div className="container-fluid px-0">
                        <div className="burger-btn d-block " style={{cursor: "pointer"}}>
                            <i className="bi bi-justify fs-3"></i>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                {match === "hoc-sinh" && listDanhGia ? <li className="nav-item dropdown me-3">
                                    <a className="nav-link active dropdown-toggle" href="/#" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <i className='bi bi-bell bi-sub fs-4 text-gray-600'>
                                            {listDanhGia.length > 0 ? <span className="position-absolute top-40 translate-middle p-1 bg-danger border border-light rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span> : null}
                                        </i>
                                    </a>
                                    <ul className="dropdown-menu shadow-sm dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                        <li className="mb-3">
                                            <h6 className="dropdown-header">Thông báo</h6>
                                        </li>
                                        {
                                            listDanhGia.length > 0 ? listDanhGia.map(mon => (
                                                <Link key={mon._id} style={{cursor: "pointer"}} to={`/hoc-sinh/danh-gia/gv/${mon._id}`} >
                                                    <p style={{fontSize: "1rem"}} className="dropdown-item">{mon.tenDG}</p>
                                                </Link>
                                            )) : <li>
                                                 <p style={{fontSize: "1rem"}} className="dropdown-item">Tạm thời chưa có thông báo</p>
                                            </li>
                                        }
                                    </ul> 
                                </li> : null }
                            </ul>
                            <div className="dropdown">
                                <a href="/#" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="user-menu d-flex ">
                                        <div className="user-name text-end ">
                                            <h6 className="text-gray-600">{ studentInfo && studentInfo.hoTen }</h6>
                                            <p className="mb-0 text-sm text-gray-600">Mã tài khoản: { studentInfo && studentInfo.maND}</p>
                                        </div>
                                        <div className="user-img d-flex align-items-center">
                                            <div className="avatar avatar-md">
                                                {/* <img src="assets/images/faces/1.jpg"/> */}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <h6 className="dropdown-header">Chào { studentInfo && studentInfo.hoTen }!</h6>
                                    </li>
                                    <NavLink to={`/${match}/tai-khoan/thong-tin`}><p className="dropdown-item" ><i className="icon-mid bi bi-person me-2"></i>Thông tin</p></NavLink>
                                    <NavLink to={`/${match}/tai-khoan/doi-mat-khau`} ><p className="dropdown-item" ><i className="icon-mid bi bi-gear me-2"></i>
                                            Đổi mật khẩu</p></NavLink>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li onClick={LogoutAlert} style={{cursor: 'pointer'}}><p className="dropdown-item" ><i
                                                className="icon-mid bi bi-box-arrow-left me-2"></i> Đăng xuất</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
        </header>
    )
}

export default Header
