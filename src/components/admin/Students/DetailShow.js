import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import { useParams} from 'react-router-dom';
import BackBtn from '../../common/BackBtn';
import NguoiDungApi from '../../../api/NguoiDungApi';
import img from '../../../assets/images/faces/2.jpg';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/DanhGiaHS.css';

const Profile = () => {
    const history = useHistory();
    document.title = "Tài khoản | VNA EDUCATION"

    const [studentInfo, setStudentInfo] = useState([])
    const { id } = useParams();
    useEffect(() => {
        const getStudentInfo = async () => {
            const res = await NguoiDungApi.getByIdHS(id)
            setStudentInfo(res?.data)
            console.log(res?.data);
        };
        getStudentInfo()
    },[id]);
    

    return (
        <>
            {/* { !studentInfo ? <LoadingFullPage />' :  */
                <div className="page-heading">
                <TitleBreadcrumb
                    title="Thông tin cá nhân"
                    subTitile={`Học sinh | ${studentInfo.hoTen}`}
                    pathHome="" />
                <section className="section">
                    
                    <div className="card shadow-sm mb-3" style={{ overflow: "hidden" }}>
                        <div className="card-body">
                            <div>
                                <BackBtn onClick={() => history.goBack()} />
                                {/* <Link to={`/quan-ly/hoc-sinh/danh-sach/diem-danh/${studentInfo.id}`}>
                                    <button className="btn btn-primary button-dd">Xem điểm danh</button>
                                </Link>     */}
                            </div>
                            <div className="row">
                                <div className="col-lg-4 p-5 d-flex flex-column align-items-center justify-content-center" style={{borderRight: "1px solid #f1f1f1"}}>
                                    <img
                                        src={img}
                                        className="rounded-circle avatar-lg img-thumbnail" alt="profileimage" />
                                    <h3 className="">
                                        {studentInfo.hoTen}
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-muted"><strong>Mã sinh viên:</strong>
                                            {studentInfo.maND}
                                        </p>
                                        <p className="text-muted"><strong>Số điện thoại:</strong> {studentInfo.soDienThoai} </p>
                                        <p className="text-muted"><strong>Email:</strong>
                                            {studentInfo.emailND}
                                        </p>    
                                            <p className="text-muted"><strong>Trạng thái:</strong> {studentInfo.dangHoatDong ? "Đang học" : "Nghỉ học" }</p>
                                    </div>
                                </div>
                                <div className="col-lg-8 p-5">
                                    <p className="text-muted"><i className="bi bi-person-fill me-2"></i><strong style={{fontSize: '1.1rem'}}> Thông tin cá nhân</strong></p>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4">
                                                <p><strong>Họ và tên: </strong> {studentInfo.hoTen}</p>
                                                <p><strong>Giới tính: </strong>{studentInfo.gioiTinh }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                                <p><strong>Quốc tịch: </strong>{studentInfo.quocTich}</p>
                                                <p><strong>Dân tộc: </strong>{studentInfo.danToc }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                                <p><strong>Ngày sinh: </strong>{studentInfo.ngaySinh }</p>
                                                <p><strong>Địa chỉ: </strong> {studentInfo.diaChi }</p>
                                        </div>
                                    </div>
                                    
                                    
                                    <hr />

                                    <p className="text-muted"><i className="bi bi-info-circle me-2"></i><strong style={{fontSize: '1.1rem'}}>Thông tin học tập</strong></p>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4">
                                                <p><strong>Mã học sinh: </strong> {studentInfo.maND}</p>
                                                <p><strong>Lớp: </strong> { studentInfo?.hocTap?.lopHoc}</p>
                                        </div>
                                            
                                        <div className="col-lg-8 col-md-8">
                                            <p><strong>Giáo viên chủ nhiệm: </strong>{studentInfo?.hocTap?.GVCN } </p>
                                            <p><strong>Ngày nhập học: </strong>{studentInfo?.hocTap?.ngayNhapHoc }</p>
                                        </div>
                                    </div>

                                    <hr />
                                    
                                    <p className="text-muted"><i className="bi bi-card-heading me-2"></i><strong style={{fontSize: '1.1rem'}}>Thông tin CMND</strong></p>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4">
                                                <p><strong>Số: </strong> { studentInfo?.cccd?.maSo}</p>
                                                <p><strong>Ngày cấp: </strong>{studentInfo?.cccd?.ngayCap }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8">
                                                <p><strong>Nơi cấp: </strong>{studentInfo?.cccd?.noiCap }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            }
        </>
    )
}

export default Profile


