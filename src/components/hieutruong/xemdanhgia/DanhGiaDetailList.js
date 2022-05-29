import React from 'react'

const DanhGiaDetailList = ({state}) => {
    return (
        <div>
            {state.danhGiaDetail && state.danhGiaDetail.chiTiet.map((hs, i) => (
                <div className="card-body" key={i}>
                    <div className="row">
                        <div className="col-md-8 col-sm-8">
                            <div className="avatar bg-secondary me-3">
                                <span className="avatar-content">HS</span>
                            </div>
                            <span>
                                <strong>Học sinh {i+1}</strong>
                                <span className="ms-3">ngày: {new Date(hs.thoiDiemTao).toLocaleDateString() }</span>
                            </span>
                        </div>
                        <div className="col-md-4 col-sm-4 my-2 d-flex align-items-center justify-content-end float-left-xs">
                            <div className="badge bg-primary">Tổng điểm đánh giá: {hs.diemDG}</div>
                        </div>
                    </div>
                    <div className="ps-3 mt-3 ms-3" style={{borderLeft: "2px solid #f1f1f1"}}>
                        <p className="text-muted">{hs.gopY}</p> 
                        <div className="accordion" id={`cardAccordion${i+1}`}>
                            <div className="card">
                                <div className="" id={`headingOne${i+1}`} data-bs-toggle="collapse"
                                    data-bs-target={`#collapseOne${i+1}`} aria-expanded="false"
                                    aria-controls={`#collapseOne${i+1}`} role="button">
                                    <span className="collapsed collapse-title text-end" >
                                        <p className="mb-0"><i className="bi bi-chevron-down me-2"></i> Xem chi tiết các lựa chọn</p>
                                    </span>
                                </div>
                                <div id={`collapseOne${i+1}`} className="collapse pt-1" aria-labelledby={`headingOne${i+1}`}
                                    data-parent={`#cardAccordion${i+1}`}>
                                    <div className="">
                                    {state.danhGiaDetail.tieuChi.map((tieuchi, index) => (
                                        <div className="mb-2 mt-2" key={index}>
                                            <p className="my-3">Tiêu chí {index+1}: {tieuchi.tenTC}</p>
                                            <div className="row" >
                                                {tieuchi.mucTieu.map((jtem, index2) => (
                                                    <div className="my-1 " key={index2}>
                                                        <div >
                                                            <div className="alert alert-light-primary m-0" >
                                                                <p className="mb-0"><b>Mục tiêu {index2 + 1}: {jtem.noiDung }</b>
                                                                <span className="float-end">{hs.formDG[0][`tieuchi-${index+1}_muctieu-${index2+1}`]}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DanhGiaDetailList
