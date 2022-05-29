import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Swal from 'sweetalert2'
import BackBtn from '../../common/BackBtn'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'

const DiemDanhDetai = () => {
    let history = useHistory();
    const [diemDanh, setdiemDanh] = useState(null)
    const [dsHocSinh, setdsHocSinh] = useState(null)
    let {id} = useParams()

    useEffect(() => {
        getDiemDanh(id)
        
    }, [id])

    const getDiemDanh = (id) => {
        setTimeout(() => {
            axios.get(`http://localhost:2077/diem-danh-lop/${id}`)
                .then(res => {
                    setdiemDanh(res.data)  
                    return res.data.hocSinh
                }).then(result => setdsHocSinh(result))
        }, 500);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        Swal.fire({
            title: 'Bạn có chắc chứ?',
            text: "Bạn chỉ có thể lưu điểm danh một lần!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#d33',
            cancelButtonText: "Để xem lại",
            confirmButtonText: 'Có lưu lại!'
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(dsHocSinh);
                axios.patch(`http://localhost:2077/diem-danh-lop/${id}`,{
                    "hocSinh" : dsHocSinh,
                    "trangThai" : true
                }).then(() => {
                    history.push("/giao-vien/hoc-tap/diem-danh")
                })
            }
        })
    }

    const changeStudenStatus = (e) => {
        setdsHocSinh(
            dsHocSinh.map(hs => hs.id === parseInt(e.target.name) ? {...hs, coMat : !hs.coMat} : hs 
        ))
    } 

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Điểm danh" subTitile="Điểm danh" pathHome="giao-vien" />  
                <BackBtn />
                {!diemDanh ? <LoadingFullPage/> : <section className="section">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h4 className="card-title">Điểm danh lớp {diemDanh.lopHoc} Tiết: {diemDanh.tietHoc}</h4>
                            <p>Ngảy : {diemDanh.ngayHoc}</p>
                            <p>Môn: {diemDanh.monHoc} </p>
                        </div>
                        <div className="card-body">
                        {/* <!-- Table with outer spacing --> */}
                            <div className="table-responsive">
                                <form onSubmit={handleSubmit}>
                                    <table className="table table-lg">
                                        <thead style={{backgroundColor: "#f1f1f1"}}>
                                            <tr>
                                                <th >STT</th>
                                                <th >Tên học sinh</th>
                                                <th >Điểm danh</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {
                                                    dsHocSinh && dsHocSinh.map((hs,idx) => (
                                                        <tr key={hs.id}>
                                                            <td>{idx+1}</td>
                                                            <td>{hs.tenHocSinh}</td>
                                                            <td>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" 
                                                                            type="checkbox" id={`switchid-${hs.id}`} 
                                                                            onChange={changeStudenStatus} name={hs.id} />
                                                                        <label className="form-check-label" htmlFor={`switchid-${hs.id}`}>
                                                                            {hs.coMat ? "Có mặt" : "Vắng mặt"}
                                                                        </label>
                                                                    </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                        </tbody>
                                    </table>
                                    <button type="submit" className="btn btn-primary float-end">Lưu lại</button>
                                </form>
                            </div>
                            {/* end table  */}
                        </div>
                    </div>
                </section>}
            </div>
        </>
    )
}

export default DiemDanhDetai
