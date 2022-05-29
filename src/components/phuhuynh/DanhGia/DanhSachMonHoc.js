import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

export default function DanhSachMonHoc({ id, stt, monHoc, giaoVien, soTiet }) {
    const match = useRouteMatch()
    return (
        <div className="card card-hoverd shadow-sm mb-3">
            <div className="card-body">
                {/* // open body */}
                <div className="row cardCustum align-items-center" >

                    <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 cxs">
                        <strong>{stt}</strong>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-2">
                        <Link to={`${match.url}/danh-sach-giao-vien-bo-mon`} >
                            <h5> Danh sách môn {monHoc} </h5>
                        </Link>
                        <span className="badge bg-primary me-2">Môn: {monHoc}</span>
                        <span className="badge bg-light-primary me-2">Số tiết: {soTiet}</span>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-2 text-center">
                        <p className="m-1">{giaoVien.length}</p>
                    </div>

                    <div className="col-lg-3 col-md-2 col-sm-12 pt-4 pb-3">
                        <Link to={`${match.url}/danh-sach-giao-vien-bo-mon/${id}`} >
                            <div className="btn btn-info">Xem danh sách</div>
                        </Link>
                    </div>
                </div>
                {/* // close body */}
            </div>
        </div>
    )
}
