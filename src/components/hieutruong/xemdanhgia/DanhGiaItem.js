import React from 'react'
import { Link } from 'react-router-dom'

const DanhGiaItem = ({_id, index, tenDG, monHoc, tuanDG, giaoVien, diemTB, lopHoc, daDuyet, hetHan, lop}) => {

    // console.log(monHoc);
    return (
        <>
            <div className="card card-hoverd shadow-sm mb-3">
                <div className="card-body">
                    {/* // open body */}
                        <div className="row cardCustum align-items-center" >
                            <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 cxs">
                                <strong>{index+1}</strong>
                            </div>
                            
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-2">
                                <h5> {tenDG} </h5>
                                <span className="badge bg-primary me-2">Môn: {monHoc?.tenMH || "Sinh hoạt"}</span>
                                <span className="badge my-2 me-2" style={{backgroundColor : "#778beb"}}>GV: {giaoVien}</span>
                                <span className="badge my-2 me-2" style={{backgroundColor : "#778ca3"}}>Điểm: {Number(diemTB).toFixed(0)}</span>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 ">
                                <p className="m-1">Tuần: {tuanDG}</p>
                            </div>
                        
                            <div className="col-lg-2 col-md-2 col-sm-3 ">
                                {hetHan ? 
                                <span className="badge bg-warning text-black w-75">Quá hạn</span> :
                                <span className="badge bg-success w-75">Còn hạn</span>}
                                {daDuyet ? 
                                <span className="badge bg-success w-75">Đã duyệt</span>: 
                                <span className="badge bg-danger w-75">Chưa duyệt</span>}
                                <span className="badge bg-success w-75">Tổng: {lopHoc.luotDG}/{lopHoc?.siSo}</span>
                            </div>
                           
                            <div className="col-lg-2 col-md-2 col-sm-12 pt-4 pb-3">
                                <Link to={`/hieu-truong/xem-danh-gia/lop/${lop}/${_id}`} >
                                    <button type="button" className="btn btn-primary w-100">Xem đánh giá</button>
                                </Link>
                            </div> 
                        </div>
                    {/* // close body */}
                </div>
            </div>
        </>
    )
}

export default DanhGiaItem
