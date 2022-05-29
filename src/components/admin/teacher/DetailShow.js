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

    const [teacherInfo, setTeacherInfo] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        getTeacherInfo()    
    },)
    
    const getTeacherInfo = async() => {
        const res = await NguoiDungApi.getById(id)
        setTeacherInfo(res.data)
        // console.log( 111111 ,res.data)
    }
    
    return (
        <>
            { 
            <div className="page-heading">
                <TitleBreadcrumb
                    title="Thông tin cá nhân"
                    subTitle={`Học sinh | ${teacherInfo.hoTen}`}
                    pathHome="" />    
                    <section className="section">
                        <div className="card shadow-sm mb-3" style={{ overflow: "hidden" }}>
                            <div className="card-body">
                                <div>
                                    <BackBtn onClick={() => history.goBack()}/>
                                </div>
                                    { //teacherInfo.map((ishow, idx)=>(
                                        <div className="row">
                                            <div className="col-lg-4 p-5 d-flex flex-column align-items-center justify-content-center" style={{ borderRight: "1px solid #f1f1f1" }}>
                                                <img
                                                    src={img}
                                                    className="rounded-circle avatar-lg img-thumbnail" alt="profileimage" />
                                                <h3 className="">
                                                    {teacherInfo.hoTen}
                                                </h3>
                                                <div className="mt-2">
                                                    <p className="text-muted"><strong>Mã giáo viên: </strong>
                                                        {teacherInfo.maND}
                                                    </p>
                                                    <p className="text-muted"><strong>Số điện thoại: </strong>{teacherInfo.soDienThoai}</p>
                                                    <p className="text-muted"><strong>Email: </strong>
                                                        {teacherInfo.emailND}
                                                    </p>
                                                    <p className="text-muted"><strong>Trạng thái:</strong> {teacherInfo.dangHoatDong ? " Đang làm việc " : " Nghỉ việc " }</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 p-5">
                                                <p className="text-muted"><i className="bi bi-person-fill me-2"></i><strong style={{ fontSize: '1.1rem' }}> Thông tin cá nhân</strong></p>
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Họ và tên: </strong>{teacherInfo.hoTen}</p>
                                                        <p><strong>Giới tính: </strong>{teacherInfo.gioiTinh}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Ngày sinh: </strong>{teacherInfo.ngaySinh}</p>
                                                        <p><strong>Địa chỉ: </strong>{teacherInfo.diaChi}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Quốc tịch: </strong>{teacherInfo.quocTich}</p>
                                                        <p><strong>Dân tộc: </strong>{teacherInfo.danToc}</p>
                                                    </div>
                                                </div>
                                        

                                                <hr />

                                                <p className="text-muted"><i className="bi bi-info-circle me-2"></i><strong style={{ fontSize: '1.1rem' }}>Thông tin Chuyên môn</strong></p>
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Mã giáo viên: </strong>{teacherInfo.maND}</p>
                                                        {/* <p><strong>Môn dạy: </strong>{teacherInfo.monDay}</p> */}
                                                        <p><strong>Chức vụ: </strong> {teacherInfo?.chucVu?.chucVu}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>GVCN_Lớp: </strong>{teacherInfo?.lopHoc?.maLH}</p>
                                                        {/* <p><strong>Ngày nhập học: </strong> 2019-03-18</p> */}
                                                        <p><strong>Trình độ chuyên môn: </strong>{teacherInfo?.chucVu?.trinhDo}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                
                                                        <p><strong>Hình thức hợp đồng: </strong>{teacherInfo?.chucVu?.hopDong}</p>
                                                    </div>
                                                </div>

                                                <hr />
                                        
                                                <p className="text-muted"><i className="bi bi-card-heading me-2"></i><strong style={{ fontSize: '1.1rem' }}>Thông tin CMND</strong></p>
                                                <div className="row">
                                                    <div className="col-lg-8 col-md-8">
                                                        <p><strong>CMND/CCCD/PASSPORT: </strong>{teacherInfo?.cccd?.maSo}</p>
                                                        <p><strong>Ngày cấp: </strong> {teacherInfo?.cccd?.ngayCap}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <p><strong>Nơi cấp: </strong> {teacherInfo?.cccd?.noiCap}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    //))
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
