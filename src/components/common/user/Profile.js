import React, { useEffect, useState } from 'react'
import NguoiDungApi from '../../../api/NguoiDungApi'
import img from '../../../assets/images/faces/userface.jpg'
import { getIdUser, returnRoleStr } from '../../../auth/AuthFun'
import LoadingFullPage from '../LoadingFullPage'
import TitleBreadcrumb from '../TitleBreadcrumb'

const Profile = () => {
    document.title = "Tài khoản | VNA EDUCATION"

    const [studentInfo, setstudentInfo] = useState(null)
    
    useEffect(() => {
        const getStudenInfo = async () => {
            const idUser = getIdUser()
            let user = await NguoiDungApi.getUserById(idUser)
            // console.log(user.data);
            user?.data && setstudentInfo(user?.data)
        }
        getStudenInfo()
    }, [])


    return (
        <>
            { !studentInfo ? <LoadingFullPage /> : <div className="page-heading">
                <TitleBreadcrumb title="Thông tin cá nhân" subTitile={`${returnRoleStr(studentInfo.maND)} | ${studentInfo.hoTen}`} pathHome="" />
                <section className="section">
                    <div className="card shadow-sm mb-3" style={{ overflow: "hidden"}}> 
                        <div className="row">
                            <div className="col-lg-4 p-5 d-flex flex-column align-items-center justify-content-center" style={{borderRight: "1px solid #f1f1f1"}}>
                                <img src={img} className="rounded-circle avatar-lg img-thumbnail" alt="profileimage" />
                                <h3 className="">{studentInfo.hoTen}</h3>
                                <div className="mt-2">
                                    <p className="text-muted"><strong>Mã tài khoản:</strong> {studentInfo.maND}</p>
                                    <p className="text-muted"><strong>Số điện thoại:</strong> {studentInfo.soDienThoai || "Chưa cập nhật" } </p>
                                    <p className="text-muted"><strong>Email:</strong> {studentInfo.emailND || "Chưa cập nhật"}</p>
                                    <p className="text-muted"><strong>Trạng thái:</strong> {studentInfo.dangHoatDong ? "Còn hoạt động" : "Không hoạt động"}</p>
                                </div>
                            </div>
                            <div className="col-lg-8 p-5">
                                <p className="text-muted"><i className="bi bi-person-fill me-2"></i><strong style={{fontSize: '1.1rem'}}> Thông tin cá nhân</strong></p>
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <p><strong>Họ tên: </strong> {studentInfo.hoTen || "Chưa cập nhật" }</p>
                                        <p><strong>Giới tính: </strong> {studentInfo.gioiTinh || "Chưa cập nhật" }</p>
                                        <p><strong>Quốc tịch: </strong> {studentInfo.quocTich || "Chưa cập nhật" }</p>
                                    </div>
                                    <div className="col-lg-8 col-md-8">
                                        <p><strong>Ngày sinh: </strong> {studentInfo.ngaySinh || "Chưa cập nhật" }</p>
                                        <p><strong>Địa chỉ: </strong> {studentInfo.diaChi || "Chưa cập nhật" }</p>
                                        <p><strong>Dân tộc: </strong> {studentInfo.danToc || "Chưa cập nhật" }</p>
                                    </div>
                                </div>
                                
                                <hr />

                                <p className="text-muted"><i className="bi bi-info-circle me-2"></i><strong style={{fontSize: '1.1rem'}}>Thông tin học tập</strong></p>
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <p><strong>Mã tài khoản: </strong> {studentInfo?.maND}</p>
                                        {studentInfo?.maND.substring(0,2) !== "HS" ? null :
                                            <p><strong>Lớp: </strong> {studentInfo?.hocTap?.lopHoc || "Chưa cập nhật" }</p> 
                                        }
                                    </div>
                                    <div className="col-lg-8 col-md-8">
                                        <p><strong>Vai trò: </strong> {returnRoleStr(studentInfo?.maND)}</p>
                                        {studentInfo?.maND.substring(0,2) !== "HS" ? null :
                                            <p><strong>Ngày nhập học: </strong> {studentInfo?.hocTap?.ngayNhapHoc || "Chưa cập nhật" } </p>
                                        }
                                    </div>
                                </div>

                                <hr />

                                <p className="text-muted"><i className="bi bi-card-heading me-2"></i>
                                    <strong style={{fontSize: '1.1rem'}}>Thông tin CMND</strong>
                                </p> 
                                
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <p><strong>Số: </strong> { studentInfo.cccd.maSo || "Chưa cập nhật" }</p>
                                        <p><strong>Ngày cấp: </strong> { studentInfo.cccd.ngayCap|| "Chưa cập nhật"  }</p>
                                    </div>
                                    <div className="col-lg-8 col-md-8">
                                        <p><strong>Nơi cấp: </strong>  { studentInfo.cccd.noiCap || "Chưa cập nhật"  }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>}   
        </>
    )
}

export default Profile
