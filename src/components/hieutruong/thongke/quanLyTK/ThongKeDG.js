import React from 'react';
import '../../css/ThongKe.css';

const ThongKeDG = ({ danhGia }) => {
    // console.log(typeof (giaoVien), 'gv');
    const getDG = danhGia?.map(e => e?.thongKe?.tongSo_danhGia)
    // console.log(danhGia, 'getDG');
    return (
        <>
            <div className="button-thongke border-left-box-gv">
                <div className="row">
                    <div className="col-lg-9">
                        <h4 style={{ textAlign: "left" }}>Tổng số đánh giá</h4>
                        <h6>{getDG.length > 0 ? getDG : "Đang cập nhật"} / Đánh giá</h6>
                    </div>
                    <div className="col-lg-3">
                        <div className="css-icon-GV">
                            <i className="bi bi-people-fill" style={{ fontSize: 40 }}></i>
                        </div>

                    </div>
                </div>


            </div>
        </>
    )
}
export default ThongKeDG;