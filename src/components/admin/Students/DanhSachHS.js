import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import NguoiDungApi from '../../../api/NguoiDungApi';
import ImportHS from './Information/ImportHS';
import '../css/DanhGiaHS.css';
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import '../css/DanhSachGV.css';
import { FiEdit, FiDelete } from 'react-icons/fi';
import ExportComponent from '../teacher/Information/Export';
import { removeAccents } from '../../hocsinh/helper/HocSinhHelper';
import LoadingFullPage from '../../common/LoadingFullPage';

const DanhSachHS = () => {
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState("");
    const [classUsers, setClass] = useState([]);
    const [classSelected, setClassSelected] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 20;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(userList.length / userPerPage);
    const history = useHistory();

    useEffect(() => {
        NguoiDungApi.getSelect().then((reponse) => {
            setClass(reponse?.data)
            getDanhSach(classSelected);
        })
    }, [classSelected]);

    //load danh sách
    const getDanhSach = async (classId) => {
        const users = (await NguoiDungApi.getAll())?.data;
        const students = users?.filter(e => e?.maND?.indexOf('HS') === 0) || [];
        if (classId && classId !== '') {
            const studentByClass = students?.filter(e => e?.lopHoc?._id === classId);
            setUserList(studentByClass)
        }
        else {
            setUserList(students)
        }
    }
    const translateExcel = (data) => {
        return data?.map((e, index) => {
            return {
                "STT": index + 1,
                "Mã học sinh": e.maND,
                "Họ Tên": e.hoTen,
                "Lớp": e.lopHoc,
                "Số điện thoại": e.soDienThoai,
                "Email": e.emailND,
                "Mật khẩu": e.matKhau,
                "Giới tính": e.gioiTinh,
                "Ngày sinh": e.ngaySinh,
                "Nơi sinh": e.noiSinh,
                "Quốc tịch": e.quocTich,
                "Dân tộc": e.danToc,
                "CCCD/CMND": e?.cccd?.maSo,
                "Ngày cấp": e?.cccd?.ngayCap,
                "Nơi cấp": e?.cccd?.noiCap,
                "Địa chỉ": e.diaChi,
                "Ngày nhập học": e.ngayNhapHoc,
                "Trạng thái": e.dangHoatDong ? 'Đang đi học' : 'Nghỉ học'
            }
        })
    }
    const AlertDelete = (id) => {
        return Swal.fire({
            icon: 'warning',
            title: "Bạn muốn xóa chứ",
            text: "Tất cả thông tin sẽ bị xóa vĩnh viễn",
            showCancelButton: true,
            confirmButtonText: 'Xóa'
        }).then((result) => {
            if (result.isConfirmed) {
                NguoiDungApi.deleteGV(id)
                    .then(() => getDanhSach())
            }
        })
    }
    //update
    const update = async (id) => {
        history.push(`/quan-ly/hoc-sinh/sua-hoc-sinh/${id}`)
    }
    const onPageChange = ({ selected }) => {
        setPageNumber(selected);
    }
    const sttUser = pageNumber * userPerPage;


    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách học sinh" subTitile="" pathHome="quan-ly" />
                {
                    <section className="section">
                        <div className="card">
                            <div className="card-body">
                                <div className="showListStudent">
                                    <div className="mb-3 box-fil row">
                                        <div className="col-lg-6">
                                            <div className="input-group mb-3">
                                                <input type="text" onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Nhập tên, mã học sinh" />
                                                <button className="ml-5 btn btn-primary" type="button">Tìm kiếm</button>
                                            </div>
                                        </div>
                                        {/* <div className="className col-lg-4">
                                        
                                        </div> */}
                                        <div className="col-lg-6" style={{ textAlign: 'right', display: 'flex' }}>

                                            <ImportHS getDanhSach={getDanhSach} />
                                            {/* <ExportHS /> */}
                                            <select onChange={(e) => { setClassSelected(e?.target?.value) }} className="select-import">
                                                <option value="">Tất cả học sinh</option>
                                                {classUsers?.map((e, index) => {
                                                    return (<option key={index} value={e._id}>Lớp {e.maLH}</option>)
                                                })}
                                            </select>
                                            <ExportComponent gvData={translateExcel(userList)} filename={`Danh sach tat ca hoc sinh ${classUsers[classUsers?.findIndex(e => e?._id === classSelected)]?.maLH || ''}`} className="button-import" />

                                            {/* <button className="btn btn-primary" >Xuất</button> */}
                                        </div>
                                    </div>
                                    <div className="table tableShow scrollStudent">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Mã Học Sinh</th>
                                                    <th>Họ và tên</th>
                                                    <th>Lớp</th>
                                                    {/* <th>Ảnh</th> */}
                                                    <th>Thông tin</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userList?.length > 0 ? userList
                                                    ?.filter((item) => {  //FILTER
                                                        let query = removeAccents(search.toLowerCase())
                                                        if (search === "") {
                                                            return item
                                                        } else if (removeAccents(item.hoTen.toLowerCase()).includes(query)
                                                            || removeAccents(item.maND.toLowerCase()).includes(query)
                                                        ) {
                                                            return item
                                                        } else {
                                                            return false
                                                        }
                                                    })
                                                    .slice(pagesVisited, pagesVisited + userPerPage)
                                                    ?.map((hs, index) => (
                                                        <tr key={hs._id}>
                                                            <td>{sttUser + index + 1}</td>
                                                            <td>{hs.maND}</td>
                                                            <td>{hs.hoTen}</td>
                                                            <td>
                                                                {hs?.lopHoc?.maLH !== undefined ? hs?.lopHoc?.maLH : "Đang cập nhật"}
                                                            </td>
                                                            {/* <td>{hs.img}</td> */}
                                                            <td>
                                                                <Link to={`/quan-ly/hoc-sinh/danh-sach/chi-tiet/${hs._id}`}>
                                                                    <button className="btn btn-primary">Xem chi tiết</button>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link to={`/quan-ly/hoc-sinh/sua-hoc-sinh/${hs._id}`}>
                                                                    <FiEdit className="mr-15" onClick={() => update(hs._id)}>Sửa</FiEdit>
                                                                </Link>
                                                                <FiDelete onClick={() => AlertDelete(hs._id)}>
                                                                    Xóa
                                                                </FiDelete>
                                                            </td>
                                                        </tr>
                                                    )) : <tr rowSpan="6">
                                                    <td colSpan="6">

                                                        <LoadingFullPage /> </td>
                                                </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <ReactPaginate
                                previousLabel={"Trước"}
                                nextLabel={"Sau"}
                                pageCount={pageCount}
                                onPageChange={onPageChange}
                                previousClassName={"previousBttns"}
                                containerClassName={"paginationBttns"}
                                nextLinkClassName={"nextBttns"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>
                    </section>
                }
            </div>
        </>
    )
};

export default DanhSachHS;