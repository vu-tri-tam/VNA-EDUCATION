import React from 'react'
import { Button, Modal } from 'react-bootstrap';


export default function ModalDetail({ show, tittle, handleClose, data }) {

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

                                <th>Tóm tắt</th>
                                <th>Người đăng</th>
                                <th>Nội dung</th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                <tr key={data?._id} style={{ borderBottom: "6px solid #eceffa" }}>
                                    <td><textarea className="form-control " style={{ cursor: "not-allowed" }} id="exampleFormControlTextarea1" rows="3" key={data?.tomTat} defaultValue={data?.tomTat} /></td>
                                    {/* <td><textarea className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={data?.tieuDe} disabled={true} /></td> */}
                                    <td>{data?.nguoiDang?.hoTen}</td>

                                    <td><textarea className="form-control " style={{ cursor: "not-allowed" }} id="exampleFormControlTextarea1" rows="3" key={data?.noiDung} defaultValue={data?.noiDung} /></td>
                                </tr>


                            }

                        </tbody>
                    </table>



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
