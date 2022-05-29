import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function ModalDetailPDG({ data, tittle, handleClose, show }) {
    // console.log(data, 'data');
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

                                <th>Tuần học</th>
                                <th>Giáo viên</th>
                                <th>Đối tượng sử dụng</th>
                                <th>Mẫu đánh giá</th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                <tr key={data?._id} style={{ borderBottom: "6px solid #eceffa" }} className="p-10 m-10">
                                    <td>{`Tuần ${data?.tuanDG?.soTuan}`}</td>
                                    <td>{data?.giaoVien?.hoTen !== undefined ? data?.giaoVien?.hoTen : "Đang cập nhật"}</td>
                                    <td>{data?.choGVCN === true ? "Áp dụng cho giáo viên chủ nhiệm " : "Áp dụng cho giáo viên bộ môn"}</td>
                                    <td>{data?.mauDG?.tenMau !== null ? data?.mauDG?.tenMau : "đang cập nhật"}</td>

                                </tr>


                            }

                        </tbody>
                    </table>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose(false)}>
                        Đóng
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}
