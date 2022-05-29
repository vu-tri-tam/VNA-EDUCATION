import React from 'react'
import { Link } from 'react-router-dom'

const DanhGiaItem = ({_id, index, tenDG, monHoc, tuanDG, lopHoc, chiTiet, hetHan, diemTB, daDuyet}) => {
    console.log(chiTiet);
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
                                <h5 className="mb-0"> {tenDG} </h5>
                                <span className="badge bg-primary me-2">Môn: {monHoc || "Sinh hoạt"}</span>
                                <span className="badge my-2 me-2" style={{backgroundColor : "#778beb"}}>Lớp: {lopHoc?.maLH}</span>
                                <span className="badge bg-primary">Điểm TB: {diemTB.toFixed(1)}</span>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 ">
                                <p className="m-1">Tuần: {tuanDG}</p>
                            </div>
                        
                            <div className="col-lg-2 col-md-2 col-sm-3 ">       
                                {hetHan ? <span className="badge bg-warning text-black w-75">Hết hạn</span> : <span className="badge bg-success w-75">Còn Hạn</span>} 
                                <br />           
                                {daDuyet ? 
                                <span className="badge bg-success w-75">Đã duyệt</span>: 
                                <span className="badge bg-danger w-75">Chưa duyệt</span>}
                            </div>
                           
                            <div className="col-lg-2 col-md-2 col-sm-12 pt-4 pb-3">
                                <Link to={`gv/${_id}`} >
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
