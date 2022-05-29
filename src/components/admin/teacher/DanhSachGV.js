import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NguoiDungApi from '../../../api/NguoiDungApi';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/DanhSachGV.css';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiEdit, FiDelete } from 'react-icons/fi';
import ImportGV from './Information/Import';
import ExportComponent from './Information/Export';
import ReactPaginate from 'react-paginate';
import { removeAccents } from '../helper';
import LoadingFullPage from '../../common/LoadingFullPage';

const DanhSachGV = () => {
    const [userList, setUserList] = useState([]);
    const [usersExport, setUsersExport] = useState([]);
    const [search, setSearch] = useState("")
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 16;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(userList.length / userPerPage);
    const history = useHistory();
    // console.log(userList, 'userList');
    useEffect(() => {
        getDanhSach();
    }, [])
    const getDanhSach = async () => {
        const res = await NguoiDungApi.getAllGV()
        // console.log(res.data)
        // let arr = res.data.filter(user => {
        //     return user.maND.substring(0,2)==="GV" || user.maND.substring(0,2)==="gv"
        // })
        setUserList(res.data)
        setSearch(res.data)
        const exportGV = res?.data?.map((e, index) => {
            return {
                "STT": index + 1,
                "Mã giáo viên": e.maND,
                "Họ Tên": e.hoTen,
                "Số điện thoại": e.soDienThoai,
                "Email": e.emailND,
                "Mật khẩu": e.matKhau,
                "Giới tính": e.gioiTinh,
                "Ngày sinh": e.ngaySinh,
                "Nơi sinh": e.noiSinh,
                "Quốc tịch": e.quocTich,
                "Dân tộc": e.danToc,
                "CCCD/CMND": e.cccd.maSo,
                "Ngày cấp": e.cccd.ngayCap,
                "Nơi cấp": e.cccd.noiCap,
                "Địa chỉ": e.diaChi,
                "Chức vụ": e.chucVu,
                "Trình đọ chuyên môn": e.tDCM,
                "Môn dạy": e.monDay,
                "Hình thức hợp đồng": e.hopDong,
                "Trạng thái": e.dangHoatDong ? 'Đang dạy' : 'Nghĩ dạy'
            }
        })
        setUsersExport(exportGV)
    }
    //xoÁ
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

    let handleSearch = (e) => {
        let valueGV = removeAccents(e.target.value.toUpperCase());
        // console.log(valueGV, 'value');
        let valueSearch = []
        let cloneGV = [...search]
        if (valueGV === '') {
            valueSearch = cloneGV;
        }
        else {
            valueSearch = cloneGV?.filter((ele) => (removeAccents(ele?.hoTen.toUpperCase())).indexOf(valueGV) !== -1)
        }
        setUserList(valueSearch)

    }
    //Update

    const update = (id) => {
        history.push(`/quan-ly/giao-vien/sua-giao-vien/${id}`)
    }

    const onPageChange = ({ selected }) => {
        setPageNumber(selected);
    }
    const sttUser = pageNumber * userPerPage;
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách giáo viên" subTitile="" pathHome="quan-ly" />
                {
                    <section className="section">
                        <div className="card">
                            <div className="card-body">
                                <div className="showListStudent">
                                    <div className="mb-3 box-fil row">
                                        <div className=" col-lg-6 ">
                                            <div className="input-group mb-3">
                                                <input type="text" onChange={(e) => { handleSearch(e) }} className="form-control" placeholder="Nhập tên, mã giáo viên" />
                                                <button className="ml-5 btn btn-primary" type="button">Tìm kiếm</button>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 " style={{ textAlign: 'right', display: 'flex' }}>
                                            <ImportGV getDanhSach={getDanhSach} />
                                            <ExportComponent gvData={usersExport} filename="Danh sach giao vien" />
                                        </div>
                                    </div>
                                    <div className="tableShow scrollStudent overflow-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Mã Giáo viên</th>
                                                    {/* <th>Ảnh</th> */}
                                                    <th>Họ và tên</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Thông tin</th>
                                                    <th>Chứ năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userList?.length > 0 ? userList
                                                    .slice(pagesVisited, pagesVisited + userPerPage)
                                                    .map((gv, index) => (
                                                        <tr key={index}>
                                                            <td>{sttUser + index + 1}</td>
                                                            <td>{gv.maND}</td>
                                                            {/* <td>{gv.hinhAnh}</td> */}
                                                            <td>{gv.hoTen}</td>
                                                            <td>0{gv.soDienThoai}</td>
                                                            <td>
                                                                <Link to={`/quan-ly/giao-vien/danh-sach/chi-tiet/${gv._id}`}>
                                                                    <button className="btn btn-primary">Xem chi tiết</button>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link to={`/quan-ly/giao-vien/sua-giao-vien/${gv._id}`}>
                                                                    <FiEdit className="mr-15" onClick={() => update(gv._id)}>Sửa</FiEdit>
                                                                </Link>
                                                                <FiDelete onClick={() => AlertDelete(gv._id)}>
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

export default DanhSachGV;