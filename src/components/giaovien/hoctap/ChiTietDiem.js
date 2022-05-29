import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BackBtn from '../../common/BackBtn'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'

const ChiTietDiem = () => {
    document.title ="Bảng điểm | VNA EDUCATION"

    const [bangdiem, setbangdiem] = useState(null)
    let {id} = useParams()
    
    useEffect(() => {
        getBangDiem(id)
    }, [id])

    const getBangDiem = (id) => {
        setTimeout(() => {
            axios.get(`http://localhost:2077/bang-diem/${id}`)
                .then(res => {
                    setbangdiem(res.data)
                })
        }, 500);
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng điểm" subTitile="Bảng diểm học sinh" pathHome="giao-vien" />
                <BackBtn />     
                {!bangdiem ? <LoadingFullPage/> : <section className="section">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <div className=" row">
                                <div className="col-4">
                                <h6>Tên: {bangdiem.hoTen}</h6>
                                </div>
                                <div className="col-4">
                                    <h4 className="card-title">Bảng điểm tổng kết</h4>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-primary float-end">Tải xuống</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-lg">
                                    <thead style={{backgroundColor: "#f1f1f1"}}>
                                        <tr >
                                            <th className="text-center">MÔN HỌC</th>
                                            <th className="text-center">ĐIỂM MIỆNG</th>
                                            <th className="text-center">ĐIỂM 15 phút</th>
                                            <th className="text-center">ĐIỂM 1 TIẾT</th>
                                            <th className="text-center">ĐIÊM HK 1</th>
                                            <th className="text-center">ĐIỂM HK 2</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                bangdiem.bangDiem.map(mon => (
                                                    <tr key={mon.id}>
                                                        <td>{mon.monHoc}</td>
                                                        <td>{mon.kiemTra_mieng}</td>
                                                        <td>{mon.kiemTra_15phut}</td>
                                                        <td>{mon.kiemTra_1tiet}</td>
                                                        <td>{mon.thi_HK1}</td>
                                                        <td>{mon.thi_HK2}</td>
                                                    </tr>
                                                ))
                                           }
                                    </tbody>
                                </table>
                            </div>
                            Điểm trung bình: 10
                        </div>
                    </div>
                </section>}
            </div>
        </>
    )
}

export default ChiTietDiem
