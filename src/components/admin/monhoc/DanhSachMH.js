import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NguoiDungApi from '../../../api/NguoiDungApi';
import { FiEdit, FiDelete } from 'react-icons/fi';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
// import { Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Button, Modal } from 'react-bootstrap';

// import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import LoadingFullPage from '../../common/LoadingFullPage';

const DanhSachMH = () => {
    const [listMonHoc, setListMonHoc] = useState([]);
    const [showListGV, setListGV] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 20;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(listMonHoc.length / userPerPage);
    const [search, setSearch] = useState("");
    //show modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const history = useHistory();
    useEffect(() => {
        getMonHoc();

    }, [])
    const getMonHoc = async () => {
        const res = await NguoiDungApi.getMH()
        setListMonHoc(res?.data)
        // console.log(res?.data);
    }
    const AlertDelete = (id) => {
        return Swal.fire({
            icon: 'warning',
            title: 'Bạn muốn xóa chứ',
            text: 'Tất cả thông tin sẽ bị xóa vĩnh viễn',
            showCancelButton: true,
            confirmButtonText: 'Xóa'
        }).then((result) => {
            if (result.isConfirmed) {
                NguoiDungApi.deleteMH(id)
                    .then(() => getMonHoc())
            }
        })
    }
    // const updateMH = (id) => {
    //     history.pus(`/quan-ly/mon-hoc/sua-mon-hoc/${id}`)
    // }
    const onPageChange = ({ selected }) => {
        setPageNumber(selected);
    }

    const handleShowGV = async (idMH) => {
        let arr = []
        await NguoiDungApi.getDanhSachGV(idMH)?.then((res) => arr.push(res?.data))
        setListGV(...arr)


        handleShow()
    }
    // const sttUser = pageNumber * userPerPage;
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách môn học" />
                <section className="secction">
                    <div className="card">
                        <div className="card-body">
                            <div className="showListStudent">
                                <div className="mb-3 box-fil row">
                                    <div className="col-lg-6">
                                        <div className="input-group mb-3">
                                            <input type="text" onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Nhập tên, mã môn học" />
                                            <button className="ml-5 btn btn-primary" type="button">Tìm kiếm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Chi tiết giáo viên</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Giáo viên</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                showListGV?.map((ele, i) => {
                                                    return <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{ele?.hoTen}</td>

                                                    </tr>
                                                })

                                            }
                                        </tbody>
                                    </table>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Đóng
                                    </Button>

                                </Modal.Footer>
                            </Modal>
                            <div className="tableShow scrollStudent overflow-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Môn</th>
                                            <th>Giáo viên</th>
                                            <th>Mã môn</th>
                                            <th>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listMonHoc?.length > 0 ? listMonHoc?.filter((item) => {
                                            if (search === "") {
                                                return item
                                            } else if (item.tenMH.toLowerCase().includes(search.toLowerCase())) {
                                                return item
                                            } else {
                                                return false
                                            }
                                        })
                                            .slice(pagesVisited, pagesVisited + userPerPage)
                                            .map((mh, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{mh.tenMH}</td>
                                                    <td>
                                                        <Button onClick={() => handleShowGV(mh._id)}>Giáo viên</Button>
                                                    </td>
                                                    <td>{mh.maMH}</td>
                                                    <td>
                                                        <Link to={`/quan-ly/mon-hoc/sua-mon-hoc/${mh._id}`}>
                                                            <FiEdit className="mr-15" >Sửa</FiEdit>
                                                        </Link>
                                                        <FiDelete onClick={() => AlertDelete(mh._id)}>Xóa</FiDelete>
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

export default DanhSachMH;