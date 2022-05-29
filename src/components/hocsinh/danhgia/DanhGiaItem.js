import React from 'react'
import { Link } from 'react-router-dom'

const DanhGiaItem = ({_id, index, tenDG, monHoc, tuanDG, giaoVien, hetHan, hocSinhDG}) => {

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
                                <span className="badge bg-primary me-2">Môn: {monHoc !== null && monHoc !== undefined ? monHoc : "Sinh hoạt"}</span>
                                <span className="badge my-2 me-2" style={{backgroundColor : "#778beb"}}>GV: {giaoVien}</span>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 ">
                                <p className="m-1">Tuần: {tuanDG}</p>
                            </div>
                        
                            <div className="col-lg-2 col-md-2 col-sm-3 ">
                                {hetHan ? <span className="badge bg-warning">Quá hạn đánh giá</span> :
                                !hocSinhDG.trangThai ?
                                <span className="badge bg-danger ">Chưa đánh giá</span>:
                                <span className="badge bg-success ">Đã đánh giá</span>
                                }
                            </div>
                           
                            <div className="col-lg-2 col-md-2 col-sm-12 pt-4 pb-3">
                                { 
                                hetHan ? <button type="button" className="btn btn-primary w-100" disabled>Đã Đóng </button> :
                                hocSinhDG.trangThai ? 
                                <button type="button" className="btn btn-primary w-100" disabled>Đã Đánh giá </button> : 
                                <Link to={`gv/${_id}`} >
                                    <button type="button" className="btn btn-primary w-100">Đánh giá</button>
                                </Link> }
                            </div> 
                        </div>
                    {/* // close body */}
                </div>
            </div>
        </>
    )
}

export default DanhGiaItem
