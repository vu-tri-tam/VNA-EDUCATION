import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
// import TietHocApi from '../../../../..TietHocApi';
import PhieuDanhGiaApi from '../../../../api/PhieuDanhGiaApi';
import TietHocApi from '../../../../api/TietHocApi';

export default function ModalTietHoc({ show, handleShow, initialValue, action, title }) {
    const [state, setstate] = useState([])
    const [giaoVien, setGiaoVien] = useState([]);
    const [monhoc, setMH] = useState([]);
    const [errors, setErrors] = useState({})

    // console.log(initialValue, 'initialValue')
    useEffect(() => {
        setstate(initialValue)
    }, [initialValue])

    useEffect(() => {
        getMonHoc()
    }, [])

    const getMonHoc = async () => {
        let result = await PhieuDanhGiaApi.getMonHoc();
        await setMH(result?.data);
    }


    const handleTietHoc = (field, value) => {
        setstate({
            ...state,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
        const { thuTiet, thoiGian_batDau, monHoc, giaoVien } = state
        // console.log(monHoc, 'mhne');
        const newErrors = {}

        // var patt = /^[0-9]{4}-[0-9]{4}$/g;

        if (!thuTiet || thuTiet === '') newErrors.thuTiet = 'Không được bỏ trống!'
        else if (thuTiet.length > 30) newErrors.thuTiet = 'Tên quá dài!'
        // else if (patt.test(tenNam) === false) newErrors.tenNam = 'Vui lòng nhập đúng tên năm!'

        if (!thoiGian_batDau || thoiGian_batDau === '') newErrors.thoiGian_batDau = 'Không được bỏ trống'

        if (!monHoc || monHoc === '') newErrors.monHoc = 'Không được bỏ trống!'
        // else if (isNaN(namBatDau)) newErrors.namBatDau = 'vui lòng nhập số!'

        if (!giaoVien || giaoVien === '') newErrors.giaoVien = 'Không được bỏ trống!'
        // else if (isNaN(namKetThuc)) newErrors.namKetThuc = 'vui lòng nhập số!'

        return newErrors
    }

    const handleSubmit = () => {
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            action(state)
        }
    }

    const sortBySubject = async (idMH) => {
        const getGV = await TietHocApi.getMonHocById(idMH)
        await setGiaoVien(getGV?.data)
        setstate({
            ...state,
            monHoc: idMH,
            giaoVien: giaoVien
        })

    }

    return (
        <div>
            <Modal show={show} onHide={() => handleShow(false)}>
                <Form >
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Thứ tiết</Form.Label>
                            <Form.Control as="select" defaultValue={initialValue?.thuTiet} isInvalid={!!errors.thuTiet} onChange={(e) => { handleTietHoc('thuTiet', e.target.value) }} >
                                <option >chọn tiết</option>
                                <option value="Tiết 1">Tiết 1</option>
                                <option value="Tiết 2">Tiết 2</option>
                                <option value="Tiết 3">Tiết 3</option>
                                <option value="Tiết 4">Tiết 4</option>
                                <option value="Tiết 5">Tiết 5</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.thuTiet}
                            </Form.Control.Feedback>

                            <Form.Label>Thời gian bắt đầu</Form.Label>
                            <Form.Control as="select" defaultValue={initialValue?.thoiGian} isInvalid={!!errors.thoiGian_batDau} onChange={(e) => { handleTietHoc('thoiGian_batDau', e.target.value) }} >
                                <option value="">chọn thời gian</option>
                                <option value="07:30 - 08:15">07:30 - 08:15</option>
                                <option value="08:15 - 09:00">08:15 - 09:00</option>
                                <option value="09:20 - 10:05">09:20 - 10:05</option>
                                <option value="10:05 - 10:50">10:05 - 10:50</option>
                                <option value="10:50 - 11:20">10:50 - 11:20</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.thoiGian_batDau}
                            </Form.Control.Feedback>

                            <Form.Label>Môn học</Form.Label>
                            <Form.Control as="select" defaultValue={initialValue?.monHoc?._id} isInvalid={!!errors.monHoc} onChange={(e) => sortBySubject(e.target.value)}>
                                <option value="">chọn môn</option>
                                {
                                    monhoc?.map((e, i) => {

                                        return (
                                            <option value={e._id} key={i}>{e.tenMH}</option>

                                        )
                                    })
                                }
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.monHoc}
                            </Form.Control.Feedback>


                            <Form.Label>Giáo viên</Form.Label>
                            <Form.Control as="select" defaultValue={initialValue?.giaoVien} isInvalid={!!errors.giaoVien} onChange={(e) => { handleTietHoc('giaoVien', e.target.value) }}>
                                <option value="">chọn giáo viên</option>
                                {
                                    giaoVien?.map((e, i) => {

                                        return (
                                            <option value={e._id} key={i}>{e.hoTen}</option>

                                        )
                                    })
                                }
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.giaoVien}
                            </Form.Control.Feedback>


                        </Form.Group>

                        {/* <Button variant="success" onClick={handleSubmit} >
                            Xác nhận
                        </Button> */}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => handleShow(false)}>
                            Đóng
                        </Button>
                        <Button variant="success" onClick={handleSubmit} >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    )
}
