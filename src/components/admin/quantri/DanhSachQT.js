import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import ReactExport from 'react-data-export';
import NguoiDungApi from '../../../api/NguoiDungApi';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/DanhSachGV.css';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi';
import Swal from 'sweetalert2';
import ImportQT from '../teacher/Information/Import';
import ExportComponent from './Information/Export';
import { removeAccents } from '../helper';
import LoadingFullPage from '../../common/LoadingFullPage';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const DanhSachQT = () => {
    const [userList, setUserList] = useState([]);
    const [userExport, setUserExport] = useState([])
    const [search, setSearch] = useState("")
    // const [pageNumber, setPageNumber] = useState(0);
    // const userPerPage = 20;
    // const pagesVisited = pageNumber * userPerPage;
    // const pageCount = Math.ceil(userList.length / userPerPage);
    const history = useHistory();
    useEffect(() => {
        getDanhSach();
    }, [])
    const getDanhSach = async () => {
        const res = await NguoiDungApi.getAll()
        // console.log(res.data)
        let arr = res.data.filter(user => {
            return user.maND.substring(0, 2) === "QT" || user.maND.substring(0, 2) === "HT"
        })
        setUserList(arr)
        const exportQT = arr?.map((e, index) => {
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
                "Trạng thái": e.dangHoatDong
            }
        })
        setUserExport(exportQT)
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
    //Update
    const update = (id) => {
        history.push(`/quan-ly/giao-vien/sua-giao-vien/${id}`)
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách quản trị viên" subTitile="" pathHome="quan-ly" />
                {
                    <section className="section">
                        <div className="card">
                            <div className="card-body">
                                <div className="showListStudent">
                                    <div className="mb-3 box-fil row">
                                        <div className=" col-lg-6 ">
                                            <div className="input-group mb-3">
                                                <input type="text" onChange={(e) => { setSearch(e.target.value) }} className="form-control" placeholder="Nhập tên" />
                                                <button className="ml-5 btn btn-primary" type="button">Tìm kiếm</button>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 " style={{ textAlign: 'right', display: 'flex' }}>
                                            <ImportQT getDanhSach={getDanhSach} />
                                            <ExportComponent data={userExport} filename="Danh sách quản trị viên" />
                                            {/* <div>
                                                <ExcelFile
                                                    filename="Danh sách giáo viên"
                                                    element={<button type="button"   className="btn btn-success float-right" >Xuất</button>}
                                                >
                                                    <ExcelSheet dataSet={dataSet}/>
                                                </ExcelFile>
                                            </div> */}
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
                                                    <th>SĐT</th>
                                                    <th>Thông tin</th>
                                                    <th>Chứ năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userList?.length > 0 ? userList
                                                    ?.filter((item) => {
                                                        let query = removeAccents(search.toLowerCase())
                                                        if (search === "") {
                                                            return item
                                                        } else if (removeAccents(item.hoTen.toLowerCase()).includes(query)
                                                            || removeAccents(item.maND.toLowerCase()).includes(query)) {
                                                            return item
                                                        } else {
                                                            return false
                                                        }
                                                    })
                                                    //.slice(pagesVisited, pagesVisited + userPerPage) 
                                                    .map((qt, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{qt.maND}</td>
                                                            {/* <td>{qt.hinhAnh}</td> */}
                                                            <td>{qt.hoTen}</td>
                                                            <td>0{qt.soDienThoai}</td>
                                                            <td>
                                                                <Link to={`/quan-ly/quan-tri/danh-sach/chi-tiet/${qt._id}`}>
                                                                    <button className="btn btn-primary">Xem chi tiết</button>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link to={`/quan-ly/quan-tri/sua-quan-tri-vien/${qt._id}`}>
                                                                    <FiEdit className=" mr-15" onClick={() => update(qt._id)}>Sửa</FiEdit>
                                                                </Link>
                                                                <FiDelete onClick={() => AlertDelete(qt._id)}>
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
                            {/* <ReactPaginate
                                previousLabel={"Trước"}
                                nextLabel={"Sau"}
                                pageCount={pageCount}
                                onPageChange={onPageChange}
                                previousClassName={"previousBttns"}
                                containerClassName={"paginationBttns"}
                                nextLinkClassName={"nextBttns"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            /> */}
                        </div>
                    </section>
                }
            </div>
        </>
    )
};

export default DanhSachQT;