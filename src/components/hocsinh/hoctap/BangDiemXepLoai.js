import React from 'react'
import { renderChuaCapNhat } from "../helper/HocSinhHelper"

const BangDiemXepLoai = ({ bangdiem }) => {

    return (
        <>
            <p>Bảng điểm xếp loại</p>
            <table className="table table-bordered">
                <thead >
                    <tr style={{ backgroundColor: "#ecf0f1" }}>
                        <th colSpan="2"></th>
                        <th className="text-center" colSpan="3">Hạnh kiểm</th>
                        <th className="text-center" colSpan="3">Học lực</th>
                        <th className="text-center" colSpan="3">Điểm trung bình</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="2">Kết quả học kỳ 1</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.hocKy1?.hanhKiem || "")}</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.hocKy1?.hocLuc || "")}</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.hocKy1?.diemTB || "", "điểm")}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">Kết quả học kỳ 2</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.hocKy2?.hanhKiem || "")}</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.hocKy2?.hocLuc || "")}</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.hocKy2?.diemTB || "", "điểm")}</td>

                    </tr>
                    <tr>
                        <td colSpan="2">Kết quả tổng</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.caNam?.hanhKiem || "")}</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.caNam?.hocLuc || "")}</td>
                        <td className="text-center" colSpan="3">{renderChuaCapNhat(bangdiem?.caNam?.diemTB || "", "điểm")}</td>

                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default BangDiemXepLoai
