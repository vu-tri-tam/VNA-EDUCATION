import React from 'react'
import { Button, Modal } from 'react-bootstrap';
// import { Form, Row, Col } from 'react-bootstrap';

// import Offcanvas from 'react-bootstrap/Offcanvas'
// import Offcanvas from 'react-bootstrap/Offcanvas'

export default function ModalDetailMDG({ show, tittle, handleClose, data }) {
    // console.log(data, "data");
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <div>

            <Modal show={show} onHide={() => handleClose(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{tittle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table id="mytable" className="table-responsive-xl" style={{ border: "none" }}>
                        <thead>
                            <tr>

                                <th>Tiêu chí</th>
                                <th>Mục tiêu</th>
                                <th>Nội dung</th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                <tr key={data?._id} style={{ borderBottom: "6px solid #eceffa" }}>

                                    <td>{
                                        data.tieuChi?.map((e, i) => {
                                            return <div key={i}>{e.tenTC}</div>
                                        })
                                    }</td>
                                    <td>{data.tieuChi?.map((e, i) => {
                                        return e.mucTieu?.map((el, idx) => {
                                            return <div key={idx}>{el.noiDung}</div>

                                        })


                                    })}</td>
                                    <td>{
                                        data.tieuChi?.map((e, i) => {
                                            return <div key={i}>{e.noiDung}</div>
                                        })
                                    }</td>

                                </tr>


                            }

                        </tbody>
                    </table>

                    {/* {
                        <div>
                            <div>{data.tieuChi?.map((e, i) => {
                                return <div>{e.tenTC}</div>
                            })}</div>
                            <div>{data.tieuChi?.map((e, i) => {
                                return e.mucTieu?.map((el, idx) => {
                                    return <div>{el.noiDung}</div>

                                })


                            })}</div>
                        </div>



                    } */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose(false)}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={handleModalDetail}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>

        </div>
    )
}
