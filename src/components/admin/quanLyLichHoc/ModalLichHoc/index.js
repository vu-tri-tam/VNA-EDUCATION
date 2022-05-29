import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, } from 'react-bootstrap';
// import BuoiHocApi from '../../../../api/BuoiHocApi';
import TuanHocApi from '../../../../api/TuanHocApi';

export default function ModalLichHoc({ show, handleClose, action, tittle, initialValue }) {
    const [state, setstate] = useState([])
    const [errors, setErrors] = useState({})
    const [tuan, setTuan] = useState([]);
    // console.log(state, 8888);
    useEffect(() => {
        setstate(initialValue)
    }, [initialValue])

    useEffect(() => {
        TuanHocApi.getTuanHoc()?.then(res => setTuan(res?.data));
    }, [])

    const getDate = (e) => {
        let valueDate = e.target.value;
        let d = new Date(valueDate);
        let formatted = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}-${(d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getFullYear()}`;
        setstate({
            ...state,
            ngayHoc: formatted
        })
        if (!!errors["ngayHoc"]) setErrors({
            ...errors,
            ngayHoc: null
        })
    }

    const handleSubmit = () => {
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            action(state)
        }
    }



    const findFormErrors = () => {
        const { thu, tuanHoc, ngayHoc } = state
        const newErrors = {}

        if (!thu || thu === '') newErrors.thu = 'Không được bỏ trống!'

        if (!tuanHoc || tuanHoc === '') newErrors.tuanHoc = 'Không được bỏ trống'

        if (!ngayHoc || ngayHoc === '') newErrors.ngayHoc = 'Không được bỏ trống!'


        return newErrors
    }

    const handleLichHoc = (field, value) => {
        setstate({
            ...state,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{tittle}</Modal.Title>
                </Modal.Header>
                <Form >
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Buổi học</Form.Label>
                            <Form.Control as="select" name="" id="" className="form-select mb-3" key={initialValue?.thu} defaultValue={initialValue?.thu} isInvalid={!!errors.thu} onChange={(e) => { handleLichHoc('thu', e.target.value) }}>
                                <option value="">chọn thứ</option>
                                <option value="Thứ Hai">Thứ 2</option>
                                <option value="Thứ Ba">Thứ 3</option>
                                <option value="Thứ Tư">Thứ 4</option>
                                <option value="Thứ Năm">Thứ 5</option>
                                <option value="Thứ Sáu">Thứ 6</option>
                                <option value="Thứ Bảy">Thứ 7</option>
                                <option value="Chủ Nhật">Chủ nhật</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.thu}
                            </Form.Control.Feedback>

                            <Form.Label>Tuần học</Form.Label>
                            <Form.Control as="select" name="" id="" className="form-select mb-3" key={initialValue?.tuanHoc} defaultValue={initialValue?.tuanHoc} isInvalid={!!errors.tuanHoc} onChange={(e) => { handleLichHoc('tuanHoc', e.target.value) }}>
                                <option value="">chọn tuần</option>
                                {
                                    tuan?.map((e, i) => {
                                        return (
                                            <option value={e._id}>{e.tenTuan}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.tuanHoc}
                            </Form.Control.Feedback>


                            <Form.Label>Ngày học</Form.Label>
                            <Form.Control type="date" key={initialValue?.ngayHoc} defaultValue={initialValue?.ngayHoc} isInvalid={!!errors.ngayHoc} onChange={(e) => getDate(e)} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.ngayHoc}
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
