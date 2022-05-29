import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'

export default function ModalYear({ tittle, action, handleClose, show, data, initialValue }) {
    const [namHoc, setNamHoc] = useState([])
    // console.log(namHoc, 'initialValue')
    const [errors, setErrors] = useState({})

    const handleNamHoc = (field, value) => {
        setNamHoc({
            ...namHoc,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })

    }
    const handleSubmit = () => {
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            action(namHoc)
        }
    }

    const findFormErrors = () => {
        const { tenNam, tuanHoc, namBatDau, namKetThuc } = namHoc
        const newErrors = {}

        var patt = /^[0-9]{4}-[0-9]{4}$/g;

        if (!tenNam || tenNam === '') newErrors.tenNam = 'Không được bỏ trống!'
        else if (tenNam.length > 30) newErrors.tenNam = 'name is too long!'
        else if (patt.test(tenNam) === false) newErrors.tenNam = 'Vui lòng nhập đúng tên năm!'

        if (!tuanHoc || tuanHoc === '') newErrors.tuanHoc = 'select a food!'

        if (!namBatDau || namBatDau === '') newErrors.namBatDau = 'Không được bỏ trống!'
        else if (isNaN(namBatDau)) newErrors.namBatDau = 'vui lòng nhập số!'

        if (!namKetThuc || namKetThuc === '') newErrors.namKetThuc = 'Không được bỏ trống!'
        else if (isNaN(namKetThuc)) newErrors.namKetThuc = 'vui lòng nhập số!'

        return newErrors
    }

    const options = data?.map((e, i) => {
        return { label: e.tenTuan, value: e._id }
    })

    const handleOnchange = val => {
        const weekList = val.split(',');
        setNamHoc({
            ...namHoc,
            tuanHoc: weekList
        })


    }
    useEffect(() => {
        setNamHoc(initialValue)

    }, [initialValue])



    return (
        <div>
            <Modal show={show} onHide={() => handleClose(false)}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>{tittle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Tên năm</Form.Label>
                            <Form.Control type="text" placeholder="Năm bắt đầu VD: 2021-2022" defaultValue={initialValue?.tenNam} isInvalid={!!errors.tenNam} onChange={(e) => handleNamHoc('tenNam', e.target.value)} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.tenNam}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Tuần</Form.Label>
                            <Form.Group className="mb-3 w-100" defaultValue={initialValue?.tuanHoc}>
                                <MultiSelect
                                    onChange={handleOnchange}
                                    options={options}
                                />
                            </Form.Group>
                            {/* <Form.Control.Feedback type='invalid'>
                                {errors.tuanHoc}
                            </Form.Control.Feedback> */}

                            {/* <Form.Control type="text" placeholder="Tuần" {...register('tenNam', { required: true })} /> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Năm bắt đầu</Form.Label>
                            <Form.Control type="number" min="2021" max="2099" step="1" isInvalid={!!errors.namBatDau} placeholder="Năm bắt đầu VD: 2021" defaultValue={initialValue?.namBatDau} onChange={(e) => handleNamHoc('namBatDau', e.target.value)} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.namBatDau}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Năm kết thúc</Form.Label>
                            <Form.Control type="number" min="2021" max="2099" step="1" isInvalid={!!errors.namKetThuc} placeholder="Năm kết thúc VD:2023" defaultValue={initialValue?.namKetThuc} onChange={(e) => handleNamHoc('namKetThuc', e.target.value)} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.namKetThuc}
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
