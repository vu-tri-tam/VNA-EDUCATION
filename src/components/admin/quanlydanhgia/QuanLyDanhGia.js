import React, { useEffect, useState } from 'react';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import { useForm } from "react-hook-form";
// import axios from 'axios';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi'
// import { IoMdAdd } from 'react-icons/io'
// import Modal from "react-animated-modal";
// import TieuChiApi from '../../../api/TieuChiApi';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
// import { InputGroup, Form } from 'react-bootstrap';
import TieuChi from "./cauhoi/index";
import swal from 'sweetalert';
import '../css/QuanLyDG.css';
import MauDanhGiaApi from '../../../api/MauDanhGiaApi'
import Pagination from './Pagination/Pagination';
// import customAlert from '../../common/danhGiaAdmin/customAlert';
import ModalMDG from './ModalMDG';
// import Canvas from './offCanvas';
import ModalDetailMDG from './offCanvas';
import LoadingFullPage from '../../common/LoadingFullPage';
import ExportGV from '../teacher/Information/Export';



const QuanLyDanhGia = (props) => {

    // const { isModalOpen, openModal, closeModal } = useModal();
    // const history = useHistory()
    const { register, handleSubmit, reset } = useForm();
    const [dataForm, setdataForm] = useState([])
    // console.log('maudanhgia', dataForm);
    const [soMT, setSoMT] = useState(0);
    const [input, setInput] = useState([]);
    // const renderCH = [];
    // console.log(input, 'input');
    //modal edit
    const [showEdit, setShowEdit] = useState();
    const [show, setShow] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    //  console.log(show);
    const [cloneMDG, setCloneMDG] = useState([])
    const [showModalDetail, setModalDetail] = useState(false);
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    const handleModalDetail = (status) => {
        setModalDetail(status)
    }

    // const [date, setDate] = useState("");
    const handleClose = async () => await setShow(false);
    const handleShow = async () => await setShow(true);

    // const handleShowModal = (status) => {
    //     setShow(status);
    // }

    const handleShowEdit = (status) => {
        setShowModalEdit(status);
    }
    //phân trang react pagination
    const [indexFirt, setIndexFirt] = useState(0)
    const usePage = 3;
    const indexOfFirt = indexFirt * usePage;
    const current = dataForm.slice(indexOfFirt, indexOfFirt + usePage)


    const getDanhGia = async () => {
        let result = await MauDanhGiaApi.getMauDanhGia()
        setdataForm(result.data);
    }


    useEffect(() => {
        getDanhGia()
    }, []);


    const saveTieuChi = (value) => {
        const index = input.findIndex((e) => e.id === value.id);
        if (index === -1) {
            setInput([...input, value]);
        } else {
            const cloneInput = [...input];
            cloneInput[index].tenTC = value.tenTC;
            cloneInput[index].noiDung = value.noiDung;
            setInput(cloneInput);
        }
    };

    const saveMucTieu = (tieuchiId, value) => {
        // console.log(input, 3123123, tieuchiId)
        const index = input.findIndex((e) => e.id === tieuchiId);
        if (index !== -1) {
            const cloneInput = [...input];
            const muctieuIndex = cloneInput[index].mucTieu.findIndex(
                (e) => e.id === value.id
            );
            if (muctieuIndex === -1) {
                cloneInput[index].mucTieu.push(value);
            } else {
                cloneInput[index].mucTieu[muctieuIndex] = value;
            }
            setInput(cloneInput);
        }
    };

    const handleForm = (field, value) => {

        setForm({
            ...form,
            [field]: value
        })

        if (field === "tieuChi") {
            setSoMT(value);

        }

        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const onSubmit = (e) => {


        const data = {
            tenMau: e.tenMau,
            tieuChi: input

        };

        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
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
                    console.log("aaa", data);
                    await MauDanhGiaApi.add(data)
                    getDanhGia()
                    //  setShow(false)
                    handleClose()
                    reset()

                } else {
                    swal("Đã hủy!");
                }
            });
        }


        // customAlert("Bạn có chắc muốn tạo đánh giá này không ?", MauDanhGiaApi.add({
        //     tenMau: e.tenMau,
        //     tieuChi: input

        // }), getDanhGia).then(() => handleClose())

        //   e.preventDefault()


    }



    const Delete = (id) => {
        // customAlert("Bạn có chắc muốn xóa dữ liệu này?", MauDanhGiaApi.remove(id), getDanhGia).then(() => handleClose())
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
                await MauDanhGiaApi.remove(id)
                await getDanhGia()
                await handleClose()

            } else {
                swal("Đã hủy!");
            }
        });

    }

    async function Edit(id) {
        // console.log('idmaudanhgia', id);
        await MauDanhGiaApi.EditData(id).then((res) => {
            // const tieuChi = res?.data.tieuChi.map((e) => e);
            // console.log(res, 'resMDG')
            // setShowModalEdit(true)
            setShowEdit(res.data);
            setShowModalEdit(true)

        })

    }

    // const cloneShowEdit = { ...showEdit };
    const updateDanhGia = (id, data) => {
        // console.log('idupdat3333e', id, data);

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
                await MauDanhGiaApi.update(id, data)
                await setShowEdit(data);
                getDanhGia();
                // handleClose()
                handleShowEdit(false)
                // handleClose()
            } else {
                swal("Đã hủy!");
            }
        });

    }



    const findFormErrors = () => {
        const { tieuChi, tenMau } = form
        const newErrors = {}

        if (!tieuChi || tieuChi === '') newErrors.tieuChi = 'Không được bỏ trống!'
        else if (tieuChi.length > 2) newErrors.tieuChi = 'Số lượng tiêu chí quá nhiều!'
        else if (isNaN(tieuChi)) newErrors.tieuChi = 'vui lòng nhập số!'

        if (!tenMau || tenMau === '') newErrors.tenMau = 'Không được bỏ trống!'
        else if (tenMau.length > 100) newErrors.tenMau = "Tên quá dài"

        return newErrors
    }


    const renderTC = [];
    for (let i = 0; i < soMT; i++) {
        renderTC.push(
            <TieuChi
                key={i}
                tieuchi={saveTieuChi}
                muctieu={saveMucTieu}
                id={i + 1}
            // findFormErrors={findFormErrors}
            ></TieuChi>
        );
    }
    const handleChiTietMDG = (data) => {
        setCloneMDG(data)
        handleModalDetail(true)

    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Mẫu đánh Giá" />
                <section className="section ">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="d-flex">
                                        <Button className="mr-5" onClick={() => handleShow(true)}>Tạo mẫu đánh giá</Button>
                                        {/* <ExportGV gvData={dataForm} filename='MauDanhGia' /> */}
                                    </div>
                                    <Modal show={show} onHide={() => handleShow(false)} animation={false}>
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Modal.Header >
                                                <Modal.Title>Tạo mẫu đánh giá</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Col lg={12}>
                                                        <Form.Group>
                                                            <Form.Label>Tên mẫu</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                isInvalid={!!errors.tenMau}
                                                                placeholder="Nhập tên mẫu"
                                                                {...register("tenMau")}
                                                                onChange={(e) => handleForm('tenMau', e.target.value)}
                                                            />
                                                            <Form.Control.Feedback type='invalid'>
                                                                {errors.tenMau}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                    </Col>
                                                    <Col lg={12}>
                                                        <Form.Group >
                                                            <Form.Label>Tiêu chí</Form.Label>
                                                            <Form.Control className="mb-2"
                                                                type="text"
                                                                isInvalid={!!errors.tieuChi}
                                                                placeholder="Số tiêu chí"
                                                                onChange={(e) => {
                                                                    handleForm('tieuChi', e.target.value)

                                                                }}
                                                            />
                                                            <Form.Control.Feedback type='invalid'>
                                                                {errors.tieuChi}
                                                            </Form.Control.Feedback>
                                                            {renderTC}
                                                        </Form.Group>

                                                    </Col>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="danger" onClick={() => { handleClose(false); setSoMT(0); reset() }}>
                                                    Hủy
                                                </Button>
                                                <Button variant="success" type="button" type='submit'>
                                                    Thêm
                                                </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                </div>
                            </div>
                            <div className="tableShow scrollStudent mt-5 table-responsive">
                                <table id="mytable" className="table-responsive-xl" style={{ border: "none" }}>
                                    <thead>
                                        <tr>

                                            <th>STT</th>
                                            <th>Mẫu đánh giá</th>
                                            <th>Chi tiết</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            current.length > 0 ? current.map((ele, i) => {
                                                return (
                                                    <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                        <td>{i + 1}</td>
                                                        <td><div>{ele.tenMau}</div></td>
                                                        <td><Button variant="border border-success" onClick={() => handleChiTietMDG(ele)}>Xem chi tiết</Button></td>

                                                        <td><Link style={{ margin: '10%' }} key={i}><FiEdit onClick={() => Edit(ele._id)} /></Link><Link onClick={() => Delete(ele._id)}><FiDelete /></Link></td>
                                                    </tr>

                                                )
                                            }) : <tr rowSpan="4">
                                                <td colSpan="4">

                                                    <LoadingFullPage /> </td>
                                            </tr>

                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination usePage={usePage} totalPage={dataForm.length} setIndexFirt={setIndexFirt} />

                    </div>
                    {/* <ModalMDG show={show} title='Thêm mẫu đánh giá' showModal={handleShowModal} initialValue={{}} /> */}
                    <ModalMDG show={showModalEdit} showEdit={{ ...showEdit }} showModal={handleShowEdit} title='Chỉnh sửa mẫu đánh giá' action={updateDanhGia} initialValue={showEdit} />
                    <ModalDetailMDG show={showModalDetail} data={cloneMDG} handleClose={handleModalDetail} tittle="Chi tiết mẫu đánh giá" />
                </section>
            </div>
        </>
    )
};

export default QuanLyDanhGia;