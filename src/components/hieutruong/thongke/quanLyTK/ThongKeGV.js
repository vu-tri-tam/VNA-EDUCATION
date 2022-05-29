import React from 'react';
import '../../css/ThongKe.css';

const ThongKeGV = ({ giaoVien }) => {
    // console.log(typeof (giaoVien), 'gv');
    const getGV = giaoVien?.map(e => e?.thongKe?.tongSo_giaoVien)
    return (
        <>
            <div className="button-thongke border-left-box-gv">
                <div className="row">
                    <div className="col-lg-9">
                        <h4 style={{ textAlign: "left" }}>Tổng số giáo viên</h4>
                        <h6>{getGV > 0 ? getGV : "Đang cập nhật"} / giáo viên</h6>
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
export default ThongKeGV;