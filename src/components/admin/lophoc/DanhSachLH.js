import React, { useEffect, useState } from 'react';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import NguoiDungApi from '../../../api/NguoiDungApi';
import Swal from 'sweetalert2';
import { FiEdit, FiDelete } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import LoadingFullPage from '../../common/LoadingFullPage';

const DanhSachLH = () => {
    const [listLH, setListLH] = useState([]);
    const [search, setSearch] = useState("")
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 16;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(listLH.length / userPerPage);
    // const history = useHistory();

    useEffect(() => {
        getDanhSach();
    }, [])
    const getDanhSach = async () => {
        const res = await NguoiDungApi.getAllLH();
        console.log(res?.data);
        setListLH(res?.data)
    }
    const AlertDelete = async (id) => {
        // const res = await NguoiDungApi.getOneLH(id)
        // console.log(res.data.id);
        return Swal.fire({
            icon: 'warning',
            title: "Bạn muốn xóa chứ",
            text: "Tất cả thông tin sẽ bị xóa vĩnh viễn",
            showCancelButton: true,
            confirmButtonText: 'Xóa'
        }).then((result) => {
            if (result.isConfirmed) {
                NguoiDungApi.deleteLH(id)
                    // console.log(res.data);
                    .then(() => getDanhSach())
            }
        })
    }
    const onPageChange = ({ selected }) => {
        setPageNumber(selected);
    }

    const sttUser = pageNumber * userPerPage;

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách lớp học" subTitile="" pathHome="quan-ly" />
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <div className="showListStudent">
                                <div className="mb-3 box-fil row">
                                    <div className=" col-lg-6 ">
                                        <div className="input-group mb-3">
                                            <input type="text" onChange={(e) => { setSearch(e?.target?.value) }} className="form-control" placeholder="Nhập họ tên, lớp" />
                                            <button className="ml-5 btn btn-primary" type="button">Tìm kiếm</button>
                                        </div>
                                    </div>
                                    <div className="tableShow scrollStudent overflow-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Mã lớp học</th>
                                                    <th>Năm học</th>
                                                    <th>Chủ nhiệm</th>
                                                    <th>Chứ năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listLH?.length > 0 ?
                                                    listLH
                                                        ?.filter((item) => {
                                                            if (search === "") {
                                                                return item
                                                            } else if (item.maLH.toLowerCase().includes(search.toLowerCase()) || item.GVCN.hoTen.toLowerCase().includes(search.toLowerCase())) {
                                                                return item
                                                            } else {
                                                                return false
                                                            }
                                                        })
                                                        .slice(pagesVisited, pagesVisited + userPerPage)
                                                        .map((lh, index) => (
                                                            <tr key={index}>
                                                                <td>{sttUser + index + 1}</td>
                                                                <td>{lh.maLH}</td>
                                                                <td>{lh?.namHoc?.tenNam}</td>
                                                                <td>{lh.GVCN.hoTen}</td>
                                                                <td>
                                                                    <Link to={`/quan-ly/lop-hoc/sua-lop-hoc/${lh._id}`}>
                                                                        <FiEdit className="mr-15">Sửa</FiEdit>
                                                                    </Link>
                                                                    <FiDelete onClick={() => AlertDelete(lh._id)}>
                                                                        Xóa
                                                                    </FiDelete>
                                                                </td>
                                                            </tr>
                                                        )) : <tr rowSpan="5">
                                                        <td colSpan="5">
                                                            <LoadingFullPage /> </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
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
            </div>
        </>
    )
}
export default DanhSachLH;