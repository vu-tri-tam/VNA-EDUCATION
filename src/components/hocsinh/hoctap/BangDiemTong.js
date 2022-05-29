import React from 'react'
import { exportExcel, configHeader } from '../TaiXuong'
import { renderZero, renderChuaCapNhat } from "../helper/HocSinhHelper"
import "../hoctap/LichHoc.css"

const BangDiemTong = ({ bangdiem }) => {


    const sheet2 = (wb) => {
        const nameHeader = `BẢNG ĐIỂM TỔNG KẾT | TÊN: ${bangdiem.hocSinh} | LỚP: ${bangdiem.lopHoc}`
        const ws = configHeader(wb, 'Bảng điểm tổng', nameHeader, {
            headerArr: [" ", "HẠNH KIỂM", "HỌC LỰC", "ĐIỂM TRUNG BÌNH"],
            width: 30
        })

        const data = [[
            "Kết quả học kỳ 1", renderChuaCapNhat(bangdiem.hocKy1.hanhKiem),
            renderChuaCapNhat(bangdiem.hocKy1.hocLuc),
            renderChuaCapNhat(bangdiem.hocKy1.diemTB)
        ], [
            "Kết quả học kỳ 2", renderChuaCapNhat(bangdiem.hocKy2.hanhKiem),
            renderChuaCapNhat(bangdiem.hocKy2.hocLuc),
            renderChuaCapNhat(bangdiem.hocKy2.diemTB)
        ], [
            "Kết quả tổng", renderChuaCapNhat(bangdiem.caNam.hanhKiem),
            renderChuaCapNhat(bangdiem.caNam.hocLuc),
            renderChuaCapNhat(bangdiem.caNam.diemTB)
        ]]

        data.forEach(diem => {
            ws.addRow(diem)
        })
        return ws

    }

    const sheet1 = (wb) => {
        const nameHeader = `BẢNG ĐIỂM THEO MÔN | TÊN: ${bangdiem.hocSinh} | LỚP: ${bangdiem.lopHoc}`
        const ws = configHeader(wb, 'Bảng điểm theo môn', nameHeader, {
            headerArr: [
                'STT', 'MÔN HỌC', 'HK1 ĐIỂM MIỆNG',
                'HK1 ĐIỂM 15 PHÚT', 'HK1 ĐIỂM 1 TIẾT',
                'HK2 ĐIỂM MIỆNG', 'HK2 ĐIỂM 15 PHÚT',
                'HK2 ĐIỂM 1 TIẾT', "ĐIỂM TỔNG HK 1",
                "ĐIỂM TỔNG HK 2"
            ],
            width: 20
        })

        bangdiem.bangDiemMon.forEach((mon, index) => {
            ws.addRow([
                index + 1,
                mon.monHoc,
                renderZero(mon.hocKy1.kiemTra_mieng),
                renderZero(mon.hocKy1.kiemTra_15phut),
                renderZero(mon.hocKy1.kiemTra_1tiet),
                renderZero(mon.hocKy2.kiemTra_mieng),
                renderZero(mon.hocKy2.kiemTra_15phut),
                renderZero(mon.hocKy2.kiemTra_1tiet),
                mon.hocKy1.diemTong,
                mon.hocKy2.diemTong,
            ])
                ;
        })
        return ws
    }

    return (
        <>
            <span>Bảng điểm tổng hợp</span>
            <div className="btn btn-primary float-end mb-3"
                onClick={() => exportExcel("BẢNG_ĐIỂM_VNAEDUACTION", [sheet1, sheet2])}>Tải xuống</div>
            <table className="table table-bordered font-edit">
                <thead >
                    <tr style={{ backgroundColor: "#dfe4ea" }}>
                        <th className="text-center" rowSpan="2">Stt</th>
                        <th className="text-center" rowSpan="2">Môn học</th>
                        <th className="text-center" colSpan="4">Điểm học kỳ 1</th>
                        <th className="text-center" colSpan="4">Điểm học kỳ 2</th>
                    </tr>
                    <tr style={{ backgroundColor: "#ecf0f1" }}>
                        <th className="text-center">Miệng</th>
                        <th className="text-center">15 phút</th>
                        <th className="text-center">1 tiết</th>
                        <th className="text-center">Tổng</th>
                        <th className="text-center">Miệng</th>
                        <th className="text-center">15 phút</th>
                        <th className="text-center">1 tiết</th>
                        <th className="text-center">Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bangdiem.bangDiemMon.length > 0 && bangdiem.bangDiemMon !== null
                            ? bangdiem.bangDiemMon.map((mon, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{mon.monHoc}</td>
                                    <td>{renderZero(mon.hocKy1.kiemTra_mieng, " ")}</td>
                                    <td>{renderZero(mon.hocKy1.kiemTra_15phut, " ")}</td>
                                    <td>{renderZero(mon.hocKy1.kiemTra_1tiet, " ")}</td>
                                    <td>{mon.hocKy1.diemTong}</td>
                                    <td>{renderZero(mon.hocKy2.kiemTra_mieng, " ")}</td>
                                    <td>{renderZero(mon.hocKy2.kiemTra_15phut, " ")}</td>
                                    <td>{renderZero(mon.hocKy2.kiemTra_1tiet, " ")}</td>
                                    <td>{mon.hocKy2.diemTong}</td>
                                </tr>
                            )) : <tr ><td className="text-center" colSpan="12">Chưa cập nhật</td></tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default BangDiemTong
