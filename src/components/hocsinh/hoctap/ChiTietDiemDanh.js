import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DiemDanhApi from '../../../api/hocsinh/DiemDanhApi'
import { getIdUser } from '../../../auth/AuthFun'
import BackBtn from '../../common/BackBtn'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
const ChiTietDiemDanh = () => {
    document.title = "Điểm danh | VNA EDUCATION"

    const [diemDanh, setdiemDanh] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const getDiemDanh = async (id) => {
            let res = await DiemDanhApi.get(id)
            setdiemDanh(res.data)
        }
        getDiemDanh(id)
    }, [id])

    const getUser = (loopuser) => {
        let currUser = getIdUser()
        try {
            for (let i = 0; i < loopuser.length; i++) {
                if (loopuser[i].maHocSinh === currUser) {
                    return loopuser[i]
                }   
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Chi tiết điểm danh" subTitile="Bảng diểm học sinh" pathHome="hoc-sinh" />
                <BackBtn />
                {!diemDanh ? <LoadingFullPage /> : <section className="section">
                    <div className="card shadow-sm">
                        <h4 className="card-title mt-5">Bảng điểm danh ngày {diemDanh.ngayHoc}</h4>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead style={{ backgroundColor: "#f1f1f1" }}>
                                        <tr>
                                            <th>STT</th>
                                            <th>Môn học</th>
                                            <th>Số tiết</th>
                                            <th>Giáo viên</th>
                                            <th>Trạng thái</th>
                                            <th>Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            diemDanh.tietHoc.map((monHoc, index) => (
                                                <tr key={monHoc.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{monHoc.monHoc}</td>
                                                    <td>{monHoc.tietHoc}</td>
                                                    <td>{monHoc.giaoVien}</td>
                                                    <td><span className={`badge rounded-pill 
                                                    ${getUser(monHoc.chiTiet).trangThai ? "bg-success" : "bg-danger"}`}>
                                                        {getUser(monHoc.chiTiet).trangThai ? "Có mặt" : "Vắng mặt"}
                                                    </span></td> 
                                                    <td>{getUser(monHoc.chiTiet).ghiChu }</td>
                                                </tr>
                                            ))
                                        }
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

export default ChiTietDiemDanh
