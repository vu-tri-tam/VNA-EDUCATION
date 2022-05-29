import React from 'react'
import { Link } from "react-router-dom";
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import { DropdownButton } from 'react-bootstrap';

const lichHoc = () => {
    const dataHS = [
        {
            id: 1,
            maHS: 'ps11018',
            name: 'vũ trí tâm',
            lop: '12A5',

        },
        {
            id: 2,
            maHS: 'ps11018',
            name: 'võ minh trí',
            lop: '12A9',

        }
    ]
    const renderHS = dataHS.map((hs, index) => {
        return (
            <tr key={index}>
                <td>{index}</td>
                <td>{hs.maHS}</td>
                <td>{hs.name}</td>
                <td>{hs.lop}</td>
                <td className="td-show"><div className="btn-show"><Link to='danh-sach-hoc-sinh/chi-tiet-diem-hoc-sinh' className="btn-detail">Điểm</Link><Link to="danh-sach-hoc-sinh/Diem-danh-hoc-sinh" className="btn-sussess">Điểm danh</Link><Link className="btn-danger " to='danh-sach-hoc-sinh/Thoi-khoa-bieu'>Lịch học</Link></div></td>
                <td className="td-none">
                    <div className="btn-x">
                        <DropdownButton id="dropdown-basic-button" title="Thao tác">
                            {/* <Dropdown.Item as="Link" to='danh-sach-hoc-sinh/chi-tiet-diem-hoc-sinh'>Điểm</Dropdown.Item>
                        <Dropdown.Item as="Link" to="danh-sach-hoc-sinh/Diem-danh-hoc-sinh">Điểm danh</Dropdown.Item>
                        <Dropdown.Item as="Link" to='danh-sach-hoc-sinh/Thoi-khoa-bieu' >Lịch học</Dropdown.Item> */}
                            <div className="d-flex" style={{ flexDirection: "column" }}>
                                <Link to='danh-sach-hoc-sinh/chi-tiet-diem-hoc-sinh'>Điểm</Link>
                                <Link to="danh-sach-hoc-sinh/Diem-danh-hoc-sinh">Điểm danh</Link>
                                <Link to='danh-sach-hoc-sinh/Thoi-khoa-bieu'>Lịch học</Link>
                            </div>
                        </DropdownButton>
                    </div>
                </td>
            </tr>
        )
    })
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng danh sách" subTitile="" pathHome="phu-huynh" />
                <div className="page-title">
                    <div className="row">
                        {/* <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>LỊCH HỌC </h3>
                            <p className="text-subtitle text-muted">Xem lịch học tuần 1</p>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Lịch học tuần 1</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Xem lịch học </li>
                                </ol>
                            </nav>
                        </div> */}
                    </div>
                </div>
                <section className="section">

                    <div className="card">
                        {/* <div className="card-header">
                            <h4 className="card-title">Lịch học tuần 1 ngày 05/11/2021</h4>
                        </div> */}
                        <div className="card-body">
                            <div className="showListStudent">
                                <h4>DANH SÁCH HỌC SINH LỚP 12A3</h4>
                                <h5 className="infoGVCN">GVCN: Nguyễn Thùy Dương</h5>
                                <div className="tableShow table-responsive">
                                    <table>
                                        <thead>
                                            <tr><th>STT</th>
                                                <th>Mã Học Sinh</th>
                                                <th>Họ và tên</th>
                                                <th>Lớp</th>
                                                <th>Chức năng</th></tr>

                                        </thead>
                                        <tbody>
                                            {renderHS}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default lichHoc
