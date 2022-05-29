import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';

export default function ModalTuan({ show, handleClose, tittle, initialValue, action }) {
    const [state, setstate] = useState([])
    const [date, setDate] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setstate(initialValue)
    }, [initialValue])

    const handleDate = async (field, value) => {
        let valueDate = value;
        let d = new Date(valueDate);
        let formatted = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}-${(d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getFullYear()}`;
        // setDate(formatted)
        setDate({
            ...date,
            [field]: formatted
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null,

        })


    }

    useEffect(() => {
        const handlePushDate = (date) => {
            setstate({
                ...state,
                ngayBatDau: date.ngayBatDau !== undefined ? date.ngayBatDau : "",
                ngayKetThuc: date.ngayKetThuc !== undefined ? date.ngayKetThuc : ""
            })

        }
        handlePushDate(date)
    }, [date])

    const HandleState = (field, value) => {
        setstate({
            ...state,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })

    }
    const handleSubmit = () => {
        // tạo một biến để check lỗi
        const newErrors = findFormErrors()

        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors)
        } else {

            action(state)
        }
    }

    const findFormErrors = () => {
        const { tenTuan, soTuan, hocKy, ngayBatDau, ngayKetThuc } = state
        const newErrors = {}
        let nameTuan
        if (tenTuan !== undefined) {
            nameTuan = tenTuan.slice(5)
        }


        if (!tenTuan || tenTuan === '') newErrors.tenTuan = 'Không được để trống!'
        if (!soTuan || soTuan === '') newErrors.soTuan = 'Không được để trống!'
        else if (soTuan <= 0) newErrors.soTuan = 'Giá trị phải là số dương và lớn hơn 0'
        else if (soTuan !== nameTuan) newErrors.soTuan = 'Giá trị phải trùng với tên'

        if (!hocKy || hocKy === '') newErrors.hocKy = 'Không được để trống!'

        if (!ngayBatDau || ngayBatDau === '') newErrors.ngayBatDau = 'Không được để trống!'

        if (!ngayKetThuc || ngayKetThuc === '') newErrors.ngayKetThuc = 'Không được để trống!'


        return newErrors
    }
    return (
        <div>
            <Modal show={show} onHide={() => handleClose(false)}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>{tittle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Nhập tuần</Form.Label>
                            <Form.Control type="text" placeholder="Tuần VD: Tuần 1" isInvalid={!!errors.tenTuan} defaultValue={initialValue?.tenTuan} key={initialValue?.tenTuan} onChange={(e) => HandleState('tenTuan', e.target.value)} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.tenTuan}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Số tuần</Form.Label>
                            <Form.Control type="number" placeholder="Số tuần VD: 1" isInvalid={!!errors.soTuan} defaultValue={initialValue?.soTuan} key={initialValue?.soTuan} onChange={(e) => HandleState('soTuan', e.target.value)} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.soTuan}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Học kỳ</Form.Label>
                            <Form.Control as="select" name="" id="" className="form-select  mb-3" isInvalid={!!errors.hocKy} defaultValue={initialValue?.hocKy} key={initialValue?.hocKy} onChange={(e) => HandleState('hocKy', e.target.value)}>
                                <option value="">Chọn học kỳ</option>
                                <option value="1">Học kỳ I</option>
                                <option value="2">Học Kỳ II</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.hocKy}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Thời gian bắt đầu</Form.Label>
                            <Form.Control type="date" placeholder="Thời gian bắt đầu VD: 23/09/2021" isInvalid={!!errors.ngayBatDau} defaultValue={initialValue?.ngayBatDau} key={initialValue?.ngayBatDau} onChange={(e) => handleDate('ngayBatDau', e.target.value)} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.ngayBatDau}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Thời gian kết thúc</Form.Label>
                            <Form.Control type="date" placeholder="Số tuần" isInvalid={!!errors.ngayKetThuc} defaultValue={initialValue?.ngayKetThuc} key={initialValue?.ngayKetThuc} onChange={(e) => handleDate('ngayKetThuc', e.target.value)} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.ngayKetThuc}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => handleClose(false)}>
                            Đóng
                        </Button>
                        <Button variant="success" onClick={handleSubmit}>
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}
