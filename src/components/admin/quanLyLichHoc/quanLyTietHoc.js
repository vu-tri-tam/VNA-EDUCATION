import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import { FiEdit, FiDelete } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import TietHocApi from '../../../api/TietHocApi';
// import { useForm } from "react-hook-form";
// import PhieuDanhGiaApi from '../../../api/PhieuDanhGiaApi';
import swal from 'sweetalert';
import BackBtn from '../../common/BackBtn';
// import axios from 'axios';
import LopHocApi from '../../../api/LopHocApi';
import ModalTietHoc from '../quanlydanhgia/ModalTietHoc';
import LoadingFullPage from '../../common/LoadingFullPage';
// import ImportHS from '../Students/Information/ImportHS';
// import ImportFile from '../quanlydanhgia/importFile/importFile';
// import XLXS from "xlsx"
// import ImportFile from '../quanlydanhgia/importFile/importFile';

export default function QuanLyTietHoc() {
    let { idLH, idBH } = useParams();

    const [show, setShow] = useState(false);

    const [tietHoc, setTietHoc] = useState([])
    // console.log(tietHoc, 'tiet');
    // const [cols, setCols] = useState()
    // const [data, setData] = useState()



    const [showEdit, setShowEdit] = useState();
    const [showdetail, setShowDetail] = useState(false);
    // const [monhoc, setMH] = useState([]);
    // const [giaoVien, setGiaoVien] = useState([]);
    const [classes, setClasses] = useState([]);
    // const [cloneTietHoc, setCloneTiet] = useState([]);
    // const [input, setInput] = useState([])

    // const handleInput = (field, value) => {
    //     setInput({
    //         ...input,
    //         [field]: value
    //     })
    // }
    // console.log(monhoc, 'MH');
    const handleClose = () => setShow(false);

    const handleShow = (status) => setShow(status);
    const handleShowEdit = (status) => setShowDetail(status);


    const getTietHoc = async () => {
        let result = await TietHocApi.getTietHocTheoBuoi(idBH);
        const filterClass = result?.data?.filter(e => e?.lopHoc?._id === idLH);
        const sort = filterClass.sort((a, b) => a.thuTiet.slice(4) - b.thuTiet.slice(4))
        setTietHoc(sort);
    }


    const onSubmit = (data) => {
        // console.log(data, 'data', idLH)
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
                // await TietHocApi.add({ ...data, lopHoc: idLH })
                await TietHocApi.add({ ...data, lopHoc: idLH, buoiHoc: idBH })
                await getTietHoc()
                handleShow(false)
                // window.location.reload()
            } else {
                swal("Đã hủy!");
            }
        });
    }

    useEffect(() => {
        LopHocApi.getLopHoc()?.then(res => setClasses(res.data))
        // getMonHoc()
        getTietHoc()
    }, [])
    //edit modal

    async function Edit(id) {
        // console.log(id);
        let result = await TietHocApi.Edit(id);
        await setShowEdit(result?.data);
        setShowDetail(true)
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
                await TietHocApi.remove(id);
                await getTietHoc()
                await handleClose()

            } else {
                swal("Đã hủy!");
            }
        });

    }

    const update = (data) => {
        // console.log(id, data, 121212121)
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
                await TietHocApi.update(data?._id, data)
                await getTietHoc();
                handleShowEdit(false)
                // window.location.reload()
            } else {
                swal("Đã hủy!");
            }
        });

    }


    return (
        <div className="page-heading">
            <TitleBreadcrumb title={`Quản lý tiết của lớp ${classes?.filter(e => e?._id === idLH)[0]?.maLH || ''}`} />
            <BackBtn></BackBtn>
            <section className="section ">
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="d-flex">
                                <Button variant="primary" onClick={() => setShow(!show)}>
                                    Thêm tiết +
                                </Button>
                                {/* <ImportFile setCols={setCols} /> */}
                            </div>

                            {/* <table id="mytable" className="table mt-3">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thứ tiết</th>
                                        <th>thời gian bắt đầu</th>
                                        <th>giáo viên</th>
                                        <th>môn học</th>
                                        <th>Hành động</th>
                                    </tr>

                                </thead>
                                <tbody>

                                    {
                                        cols?.length > 0 ?

                                            cols?.map((e, i) => {
                                                return (
                                                    <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                        <td>{i}</td>
                                                        <td>{e?.thuTiet}</td>
                                                        <td>{e?.thoiGian}</td>
                                                        <td>{e?.giaoVien}</td>
                                                        <td>{e?.monHoc}</td>
                                                        <td><Link style={{ margin: '10%' }} onClick={() => Edit(e._id)} ><FiEdit /></Link><Link><FiDelete onClick={() => Delete(e._id)} /></Link></td>
                                                    </tr>

                                                )


                                            }) : <tr>
                                                <td colSpan="6" className="text-center fw-bold">Dữ liệu đang được cập nhật</td>
                                            </tr>
                                    }


                                </tbody>
                            </table> */}

                            <table id="mytable" className="table mt-3">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thứ tiết</th>
                                        <th>thời gian bắt đầu</th>
                                        <th>giáo viên</th>
                                        <th>môn học</th>
                                        <th>Hành động</th>


                                    </tr>

                                </thead>
                                <tbody>

                                    {
                                        tietHoc?.length > 0 ?
                                            tietHoc?.map((e, i) => {
                                                return (
                                                    <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                        <td>{i + 1}</td>
                                                        <td>{e?.thuTiet}</td>
                                                        <td>{e?.thoiGian}</td>
                                                        <td>{e?.giaoVien?.hoTen}</td>
                                                        <td>{e?.monHoc?.tenMH}</td>
                                                        <td><Link style={{ margin: '10%' }} onClick={() => Edit(e._id)} ><FiEdit /></Link><Link><FiDelete onClick={() => Delete(e._id)} /></Link></td>
                                                    </tr>
                                                )
                                            }) : <tr rowSpan="6">
                                                <td colSpan="6">

                                                    <LoadingFullPage /> </td>
                                            </tr>
                                    }


                                </tbody>
                            </table>
                        </div>
                        <ModalTietHoc show={show} title="Tạo tiết học" handleShow={handleShow} action={onSubmit} initialValue={{}} />
                        <ModalTietHoc show={showdetail} title="Chỉnh sửa tiết học" handleShow={handleShowEdit} action={update} initialValue={showEdit} />
                    </div>
                </div>
            </section>
        </div>
    )
}
