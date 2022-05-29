import React, { useEffect, useState } from 'react';
import { FiDelete, FiEdit } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
// import { Link } from 'react-router-dom';
// import swal from 'sweetalert';
import CRUD_PhieuDanhGia from '../../../api/CRUD_PhieuDanhGiaApi';
import PhieuDanhGiaApi from '../../../api/PhieuDanhGiaApi';
// import LopHocApi from '../../../api/LopHocApi';
// import TietHocApi from '../../../api/TietHocApi';
// import TuanHocApi from '../../../api/TuanHocApi';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import ModalPDG from './ModalPDG';
import Pagination from './Pagination/Pagination';
// import { useFormik } from "formik";
import ExportGV from '../teacher/Information/Export';
import { Button } from 'react-bootstrap';
import customAlert from '../../common/danhGiaAdmin/customAlert';
import swal from 'sweetalert';
import ModalDetailPDG from './ModalPDG/ModalDetailPDG';
import LoadingFullPage from '../../common/LoadingFullPage';
// import ReactPaginate from 'react-paginate';

// import * as Yup from "yup";

export default function PhieuDanhGia() {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [ratingList, setRatingList] = useState([]);
    // console.log(ratingList, 'list');
    const [clonePDG, setClonePDG] = useState([])
    const [showModalDetail, setModalDetail] = useState(false);

    // console.log(ratingList, 'ratingList');
    const [initialValue, setInitialValue] = useState({});
    // console.log(ratingList, 'dg')

    //validate
    // const formik = useFormik({
    //     initialValues: {
    //         full_name: "",
    //         email: "",
    //         password: "",
    //         confirm_password: ""
    //     },
    //     validationSchema: Yup.object({
    //         tenDG: Yup.string()
    //             .min(2, "Mininum 2 characters")
    //             .max(15, "Maximum 15 characters")
    //             .required("Required!"),
    //         email: Yup.string()
    //             .email("Invalid email format")
    //             .required("Required!"),
    //         password: Yup.string()
    //             .min(8, "Minimum 8 characters")
    //             .required("Required!"),
    //         confirm_password: Yup.string()
    //             .oneOf([Yup.ref("password")], "Password's not match")
    //             .required("Required!")
    //     })
    // });

    //phân trang react pagination
    const [indexFirt, setIndexFirt] = useState(0)//tạo state để đếm
    const usePage = 4;//chỉ định cho page hiện 4
    const indexOfFirt = indexFirt * usePage;// lấy chỉ số
    // console.log(indexOfFirt, 8877675);
    const current = ratingList.slice(indexOfFirt, indexOfFirt + usePage)// chỉ định cắt lấy 4 phần tử 

    // const [lopHoc, setlopHoc] = useState([]);

    const getRatingList = async () => {
        PhieuDanhGiaApi.getPhieuDanhGia().then((response) => {
            setRatingList(response?.data || []);
        })
    }//hàm load ds đánh giá


    useEffect(() => {
        getRatingList();
        // LopHocApi.getLopHoc()?.then((res) => setlopHoc(res?.data))

    }, [])
    //load danh sách đánh giá 1 lần

    const handleShow = (status) => {
        setShow(status);
    }
    const handleShowEdit = (status) => {
        setShowEdit(status);
    }

    //State ẩn hiện modal
    // const handleLopHocClick = (idGV) => {
    //     const getGVCN = lopHoc?.map((e, i) => e?.GVCN?._id == idGV)
    //     console.log(getGVCN, 'GETGVCN');

    // }

    const Create = (data) => {
        // console.log({ ...data, lopHoc: lopHoc })
        // customAlert('bạn có chắc muốn tạo đánh giá này không ?',
        //     CRUD_PhieuDanhGia.add(data),
        //     getRatingList,
        // ).then(() => handleShow(false))

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
                CRUD_PhieuDanhGia.add(data).then(() => {
                    getRatingList();
                    handleShow(false);
                })

                // window.location.reload()
            } else {
                swal("Đã hủy!");
            }
        });

    }
    //Hàm tạo đánh giá

    const Update = async (data) => {
        customAlert("Bạn có chắc muốn thay đổi dữ liệu?",
            CRUD_PhieuDanhGia.update(data?._id, data),
            getRatingList,

        ).then(() => handleShowEdit(false))
        // swal({
        //     title: "Bạn có chắc muốn thay đổi dữ liệu?",
        //     text: "Hãy Cân nhắc kỹ trước khi bạn làm việc này!",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // }).then(async (res) => {
        //     if (res) {
        //         swal("cập nhật thành công", {
        //             icon: "success",
        //             buttons: false
        //         });
        //         await CRUD_PhieuDanhGia.update(data?.id, data).then(() => {
        //             getRatingList();
        //             handleShowEdit(false);
        //         })
        //         // window.location.reload()
        //         // handleClose()
        //     } else {
        //         swal("Đã hủy!");
        //     }
        // });

    }
    //Hàm cập nhật đánh giá trong db

    const Edit = (id) => {
        CRUD_PhieuDanhGia.Edit(id).then((response) => {
            // console.log(response, 'respon');
            handleShowEdit(true);
            // setInitialValue(response?.data)
            const dataEdit = response?.data;
            setInitialValue({
                // response?.data
                _id: id,
                giaoVien: dataEdit?.giaoVien?._id || [],
                monHoc: dataEdit?.monHoc?._id || '',
                mauDG: dataEdit?.mauDG?._id,
                lopHoc: dataEdit?.lopHoc?._id || '',
                choGVCN: dataEdit?.choGVCN,
                tuanDG: dataEdit?.tuanDG?._id,
                tenDG: dataEdit?.tenDG,
                tieuChi: dataEdit?.tieuChi,
                chiTiet: [],

            })
        })

    }
    //Hàm bật modal chỉnh sửa đánh giá và SEt giá trị ban đầu

    const Delete = (id) => {
        customAlert("Bạn có chắc muốn xóa dữ liệu này?",
            CRUD_PhieuDanhGia.remove(id),
            getRatingList,

            // handleShowEdit
        )
        // swal({
        //     title: "Bạn có chắc muốn xóa dữ liệu này?",
        //     text: "Hãy Cân nhắc kỹ trước khi bạn làm việc này!",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // }).then((res) => {
        //     if (res) {
        //         swal("Xóa thành công", {
        //             icon: "success",
        //             buttons: false
        //         });
        //         CRUD_PhieuDanhGia.remove(id).then(() => {
        //             getRatingList();
        //         })
        //     } else {
        //         swal("Đã hủy!");
        //     }
        // });
    }
    //Hàm xóa đánh giá

    const handleDataNameFieldPGD = (data) => {
        return data?.map((e, index) => {
            return (
                {
                    'STT': index + 1,
                    'Tên đánh giá': e?.tenDG,
                    'Môn Học': e?.monHoc === null ? "Đang cập nhật" : e?.monHoc?.tenMH,
                    'Tên giáo viên': e?.giaoVien?.hoTen,
                    'Số tuần': e?.tuanDG?.soTuan,
                    'Phân loại giáo viên': e?.choGVCN,
                    'Mẫu đánh giá': e?.mauDG?.tenMau,
                    'Lớp học': e?.lopHoc === null ? 'Đang cập nhật' : e?.lopHoc?.maLH

                }
            )
        })
    }
    const confirmAlert = () => {

        swal({
            title: "Bạn có chắc muốn hủy bỏ không ?",
            text: "Cân nhắc kỹ trước khi bạn thực hiện điều này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("Thành công", {
                    icon: "success",
                    buttons: false
                });
                handleShow(false) || handleShowEdit(false)


                // window.location.reload()
            } else {
                swal("Đã hủy!");
            }
        });
    }

    const handleModalDetail = (status) => {
        setModalDetail(status)
    }

    const handleChiTietPDG = (data) => {
        setClonePDG(data)
        handleModalDetail(true)

    }
    return (

        <div className="page-heading">
            <TitleBreadcrumb title="Phiếu đánh giá" />
            {/* <button onClick={() => <Prompt message="bạn có chắc muốn hủy bỏ? hãy cân nhắc trước khi quyết định" />}>chọn</button> */}

            <section className="section ">
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <div className='d-flex'>
                            <button className="btn auth-button" type="button" onClick={() => { handleShow(true) }}>Tạo phiếu đánh giá <IoMdAdd style={{ marginBottom: '2px' }} /></button>
                            <ExportGV gvData={handleDataNameFieldPGD(ratingList)} filename='phieuDanhGia' />
                        </div>
                        <div className="tableShow scrollStudent mt-5 table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên đánh giá</th>
                                        <th>Môn học</th>
                                        <th>Chi tiết phiếu</th>
                                        <th>Lớp học</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        current.length > 0 ? current?.map((e, i) => {
                                            return (
                                                <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                    <td>{i + 1}</td>
                                                    <td>{e.tenDG}</td>
                                                    <td>{e.monHoc === null ? "Đang cập nhật" : e.monHoc.tenMH}</td>

                                                    <td><Button variant="border border-success" onClick={() => handleChiTietPDG(e)}>Xem chi tiết</Button></td>
                                                    <td>{e.lopHoc === null ? 'Đang cập nhật' : e.lopHoc.maLH}</td>
                                                    <td>
                                                        <div className="d-flex p-4">
                                                            <FiEdit className="mr-5" onClick={() => Edit(e._id)} />
                                                            <FiDelete onClick={() => Delete(e._id)} />
                                                        </div>
                                                    </td>
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
                    </div>

                    <Pagination usePage={usePage} totalPage={ratingList.length} setIndexFirt={setIndexFirt} />
                </div>
            </section>
            <ModalDetailPDG show={showModalDetail} data={clonePDG} handleClose={handleModalDetail} tittle="Chi tiết phiếu đánh giá" />
            <ModalPDG show={show} showModal={handleShow} title="Tạo phiếu đánh giá" confirmAlert={confirmAlert} action={Create} initialValue={{}} />
            <ModalPDG show={showEdit} showModal={handleShowEdit} title="Chỉnh sửa phiếu đánh giá" action={Update} confirmAlert={confirmAlert} initialValue={initialValue} />
        </div>



    )
}
