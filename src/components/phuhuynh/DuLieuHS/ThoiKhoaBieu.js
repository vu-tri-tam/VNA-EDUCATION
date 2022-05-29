import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import BackBtn from '../../common/BackBtn';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
function TKB() {
    document.title = "Thời khóa biểu | VNA EDUCATION";
    const [show, setShow] = useState(false);
    const handleModal = () => {
        setShow(!show)
    }
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Chi tiết lịch học" subTitile="" pathHome="phu-huynh" />
                <BackBtn></BackBtn>
                <section className="section ">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="formShow">
                                <h4>THỜI KHÓA BIỂU LỚP 12A3</h4>
                                <h4 style={{ textAlign: 'center', fontSize: '18px' }}>Năm học: <span className="chooseYear">
                                    <select>
                                        <option value>2018 - 2019</option>
                                        <option value>2019 - 2020</option>
                                        <option value>2020 - 2021</option>
                                    </select>
                                </span>
                                </h4>
                                <Button onClick={handleModal} style={{ marginBottom: '10px', float: 'right', background: '' }}>Xem giáo viên</Button>
                                <Modal show={show}>
                                    <Modal.Body>
                                        <div className="showGV">
                                            <h4>Danh sách giáo viên bộ môn</h4>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tên GV</th>
                                                        <th>Môn</th>
                                                        <th>Thời gian</th>
                                                    </tr>
                                                </thead>


                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Lê Hoàng Hải</td>
                                                        <td>Toán</td>
                                                        <td>(7:30 - 10:30)</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Lương xuân trung dũng</td>
                                                        <td>Lý</td>
                                                        <td>(8:30 - 11:30)</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => { handleModal() }} className='btn-danger'>
                                            đóng
                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <div className="table-responsive container-table " style={{ marginTop: "10%" }}>
                                    <table className="table table-bordered mb-0 mw-750px">
                                        <tbody><tr>
                                            <th>Buổi</th>
                                            <th>Tiết
              </th><th>Thứ 2</th>
                                            <th>Thứ 3</th>
                                            <th>Thứ 4</th>
                                            <th>Thứ 5</th>
                                            <th>Thứ 6</th>
                                            <th>Thứ 7</th>
                                        </tr>
                                            <tr>
                                                <td rowSpan={5}>sáng</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>toán</td>
                                                <td>lý</td>
                                                <td>hóa</td>
                                                <td>văn</td>
                                                <td>anh</td>
                                                <td>anh</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>toán</td>
                                                <td>lý</td>
                                                <td>hóa</td>
                                                <td>văn</td>
                                                <td>anh</td>
                                                <td>anh</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>toán</td>
                                                <td>lý</td>
                                                <td>hóa</td>
                                                <td>văn</td>
                                                <td>anh</td>
                                                <td>anh</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>toán</td>
                                                <td>lý</td>
                                                <td>hóa</td>
                                                <td>văn</td>
                                                <td>anh</td>
                                                <td>anh</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: 'center', fontWeight: 600 }}>ra chơi</td>
                                            </tr>
                                            <tr>
                                                <td rowSpan={5}>chiều</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>toán</td>
                                                <td>lý</td>
                                                <td>hóa</td>
                                                <td>văn</td>
                                                <td>anh</td>
                                                <td rowSpan={5}>nghỉ</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>toán</td>
                                                <td>lý</td>
                                                <td>hóa</td>
                                                <td>văn</td>
                                                <td>anh</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>toán</td>
                                                <td>lý</td>
                                                <td>hóa</td>
                                                <td>văn</td>
                                                <td>anh</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>toán</td>
                                                <td>lý</td>
                                                <td>hóa</td>
                                                <td>văn</td>
                                                <td>anh</td>
                                            </tr>
                                        </tbody></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default TKB

