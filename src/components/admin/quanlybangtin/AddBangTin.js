import React, { useState, useEffect } from 'react';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import { InputGroup, Form } from 'react-bootstrap';
// import { useForm } from "react-hook-form";
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
import ThongBaoApi from '../../../api/ThongBaoApi'
import { FiEdit, FiDelete } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
// import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ModalDetail from './modalDetail';
import LoadingFullPage from '../../common/LoadingFullPage';
import { FcCheckmark } from 'react-icons/fc';
import Pagination from '../quanlydanhgia/Pagination/Pagination';
import { useRef } from 'react';



const AddBangTin = (props) => {
    const refForm = useRef(null);
    // const refCkeditor = useRef(null);
    // console.log(refCkeditor.current, '12321');
    const [showEdit, setShowEdit] = useState();
    const [quantri, setQuanTri] = useState([]);
    const [noidung, setNoidung] = useState('');
    console.log(noidung, 'noidung');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    const [cloneMDG, setCloneMDG] = useState([])
    const [showModalDetail, setModalDetail] = useState(false);
    const [errors, setErrors] = useState({})


    const handleModalDetail = (status) => {
        setModalDetail(status)
    }


    const [ThongBao, setThongBao] = useState([])
    const [bangTin, setBangTin] = useState([])
    // console.log(ThongBao?.noiDung, 'thongbao');

    //phân trang react pagination
    const [indexFirt, setIndexFirt] = useState(0)
    const usePage = 5;
    const indexOfFirt = indexFirt * usePage;
    const current = bangTin?.slice(indexOfFirt, indexOfFirt + usePage)

    const onSubmit = () => {
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)

        } else if (noidung === '') {
            alert('Không được bỏ trống nội dung!')
        } else {
            swal({
                title: "Bạn có chắc muốn thêm thông báo này ?",
                text: "Hãy Cân nhắc kỹ trước khi bạn làm việc này!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(async (res) => {

                if (res) {

                    swal("Thêm thành công", {
                        icon: "success",
                        buttons: false
                    });



                    await ThongBaoApi.add({ ...ThongBao, noiDung: noidung }).then(() => setNoidung(''))
                    refForm.current.reset();
                    getThongBao()
                    // window.location.reload()
                } else {
                    swal("Đã hủy!");
                    refForm.current.reset();
                    setNoidung('')
                }
            });
        }



    }
    // console.log(ThongBao, 12121)
    const handleThongBao = (field, value) => {
        setThongBao({
            ...ThongBao,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    async function getThongBao() {
        let result = await ThongBaoApi.getThongBao();


        setBangTin(result?.data);
    }

    async function getQuanTriCreate() {
        let arr = []
        let result = await ThongBaoApi.getQuanTri();
        for (let i = 0; i <= result.data.length; i++) {
            let ND = result.data[i]?.maND.slice(0, 2)
            if (ND === "QT") {
                arr.push(result.data[i])
            }
        }
        setQuanTri(arr);
    }

    useEffect(() => {
        // getThongBao()
        getQuanTriCreate()
        getThongBao()
    }, []);

    const Delete = (id) => {
        // console.log('iddelete', typeof (id));
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
                await ThongBaoApi.remove(id);
                await getThongBao()

            } else {
                swal("Đã hủy!");
            }
        });

    }

    const getDate = (e) => {
        let valueDate = e.target.value;
        let d = new Date(valueDate);
        let formatted = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}-${(d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getFullYear()}`;
        setThongBao({
            ...ThongBao,
            ngayDang: formatted
        })
        if (!!errors["ngayDang"]) setErrors({
            ...errors,
            ngayDang: null
        })
    }

    const getDateEdit = (e) => {
        let d = new Date(e);
        let formatted = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}-${(d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getFullYear()}`;
        return formatted;
    }


    async function Edit(id) {
        // console.log('idtb', id)
        let result = await ThongBaoApi.Edit(id);
        await setShowEdit(result.data);
        await setShow(true)

    }


    const cloneShowEdit = { ...showEdit };

    const updateThongBao = (id, data) => {
        // console.log('update', id, data);
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
                await ThongBaoApi.update(id, data)

                setShowEdit(data);
                getThongBao()
                setShow(false)

            } else {
                swal("Đã hủy!");
            }
        });

    }


    const handleChange = (event) => {

        setThongBao({
            ...ThongBao,
            danhMuc: event
        })
        if (!!errors["danhMuc"]) setErrors({
            ...errors,
            danhMuc: null
        })
    }

    const formatDate = (date) => {
        const newdate = date.split("-").reverse().join("-");
        const datea = new Date(newdate);
        return `${datea.getFullYear()}-${(datea.getMonth() + 1) < 10 ? `0${datea.getMonth() + 1}` : datea.getMonth() + 1}-${datea.getDate() < 10 ? `0${datea.getDate()}` : datea.getDate()}`;
    }


    const handleDuyet = async (idTin, data) => {
        let dataDuyet = data.daDuyet
        await ThongBaoApi.update(idTin, { ...data, daDuyet: !dataDuyet })
        await getThongBao()

    }
    const handleChiTiet = (data) => {
        setCloneMDG(data)
        handleModalDetail(true)

    }
    const findFormErrors = () => {
        const { tieuDe, tomTat, danhMuc, ngayDang, nguoiDang } = ThongBao
        // console.log(ThongBao, 'cc');
        const newErrors = {}
        if (!tieuDe || tieuDe === '') newErrors.tieuDe = 'Không được bỏ trống!'


        if (!danhMuc || danhMuc === '') newErrors.danhMuc = 'Không được bỏ trống!'

        if (!ngayDang || ngayDang === '') newErrors.ngayDang = 'Không được bỏ trống!'
        if (!tomTat || tomTat === '') newErrors.tomTat = 'Không được bỏ trống'



        if (!nguoiDang || nguoiDang === '') newErrors.nguoiDang = 'Không được bỏ trống!'


        return newErrors
    }
    return (
        <>
            <div key={props}>
                <Modal show={show} onHide={handleClose} animation={false} >
                    <Modal.Header >
                        <Modal.Title>Chỉnh sửa thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3 ">
                            <InputGroup.Text id="basic-addon1">Tiêu đề:</InputGroup.Text>
                            <Form.Control key={showEdit?.tieuDe} isInvalid={!!errors.tieuDe} defaultValue={showEdit?.tieuDe} onChange={(e) => { cloneShowEdit.tieuDe = e.target.value }}>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.tieuDe}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3 ">
                            <InputGroup.Text id="basic-addon1">Tóm tắt: </InputGroup.Text>
                            <Form.Control key={showEdit?.tomTat} isInvalid={!!errors.tomTat} defaultValue={showEdit?.tomTat} onChange={(e) => { cloneShowEdit.tomTat = e.target.value }}>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.tomTat}
                            </Form.Control.Feedback>
                        </InputGroup>


                        <InputGroup className="mb-3 ">
                            <InputGroup.Text id="basic-addon1">Loại thông tin</InputGroup.Text>
                            <Form.Control as="select" key={showEdit?.danhMuc} defaultValue={showEdit?.danhMuc} onChange={(e) => { cloneShowEdit.danhMuc = e.target.value }} >
                                <option value="0">--Chọn loại thông tin--</option>
                                <option value="Thông báo">Thông báo</option>
                                <option value="Hoạt động">Hoạt động</option>
                                <option value="Học phí">Học phí</option>
                            </Form.Control>

                        </InputGroup>
                        <InputGroup className="mb-3 ">
                            <InputGroup.Text id="basic-addon1">Ngày tạo: </InputGroup.Text>
                            {showEdit ? <Form.Control type='date' key={showEdit?.ngayDang} defaultValue={formatDate(showEdit?.ngayDang)} onChange={(e) => { cloneShowEdit.ngayDang = getDateEdit(e.target.value) }} /> : <></>}
                            {/* </Form.Control> */}

                        </InputGroup>


                        <InputGroup className="mb-3 ">
                            <Form.Control as="select" key={showEdit?.nguoiDang} isInvalid={!!errors.nguoiDang} defaultValue={showEdit?.nguoiDang} onChange={(e) => { cloneShowEdit.nguoiDang = e.target.value }} >
                                <option value="0">--Chọn người đăng--</option>
                                {
                                    quantri.map((e, i) => {
                                        //console.log('nguoiDang', e._id) 
                                        return <option value={e._id} key={i}>{e.hoTen}</option>
                                    })
                                }

                            </Form.Control>

                        </InputGroup>

                        <InputGroup className="mb-3 ">
                            <InputGroup.Text id="basic-addon1">Nội dung: </InputGroup.Text>
                            {
                                showEdit ? <CKEditor
                                    editor={ClassicEditor}
                                    key={showEdit?.noiDung}
                                    data={showEdit?.noiDung}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        cloneShowEdit.noiDung = data;
                                    }}

                                /> : <></>

                            }

                        </InputGroup>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="button" onClick={() => { updateThongBao(showEdit._id, cloneShowEdit) }}>
                            Cập nhật
                        </Button>
                    </Modal.Footer>
                </Modal>


                <div className="page-heading" key={props}>
                    <TitleBreadcrumb title="Thêm Bảng Tin" />
                    <section className="section">
                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <Form ref={refForm}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">


                                            <Form.Label>Tiêu đề</Form.Label>
                                            <Form.Control isInvalid={!!errors.tieuDe} placeholder="Thêm tiêu đề thông báo" aria-describedby="basic-addon1" onChange={(e) => handleThongBao('tieuDe', e.target.value)} />
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.tieuDe}
                                            </Form.Control.Feedback>



                                            <Form.Label>Danh mục</Form.Label>


                                            <Form.Control as="select" isInvalid={!!errors.danhMuc} onChange={(e) => handleChange(e.target.value)}>
                                                <option value="0">--Chọn danh mục--</option>
                                                <option value="Thông báo">Thông báo</option>
                                                <option value="Hoạt động">Hoạt động</option>
                                                <option value="Học phí">Học phí</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.danhMuc}
                                            </Form.Control.Feedback>


                                            <Form.Label>Ngày đăng</Form.Label>
                                            <Form.Control type="date" name="dob" isInvalid={!!errors.ngayDang} onChange={(e) => getDate(e)} placeholder="Date of Birth" />
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.ngayDang}
                                            </Form.Control.Feedback>


                                            <Form.Label>Người đăng</Form.Label>
                                            <Form.Control as="select" isInvalid={!!errors.nguoiDang} onChange={(e) => handleThongBao('nguoiDang', e.target.value)} >
                                                <option value="0">--Chọn người đăng--</option>
                                                {
                                                    quantri.map((e, i) => {
                                                        return <option value={e._id} key={i}>{e.hoTen}</option>
                                                    })
                                                }

                                            </Form.Control>
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.nguoiDang}
                                            </Form.Control.Feedback>

                                            <Form.Label>Tóm Tắt</Form.Label>
                                            <Form.Control isInvalid={!!errors.tomTat} placeholder="Thêm tóm tắt" aria-describedby="basic-addon1" onChange={(e) => handleThongBao('tomTat', e.target.value)} />
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.tomTat}
                                            </Form.Control.Feedback>
                                            <Form.Label>Nội dung</Form.Label>
                                            <CKEditor
                                                // ref={refCkeditor}
                                                editor={ClassicEditor}
                                                data={noidung}
                                                onInit={editor => {
                                                    // console.log("Editor is ready to use!", editor);
                                                }}

                                                onChange={(event, editor) => {
                                                    // console.log(editor, 'editor')
                                                    const data = editor.getData();
                                                    if (data === "" && !data) {
                                                        setNoidung("")
                                                    } else {
                                                        setNoidung(data)

                                                    }


                                                }}

                                            />

                                        </Form.Group>
                                        <Form.Group >
                                            <Button style={{ float: "right" }} variant="success" onClick={onSubmit} >
                                                Xác nhận
                                            </Button>
                                        </Form.Group>

                                    </Form>
                                    <div className="tableShow scrollStudent mt-5" key={props}>
                                        <table >
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tiêu đề</th>
                                                    <th>Loại tin</th>
                                                    <th>Ngày đăng</th>
                                                    <th>Chi tiết</th>
                                                    <th>Tình trạng</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    current?.length > 0 ? current?.map((e, k) => {
                                                        return (<tr key={k}>
                                                            <td>{k + 1}</td>
                                                            <td><textarea className="form-control" style={{ cursor: "not-allowed" }} id="exampleFormControlTextarea1" rows="3" key={e?.tieuDe} defaultValue={e?.tieuDe} /></td>
                                                            <td>{e.danhMuc}</td>
                                                            <td>{e.ngayDang}</td>
                                                            <td><Button onClick={() => handleChiTiet(e)}>Xem chi tiết</Button></td>
                                                            <td>
                                                                {e.daDuyet ? <Button variant="border border-success" onClick={() => handleDuyet(e._id, e)}>
                                                                    <FcCheckmark /> Đã duyệt
                                                                </Button> : <Button variant="border border-danger" onClick={() => handleDuyet(e._id, e)}>
                                                                    <IoMdClose className="text-danger" />
                                                                    chưa duyệt
                                                                </Button>

                                                                }
                                                            </td>
                                                            <td><Link style={{ margin: '10%' }}><FiEdit onClick={() => Edit(e._id)} /></Link><Link><FiDelete onClick={() => Delete(e._id)} /></Link>


                                                            </td>
                                                        </tr>)
                                                    }) : <tr rowSpan="7">
                                                        <td colSpan="7">
                                                            <LoadingFullPage /> </td>
                                                    </tr>
                                                }

                                            </tbody>
                                        </table>



                                    </div>

                                    <ModalDetail show={showModalDetail} handleClose={handleModalDetail} data={cloneMDG} tittle="Chi tiết bảng tin" />
                                </div>
                            </div>
                        </div>
                        <Pagination usePage={usePage} totalPage={bangTin.length} setIndexFirt={setIndexFirt} />

                    </section>

                </div>
            </div>
        </>
    )
}

export default AddBangTin;