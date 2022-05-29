import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'

const DiemDanh = () => {
    document.title = "Điểm danh | VNA EDUCATION"

    const [diemDanh, setdiemDanh] = useState(null)

    useEffect(() => {
        getDiemDanh()
    }, [])

    const getDiemDanh = () => {
        setTimeout(() => {
            axios.get('http://localhost:2077/diem-danh-lop')
                .then(res => {
                    setdiemDanh(res.data)
                })
        }, 500);
    }

    return (
        <>
             <div className="page-heading">
                <TitleBreadcrumb title="Điểm danh" subTitile="Điểm danh" pathHome="giao-vien" />  
                {!diemDanh ? <LoadingFullPage/> : <section className="section">
                    <div className="card shadow-sm">
                        <div className="card-header">
                        <div className=" row">
                            <div className="col-md-4 col-sm-12 my-2">
                                <select name="tuan" className="form-select" >
                                    <option value="3" >Tuần 3</option>
                                    <option value="2" >Tuần 2</option>
                                    <option value="1" >Tuần 1</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-sm-6 col-6 my-2">
                                <h4 className="card-title">Điểm danh</h4>
                            </div>
                            <div className="col-md-4 col-sm-6 col-6 my-2"></div>
                        </div>
                        </div>
                        <div className="card-body">
                        {/* <!-- Table with outer spacing --> */}
                            <div className="table-responsive">
                                <table className="table ">
                                    <thead style={{backgroundColor: "#f1f1f1"}}>
                                        <tr>
                                            <th >STT</th>
                                            <th >Lớp học</th>
                                            <th >Ngày học</th>
                                            <th >Tiết học</th>
                                            <th >Môn học</th>
                                            <th >Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            diemDanh.map((lophoc,idx) =>(
                                                <tr key={lophoc.id}>
                                                    <td>{idx+1}</td>
                                                    <td>{lophoc.lopHoc}</td>
                                                    <td>{lophoc.ngayHoc}</td>
                                                    <td>{lophoc.tietHoc}</td>
                                                    <td>{lophoc.monHoc}</td>
                                                    <td>
                                                        <button className="btn btn-primary" disabled={lophoc.trangThai}>
                                                            <NavLink to={`/giao-vien/hoc-tap/diem-danh/${lophoc.id}`} className="text-white">
                                                                {!lophoc.trangThai ? "Điểm danh" : "Đã điểm danh"}
                                                            </NavLink>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* end table  */}
                        </div>
                    </div>
                </section>}
            </div>
        </>
    )
}

export default DiemDanh
