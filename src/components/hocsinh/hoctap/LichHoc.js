import React, { useEffect, useState } from 'react'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import LoadingFullPage from '../../common/LoadingFullPage'
import LichHocApi from '../../../api/hocsinh/LichHocApi'
import TietHoc from './TietHoc'
import NamHocApi from '../../../api/hocsinh/NamHocApi'
import { configHeader, exportExcel } from '../TaiXuong'
import { getIdUser } from '../../../auth/AuthFun'
import NguoiDungApi from '../../../api/NguoiDungApi'
import "./LichHoc.css"

const LichHoc = () => {
    document.title = "Lịch học | VNA EDUCATION"
    const [dsTuanHoc, setdsTuanHoc] = useState(null)
    const [tuanHoc, settuanHoc] = useState(null)
    const [LichHoc, setlichHoc] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const [Lop, setLop] = useState(null)



    // lấy ds tuần & set ds tuần và tuần mới nhất
    useEffect(() => {
        const getTuanTrongNam = async () => {
            const idHS = getIdUser()
            let res = await NamHocApi.getNamHocMoiNhat(tuanHoc)
            let user = await NguoiDungApi.getUserById(idHS)
            setLop(user.data.hocTap);
            setdsTuanHoc(res.data.tuanHoc)
            settuanHoc(res.data.tuanHoc[0])
        }
        getTuanTrongNam()
        // eslint-disable-next-line
    }, [])

    // Lấy lịch học
    useEffect(() => {
        const getLichHoc = async () => {
            try {
                if (tuanHoc !== null) {
                    setisLoading(false)
                    let res = await LichHocApi.getByTuanVaLop(tuanHoc._id, Lop.idLop)
                    if (res !== undefined) {
                        setlichHoc(res.data)
                        // console.log(res.data)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getLichHoc()
            .then(() => setisLoading(true))
        // eslint-disable-next-line
    }, [tuanHoc])

    // get 1 tuần by id
    const changeTuan = e => {
        let id = e.target.value
        let Tuannew = dsTuanHoc.filter(tuan => tuan._id === id)
        settuanHoc(Tuannew[0])
    }

    const sheet1 = (wb) => {
        const nameHeader = `BẢNG THỜI KHÓA BIỂU | TUẦN ${tuanHoc.soTuan} | LỚP: ${Lop.lopHoc}`
        const ws = configHeader(wb, 'Bảng lịch học', nameHeader, {
            headerArr: [
                "THỨ", "THỜI GIAN", "MÔN HỌC",
                "TIẾT HỌC", "GIÁO VIÊN"
            ],
            width: 40
        })

        LichHoc && LichHoc.buoiHoc.forEach(ngay => {
            let row = 0
            let rowCuoi = 0
            let tongSoTiet = parseInt(ngay.tietHoc.length - 1) // 3
            ngay.tietHoc.forEach((tiet, i) => {
                row = ws.addRow([
                    "",
                    `${tiet.thoiGian}`,
                    `${tiet.monHoc}`,
                    `${tiet.thuTiet}`,
                    `${tiet.giaoVien}`,
                ])
                if (i === 0) row._cells[0].value = `${ngay.thu} (${ngay.ngayHoc})`
            })

            rowCuoi = parseInt(row._cells[0]._address.slice(1)) // 6
            ws.mergeCells(`A${rowCuoi - tongSoTiet}:A${rowCuoi}`)
        })

        return ws
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Lịch học" subTitile="Lịch học theo tuần " pathHome="hoc-sinh" />
                {dsTuanHoc && <section className="section">
                    <div className="card shadow-sm">
                        {dsTuanHoc && <div className="card-header">
                            <div className=" row">
                                <div className="col-md-4 col-sm-12 my-2">
                                    <select name="tuan" className="form-select" onChange={changeTuan}>
                                        {dsTuanHoc.map(tuan => (
                                            <option value={tuan._id} key={tuan._id}>{tuan.tenTuan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 col-6 my-2">
                                    <h4 className="card-title">Lịch học {tuanHoc && tuanHoc.tenTuan}</h4>
                                </div>
                                <div className="col-md-4 col-sm-6 col-6 my-2">
                                    <button className="btn btn-primary float-end"
                                        onClick={() => exportExcel("LICH_HOC_VNAEDUACTION", [sheet1])}
                                    >Tải xuống</button>
                                </div>
                            </div>
                        </div>}

                        <div className="card-body">
                            {/* <!-- Table with outer spacing --> */}
                            {isLoading ? <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead style={{backgroundColor: "#f1f1f1"}}>
                                        <tr >
                                            <th>Thứ</th>
                                            <th>Tiết</th>
                                            <th>Môn học</th>
                                            <th>Thời gian</th>
                                            <th>Giáo viên</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {LichHoc && LichHoc.buoiHoc.map((ngay, i) => (
                                            <tr key={i} >
                                                <td >
                                                    {ngay.thu} <br />
                                                    {ngay.ngayHoc}
                                                </td>
                                                <td className="p-0">
                                                    <TietHoc ngay={ngay} type={"thuTiet"} />
                                                </td>
                                                <td className="p-0">
                                                    <TietHoc ngay={ngay} type={"monHoc"} />
                                                </td>
                                                <td className="p-0">
                                                    <TietHoc ngay={ngay} type={"thoiGian"} />
                                                </td>
                                                <td className="p-0">
                                                    <TietHoc ngay={ngay} type={"giaoVien"} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                                : <LoadingFullPage />}
                            {/* end table  */}

                        </div>
                    </div>
                </section>}
            </div>
        </>
    )
}

export default LichHoc
