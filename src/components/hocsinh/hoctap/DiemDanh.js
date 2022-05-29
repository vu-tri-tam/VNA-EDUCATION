import React, { useEffect, useState } from 'react'
import DiemDanhApi from '../../../api/hocsinh/DiemDanhApi'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import { Link } from 'react-router-dom'

const DiemDanh = () => {
    document.title = "Điểm danh | VNA EDUCATION"

    const [diemDanh, setdiemDanh] = useState(null)
    const [tuanHoc, settuanHoc] = useState(1)

    useEffect(() => {
        const getDiemDanh = async () => {
            let res = await DiemDanhApi.get()
            // console.log(res.data);
            setdiemDanh(res.data)
        }
        getDiemDanh()
    }, [])

    const changeTuan = (e) => {
        settuanHoc(e.target.value)
    }


    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Điểm danh" subTitile="Bảng diểm học sinh" pathHome="hoc-sinh" />
                {!diemDanh ? <LoadingFullPage /> : <section className="section">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <div className=" row">
                                <div className="col-md-4 col-sm-12 my-2">
                                    <select name="tuan" className="form-select" onChange={changeTuan}>
                                        <option value="1">Tuần 1</option>
                                        <option value="2">Tuần 2</option>
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-12 col-12 my-2">
                                    <h4 className="card-title">Bảng điểm danh tuần {tuanHoc} </h4>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead style={{ backgroundColor: "#f1f1f1" }}>
                                        <tr>
                                            <th>STT</th>
                                            <th>Lớp học</th>
                                            <th>Ngày Học</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {diemDanh.map((ngayHoc, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{ngayHoc.lopHoc}</td>
                                                <td>{ngayHoc.ngayHoc}</td>
                                                <td>
                                                    <Link to={`/hoc-sinh/hoc-tap/chi-tiet-diem-danh/${ngayHoc.id}`}>
                                                        Xem chi tiết
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>}
            </div>
        </>
    )
}

export default DiemDanh
