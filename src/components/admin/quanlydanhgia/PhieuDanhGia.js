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

    //ph??n trang react pagination
    const [indexFirt, setIndexFirt] = useState(0)//t???o state ????? ?????m
    const usePage = 4;//ch??? ?????nh cho page hi???n 4
    const indexOfFirt = indexFirt * usePage;// l???y ch??? s???
    // console.log(indexOfFirt, 8877675);
    const current = ratingList.slice(indexOfFirt, indexOfFirt + usePage)// ch??? ?????nh c???t l???y 4 ph???n t??? 

    // const [lopHoc, setlopHoc] = useState([]);

    const getRatingList = async () => {
        PhieuDanhGiaApi.getPhieuDanhGia().then((response) => {
            setRatingList(response?.data || []);
        })
    }//h??m load ds ????nh gi??


    useEffect(() => {
        getRatingList();
        // LopHocApi.getLopHoc()?.then((res) => setlopHoc(res?.data))

    }, [])
    //load danh s??ch ????nh gi?? 1 l???n

    const handleShow = (status) => {
        setShow(status);
    }
    const handleShowEdit = (status) => {
        setShowEdit(status);
    }

    //State ???n hi???n modal
    // const handleLopHocClick = (idGV) => {
    //     const getGVCN = lopHoc?.map((e, i) => e?.GVCN?._id == idGV)
    //     console.log(getGVCN, 'GETGVCN');

    // }

    const Create = (data) => {
        // console.log({ ...data, lopHoc: lopHoc })
        // customAlert('b???n c?? ch???c mu???n t???o ????nh gi?? n??y kh??ng ?',
        //     CRUD_PhieuDanhGia.add(data),
        //     getRatingList,
        // ).then(() => handleShow(false))

        swal({
            title: "B???n c?? ch???c mu???n t???o ????nh gi?? n??y kh??ng ?",
            text: "C??n nh???c k??? tr?????c khi b???n th???c hi???n ??i???u n??y!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("Th??m th??nh c??ng", {
                    icon: "success",
                    buttons: false
                });
                CRUD_PhieuDanhGia.add(data).then(() => {
                    getRatingList();
                    handleShow(false);
                })

                // window.location.reload()
            } else {
                swal("???? h???y!");
            }
        });

    }
    //H??m t???o ????nh gi??

    const Update = async (data) => {
        customAlert("B???n c?? ch???c mu???n thay ?????i d??? li???u?",
            CRUD_PhieuDanhGia.update(data?._id, data),
            getRatingList,

        ).then(() => handleShowEdit(false))
        // swal({
        //     title: "B???n c?? ch???c mu???n thay ?????i d??? li???u?",
        //     text: "H??y C??n nh???c k??? tr?????c khi b???n l??m vi???c n??y!",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // }).then(async (res) => {
        //     if (res) {
        //         swal("c???p nh???t th??nh c??ng", {
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
        //         swal("???? h???y!");
        //     }
        // });

    }
    //H??m c???p nh???t ????nh gi?? trong db

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
    //H??m b???t modal ch???nh s???a ????nh gi?? v?? SEt gi?? tr??? ban ?????u

    const Delete = (id) => {
        customAlert("B???n c?? ch???c mu???n x??a d??? li???u n??y?",
            CRUD_PhieuDanhGia.remove(id),
            getRatingList,

            // handleShowEdit
        )
        // swal({
        //     title: "B???n c?? ch???c mu???n x??a d??? li???u n??y?",
        //     text: "H??y C??n nh???c k??? tr?????c khi b???n l??m vi???c n??y!",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // }).then((res) => {
        //     if (res) {
        //         swal("X??a th??nh c??ng", {
        //             icon: "success",
        //             buttons: false
        //         });
        //         CRUD_PhieuDanhGia.remove(id).then(() => {
        //             getRatingList();
        //         })
        //     } else {
        //         swal("???? h???y!");
        //     }
        // });
    }
    //H??m x??a ????nh gi??

    const handleDataNameFieldPGD = (data) => {
        return data?.map((e, index) => {
            return (
                {
                    'STT': index + 1,
                    'T??n ????nh gi??': e?.tenDG,
                    'M??n H???c': e?.monHoc === null ? "??ang c???p nh???t" : e?.monHoc?.tenMH,
                    'T??n gi??o vi??n': e?.giaoVien?.hoTen,
                    'S??? tu???n': e?.tuanDG?.soTuan,
                    'Ph??n lo???i gi??o vi??n': e?.choGVCN,
                    'M???u ????nh gi??': e?.mauDG?.tenMau,
                    'L???p h???c': e?.lopHoc === null ? '??ang c???p nh???t' : e?.lopHoc?.maLH

                }
            )
        })
    }
    const confirmAlert = () => {

        swal({
            title: "B???n c?? ch???c mu???n h???y b??? kh??ng ?",
            text: "C??n nh???c k??? tr?????c khi b???n th???c hi???n ??i???u n??y!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("Th??nh c??ng", {
                    icon: "success",
                    buttons: false
                });
                handleShow(false) || handleShowEdit(false)


                // window.location.reload()
            } else {
                swal("???? h???y!");
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
            <TitleBreadcrumb title="Phi???u ????nh gi??" />
            {/* <button onClick={() => <Prompt message="b???n c?? ch???c mu???n h???y b???? h??y c??n nh???c tr?????c khi quy???t ?????nh" />}>ch???n</button> */}

            <section className="section ">
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <div className='d-flex'>
                            <button className="btn auth-button" type="button" onClick={() => { handleShow(true) }}>T???o phi???u ????nh gi?? <IoMdAdd style={{ marginBottom: '2px' }} /></button>
                            <ExportGV gvData={handleDataNameFieldPGD(ratingList)} filename='phieuDanhGia' />
                        </div>
                        <div className="tableShow scrollStudent mt-5 table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>T??n ????nh gi??</th>
                                        <th>M??n h???c</th>
                                        <th>Chi ti???t phi???u</th>
                                        <th>L???p h???c</th>
                                        <th>H??nh ?????ng</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        current.length > 0 ? current?.map((e, i) => {
                                            return (
                                                <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                    <td>{i + 1}</td>
                                                    <td>{e.tenDG}</td>
                                                    <td>{e.monHoc === null ? "??ang c???p nh???t" : e.monHoc.tenMH}</td>

                                                    <td><Button variant="border border-success" onClick={() => handleChiTietPDG(e)}>Xem chi ti???t</Button></td>
                                                    <td>{e.lopHoc === null ? '??ang c???p nh???t' : e.lopHoc.maLH}</td>
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
            <ModalDetailPDG show={showModalDetail} data={clonePDG} handleClose={handleModalDetail} tittle="Chi ti???t phi???u ????nh gi??" />
            <ModalPDG show={show} showModal={handleShow} title="T???o phi???u ????nh gi??" confirmAlert={confirmAlert} action={Create} initialValue={{}} />
            <ModalPDG show={showEdit} showModal={handleShowEdit} title="Ch???nh s???a phi???u ????nh gi??" action={Update} confirmAlert={confirmAlert} initialValue={initialValue} />
        </div>



    )
}
