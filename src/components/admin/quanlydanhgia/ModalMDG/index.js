import React, { useEffect, useState } from 'react'
// import { Button, Header, Icon, Modal, Checkbox, Form } from 'semantic-ui-react'
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

// import { Button, } from 'semantic-ui-react'


function ModalMDG({ show, showModal, title, action, initialValue }) {
    const [cloneData, setCloneData] = useState([])
    // console.log(initialValue, 'clone')

    const handleMDG = (field, value) => {
        setCloneData({
            ...cloneData,
            [field]: value
        })
    }
    const handleTieuChi = (id, value) => {
        const fieldData = JSON.parse(JSON.stringify(cloneData?.tieuChi));
        const findTieuChi = fieldData?.findIndex(e => e?._id === id);
        if (findTieuChi > -1) {
            fieldData[findTieuChi].tenTC = value;
            setCloneData({
                ...cloneData,
                tieuChi: fieldData
            })
        }
    }
    const handleNoiDung = (id, value) => {
        const dataPDG = JSON.parse(JSON.stringify(cloneData));
        // console.log(typeof (dataPDG, '12342'))
        // console.log(typeof (cloneData, '122222'))
        const fieldData = dataPDG?.tieuChi;
        const findTieuChi = fieldData?.findIndex(e => e?._id === id);
        fieldData[findTieuChi].noiDung = value;
        dataPDG.tieuChi = fieldData
        setCloneData(dataPDG)

    }
    const handleMucTieu = (keyTC, id, value) => {
        const tieuchiData = JSON.parse(JSON.stringify(cloneData?.tieuChi))
        const fieldData = tieuchiData[keyTC].mucTieu;

        const findMucTieu = fieldData?.findIndex(e => e?._id === id);
        if (findMucTieu > -1) {
            tieuchiData[keyTC].mucTieu[findMucTieu].noiDung = value;
            setCloneData({
                ...cloneData,
                tieuChi: tieuchiData
            })
        }

    }


    useEffect(() => {
        setCloneData(initialValue)
    }, [initialValue])

    // console.log(showEdit, 'showEdit')
    // console.log(cloneData, 'cloneData')
    return (
        <>

            <div>
                <Modal show={show} onHide={() => showModal(false)} animation={false}>
                    <Modal.Header >
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>Tên mẫu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tên đánh giá"
                                        name='tenDG'
                                        key={initialValue?.tenMau}
                                        onChange={(e) => handleMDG('tenMau', e.target.value)}
                                        defaultValue={initialValue?.tenMau}
                                    ></Form.Control>
                                    {/* <ErrorMessage name='tenDG' /> */}
                                </Form.Group>


                            </Col>

                            <Col lg={12}>


                                <Form.Group>
                                    <Form.Label>Tiêu chí</Form.Label>
                                    {

                                        initialValue?.tieuChi?.map((element, idx) => {
                                            return <Form.Control
                                                className="mb-3"
                                                type="text"
                                                placeholder="Tiêu chí"
                                                // name='tieuChi'
                                                key={element.tenTC}
                                                onChange={(ele) => handleTieuChi(element?._id, ele.target.value)}
                                                defaultValue={element.tenTC}
                                            />
                                        })



                                    }

                                </Form.Group>

                            </Col>
                            <Col lg={12}>


                                <Form.Group>
                                    <Form.Label>Nội dung</Form.Label>
                                    {
                                        initialValue?.tieuChi?.map((e, i) => {
                                            return <Form.Control
                                                className="mb-3"
                                                type="text"
                                                placeholder="Nội dung"
                                                // name='tieuChi'
                                                key={e.noiDung}
                                                onChange={(ele) => handleNoiDung(e?._id, ele.target.value)}
                                                defaultValue={e.noiDung}
                                            />
                                        })

                                    }

                                </Form.Group>


                            </Col>
                            <Col lg={12}>


                                <Form.Group>
                                    <Form.Label>Mục tiêu</Form.Label>
                                    {
                                        initialValue?.tieuChi?.map((e, i) => {
                                            return e?.mucTieu?.map((ele, index) => {
                                                return <Form.Control
                                                    className="mb-2"
                                                    type="text"
                                                    placeholder="Mục tiêu"
                                                    // name='mucTieu'
                                                    key={ele.noiDung}
                                                    onChange={(f) => handleMucTieu(i, ele?._id, f.target.value)}
                                                    defaultValue={ele.noiDung}
                                                />
                                            })

                                        })

                                    }

                                </Form.Group>


                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => showModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="success" type="button" onClick={() => { action(cloneData?._id, cloneData) }}>
                            Cập nhật
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    )
}

export default ModalMDG
