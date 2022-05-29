import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import LoadingFullPage from '../../common/LoadingFullPage'
import { Link } from 'react-router-dom'


const BangDiem = () => {
    document.title = "Bảng điểm | VNA EDUCATION"

    const [lopHoc, setlopHoc] = useState(null)
    const [clone, setclone] = useState(null)

    // fecth data ds lớp học của GV a mặt dịnh ds theo bộ môn  
    useEffect(() => {
        const getLopHoc = async () => {
            let res = await axios.get('http://localhost:2077/bo-mon')
            setlopHoc(res.data[0].dungLop); 
            setclone(res.data[0].dungLop); 
        }
        getLopHoc();
    }, [])
    
    // funtion đổi khối
    const changeKhoi = (e) => {
        let value = parseInt(e.target.value)
        if (value === 0) return setlopHoc(clone)
        let res = clone.filter(lop => lop.khoi === value)
        setlopHoc(res)
    }

    // funtion đổi kiểu lớp
    const changeKieuLop = (e) => {
        // let value = parseInt(e.target.value)
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng điểm" subTitile="Bảng điểm" pathHome="giao-vien" />     
                { !lopHoc ? <LoadingFullPage /> : <section className="section">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <div className=" row">
                                <div className="col-md-4 col-sm-12 my-2">
                                    <select name="khoi" className="form-select" onChange={changeKhoi}>
                                        <option value="0">-- Tất cả khối --</option>
                                        <option value="9">Khối 9</option>
                                        <option value="8">Khối 8</option>
                                        <option value="7">Khối 7</option>
                                        <option value="6">Khối 6</option>
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 col-6 my-2">
                                    <h4 className="card-title">Quản lý bảng điểm</h4>
                                </div>
                                <div className="col-md-4 col-sm-6 col-6 my-2">
                                <select name="gv" className="form-select" onChange={changeKieuLop}>
                                        <option value="1">Lớp Bộ môn</option>
                                        <option value="2">Lớp chủ nhiệm</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                        {/* <!-- Table with outer spacing --> */}
                            <div className="table-responsive">
                                <table className="table">
                                    <thead style={{backgroundColor: "#f1f1f1"}}>
                                        <tr>
                                            <th >STT</th>
                                            <th >Lớp học</th>
                                            <th >Môn</th>
                                            <th >Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lopHoc.map((lop, i) => (
                                                <tr key={lop.id}>
                                                    <td>{i+1}</td>
                                                    <td>{lop.lop}</td>
                                                    <td>{lop.mon}</td>
                                                    <td>
                                                        <Link to={`/giao-vien/hoc-tap/bang-diem/${lop.id}`}>Xem chi tiết</Link>
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

export default BangDiem
