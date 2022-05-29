import React from 'react';
import '../../css/ThongKe.css';

const ThongKeHS = ({ hocSinh }) => {
    // console.log(hocSinh);
    const getHS = hocSinh?.map(e => e?.thongKe?.tongSo_hocSinh)

    return (
        <>
            <div className="button-thongke border-left-box-hs">
                <div className="row">
                    <div className="col-lg-9">
                        <h4 style={{ textAlign: "left" }}>Tổng số học sinh</h4>
                        <h6>{getHS > 0 ? getHS : "Đang cập nhật"} / Học sinh</h6>
                    </div>
                    <div className="col-lg-3">
                        <div className="css-icon-HS">
                            <i className="bi bi-people-fill" style={{ fontSize: 40 }}></i>
                        </div>

                    </div>
                </div>


            </div>
        </>
    )
}

export default ThongKeHS;