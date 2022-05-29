import React from 'react'
import { Link } from 'react-router-dom'

const LopItem = ({_id, index,currweek, GVCN, maLH}) => {
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
                                <h5>Đánh giá lớp {maLH} </h5>
                                <span className="badge bg-primary me-2">GVCN: {GVCN.hoTen}</span>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 ">
                                {/* <p className="m-1">Tuần: {currweek.soTuan}</p> */}
                            </div>
                        
                            <div className="col-lg-2 col-md-2 col-sm-3 ">
                                {/* <span className="badge bg-warning text-black w-75">Qúa hạn</span> */}
                                <span className="badge bg-success w-75">Còn hạn</span>
                                <span className="badge bg-success w-75">Tổng: 3/5</span>
                            </div>
                           
                            <div className="col-lg-2 col-md-2 col-sm-12 pt-4 pb-3">
                                <Link to={`gv/${_id}`} >
                                    <button type="button" className="btn btn-primary w-100">Xem Theo lớp</button>
                                </Link>
                            </div> 
                        </div>
                    {/* // close body */}
                </div>
            </div>
        </>
    )
}

export default LopItem
