import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import BackBtn from '../../common/BackBtn';
import NguoiDungApi from '../../../api/NguoiDungApi';
import img from '../../../assets/images/faces/2.jpg';
// import img from '../../../assets/images/faces/2.jpg'
// import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'

const Profile = () => {
    const history = useHistory();
    document.title = "Tài khoản | VNA EDUCATION"

    const [quanTriInfo, setQuanTriInfo] = useState([])
    const { id } = useParams();
    useEffect(() => {
        getTeacherInfo()    
    },)
    
    const getTeacherInfo = async() => {
        const res = await NguoiDungApi.getById(id)
        setQuanTriInfo(res.data)
        // console.log(res.data)
    }

    return (
        <>
            {// { teacherInfo.map() !== '' ? 
            <div className="page-heading">
                <TitleBreadcrumb
                    title="Thông tin cá nhân quản trị viên"
                    subTitle={`Học sinh | ${quanTriInfo.hoTen}`}
                    pathHome="" />
                <section className="section">
                    <div className="card shadow-sm mb-3" style={{ overflow: "hidden" }}>
                        <div className="card-body">
                            <div>
                                <BackBtn onClick={() => history.goBack()}/>
                                </div>
                                {
                                    <div className="row">
                                            <div className="col-lg-4 p-5 d-flex flex-column align-items-center justify-content-center" style={{ borderRight: "1px solid #f1f1f1" }}>
                                                <img
                                                    src={img}
                                                    className="rounded-circle avatar-lg img-thumbnail" alt="profileimage" />
                                                <h3 className="">
                                                    {quanTriInfo.hoTen}
                                                </h3>
                                                <div className="mt-2">
                                                    <p className="text-muted"><strong>Mã giáo viên: </strong>
                                                        {quanTriInfo.maND}
                                                    </p>
                                                    <p className="text-muted"><strong>Số điện thoại: </strong>{quanTriInfo.soDienThoai}</p>
                                                    <p className="text-muted"><strong>Email: </strong>
                                                        {quanTriInfo.emailND}
                                                    </p>
                                                    <p className="text-muted"><strong>Trạng thái:</strong> {quanTriInfo.dangHoatDong ? " Đang làm việc " : " Nghỉ việc " }</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 p-5">
                                                <p className="text-muted"><i className="bi bi-person-fill me-2"></i><strong style={{ fontSize: '1.1rem' }}> Thông tin cá nhân</strong></p>
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Họ và tên: </strong>{quanTriInfo.hoTen}</p>
                                                        <p><strong>Giới tính: </strong>{quanTriInfo.gioiTinh}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Ngày sinh: </strong>{quanTriInfo.ngaySinh}</p>
                                                        <p><strong>Địa chỉ: </strong>{quanTriInfo.diaChi}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Quốc tịch: </strong>{quanTriInfo.quocTich}</p>
                                                        <p><strong>Dân tộc: </strong>{quanTriInfo.danToc}</p>
                                                    </div>
                                                </div>
                                        

                                                <hr />

                                                <p className="text-muted"><i className="bi bi-info-circle me-2"></i><strong style={{ fontSize: '1.1rem' }}>Thông tin Chuyên môn</strong></p>
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Mã giáo viên: </strong>{quanTriInfo.maND}</p>
                                                        {/* <p><strong>Môn dạy: </strong>{quanTriInfo.monDay}</p> */}
                                                        <p><strong>Chức vụ: </strong> {quanTriInfo?.chucVu?.chucVu}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        {/* <p><strong>GVCN_Lớp: </strong>{quanTriInfo.chuNhiem}</p> */}
                                                        {/* <p><strong>Ngày nhập học: </strong> 2019-03-18</p> */}
                                                        <p><strong>Trình độ chuyên môn: </strong>{quanTriInfo?.chucVu?.trinhDo}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Hình thức hợp đồng: </strong>{quanTriInfo?.chucVu?.hopDong}</p>
                                                    </div>
                                                </div>

                                                <hr />
                                        
                                                <p className="text-muted"><i className="bi bi-card-heading me-2"></i><strong style={{ fontSize: '1.1rem' }}>Thông tin CMND</strong></p>
                                                <div className="row">
                                                    <div className="col-lg-8 col-md-8">
                                                        <p><strong>CMND/CCCD/PASSPORT: </strong>{quanTriInfo?.cccd?.maSo}</p>
                                                        <p><strong>Ngày cấp: </strong> {quanTriInfo?.cccd?.ngayCap}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Nơi cấp: </strong> {quanTriInfo?.cccd?.noiCap}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                        </div>
                    </div>
                </section>
                </div>
                //:<></>
            }
        </>
    )
}

export default Profile
