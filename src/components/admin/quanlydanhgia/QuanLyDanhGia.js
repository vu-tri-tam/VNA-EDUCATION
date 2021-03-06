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
    //ph??n trang react pagination
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
                    console.log("aaa", data);
                    await MauDanhGiaApi.add(data)
                    getDanhGia()
                    //  setShow(false)
                    handleClose()
                    reset()

                } else {
                    swal("???? h???y!");
                }
            });
        }


        // customAlert("B???n c?? ch???c mu???n t???o ????nh gi?? n??y kh??ng ?", MauDanhGiaApi.add({
        //     tenMau: e.tenMau,
        //     tieuChi: input

        // }), getDanhGia).then(() => handleClose())

        //   e.preventDefault()


    }



    const Delete = (id) => {
        // customAlert("B???n c?? ch???c mu???n x??a d??? li???u n??y?", MauDanhGiaApi.remove(id), getDanhGia).then(() => handleClose())
        swal({
            title: "B???n c?? ch???c mu???n x??a d??? li???u n??y?",
            text: "H??y C??n nh???c k??? tr?????c khi b???n l??m vi???c n??y!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("X??a th??nh c??ng", {
                    icon: "success",
                    buttons: false
                });
                await MauDanhGiaApi.remove(id)
                await getDanhGia()
                await handleClose()

            } else {
                swal("???? h???y!");
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
            title: "B???n c?? ch???c mu???n thay ?????i d??? li???u?",
            text: "H??y C??n nh???c k??? tr?????c khi b???n l??m vi???c n??y!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("c???p nh???t th??nh c??ng", {
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
                swal("???? h???y!");
            }
        });

    }



    const findFormErrors = () => {
        const { tieuChi, tenMau } = form
        const newErrors = {}

        if (!tieuChi || tieuChi === '') newErrors.tieuChi = 'Kh??ng ???????c b??? tr???ng!'
        else if (tieuChi.length > 2) newErrors.tieuChi = 'S??? l?????ng ti??u ch?? qu?? nhi???u!'
        else if (isNaN(tieuChi)) newErrors.tieuChi = 'vui l??ng nh???p s???!'

        if (!tenMau || tenMau === '') newErrors.tenMau = 'Kh??ng ???????c b??? tr???ng!'
        else if (tenMau.length > 100) newErrors.tenMau = "T??n qu?? d??i"

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
                <TitleBreadcrumb title="M???u ????nh Gi??" />
                <section className="section ">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="d-flex">
                                        <Button className="mr-5" onClick={() => handleShow(true)}>T???o m???u ????nh gi??</Button>
                                        {/* <ExportGV gvData={dataForm} filename='MauDanhGia' /> */}
                                    </div>
                                    <Modal show={show} onHide={() => handleShow(false)} animation={false}>
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Modal.Header >
                                                <Modal.Title>T???o m???u ????nh gi??</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Col lg={12}>
                                                        <Form.Group>
                                                            <Form.Label>T??n m???u</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                isInvalid={!!errors.tenMau}
                                                                placeholder="Nh???p t??n m???u"
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
                                                            <Form.Label>Ti??u ch??</Form.Label>
                                                            <Form.Control className="mb-2"
                                                                type="text"
                                                                isInvalid={!!errors.tieuChi}
                                                                placeholder="S??? ti??u ch??"
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
                                                    H???y
                                                </Button>
                                                <Button variant="success" type="button" type='submit'>
                                                    Th??m
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
                                            <th>M???u ????nh gi??</th>
                                            <th>Chi ti???t</th>
                                            <th>Tr???ng th??i</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            current.length > 0 ? current.map((ele, i) => {
                                                return (
                                                    <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                        <td>{i + 1}</td>
                                                        <td><div>{ele.tenMau}</div></td>
                                                        <td><Button variant="border border-success" onClick={() => handleChiTietMDG(ele)}>Xem chi ti???t</Button></td>

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
                    {/* <ModalMDG show={show} title='Th??m m???u ????nh gi??' showModal={handleShowModal} initialValue={{}} /> */}
                    <ModalMDG show={showModalEdit} showEdit={{ ...showEdit }} showModal={handleShowEdit} title='Ch???nh s???a m???u ????nh gi??' action={updateDanhGia} initialValue={showEdit} />
                    <ModalDetailMDG show={showModalDetail} data={cloneMDG} handleClose={handleModalDetail} tittle="Chi ti???t m???u ????nh gi??" />
                </section>
            </div>
        </>
    )
};

export default QuanLyDanhGia;