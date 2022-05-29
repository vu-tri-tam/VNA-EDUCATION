import React, { useState, useEffect, useReducer } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { FiEdit, FiDelete } from 'react-icons/fi'
// import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
// import axios from 'axios';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import NamHocApi from '../../../api/NamHocApi';
import TuanHocApi from '../../../api/TuanHocApi';
// import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ModalYear from './ModalYear';
import LoadingFullPage from '../../common/LoadingFullPage';

export default function NamHocReducers() {
    const initialState = {
        data: [],
        show: false,
        error: null

    }
    // const [value, setvalue] = useState([])
    // console.log(value, 'value');

    const NamHocReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_NAMHOC_SUCCESS':
                return {
                    ...state,
                    data: action.data
                }
            case 'DELETE_NAMHOC_SUCCESS':
                return {
                    ...state,
                    data: action.data
                }
            case 'EDIT_NAMHOC_SUCCESS':

                return {
                    ...state,
                    show: true,
                    data: action.data
                }
            case 'UPDATE_NAMHOC_SUCCESS':
                return {
                    ...state,
                    show: false,
                    data: action.data

                }
            default:
                break;
        }

    }

    const [NamHoc, namHocDispatch] = useReducer(NamHocReducer, initialState);
    // console.log(NamHoc, 'NamHoc');
    const [initialValue, setInitialState] = useState()
    const [handleShowEdit, setShowEdit] = useState(false)

    const ShowEdit = (status) => {
        setShowEdit(status)
    }

    const addNamHocReducer = (data) => {
        // console.log({ ...data }, '12345654321');
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
                await NamHocApi.add({ ...data }).then(res => namHocDispatch({
                    type: "ADD_NAMHOC_SUCCESS",
                    data: res.data
                }));
                // reset()
                await getNamHoc()
                handleClose()
            } else {
                swal("Đã hủy!");
            }
        });
    }
    const getNamHocReducerEdit = async (id) => {

        // console.log('edit ok')
        namHocDispatch({
            type: "EDIT_NAMHOC"
        })
        await NamHocApi.Edit(id).then(res => {

            const cloneInitialValue = JSON.parse(JSON.stringify(res?.data))
            setInitialState({
                _id: id,
                tenNam: cloneInitialValue?.tenNam,
                namBatDau: cloneInitialValue?.namBatDau,
                namKetThuc: cloneInitialValue?.namKetThuc,
                tuanHoc: cloneInitialValue?.tuanHoc
            });
            ShowEdit(true)
            namHocDispatch({
                type: "EDIT_NAMHOC_SUCCESS",
                data: initialValue?.data
            })

        })

    }
    const getNamHocReducerDelete = async (id) => {
        // console.log(id)

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
                await NamHocApi.remove(id).then(res => namHocDispatch({
                    type: "DELETE_NAMHOC_SUCCESS",
                    data: res.data
                }));
                await getNamHoc()
                await handleClose()

            } else {
                swal("Đã hủy!");
            }
        });

        // setShowDetail(true)

    }
    const updateNamHocReducer = (data) => {
        // console.log(data, 121212121)
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
                await NamHocApi.update(data?._id, data).then(res => namHocDispatch({
                    type: "UPDATE_NAMHOC_SUCCESS",
                    data: res?.data
                }));
                // await NamHocApi.update(id, data)
                await getNamHoc();
                setShowEdit(false)
                // window.location.reload()
                // handleClose()
            } else {
                swal("Đã hủy!");
            }
        });

    }
    // const getNamHocReducer = () => {
    //     namHocDispatch({
    //         type: "GET_NAMHOC_REQUEST"
    //     })
    //     NamHocApi.getNamHoc().then(res => {
    //         console.log(res, 'data')
    //         namHocDispatch({
    //             type: "GET_NAMHOC_SUCCESS",
    //             data: res
    //         })

    //     })
    // }


    //edit modal
    // async function Edit(id) {
    //     let result = await NamHocApi.Edit(id);
    //     await setShowEdit(result.data);
    //     await setShowDetail(true)
    // }

    const [show, setShow] = useState(false);
    const [namhoc, setNamHoc] = useState([]);
    const [tuanhoc, setTuanHoc] = useState([]);
    const [cloneTuanhoc, setCloneTuanHoc] = useState([]);
    const [showTuanhoc, setShowTuanHoc] = useState(false);
    // const [value, setvalue] = useState([])

    // const [showEdit, setShowEdit] = useState();
    // const [showdetail, setShowDetail] = useState(false);


    // const [showdetail, setShowDetail] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getNamHoc = async () => {
        let result = await NamHocApi.getNamHoc()
        const sort = result?.data?.sort((a, b) => a.tenNam.substring(8) - b.tenNam.substring(8))
        await setNamHoc(sort);

    }

    useEffect(() => {
        TuanHocApi.getTuanHoc()?.then(res => setTuanHoc(res?.data))
        getNamHoc()
    }, [])

    const handleShowTuanHoc = (status) => {
        setShowTuanHoc(status)
    }

    const handleTuanDetail = (data) => {
        const tuanHoc = data?.tuanHoc?.map((ele, idx) => {
            return <p key={idx}>{ele?.tenTuan}</p>
        })
        setCloneTuanHoc(tuanHoc)
        handleShowTuanHoc(true)
    }


    // const cloneNam = { ...NamHoc };

    // console.log(cloneTuanhoc, 'clonetuan')


    return (
        <div className="page-heading">
            <TitleBreadcrumb title="Quản lí năm học" />

            <section className="section ">
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <Button variant="primary" onClick={handleShow}>
                            Thêm năm +
                        </Button>
                        <div className="container mt-3">
                            <Table >
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th className="text-center">Tên năm</th>
                                        <th className="text-center">Tuần học</th>
                                        <th className="text-center">Năm bắt đầu</th>
                                        <th className="text-center">Năm kết thúc</th>
                                        <th className="text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        namhoc?.length > 0 ? namhoc?.map((e, i) => {


                                            return (
                                                <tr key={i}>
                                                    <td className="text-center">{i + 1}</td>
                                                    <td className="text-center">{e.tenNam}</td>
                                                    <td className="text-center"> <Button variant="border border-success" onClick={() => handleTuanDetail(e)}>
                                                        Xem chi tiết
                                                    </Button></td>
                                                    <td className="text-center">{e.namBatDau}</td>
                                                    <td className="text-center">{e.namKetThuc}</td>
                                                    <td className="text-center"><Link style={{ margin: '10%' }} ><FiEdit onClick={() => getNamHocReducerEdit(e._id)} /></Link>
                                                        <Link><FiDelete onClick={() => getNamHocReducerDelete(e._id)} /></Link></td>
                                                </tr>
                                            )
                                        }) : <tr rowSpan="6">
                                            <td colSpan="6">

                                                <LoadingFullPage /> </td>
                                        </tr>
                                    }


                                </tbody>
                            </Table>
                        </div>


                        <Modal show={showTuanhoc} onHide={() => handleShowTuanHoc(false)} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết tuần học</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <table id="mytable" className="table mt-3">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tuần học</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cloneTuanhoc?.map((e, i) => {
                                                return <tr key={i}><td>{i + 1}</td><td>{e.props.children}</td></tr>
                                            })
                                        }

                                    </tbody>
                                </table></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => handleShowTuanHoc(false)}>
                                    Đóng
                                </Button>

                            </Modal.Footer>
                        </Modal>
                        <ModalYear tittle="Tạo năm học" show={show} data={tuanhoc} handleClose={handleClose} action={addNamHocReducer} initialValue={{}} />
                        <ModalYear tittle="Chỉnh sửa năm học" show={handleShowEdit} data={tuanhoc} handleClose={ShowEdit} action={updateNamHocReducer} initialValue={initialValue} />
                    </div>

                </div>
            </section>
        </div>

    )
}
