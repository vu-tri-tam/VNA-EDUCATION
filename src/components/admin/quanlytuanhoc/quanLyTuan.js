import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { FiEdit, FiDelete } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import TuanHocApi from '../../../api/TuanHocApi';
import ModalTuan from './ModalTuan';
import LoadingFullPage from '../../common/LoadingFullPage';
export default function QuanLyTuan() {

    const [show, setShow] = useState(false);

    const [tuanhoc, setTuanHoc] = useState([]);
    const [showdetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState();
    const handleShow = (status) => setShow(status);


    const getTuanHoc = async () => {
        let result = await TuanHocApi.getTuanHoc();
        const sort = result?.data?.sort((a, b) => a.tenTuan.slice(4) - b.tenTuan.slice(4))
        await setTuanHoc(sort);

    }
    const onSubmit = (data) => {
        swal({
            title: "Bạn có chắc muốn tạo đánh giá này không ?",
            text: "Cân nhắc kỹ trước khi bạn thực hiện điều này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("Thêm thành công", {
                    icon: "success",
                    buttons: false
                });
                await TuanHocApi.add(data);
                await getTuanHoc()
                handleShow(false)
                // window.location.reload()
            } else {
                swal("Đã hủy!");
            }
        });
    }

    useEffect(() => {
        getTuanHoc()
    }, [])





    //edit modal
    async function Edit(id) {
        let result = await TuanHocApi.Edit(id);
        const dataEdit = result?.data;

        await setShowEdit(dataEdit);
        await setShowDetail(true)
    }

    const Delete = (id) => {
        // console.log('iddelete', id);
        swal({
            title: "Bạn có chắc muốn xóa dữ liệu này?",
            text: "Hãy Cân nhắc kỹ trước khi bạn làm việc này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("Xóa thành công", {
                    icon: "success",
                    buttons: false
                });
                await TuanHocApi.remove(id);
                await getTuanHoc()
                await handleShow(false)

            } else {
                swal("Đã hủy!");
            }
        });

    }




    const update = (data) => {
        swal({
            title: "Bạn có chắc muốn thay đổi dữ liệu?",
            text: "Hãy Cân nhắc kỹ trước khi bạn làm việc này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("cập nhật thành công", {
                    icon: "success",
                    buttons: false
                });
                await TuanHocApi.update(data?._id, data)
                await getTuanHoc();
                setShowDetail(false)
                // window.location.reload()
                // handleClose()
            } else {
                swal("Đã hủy!");
            }
        });

    }





    return (
        <div className="page-heading">
            <TitleBreadcrumb title="Quản lí tuần học" />

            <section className="section ">
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <Button variant="primary" onClick={handleShow}>
                            Thêm tuần
                        </Button>



                        <div className="container mt-3 table-responsive w-100">


                            <Table >
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tuần</th>
                                        <th>Số tuần</th>
                                        <th>Học Kỳ</th>
                                        <th>Thời gian bắt đầu</th>
                                        <th>Thời gian kết thúc</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tuanhoc?.length > 0 ? tuanhoc?.map((e, i) => {
                                            return (
                                                <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                    <td>{i + 1}</td>
                                                    <td>{e.tenTuan}</td>
                                                    <td>{`Tuần ${e.soTuan}`}</td>
                                                    <td>{`Học kỳ ${e.hocKy}`}</td>
                                                    <td>{e.ngayBatDau}</td>
                                                    <td>{e.ngayKetThuc}</td>
                                                    <td><Link style={{ margin: '10%' }} ><FiEdit onClick={() => Edit(e._id)} /></Link><Link><FiDelete onClick={() => Delete(e._id)} /></Link></td>
                                                </tr>
                                            )
                                        }) : <tr rowSpan="7">
                                            <td colSpan="7">

                                                <LoadingFullPage /> </td>
                                        </tr>
                                    }


                                </tbody>
                            </Table>
                        </div>
                        <ModalTuan show={show} tittle="Tạo tuần học" action={onSubmit} handleClose={handleShow} initialValue={{}} />
                        <ModalTuan show={showdetail} tittle="Chỉnh sửa tuần học" action={update} handleClose={setShowDetail} initialValue={showEdit} />
                    </div>
                </div>
            </section>
        </div>


    )
}
